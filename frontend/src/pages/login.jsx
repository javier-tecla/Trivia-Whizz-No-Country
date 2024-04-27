import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../stores/auth.store";
import { useLocalStorage } from "../../public/hooks/useLocalStorage";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [storedUser, setStoredUser] = useLocalStorage("user", null);

  const { login } = useAuthStore();

  const [apiResponse, setApiResponse] = useState(null);
  const [showSignInMessage, setShowSignInMessage] = useState(true);
  const [showSignUpLink, setShowSignUpLink] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignUpMessage, setShowSignUpMessage] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendPlayerInfoToAPI = async (email) => {
    try {
      await axios.post("https://c1772mpython.pythonanywhere.com/jugar", {
        id_jugador: email,
      });
    } catch (error) {
      console.error("Error sending player info:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const { email } = formData;

      // Enviar el correo electrónico del jugador al servidor
      await sendPlayerInfoToAPI(email);
      // console.log("Correo electrónico enviado:", email);
    } catch (error) {
      console.error("Error sending player info:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      if (!email || !password) {
        setErrorMessage("Por favor ingrese email y contraseña");
        setTimeout(() => {
          setErrorMessage("");
        }, 4000);
        return;
      }

      const response = await axios.get(
        `https://c1772mpython.pythonanywhere.com/login/${email}/${password}`
      );

      // Establecer la respuesta de la API en el estado
      setApiResponse(response.data.mensaje);

      login(response.data.usuario);

      setStoredUser(response.data.usuario);

      // Ocultar el mensaje de inicio de sesión
      setShowSignInMessage(false);

      if (response.data.mensaje.includes("exitoso")) {
        handleLogin();
        

        // Redirigir a la página de preguntas después de que el usuario haya sido validado
        navigate("/questions");
      } else {
        console.error("Autenticación fallida");
      }

      // Desaparecer el mensaje apiResponse después de 3 segundos
      setTimeout(() => {
        setApiResponse(null);
        // Mostrar el enlace de registro después de que el mensaje desaparezca
        setShowSignUpLink(true);
      }, 4000);

      // Mostrar el mensaje de registro nuevamente
      setShowSignUpMessage(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.mensaje
      ) {
        // Captura el mensaje de error de la respuesta de la API
        setApiResponse(error.response.data.mensaje);
      } else {
        // Si no hay un mensaje de error específico, muestra un mensaje genérico
        setApiResponse("Error en la solicitud");
        // Desaparecer el mensaje de apiResponse después de 3 segundos
        setTimeout(() => {
          setApiResponse(null);
        }, 4000);
      }
    }
  };

  useEffect(() => {
    // Ocultar el enlace de registro al montar el componente
    setShowSignUpLink(false);
  }, []);


  return (
    <div className="montserrat w-[391px] h-[515px] bg-[rgba(0,32,74,0.8)] rounded-lg  flex flex-col justify-center items-center" >
      <img
        className="mb-14 gap-[56px]"
        src="/Logovertical.png"
        alt="logo"
        style={{ width: "180px", height: "150px" }}
      />

      <form className="montserrat flex flex-col py-0 text-center" onSubmit={handleSubmit}>
        <h1 className="mb-4 ml-0 font-bold text-left text-white montserrat">
          <span className="font-bold montserrat">Sign In</span>
        </h1>
        <input
          className="montserrat w-[300px] p-0.5 mb-4 text-white bg-[#00204A] border rounded"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ paddingLeft: "0.5rem" }}
          autoComplete="username"
        />

        <input
          className="montserrat w-[300px] p-0.5 mb-12 text-white bg-[#00204A] border rounded"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{ paddingLeft: "0.5rem" }}
          autoComplete="current-password"
        />

        {/* Espacio reservado para el mensaje de error */}
        <div className="h-5 mb-4">
          {errorMessage && (
            <p className="montserrat mb-3 text-xs text-center text-red-500">{errorMessage}</p>
          )}
          {/* Renderizar el mensaje de la API si existe */}
          {apiResponse && (
            <p className="text-center text-xs text-red-500">{apiResponse}</p>
          )}
        </div>

        <div className="mb-3 text-center">
          <input
            type="submit"
            value="SIGN IN"
            className="montserrat bg-[#D3D4D8] transition-colors hover:bg-[#4A3B85] text-[#00204A] font-bold px-[7.5rem] rounded-xl focus:outline-none focus:shadow-outline cursor-pointer hover:text-white"
          />
        </div>
      </form>

      <h2 className="flex items-center justify-center mt-0 mb-0 text-white">
        <NavLink to="/register" className="mt-0 text-sm montserrat">
          Don&apos;t have an account? <span className="font-bold">Sign Up</span>
        </NavLink>
      </h2>
    </div>
  );
}
