// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

export default function Ranking() {
  const { user } = useAuthStore();

  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    fetchRanking();
    // const intervalId = setInterval(fetchRanking, 5000); // Llamar a fetchRanking cada 5 segundos
    // return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  const fetchRanking = () => {
    axios
      .get("https://c1772mpython.pythonanywhere.com/ranking")
      .then((response) => {
        // console.log("Ranking data:", response.data);
        setRankingData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ranking:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="sm:w-[500px] sm:h-[590px] w-[350px] h-[550px] bg-[rgba(0,32,74,0.8)] rounded-lg flex flex-col justify-center items-center" style={{ marginTop: "-155px" }}>
        <img
          className="mb-2 gap-[56px]"
          src="/coin-2.png"
          alt="logo"
          style={{
            width: "80px",
            filter: "drop-shadow(0 0 5px rgb(209, 94, 26, 0.9))",
          }}
        />
        <div className="block mb-10 text-center text-white">
          <h1 className="montserrat mb-8 text-2xl irish-grover-regular ">
            Actual Score:
            <span className="ml-2 text-yellow-500">{user.puntaje}</span>
          </h1>
          <p className="montserrat">
            But it is not enough to reach the Wizard&apos;s Castle...
          </p>
        </div>

        <Link to="/questions">
          <button className="montserrat hover:bg-[#4A3B85] text-xs text-white border border-white  px-[6.5rem] p-1 mb-12 rounded-xl focus:outline-none focus:shadow-outline cursor-pointer hover:text-white relative">
            CONTINUE
            {/* <FontAwesomeIcon icon={faArrowRight} className="ml-1 text-white" /> */}
          </button>
        </Link>

        <div className="mb-4 text-center">
          <h1 className="text-white irish-grover-regular text-2xl ">Ranking</h1>
        </div>

        {/* Mostrar el ranking */}
        {rankingData.map((player, index) => (
          <div
            key={index}
            className="ranking-item"
            style={{ marginBottom: "1px", height: "40px" }}
          >
            <div className="flex items-center ">
              <img
                src={`/avatars/${player.avatar}`}
                alt="Avatar"
                className="w-8 h-8 mr-1 rounded-full"
              />
              <span
                className="irish-grover-regular p-0 mr-1 text-white"
                style={{
                  width: "100px",
                  display: "inline-block",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {player.nick}
              </span> <div className="irish-grover-regular pl-24 ml-auto sm:pl-48 sm:ml-auto">
             
                <span
                  className="relative font-bold text-yellow-500"
                  style={{ textShadow: "0px 0px 10px rgba(242, 234, 13, 0.9)" }}
                >
                  {player.puntaje}
                </span>
              </div>
            </div>
            <hr className="w-full border-white border-opacity-25 " />
          </div>
        ))}
      </div>
    </div>
  );
}
