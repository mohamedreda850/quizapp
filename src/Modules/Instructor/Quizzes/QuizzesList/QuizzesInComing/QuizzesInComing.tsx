import axios from "axios";
import { useEffect, useState } from "react";
import img2 from "../../../../../assets/Images/quizzIn2.png";
import QuizzesCompleted from "../QuizzesCompleted/QuizzesCompleted";
import { Link } from "react-router-dom";
import { axiosInstance, QUIZ_URLS } from "../../../../../Services/URLS/INSTRUCTOR_URLS/INSTRUCTORURLS";

interface Quiz {
  id: string;
  title: string;
  createdAt: string;
  duration: number;
  status: string;
}
function QuizzesInComing() {
  const [lists, setLists] = useState<Quiz[]>([]);
  const token = localStorage.getItem("quizToken");

  const handelLists = async () => {
    try {
      const res =await axiosInstance.get<Quiz[]>(QUIZ_URLS.QUIZ_INCOMMING)
      console.log(res.data);
      setLists(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handelLists();
  }, []);

  return (
    <>
      <div>
        <div
          style={{ border: "1px solid black", borderRadius: "5px" }}
          className="py-5 px-5"
        >
          <h2
            className="mb-3"
            style={{ fontSize: "1.25rem", fontWeight: "700" }}
          >
            Upcoming quizzes
          </h2>
          {lists.slice(0, 2).map((list) => (
            <div
              className="flex gap-3 py-5 px-5 my-2"
              style={{
                alignItems: "center",
                border: "1px solid black",
                borderRadius: "5px",
              }}
              key={list.id}
            >
              <div
                style={{
                  background: "#FFEDDF",
                  height: "7.5rem",
                  width: "7.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                }}
              >
                <img src={img2} alt="" />
              </div>

              <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                  {list.title}
                </h2>
                <p className="py-1">{list.createdAt}</p>
                <div className="flex gap-40">
                  <p>No. of student’s enrolled: {list.duration}</p>
                  <div className="flex gap-1" style={{ alignItems: "center" }}>
                    <span style={{ fontWeight: "700" }}>
                      <Link to={`/instructor/quizesDetails/${list._id}`}>{list.status}</Link>{" "}
                    </span>
                    <span className="pt-1">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 0.5C12.4194 0.5 16 4.08065 16 8.5C16 12.9194 12.4194 16.5 8 16.5C3.58065 16.5 0 12.9194 0 8.5C0 4.08065 3.58065 0.5 8 0.5ZM7.06774 5.13226L9.50323 7.46774H3.6129C3.18387 7.46774 2.83871 7.8129 2.83871 8.24194V8.75806C2.83871 9.1871 3.18387 9.53226 3.6129 9.53226H9.50323L7.06774 11.8677C6.75484 12.1677 6.74839 12.6677 7.05484 12.9742L7.40968 13.3258C7.7129 13.629 8.20323 13.629 8.50323 13.3258L12.7839 9.04839C13.0871 8.74516 13.0871 8.25484 12.7839 7.95484L8.50323 3.67097C8.2 3.36774 7.70968 3.36774 7.40968 3.67097L7.05484 4.02258C6.74839 4.33226 6.75484 4.83226 7.06774 5.13226Z"
                          fill="#C5D86D"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <QuizzesCompleted />
      </div>
    </>
  );
}

export default QuizzesInComing;
