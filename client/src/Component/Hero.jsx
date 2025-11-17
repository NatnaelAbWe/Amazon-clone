import { useState } from "react";
import { img } from "../assets/img/data";

export default function Hero() {
  const [bgImage, setBgImage] = useState(0);
  const HandleBgChange = () => {
    setBgImage((prev) => (prev + 1) % img.length);
  };

  return (
    <section
      className="relative max-w-full h-[70vh] bg-cover bg-center transition-all duration-700 ease-in-out"
      style={{ backgroundImage: `url(${img[bgImage]})` }}
    >
      <div className="flex items-center justify-between px-12 absolute inset-0 bg-gradient-to-t from-green-500/80 via-red-500/30 to-transparent">
        <i
          className="fi fi-rr-angle-small-left text-6xl hover:border-2 hover:rounded-full hover:bg-white left-0 mt-[25vh] hover:animate-bounce"
          onClick={HandleBgChange}
        ></i>{" "}
        <i
          className="fi fi-rr-angle-small-right text-6xl hover:border-2 hover:rounded-full hover:bg-white right-0 mt-[25vh] hover:animate-bounce"
          onClick={HandleBgChange}
        ></i>
      </div>
    </section>
  );
}
