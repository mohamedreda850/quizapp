import { useLocation } from "react-router-dom";
import sigup from "../../../../assets/Images/Vector (3).png";
import sigin from "../../../../assets/Images/Vector (5).png";

const Icons = () => {
  const location = useLocation();

  const isActiveSignIn = (path: string) =>
    location.pathname === path ||
    (path === "/" && location.pathname === "/login");

  const isActiveSignUp = (path: string) => location.pathname === path;

  return (
    <div className="flex items-center flex-wrap mb-5" style={{ gap: "2rem" }}>
      {/* Sign in */}
      <div
        className={`flex justify-center items-center ${
          isActiveSignIn("/") ? "border-4 border-green-500" : ""
        }`}
        style={{
          background: "#333333",
          width: "10rem",
          height: "8rem",
          borderRadius: "1rem",
        }}
      >
        <div className="text-center">
          <img
            src={sigin}
            alt="Sign in"
            style={{
              filter: isActiveSignIn("/")
                ? "invert(43%) sepia(61%) saturate(746%) hue-rotate(96deg)"
                : "none",
            }}
          />
          <p className="text-white py-2 font-bold">Sign in</p>
        </div>
      </div>

      {/* Sign up */}
      <div
        className={`flex justify-center items-center ${
          isActiveSignUp("/register") ? "border-4 border-green-500" : ""
        }`}
        style={{
          background: "#333333",
          width: "10rem",
          height: "8rem",
          borderRadius: "1rem",
        }}
      >
        <div className="text-center">
          <img
            src={sigup}
            alt="Sign up"
            style={{
              filter: isActiveSignIn("/register")
                ? "invert(43%) sepia(61%) saturate(746%) hue-rotate(96deg)"
                : "none",
            }}
          />
          <p className="text-white py-2 font-bold">Sign up</p>
        </div>
      </div>
    </div>
  );
};

export default Icons;
