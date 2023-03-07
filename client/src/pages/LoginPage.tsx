import React from "react";

const LoginPage = () => {
  return (
    <div className=" -m-5 w-screen flex p-5 grow flex-col items-center justify-center h-full bg-gray-200 opacity-30">
      <form
        className=" flex flex-col gap-3 max-w-md w-full bg-white rounded-2xl py-10 px-5"
        action=""
      >
        <p>Welcome to Airbnb</p>
        <input type="text" className="input-primary" />
        <input type="text" className="input-primary" />
        <button className=" btn-primary">Continue</button>
      </form>
    </div>
  );
};

export default LoginPage;
