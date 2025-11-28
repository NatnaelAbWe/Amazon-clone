import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContext } from "./DataProvider";
import { auth } from "../Utility/firebase";
import axios from "axios";
import { productUrl } from "../Api/endPoint";

export default function Header() {
  const [{ basket, user }] = useContext(DataContext);
  console.log(basket);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${productUrl}/products/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      axios
        .get(`${productUrl}/products`)
        .then((res) => {
          const filtered = res.data.filter((p) =>
            p.title.toLowerCase().includes(value.toLowerCase())
          );
          setSuggestions(filtered);
        })
        .catch((err) => console.error("Error fetching products:", err));
    } else setSuggestions([]);
  };

  const handleSuggestionClick = (id) => {
    navigate(`/products/${id}`);
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleSearch = () => {
    const category = selectedCategory || "all";
    navigate(
      `/results?category=${encodeURIComponent(
        category
      )}&search=${encodeURIComponent(searchTerm)}`
    );
  };

  return (
    <section className="w-full bg-[#0f1111] text-white">
      <header className="w-full">
        <section className="flex items-center justify-between px-4 py-3 gap-4">
          {/* Logo + Location */}
          <div className="flex items-center gap-4">
            <Link to="/" className="block">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
                className="w-28 pt-2 object-contain"
              />
            </Link>

            <div className="flex items-center gap-1 cursor-pointer">
              <SlLocationPin size={19} />
              <div className="leading-tight">
                <p className="text-xs text-gray-300">Deliver to</p>
                <span className="text-sm font-semibold">Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex flex-1 max-w-2xl items-center bg-white rounded-md overflow-hidden">
            <select
              className="px-2 py-2 bg-gray-100 text-sm border-r outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>

              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>

            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search Amazon"
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="w-full px-3 py-2 text-black outline-none"
              />

              {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 top-full bg-white text-black shadow-lg z-20 max-h-60 overflow-y-auto border border-gray-200">
                  {suggestions.map((product) => (
                    <li
                      key={product.id}
                      onClick={() => handleSuggestionClick(product.id)}
                      className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                    >
                      {product.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={handleSearch}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 flex items-center justify-center"
            >
              <BsSearch size={24} className="text-black" />
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6 text-sm">
            {/* Language */}
            <a className="flex items-center gap-1 cursor-pointer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg"
                alt="flag"
                className="w-6 h-4"
              />
              <select className="bg-transparent outline-none text-white cursor-pointer">
                <option>EN</option>
              </select>
            </a>

            {/* Account */}
            <Link to={!user && "/auth"} className="leading-tight">
              {user ? (
                <>
                  <p className="text-xs">Hello, {user?.email?.split("@")[0]}</p>
                  <span
                    className="font-semibold cursor-pointer"
                    onClick={() => auth.signOut()}
                  >
                    Sign out
                  </span>
                </>
              ) : (
                <>
                  <p className="text-xs">Hello, Sign In</p>
                  <span className="font-semibold">Account & Lists</span>
                </>
              )}
            </Link>

            {/* Orders */}
            <Link to="/orders" className="leading-tight">
              <p className="text-xs">Returns</p>
              <span className="font-semibold">& Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center">
              <BiCart size={35} />
              <span className="absolute -top-1 -right-2 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-xs font-bold">
                {basket.length}
              </span>
            </Link>
          </div>
        </section>
      </header>

      <LowerHeader className="hidden md:block" />
    </section>
  );
}
