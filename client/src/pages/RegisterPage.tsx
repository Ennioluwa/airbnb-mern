import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="relative -m-5 w-screen flex grow flex-col items-center justify-center h-full bg-gray-200 p-5">
      <form className="max-w-xl w-full bg-white rounded-2xl" action="">
        <p className=" font-bold text-center border-b border-gray-300 py-4">
          Sign up
        </p>
        <div className="p-5 flex flex-col gap-4">
          <p className=" text-xl py-2">Welcome to Airbnb</p>
          <input type="text" placeholder="Name" className="input-primary" />
          <input type="text" placeholder="Email" className="input-primary" />
          <input type="text" placeholder="Password" className="input-primary" />
          <button className=" btn-primary">Continue</button>
          <p className=" text-sm text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className=" underline text-gray-700">
              Log in
            </Link>
          </p>
          <div className=" flex items-center gap-3">
            <hr className=" grow text-gray-300" />
            <span>or</span>
            <hr className=" grow text-gray-300" />
          </div>
          <button className=" btn flex items-center justify-">
            <FcGoogle />
            <span className=" mx-auto">Continue with Google</span>
          </button>
          <button className=" btn flex items-center justify-">
            <FaApple />
            <span className=" mx-auto">Continue with Apple</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
