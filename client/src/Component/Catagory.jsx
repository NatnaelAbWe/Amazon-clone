import { categoryInfo } from "./catagoryFullInfos";
import CategoryCard from "./CatagoryCard";

export default function Category() {
  return (
    <section
      className="
        grid 
        [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]
        max-w-[1600px]
        gap-[40px]
        relative
        -mt-[5%]
        place-items-center
        mx-auto
      "
    >
      {categoryInfo.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </section>
  );
}
