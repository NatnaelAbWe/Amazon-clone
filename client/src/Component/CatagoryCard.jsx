import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  return (
    <div
      className="
        h-[330px]
        w-[300px]
        bg-white
        shadow-md
        m-[10px]
      "
    >
      <Link
        to={`/results?category=${encodeURIComponent(data?.name)}`}
        className="no-underline text-[#232323]"
      >
        <span>
          <h2 className="p-[5px] ml-[15px]">{data?.title}</h2>
        </span>

        <img
          src={data?.imgLink}
          alt={data?.title}
          className="
            w-full
            object-contain
            max-h-[250px]
            px-[10px]
          "
        />

        <p
          className="
            p-[5px]
            ml-[15px]
            text-[13px]
            font-bold
            text-[#007185]
            cursor-pointer
            hover:text-[#c7511f]
          "
        >
          Shop now
        </p>
      </Link>
    </div>
  );
}

export default CategoryCard;
