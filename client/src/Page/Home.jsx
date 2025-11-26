import Header from "../Component/Header";
import Hero from "../Component/Hero";
import Category from "../Component/Catagory";
import Product from "../Component/Product";
import LayOut from "../Component/LayOut";
import SignUp from "./Auth";

const Home = () => {
  return (
    <>
      <LayOut>
        <SignUp />
        <Hero />
        <Category />
        <Product />
      </LayOut>
    </>
  );
};

export default Home;
