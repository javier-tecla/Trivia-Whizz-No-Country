import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // wake up API
    fetch("https://c1772mpython.pythonanywhere.com/");
  }, [navigate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/login");
    }, 3000); // Redirige después de 3 segundos

    return () => clearTimeout(timeout); // Limpia el timeout si el componente se desmonta antes de que se cumpla el tiempo
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen" style={{ marginTop: "-100px" }}>
      {/* <Link to={"/sesion"}> */}
      <div className="flex flex-col items-center">
        <div className="w-72 h-[20rem] flex justify-center items-center hover:scale-110 transition-all duration-500">
          <img
            className="w-full h-96 opacity-90"
            style={{
              width: "311px",
              height: "245px",
              filter: "drop-shadow(0 0 5px rgba(92, 32, 223, 0.8))",
            }}
            src="/Logovertical.png"
            alt="Página de carga"
          />
        </div>
        {/* </Link> */}
        <Spinner />
      </div>
    </div>
  );
}
