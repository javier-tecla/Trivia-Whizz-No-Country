import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Register() {
  
  const [formData, setFormData] = useState({
    idMail: "",
    clave: "",
    validaClave: "", 
    nick: "",
    avatar: "",
  });

  const [apiMessage, setApiMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvatarSelect = (selectedAvatar) => {
    const avatarWithExtension = `${selectedAvatar}.png`;

    
    setFormData((prevState) => ({
      ...prevState,
      avatar: avatarWithExtension,
      selectedAvatar: selectedAvatar,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { idMail, clave, validaClave, nick, avatar } = formData;
      

      // Validar que todos los campos estén completos
      if (!idMail || !clave || !validaClave || !nick || !avatar) {
        setErrorMessage("Por favor completa todos los campos");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }

      // Realizar la solicitud POST a la API para registrar el usuario
      const response = await axios.post(
        "https://c1772mpython.pythonanywhere.com/login/sign-in/",
        {
          idMail,
          clave,
          validaClave,
          nick,
          avatar,
        }
      );

      // console.log(response);

      // Manejar la respuesta de la API
      if (response.status === 201) {
        // Limpiar el estado errorMessage cuando se muestre el mensaje de apiMessage
        setErrorMessage("");
        // Mostrar el mensaje proporcionado por la API en caso de éxito (CREATED)
        // console.log(response.data.message);
        setApiMessage(response.data.message);
      } else if (response.status === 422 || response.status === 409) {
        // Mostrar el mensaje proporcionado por la API en caso de error (UNPROCESSABLE ENTITY o CONFLICT)
        setErrorMessage(response.data.messaje);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error("Error al enviar la solicitud:", error);
        setErrorMessage("Error sending request");
      }
    }
  };

  return (
    <div className="montserrat flex flex-col items-center justify-center h-screen">
  
      <div className="w-[391px] h-[680px] bg-[rgba(0,32,74,0.8)] rounded-lg  flex flex-col justify-center items-center" style={{ marginTop: "-20px" }}>
        <img
          className="mb-4 gap-[56px]"
          src="/Logovertical.png"
          alt="logo"
          style={{ width: "180px", height: "150px" }}
        />
        <h1 className="mb-4 text-white ">
          <span className="block text-center">Welcome!</span> To continue,
          Create your account
        </h1>

        <form className="montserrat text-center" onSubmit={handleSubmit}>
          <input
            className="montserrat w-[300px] p-0.5 mb-4 text-white bg-[#00204A] border rounded"
            type="email"
            id="idMail"
            name="idMail"
            placeholder="Your E-mail"
            value={formData.idMail}
            onChange={handleChange}
            style={{ paddingLeft: "0.5rem" }}
            autoComplete="username"
          />

          <input
            className="montserrat w-[300px] p-0.5 mb-4 text-white bg-[#00204A] border rounded"
            type="password"
            id="clave"
            name="clave"
            placeholder="Clave"
            value={formData.clave}
            onChange={handleChange}
            style={{ paddingLeft: "0.5rem" }}
            autoComplete="new-password"
          />

          <input
            className="montserrat w-[300px] p-0.5 mb-4 text-white bg-[#00204A] border rounded"
            type="password"
            id="validaClave"
            name="validaClave"
            placeholder="Repeat Password"
            value={formData.validaClave}
            onChange={handleChange}
            style={{ paddingLeft: "0.5rem" }}
            autoComplete="new-password"
          />

          <input
            className="montserrat w-[300px] p-0.5 mb-10 text-white bg-[#00204A] border rounded"
            type="text"
            id="nick"
            name="nick"
            placeholder="Nickname"
            value={formData.nick}
            onChange={handleChange}
            style={{ paddingLeft: "0.5rem" }}
          />

          <p className="mb-2 text-white irish-grover-regular">
            Pick an avatar...
          </p>

          <div className="flex items-center justify-center mb-4">
            <img
              src="/avatars/Avatar1.png"
              alt="Avatar 1"
              className={`avatar-option ${
                formData.selectedAvatar === "avatar1" ? "selected shadow-custom" : ""
              }`}
              onClick={() => handleAvatarSelect("avatar1")}
              style={{
                width: formData.selectedAvatar === "avatar1" ? "55px" : "45px",
                height: formData.selectedAvatar === "avatar1" ? "55px" : "50px",
                marginRight: "25px",
              }}
            />
            <img
              src="/avatars/Avatar2.png"
              alt="Avatar 2"
              className={`avatar-option ${
                formData.selectedAvatar === "avatar2" ? "selected shadow-custom" : ""
              }`}
              onClick={() => handleAvatarSelect("avatar2")}
              style={{
                width: formData.selectedAvatar === "avatar2" ? "55px" : "45px",
                height: formData.selectedAvatar === "avatar2" ? "55px" : "50px",
                marginRight: "25px",
              }}
            />
            <img
              src="/avatars/Avatar3.png"
              alt="Avatar 3"
              className={`avatar-option ${
                formData.selectedAvatar === "avatar3" ? "selected shadow-custom" : ""
              }`}
              onClick={() => handleAvatarSelect("avatar3")}
              style={{
                width: formData.selectedAvatar === "avatar3" ? "55px" : "45px",
                height: formData.selectedAvatar === "avatar3" ? "55px" : "50px",
                marginRight: "25px",
              }}
            />
          </div>

          {/* Espacio reservado para el mensaje de error */}
          <div className="h-5 mb-4 text-xs">
            {errorMessage && (
              <p className="mb-3 text-center text-red-500">{errorMessage}</p>
            )}
            {apiMessage && (
              <p className="mb-3 text-center text-green-500">{apiMessage}</p>
            )}
          </div>

          <div className="mb-2 text-center">
            <input
              type="submit"
              value="CREATE ACCOUNT"
              className="montserrat bg-[#D3D4D8] hover:bg-[#4A3B85] text-[#00204A] font-bold px-[5rem] rounded-xl focus:outline-none focus:shadow-outline cursor-pointer hover:text-white"
            />
          </div>
        </form>

        <h2 className="montserrat flex items-center justify-center mt-0 mb-0 text-white">
          <NavLink to="/login" className="mt-0 text-sm montserrat">
            Have an account? <span className="font-bold">Sign In</span>
          </NavLink>
        </h2>

        <p className="text-center text-white"></p>
      </div>
    </div>
  );
}


