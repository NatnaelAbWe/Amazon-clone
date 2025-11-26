const SignUp = () => {
  return (
    <section className="m-12 flex flex-col items-center border border-gray-300 rounded-xl w-[350px] mx-auto shadow-lg">
      <div
        className="w-full bg-[#131921]
 rounded-t-xl"
      >
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon logo"
          className="w-28 pt-2 mx-auto"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6">Sign up</h1>
      <form action="" className="flex flex-col w-full px-6 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="bg-gray-200 rounded-3xl px-4 py-3 w-full outline-orange-400 shadow-md"
        />
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          className="bg-gray-200 rounded-3xl px-4 py-3 w-full outline-orange-400 shadow-md"
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="bg-gray-200 rounded-3xl px-4 py-3 w-full outline-orange-400 shadow-md"
        />
        <input
          type="password"
          name="confirm password"
          placeholder="confirmPassword"
          className="bg-gray-200 rounded-3xl px-4 py-3 w-full outline-orange-400 shadow-md"
        />
        <button className="bg-blue-600 text-white rounded-3xl py-3 mt-2 mb-7 hover:bg-orange-400 transition duration-100">
          Create Account
        </button>
      </form>
    </section>
  );
};

export default SignUp;
