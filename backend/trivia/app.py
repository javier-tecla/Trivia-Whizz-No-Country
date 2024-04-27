from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from sqlalchemy import select, update
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields
from datetime import datetime
import logging
from logging.handlers import RotatingFileHandler
import random
from sqlalchemy.exc import IntegrityError

app=Flask(__name__)
CORS(app)

handler = RotatingFileHandler('error.log', maxBytes=10000, backupCount=1)
handler.setLevel(logging.ERROR)
app.logger.addHandler(handler)

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://usuario:clave@localhost/trivia'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db=SQLAlchemy(app)
ma=Marshmallow(app)

def actualizar_puntaje_y_partidas_en_db(id_jugador, nuevo_puntaje, nuevas_partidas, nuevo_ultimo):
    usuario = Usuario.query.filter_by(idMail=id_jugador).first()
    if usuario:
        usuario.puntaje = nuevo_puntaje
        usuario.partidas = nuevas_partidas
        usuario.ultimo = nuevo_ultimo
        db.session.commit()

class Usuario(db.Model):
    idMail = db.Column(db.String(100), primary_key=True)
    clave = db.Column(db.String(100), nullable=True)
    nick = db.Column(db.String(100), nullable=True)
    creado = db.Column(db.Date, nullable=True)
    ultimo = db.Column(db.Date, nullable=True)
    avatar = db.Column(db.String(100), nullable=True)
    puntaje = db.Column(db.Integer, nullable=True, default=0)
    partidas = db.Column(db.Integer, nullable=True, default=0)
    categoriaId = db.Column(db.Integer, nullable=True, default=1)
    dificultad = db.Column(db.String(100), nullable=True, default="Trivia Whizz")
    
    def __init__(self, idMail, clave, nick, creado, ultimo, avatar, puntaje, partidas, categoriaId, dificultad):
        self.idMail = idMail
        self.clave = clave
        self.nick = nick
        self.creado = creado
        self.ultimo = ultimo
        self.avatar = avatar
        self.puntaje = puntaje
        self.partidas = partidas
        self.categoriaId = categoriaId
        self.dificultad = dificultad

class Categoria(db.Model):
    categoriaId = db.Column(db.Integer, primary_key=True)
    categoria = db.Column(db.String(100))

class Pregunta(db.Model):
    idPregunta = db.Column(db.Integer, primary_key=True)
    categoriaId = db.Column(db.Integer, db.ForeignKey('categoria.categoriaId'))
    pregunta = db.Column(db.Text)
    respuestaCorrecta = db.Column(db.String(100))
    respuestaInCorrecta1 = db.Column(db.String(100))
    respuestaInCorrecta2 = db.Column(db.String(100))
    respuestaInCorrecta3 = db.Column(db.String(100))

class Partida:
    def __init__(self, id_jugador):
        self.id_jugador = id_jugador
        self.puntaje = 0
        self.preguntas_ok = 0
        self.preguntas_nook = 0
        self.racha = 0
    def responder_pregunta_correcta(self):
        self.preguntas_ok += 1
        self.racha += 1
        self.puntaje += (self.racha)
    def responder_pregunta_incorrecta(self):
        self.preguntas_nook += 1
        self.racha = 0
        if self.puntaje >=1:
            self.puntaje-=1
        if self.preguntas_nook >= 5:
            self.finalizar_partida()
    def obtener_estado(self):
        estado = f"{self.id_jugador}, puntaje: {self.puntaje} , bien: {self.preguntas_ok}, mal {self.preguntas_nook}, racha : {self.racha}"
        return estado
    def obtener_puntaje(self):
        return self.puntaje
    def finalizar_partida(self):

        usuario= Usuario.query.filter_by(idMail=self.id_jugador).first() #nuevo
        puntaje_actual = usuario.puntaje #nuevo
        partidas_actual = usuario.partidas #nuevo
        nuevo_puntaje = puntaje_actual + self.puntaje
        nuevas_partidas = partidas_actual + 1
        nuevo_ultimo = datetime.now() 
        actualizar_puntaje_y_partidas_en_db(self.id_jugador, nuevo_puntaje, nuevas_partidas, nuevo_ultimo)
        del partidas_activas[self.id_jugador]
        resultado_partida = self.obtener_estado() + ". Partida finalizada."
        return {'mensaje': 'Partida finalizada(funcion de la clase Partida)', 'resultado_partida': resultado_partida}

class UsuarioSchema(ma.Schema):
    class Meta:
        fields=('idMail','clave','nick','creado','ultimo','avatar','puntaje','partidas','categoriaId','dificultad')

class CategoriaSchema(ma.Schema):
    class Meta:
        fields = ('categoriaId', 'categoria')

