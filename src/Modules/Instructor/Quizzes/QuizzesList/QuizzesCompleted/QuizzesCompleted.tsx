import axios from "axios";
import { useEffect, useState } from "react";

interface Quiz {
  id: string;
  title: string;
  duration: number;
  schadule: string;
}

function QuizzesCompleted() {
  const [lists, setLists] = useState<Quiz[]>([]);
  const token = localStorage.getItem("quizToken");

  const handelLists = async () => {
    try {
      const res = axios.get<Quiz[]>(
        "https://upskilling-egypt.com:3005/api/quiz/completed",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log((await res).data);
      setLists((await res).data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handelLists();
  }, []);
  return (
    <>
      <div
        className="my-10 px-5 py-5"
        style={{ border: "1px solid black", borderRadius: "5px" }}
      >
        <div className="flex justify-between mb-5 w-full ">
          <h2 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
            Completed Quizzes
          </h2>
          <div className="flex gap-2" style={{ alignItems: "center" }}>
            <p className="pb-1">Results</p>
            <span>
              <svg
                width="19"
                height="9"
                viewBox="0 0 19 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8306 2.86521H0.490432C0.219591 2.86521 0 3.0848 0 3.35564V5.64432C0 5.91516 0.219591 6.13475 0.490432 6.13475H12.8306V8.01716C12.8306 8.89102 13.8871 9.32865 14.505 8.71075L18.0222 5.19357C18.4053 4.81051 18.4053 4.18945 18.0222 3.80643L14.505 0.28925C13.8871 -0.328654 12.8306 0.108976 12.8306 0.982844V2.86521Z"
                  fill="#C5D86D"
                />
              </svg>
            </span>
          </div>
        </div>
        {lists.slice(0, 3).map((list) => (
          <table className="table-auto border border-gray-400 w-full ">
            <thead>
              <tr className="bg-gray-800 text-white py-4">
                <th className="border border-gray-400 px-4 py-2">Title</th>

                <th className="border border-gray-400 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="py-4 text-center">
                <td className="border border-gray-400 px-4 py-2 shadow-lg">
                  {list.title}
                </td>

                <td className="border border-gray-400 px-4 py-2 shadow-lg">
                  {list.schadule}
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </>
  );
}

export default QuizzesCompleted;
