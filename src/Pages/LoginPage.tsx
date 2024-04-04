import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Fonts/font.css";
import LoginBackground from "../assets/images/LoginBackground.jpg";
import { useAuth } from "../context/AuthProvider";
import { LoadingPage } from "./LoadingPage";

const InputField: React.FC<{
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  name?: string;
}> = ({ label, type, placeholder, value, onChange, name }) => {
  return (
    <div className="flex flex-col gap-2 w-full px-4">
      <label className="text-xs font-semibold">{label}</label>
      <input
        type={type}
        className="rounded-lg p-2 outline-none text-[#7FB3D5] text-xs shadow-lg  shadow-[#7FB3D5] placeholder:text-xs w-full placeholder:text-[#7FB3D5] placeholder:px-1 "
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const delay = new Promise((resolve) => setTimeout(resolve, 2000)); // Create a 3 second delay
    const loginPromise = login(email, password); // Start the login process

    const [success] = await Promise.all([loginPromise, delay]);

    setIsLoading(false);
    if (success) {
      navigate("/chat");
    } else {
      alert("login failed");
    }
  };

  if (isLoading) {
    return (
      <AnimatePresence>
        <LoadingPage />
      </AnimatePresence>
    );
  } //Affiche la page de chargement si isLoading est true
  return (
    <div
      style={{
        backgroundImage: `url(${LoginBackground}) `,
      }}
      className="h-screen bg-cover bg-center flex justify-center items-center text-white"
    >
      <div className=" bg-[#233046] shadow-sky-800 bg-opacity-100 w-80 rounded-2xl shadow-xl p-2 flex flex-col gap-4 border-2 border-white justify-center items-center">
        <h2
          style={{ fontFamily: "Preahvihear" }}
          className="text-center text-2xl  font-semibold text-text"
        >
          Login
        </h2>
        <InputField
          label="Enter your email address"
          type="text"
          placeholder="name@gmail.com"
          value={email}
          onChange={setEmail}
          name="email"
        />
        <InputField
          label="Enter your password"
          type="password"
          placeholder="********"
          value={password}
          onChange={setPassword}
          name="password"
        />
        <div className="text-right text-xs underline cursor-pointer">
          Forgot your password?
        </div>
        <button
          className="bg-card-primary hover:bg-blue-500 text-white font-bold py-2 px-10 rounded w-52 mb-3 "
          onClick={handleLogin}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