class PreguntaSchema(ma.Schema):
    class Meta:
        fields = ('idPregunta', 'categoriaId', 'pregunta', 'respuestaCorrecta', 
                  'respuestaInCorrecta1', 'respuestaInCorrecta2', 'respuestaInCorrecta3')

usuario_schema=UsuarioSchema()        
usuarios_schema=UsuarioSchema(many=True)
categoria_schema = CategoriaSchema()
categorias_schema = CategoriaSchema(many=True)
pregunta_schema = PreguntaSchema()
preguntas_schema = PreguntaSchema(many=True)

partidas_activas = {}


with app.app_context():
    db.create_all()

'''METODOS GET'''

@app.route('/', methods=['GET'])
def home():
    usuarios = Usuario.query.order_by(Usuario.puntaje.desc()).limit(30).all()
    
    ranking_html = """
    <style>
        h1 {
            color: blue;
            font-size: 24px;
        }
        table {
            border-collapse: collapse;
            width: 50%;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
    </style>
    <h1>Ranking de Usuarios</h1>
    <table>
            <tr><th>Mail</th><th>Nick</th><th>Puntaje</th><th>Partidas</th></tr>
    """
    for usuario in usuarios:
        ranking_html += f"<tr><td>{usuario.idMail}</td><td>{usuario.nick}</td><td>{usuario.puntaje}</td><td>{usuario.partidas}</td></tr>"
    ranking_html += "</table>"
    
    return ranking_html

@app.route('/json', methods=['GET'])
def listado():
    usuarios = Usuario.query.all()
    resultado = usuarios_schema.dump(usuarios)
    return jsonify(resultado), 200

@app.route('/consultaLogin/<idMail>/<clave>', methods=['GET'])
def consulta_login(idMail, clave):
    usuario = Usuario.query.filter_by(idMail=idMail).first()
    mensaje = ""
    datos_usuario = None
    if usuario:
        if usuario.clave == clave:
            mensaje = f"Inicio de sesión exitoso, bienvenido {usuario.nick}!"
            datos_usuario = {
                'nick': usuario.nick,
                'idMail': usuario.idMail,
                'avatar': usuario.avatar,
                'puntaje': usuario.puntaje,
                'partidas': usuario.partidas,
                'categoriaId': usuario.categoriaId,
                'dificultad': usuario.dificultad
            }
        else:
            mensaje = "La contraseña es incorrecta."
    else:
        mensaje = "No se encontró ningún usuario con ese correo electrónico."

    return jsonify({'mensaje': mensaje, 'usuario': datos_usuario})

@app.route('/login/<idMail>/<clave>', methods=['GET'])
def login(idMail, clave):
    usuario = Usuario.query.filter_by(idMail=idMail).first()
    if not usuario:
        return jsonify({'mensaje': "Usuario no encontrado"}), 404
    if usuario.clave != clave:
        return jsonify({'mensaje': "Contraseña incorrecta"}), 401
    datos_usuario = {
                'nick': usuario.nick,
                'avatar': usuario.avatar,
                'puntaje': usuario.puntaje,
                'partidas': usuario.partidas,
                'idMail': idMail,
            }
    return jsonify({'mensaje': "Inicio de sesión exitoso",
                    'usuario': datos_usuario
                    }), 200

@app.route('/categorias', methods=['GET'])
def mostrarCategorias():
    categorias = Categoria.query.all()
    return categorias_schema.jsonify(categorias)

@app.route('/preguntas', methods=['GET'])
def mostrarPreguntas():
    preguntas = Pregunta.query.all()
    random.shuffle(preguntas) 
    return preguntas_schema.jsonify(preguntas)

#Si bien la consulta no se terminó usando porque en el front no llegamos a desarrollar la elección de categorias paraa jugar
# dejo el código y lo reescribí usando la funcionalidad del ORM de SQLAlchemy en vez del query.get 
# esto va a permitir si escala la aplicación tener nueva consulta implementada.
@app.route('/obtenerPreguntas/<int:categoria>/<int:cantidad>', methods=['GET'])
def obtenerPreguntas(categoria_id, cantidad):
    categoria_objeto = Categoria.query.get(categoria_id)
    if categoria_objeto:
        preguntas = Pregunta.query.filter_by(categoriaId=categoria_id).limit(cantidad).all()
        preguntas_schema = PreguntaSchema(many=True)
        preguntas_json = preguntas_schema.dump(preguntas)
        return jsonify(preguntas_json)
    else:
        return jsonify({'mensaje': 'La categoría especificada no existe'}), 404

