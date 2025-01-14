import { Link } from "react-router-dom";
import img1 from "../../../../../assets/Images/new quiz icon.png";
import img2 from "../../../../../assets/Images/Vault icon.png";
function QuizzesIcons() {
  return (
    <>
      <div className="flex gap-8">
        <div
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            width: "13rem",
            height: "8rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img className="mt-5" src={img1} alt="" />
          <p
            className="my-3"
            style={{ fontWeight: "700", fontSize: "1.25rem" }}
          >
            Set up a new quiz
          </p>
        </div>
        <Link to="/instructor/quistion-bank">
          <div
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              width: "13rem",
              height: "8rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img className="mt-5" src={img2} alt="" />
            <p
              className="my-2"
              style={{ fontWeight: "700", fontSize: "1.25rem" }}
            >
              Question Bank
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default QuizzesIcons;
