import QuizzesIcons from "./QuizzesIcons/QuizzesIcons";
import QuizzesInComing from "./QuizzesInComing/QuizzesInComing";




function QuizzesLists() {
  return (
    <>
      <div className="my-3 mx-3 my-3 mx-3 flex gap-20  justify-items-center">
        <QuizzesIcons />
        <QuizzesInComing />
      </div>
    </>
  );
}

export default QuizzesLists;
