import { Link, useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const { apiResponse } = location.state || {};
  // console.log("API Response in Questions:", apiResponse);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="sm:w-[500px] sm:h-[520px] w-[350px] h-[550px] bg-[rgba(0,32,74,0.8)] rounded-lg  flex flex-col justify-center items-center" style={{ marginTop: "-155px" }}>
        <img
          className="mb-16 gap-[56px]"
          src={apiResponse.imagen}
          alt="logo"
          style={{
            width: "95px",
            filter: "drop-shadow(0 0 5px rgb(242, 240, 246, 0.9))",
          }}
        />
        <div className="block mb-1 text-center text-white">
          <h1 className="mb-14 text-4xl irish-grover-regular">
            {apiResponse.puntaje_actual_final &&
              ` ${apiResponse.puntaje_actual_final}`}
            
          </h1>
          <h1 className="mb-14 text-xl montserrat">
            {apiResponse.Leyenda}
          </h1>
          {/* <p className="montserrat mb-8">
            But it is not enough to reach the Wizard&apos;s Castle...
          </p> */}
        </div>

        <Link to="/ranking">
          <button className="montserrat hover:bg-[#4A3B85] text-xs text-white border border-white  px-[6.5rem] p-1 mb-20 rounded-xl focus:outline-none focus:shadow-outline cursor-pointer hover:text-white">
            CONTINUE
          </button>
        </Link>

        <div className="mb-6 text-center"></div>

        <h2 className="flex items-center justify-center mt-0 mb-0 text-white"></h2>
      </div>
    </div>
  );
}
