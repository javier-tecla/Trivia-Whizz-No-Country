<p align="center"><img src="frontend/assets/logo.png" alt="Logo"></p>
<br><br><br><br>

# ¿Qué es?  # https://trivia-whizz.netlify.app/

<p><strong>Trivia Whizz</strong> es una web app de trivia donde los usuarios pueden desafiar sus conocimientos sobre una variedad de temas.</p>

<br>

![1](frontend/assets/Mockup1.png)
![1](frontend/assets/Mockup2.png)
![1](frontend/assets/Mockup3.png)
![1](frontend/assets/Mockup4.png)



# Definición del proyecto:
Proyecto realizado en el contexto de Simulación Certificada "No Country", para el que se trabajó durante 4 semanas. Desde la organización del grupo, hasta la presentación de la Demo, se fue trabajando en etapas o Sprints, reportando los avances al Team Leader. El criterio de selección del proyecto a trabajar fue en relación a la cantidad de participantes, los perfiles profesionales y el tiempo de trabajo para poder cumplir con el dead-line.

# Tecnologías utilizadas en el proyecto:

<p><strong>React</strong> se utiliza como el framework principal de frontend para construir la interfaz de usuario de la aplicación.</p>
<p><strong>React Router</strong> para la navegación entre diferentes páginas de la aplicación</p>
<p><strong>Axios</strong> se utiliza para realizar solicitudes a una API externa para el inicio de sesión, registro, obtención de preguntas y obtención de datos de ranking.</p>
<p><strong>Figma</strong> para el diseño de la interfase, componentes e interacciones.</p>
<p><strong>Whimsical</strong> para desarrollar el flujo de navegación de la aplicación</p>
<p><strong>Python</strong>fue utilizado como el lenguaje de programación principal para el desarrollo del backend de la aplicación de Trivia Whizz  </p> 
<p><strong>Flask</strong> fue el framework de desarrollo web elegido por ser ligero y flexible. </p> 
<p><strong>Flask SQLAlchemy</strong> para la interacción con la base de datos MySQL </p> 
<p><strong>Flask Marshmallow</strong> para la serialización de objetos </p> 
<p><strong>Flask CORS</strong> para la habilitación de solicitudes CORS </p> 
<p><strong>MySQL</strong> fue el sistema de gestión de bases de datos relacional utilizado para almacenar y gestionar los datos de la aplicación. </p> 

    
<br><br><br>
<h1>Nuestro equipo </h1>


