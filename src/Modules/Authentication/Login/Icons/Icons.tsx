import sigup from "../../../../assets/Images/Vector (3).png";
import sigin from "../../../../assets/Images/Vector (5).png";
const Icons = () => {
  return (
    <>
      <div className="flex items-center flex-wrap mb-5" style={{ gap: "2rem" }}>
        <div
          className="flex justify-center items-center"
          style={{
            background: "#333333",
            width: "10rem",
            height: "8rem",
            borderRadius: "1rem",
          }}
        >
          <div className="text-center">
            <img src={sigin} alt="" />
            <p className="text-white py-2 font-bold">Sign in</p>
          </div>
        </div>
        <div
          className="flex justify-center items-center"
          style={{
            background: "#333333",
            width: "10rem",
            height: "8rem",
            borderRadius: "1rem",
          }}
        >
          <div className="text-center">
            <img src={sigup} alt="" />
            <p className="text-white py-2 font-bold">Sign up</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Icons;
