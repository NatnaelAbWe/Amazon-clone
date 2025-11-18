import { FadeLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <FadeLoader color="#ff9900" />
    </div>
  );
}

export default Loader;
