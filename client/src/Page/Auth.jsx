import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../Component/DataProvider";
import { Type } from "../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  const authHandler = (e) => {
    e.preventDefault();

    if (e.target.name === "signIn") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: Type.SET_USER, user: userInfo.user });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: Type.SET_USER, user: userInfo.user });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className="flex flex-col items-center mt-10">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/1280px-Amazon_2024.svg.png"
          alt="amazon logo"
          className="w-32 mb-6"
        />
      </Link>

      <div className="w-96 p-6 border rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

        {navStateData?.state?.msg && (
          <small className="text-green-600 text-sm">
            {navStateData?.state?.msg}
          </small>
        )}

        <form className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="border p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="border p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          <button
            type="submit"
            onClick={authHandler}
            name="signIn"
            className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded mt-2 flex justify-center"
          >
            {loading.signIn ? <ClipLoader size={15} /> : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-4">
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, Cookies Notice, and our
          Interest-based Ads Notice.
        </p>

        <button
          type="submit"
          onClick={authHandler}
          name="signUp"
          className="bg-gray-200 hover:bg-gray-300 text-black py-2 rounded w-full mt-4 flex justify-center"
        >
          {loading.signUp ? (
            <ClipLoader size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {error && (
          <small className="text-red-600 text-sm mt-2 block">{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