@app.route('/obtenerPreguntasRandom/<int:categoria>/<int:cantidad>', methods=['GET'])
def obtenerPreguntasRandom(categoria, cantidad):
    preguntas_categoria = Pregunta.query.filter_by(categoriaId=categoria).all()
    if cantidad > len(preguntas_categoria):
        cantidad = len(preguntas_categoria)
    preguntas_seleccionadas = random.sample(preguntas_categoria, cantidad)
    preguntas_schema = PreguntaSchema(many=True)
    preguntas_json = preguntas_schema.dump(preguntas_seleccionadas)
    return jsonify(preguntas_json)

@app.route('/ranking', methods=['GET'])
def obtener_ranking():
    sql_query = text("SELECT idMail, nick, avatar, puntaje, partidas FROM usuario ORDER BY puntaje DESC LIMIT 5;")
    resultado = db.session.execute(sql_query).fetchall()
    ranking = []
    for row in resultado:
        usuario = {
            'idMail': row[0],
            'nick': row[1],
            'avatar': row[2],
            'puntaje': row[3],
            'partidas': row[4]
        }
        ranking.append(usuario)
    return jsonify(ranking)

    
'''METODOS POST'''

@app.route('/login/sign-in/', methods=['POST'])
def signin():
    try:
        data = request.json
        if data['clave'] != data['validaClave']:
            return jsonify({'error': 'La clave y la clave de validación no coinciden'}), 422
        fechaActual = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        nuevoUsuario= Usuario(
            idMail=data['idMail'],
            clave=data['clave'],
            nick=data['nick'],
            avatar=data['avatar'],
            creado= fechaActual,
            ultimo= fechaActual,
            puntaje=0,
            partidas=0,
            categoriaId=1,
            dificultad='Trivia Whizz'
        )
        db.session.add(nuevoUsuario)
        db.session.commit()
        return jsonify({'message': 'Usuario creado correctamente'}), 201
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'Usuario ya estaba dado de alta con anterioridad'}), 409
    except KeyError as e:
        return jsonify({'error': f'Falta informar el campo requerido: {str(e)}'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Ocurrió un error interno del servidor'}), 500 


'''LOGICA DEL JUEGO'''

@app.route('/jugar', methods=['POST'])
def jugar():
    data = request.json
    id_jugador = data['id_jugador']
    partida = Partida(id_jugador)
    partidas_activas[id_jugador] = partida
    estado_partida = partida.obtener_estado()
    return jsonify({'mensaje': 'Partida creada' ,'estado_partida': estado_partida})

@app.route('/jugar/responder', methods=['POST'])
def responder_pregunta():
    data = request.json
    id_jugador = data['id_jugador']
    respuesta_correcta = data['respuesta_correcta']
    
    if id_jugador in partidas_activas:
        partida = partidas_activas[id_jugador]
        
        if respuesta_correcta:
            partida.responder_pregunta_correcta()
            estado_partida = partida.obtener_estado()
            puntajeFinal = partida.obtener_puntaje()
            return jsonify({
                'mensaje': 'Respuesta correcta',
                'estado_partida': estado_partida, 
                'imagen': 'coin-2.png' , 
                'puntaje_actual_final' : 'Puntaje final: ' + str(puntajeFinal) , 
                'Leyenda': '...pero no es suficiente para alcanzar el castillo del hechicero.',
                'Ranking_Jugador':puntajeFinal})
        else:
            partida.responder_pregunta_incorrecta()
            estado_partida = partida.obtener_estado()
            puntajeFinal = partida.obtener_puntaje()
            if puntajeFinal >0:
                return jsonify({
                    'mensaje': 'Respuesta incorrecta',
                    'estado_partida': estado_partida, 
                    'imagen': 'coin-2.png' ,
                    'puntaje_actual_final' : 'Puntaje final: ' + str(puntajeFinal) , 
                    'Leyenda': '...pero no es suficiente para alcanzar el castillo del hechicero.',
                    'Ranking_Jugador':puntajeFinal})
            else:
                return jsonify({
                    'mensaje': 'Respuesta incorrecta',
                    'estado_partida': estado_partida, 
                    'imagen': 'araña.png', 
                    'puntaje_actual_final' : 'Perdiste', 
                    'Leyenda': '... prueba otros trucos y vuelve a intentarlo',
                    'Ranking_Jugador':puntajeFinal})
    else:
        return jsonify({'error': 'El jugador no tiene una partida activa (programa responder)'})

@app.route('/finalizar', methods=['POST'])
def finalizar_partida():
    data = request.json
    id_jugador = data['id_jugador']
    if id_jugador in partidas_activas:
        partida = partidas_activas[id_jugador]
        resultado_partida = partida.finalizar_partida()
        del partidas_activas[id_jugador]  # Eliminar la partida del diccionario
        return jsonify(resultado_partida)
    else:
        return jsonify({'error': 'El jugador no tiene una partida activa (programa finallizar)'})



if __name__=='__main__':  
    app.run(debug=True, port=5000) 
    