| Sergio Gacal 🚀 | Alessandro Brizuela | Javier Borjas 💻 | Paula Lorca 🎨 |
|---|---|---|---|
| <p><img src="https://avatars.githubusercontent.com/u/130688160?s=400&u=4c249b38781bbeb037a8f191c0bf4ceb4166d4fd&v=4" alt="Sergio Gacal" width="200" height="200"></p>  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/sergiogacal/) [![GitHub](https://img.shields.io/badge/GitHub-Perfil-blue?style=flat&logo=github)](https://github.com/SergioGacal) | <p><img src="https://media.licdn.com/dms/image/D4D03AQFF6Xs2Sl7loQ/profile-displayphoto-shrink_400_400/0/1710551588567?e=1719446400&v=beta&t=Ko5j00_dxPMg7lc21PLQgnMGZGgp5s45unuFo46fJMw" alt="Alessandro Brizuela" width="200" height="200"></p> [![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/alessandro-brizuela-364a91272/) [![GitHub](https://img.shields.io/badge/GitHub-Perfil-blue?style=flat&logo=github)](https://github.com/Ale0602) | <p><img src="https://avatars.githubusercontent.com/u/108706744?v=4" alt="Javier Borjas" width="200" height="200"></p> [![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/javier-borjas-179059252/) [![GitHub](https://img.shields.io/badge/GitHub-Perfil-blue?style=flat&logo=github)](https://github.com/javier-tecla) | <p><img src="https://mir-s3-cdn-cf.behance.net/user/115/9853804013857.6158e7a467dda.jpg" alt="Paula Lorca" width="200" height="200"></p> [![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/paula-lorca/) [![Behance Profile](https://img.shields.io/badge/Behance-Perfil-blue?style=flat&logo=behance)](https://www.behance.net/paulalorca) |


<br><br><br>

<h1>Nuestro Desarrollo</h1>
 
## UX UI 

En una primera etapa, se trabajó en la construcción del flujo de navegación del usuario con wireframes y paralelamente se fue definiendo el contenido de las pantallas.
Concepto: Se trabajó en el storytelling del juego bajo un concepto, se definió el isologotipo, un personaje y una estética general.
Definida la estética general del juego, se trabajaron las pantallas, el contenido y las interacciones arribando a un prototipo funcional.


## Front End 

El proyecto utiliza React junto con React Router para el frontend, Axios para manejar las solicitudes HTTP, y Jsx y Tailwind CSS para la estructura y diseño de la interfaz de usuario. Además, se comunica con una API externa para realizar diversas operaciones, como inicio de sesión, registro y obtención de datos del juego.
- Inicio de sesión y registro: Los usuarios pueden iniciar sesión con sus credenciales o registrarse para crear una cuenta nueva, proporcionando información como correo electrónico, contraseña, nombre de usuario y avatar.
- Preguntas y respuestas: Los usuarios pueden responder preguntas y reciben retroalimentación sobre la corrección de sus respuestas, además de ver su puntaje y vidas restantes. Al finalizar el juego, se muestra un mensaje con el puntaje final.
- Perfil de usuario: Se muestra el perfil del usuario con su puntaje actual.
- Ranking: Muestra el puntaje de los jugadores en un ranking, que incluye al usuario actual.


## Back End

Este repositorio contiene el código del backend para una aplicación de trivia basada en Flask. Esta aplicación proporciona una API RESTful para gestionar usuarios, categorías de preguntas, preguntas y partidas de trivia.
- Registro e inicio de sesión de usuarios
- Obtención de preguntas por categoría y de manera aleatoria.
- La primer versión cuenta con un único modo de juego que finaliza cuando el participante se equivoca 5 veces.
- Juego de trivia interactivo con gestión de puntajes y partidas
- Ranking de usuarios basado en puntajes
- Bonificación de puntaje por racha de respuestas correctas consecutivas.

<br><br><br>

<h1 align="center"> 
  Inicialización del proyecto
</h1>

Node.js instalado en tu sistema, puedes [descargarlo aquí](https://nodejs.org/en).
Gestor de paquetes npm, que se instala automáticamente con Node.js.


#### 1. Instalación

Clona este repositorio en tu máquina local:
```bash
git clone https://github.com/No-Country/c17-72-m-python.git
```

Navega al directorio del proyecto:
```bash
cd directorio del proyecto
```



</br>

<h2 align="center"> 
  Inicialización del proyecto Front
</h2>

Navega a la carpeta "Frontend" del proyecto:
```bash
cd frontend
```

#### 1. Instalación

Instala las dependencias utilizando npm:
```bash
npm install
```
Correr la aplicación
```bash
npm run dev
```
Abrir el navegador con la direccion:
```bash
http://localhost:5173/
```

</br>

<h2 align="center"> 
Inicialización del proyecto en el Back-End
</h2>

Navega a la carpeta "Backend" del proyecto:
```bash
cd backend
```

#### 1. Instalación

```bash
pip install flask flask-sqlalchemy flask-marshmallow marshmallow-sqlalchemy pymysql -U flask-cors
```
#### 2. Configuración

Se debe configurar la Base de Datos MySQL. 
- MySQL debe estar instalado en el sistema
- Crear una base de datos llamada 'trivia'
- Configurar las credenciales de la base de datos MySQL en el archivo 'app.py'


```bash
pp.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://usuario:clave@localhost/trivia'
```

#### 3. Ejecutar la Aplicación


```bash
python app.py
```
