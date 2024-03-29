import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { lastName, firstName, email, password } = values;
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios
      .post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then(({ data }) => {
        console.log(data);
        navigate("/login");
      })
      .catch(({ response }) => {
        console.log(response.data.message);
      });
  };

  return (
    <div className="relative -m-5 w-screen flex grow flex-col items-center justify-center h-full bg-gray-200 p-5">
      <form
        className="max-w-xl w-full bg-white rounded-2xl"
        onSubmit={(event) => handleSubmit(event)}
      >
        <p className=" font-bold text-center border-b border-gray-300 py-4">
          Sign up
        </p>
        <div className="p-5 flex flex-col gap-4">
          <p className=" text-xl py-2">Welcome to Airbnb</p>
          <div className="flex gap-4 items-center justify-between">
            <input
              type="text"
              value={firstName}
              onChange={(event) =>
                setValues({ ...values, firstName: event.target.value })
              }
              placeholder="First Name"
              className="input-primary"
            />
            <input
              type="text"
              value={lastName}
              onChange={(event) =>
                setValues({ ...values, lastName: event.target.value })
              }
              placeholder="Last Name"
              className="input-primary"
            />
          </div>
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
