import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookSquare } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = values;
  const navigation = useNavigate();

  const { setUser } = useContext(UserContext) as any;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios
      .post("/auth/login", { email, password })
      .then(({ data }) => {
        console.log(data);
        setUser(data.user);
        navigation("/");
      })
      .catch(({ response }) => {
        console.log(response.data.message);
      });
  };
  return (
    <div className="relative -m-5 w-screen flex grow flex-col items-center justify-center h-full bg-gray-200 p-5">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="max-w-xl w-full bg-white rounded-2xl"
        action=""
      >
        <p className=" font-bold text-center border-b border-gray-300 py-4">
          Log in
        </p>
        <div className="p-5 flex flex-col gap-4">
          <p className=" text-xl py-2">Welcome to Airbnb</p>
          <input
            type="email"
            value={email}
            onChange={(event) =>
              setValues({ ...values, email: event.target.value })
            }
            placeholder="Email"
            className="input-primary"
          />
          <input
            type="password"
            value={password}
            onChange={(event) =>
              setValues({ ...values, password: event.target.value })
            }
            placeholder="Password"
            className="input-primary"
          />
          <button type="submit" className=" btn-primary">
            Continue
          </button>
          <p className=" text-sm text-gray-400">
            Do not have an account?{" "}
            <Link to={"/register"} className=" underline text-gray-700">
              Register
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

export default LoginPage;
