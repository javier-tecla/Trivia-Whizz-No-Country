import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

export default function Questions() {
  const navigate = useNavigate();

  const { user } = useAuthStore();
  // console.log("User:", user);

  const playerEmail = user?.idMail;
 

  const [questions, setQuestions] = useState([]);
  const [activeResults, setActiveResults] = useState(false);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [selectAnswerIndex, setSelectAnswerIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [lives, setLives] = useState(5); // Inicializar las vidas del jugador
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [answerSelected, setAnswerSelected] = useState(false);

  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    fetchQuestions();
    sendPlayerInfo();
  }, []);

  const fetchQuestions = () => {
    fetch("https://c1772mpython.pythonanywhere.com/preguntas")
      .then((response) => response.json())
      .then((data) => {
        const shuffledQuestions = data.sort(() => Math.random() - 0.5);
        setQuestions(shuffledQuestions);
        shuffleAnswers(shuffledQuestions[0]);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  };

  const sendPlayerInfo = () => {
    axios
    
      .post("https://c1772mpython.pythonanywhere.com/jugar", {
        id_jugador: playerEmail,
      })
      .then((response) => {
        // console.log("Response from API:", response.data);
        
        // Aquí puedes manejar la respuesta de la API si es necesario
      })
      .catch((error) => {
        console.error("Error sending player info:", error.response);
      });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (lives === 0 || activeResults) {
        navigate("/profile", { state: { apiResponse } });
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [lives, activeResults, apiResponse, navigate]);

  const shuffleAnswers = (question) => {
    const answers = [
      question.respuestaCorrecta,
      question.respuestaInCorrecta1,
      question.respuestaInCorrecta2,
      question.respuestaInCorrecta3,
    ];
    const shuffled = answers.sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
  };

  const onNextQuestion = () => {
    // console.log()
    if (indexQuestion + 1 < questions.length) {
      setIndexQuestion((index) => index + 1);
      setSelectAnswerIndex(null);
      setAnswered(false);
      setAnswerSelected(false);
      shuffleAnswers(questions[indexQuestion + 1]); // Mezclar las respuestas para la siguiente pregunta
    } else {
      setActiveResults(true);
    }
  };

  const checkAnswer = (answer, index) => {
    if (answerSelected) return; // Evitar selecciones adicionales

    const isCorrect = answer === questions[indexQuestion].respuestaCorrecta;

    const data = {
      id_jugador: playerEmail,
      respuesta_correcta: isCorrect,
    };
    
    // console.log("Data sent to API:", data);

    // Envía la respuesta al servidor
    axios
      .post("https://c1772mpython.pythonanywhere.com/jugar/responder", {
        id_jugador: playerEmail,
        respuesta_correcta: isCorrect,
      })
      .then((response) => {
        // console.log("Response from API:", response.data);
        setApiResponse(response.data);
        // Aquí puedes manejar la respuesta de la API si es necesario
      })
      .catch((error) => {
        console.error("Error sending answer:", error);
      });

    if (!isCorrect) {
      // Si la respuesta es incorrecta, reducir una vida
      setLives((lives) => lives - 1); // Reducir solo una vida si es incorrecta
    }

    setSelectAnswerIndex(index);
    setAnswered(true);
    setAnswerSelected(true);
  };

  const resetQuiz = () => {
    setIndexQuestion(0);
    setSelectAnswerIndex(null);
    setAnswered(false);
    setActiveResults(false);
    setLives(5); // Reiniciar las vidas del jugador
    if (questions.length > 0) {
      const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5); // Mezclar las preguntas
      setQuestions(shuffledQuestions); // Actualizar el estado de las preguntas
      shuffleAnswers(shuffledQuestions[0]); // Mezclar las respuestas para la primera pregunta
    }
  };

  const filteredQuestion = questions[indexQuestion] || {};

  return (
    <div className="relative flex items-center justify-center h-screen">
      {activeResults ? (
        <div>
          {/* <h1>Results Page</h1> */}
          {/* Renderizar resultados aquí */}
        </div>
      ) : (
        <div className="flex flex-col justify-between bg-white shadow-md w-full max-w-ms min-w-[445px] h-[700px] p-10 rounded-lg" style={{ marginTop: "-60px" }}>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">
              {/* Numero de preguntas */}
              {/* {indexQuestion + 1} / {questions.length} */}
            </span>

            <div className="flex items-center">
              {" "}
              {/* Contenedor para centrar las estrellas */}
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={
                    index < lives
                      ? "/estrella violeta.png"
                      : "/estrella gris.png"
                  }
                  alt="Life"
                  className={`w-8 h-8 mx-1 ${
                    index >= lives ? "opacity-50" : ""
                  }`}
                />
              ))}
            </div>

            <div>
              <span className="font-semibold"></span>
              <span className="font-bold">
                {/* la dificulta de la pregunta */}
                {/* {response.data.usuario} */}
              </span>
            </div>
          </div>
          {/* <button
            className="border px-5 border-[#4A3B85] py-2 rounded-lg font-bold transition-all bg-[#D3D4D8] hover:bg-[#4A3B85] hover:text-[white]"
            onClick={resetQuiz}
          >
            Reiniciar
          </button> */}
          <div>
            <h1 className="text-2xl font-bold montserrat text-center w-full md:w-[600px]">
              {filteredQuestion.pregunta}
            </h1>
          </div>
          {/* las respuesta aqui */}
          <div className="grid grid-cols gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {/* Mapeamos un arreglo*/}
            {shuffledAnswers.map((answer, index) => (
              <button
                className={`border p-5 rounded-lg flex justify-center items-center hover:scale-105 ${
                  selectAnswerIndex !== null && index === selectAnswerIndex
                    ? answer === filteredQuestion.respuestaCorrecta
                      ? "bg-green-500"
                      : "bg-red-500"
                    : ""
                }`}
                key={answer}
                onClick={() => checkAnswer(answer, index)}
                disabled={answered && selectAnswerIndex !== index}
              >
                {/* {filteredQuestion.respuestaCorrecta === answer ? "-" : ""} */}
                <p className="text-xl font-light montserrat text-center">{answer}</p>
              </button>
            ))}
          </div>
          {/* Condicional para mostrar el boton de  siguinte pregunta o el finalizar */}
          {indexQuestion + 1 === questions.length ? (
            <button
              className="px-5 py-2 font-medium text-yellow-600 border-2 border-yellow-600 rounded-md hover:bg-yellow-600 hover:text-black"
              onClick={() => setActiveResults(true)}
            >
              Finalizar
            </button>
          ) : (
            <button
              className="montserrat border bg-[#D3D4D8] border-[#4A3B85] text-[#00204A] rounded-md px-5 py-2 hover:bg-[#4A3B85] hover:text-white font-medium"
              style={{ opacity: lives === 0 ? 0.4 : answered ? 1 : 0.4 }}
              onClick={onNextQuestion}
              disabled={!answered || lives === 0} // Deshabilita el botón si no se ha respondido o se agotaron las vidas
            >
              Siguiente Pregunta
            </button>
          )}
        </div>
      )}
    </div>
  );
}
