"use client";
import { useState } from "react";
import signUp from "../../firebase/auth/signup";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/Validation";
import addData from "@/firebase/firestore/addData";
import { v4 as uuidv4 } from "uuid";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const handleChange = (event) => {
    setUser((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(user.email)) {
      setError((prevState) => {
        return {
          ...prevState,
          email: true,
        };
      });
    } else {
      setError((prevState) => {
        return {
          ...prevState,
          email: false,
        };
      });
    }
    if (user.password === "") {
      setError((prevState) => {
        return {
          ...prevState,
          password: true,
        };
      });
    } else {
      setError((prevState) => {
        return {
          ...prevState,
          password: false,
        };
      });
    }

    try {
      const userRef = await addData("users", uuidv4(), {
        email: user.email,
        password: user.password,
      });

      if (userRef) {
        signUp(user.email, user.password);
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="flex flex-col justify-center items-center gap-2 h-[100vh]">
      <h2 className={`text-blue-600 font-bold text-3xl text-center`}>
        Sign up
      </h2>
      <h3 className="text-xl font-semibold text-center">
        Welcome back you’ve been missed!
      </h3>
      <form
        className="grid gap-6 py-6 w-[75%] md:w-[40%]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-red-600">
            {error.email ? "Please enter a valid email" : ""}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={user.email}
            className={`bg-blue-50 ${
              error.email ? "border-red-500" : "border-blue-700"
            } border-2 py-2 px-2 rounded-lg placeholder:text-black placeholder:opacity-80`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Password" className="mb-1 text-red-600">
            {error.password ? "Please enter a valid password" : ""}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={user.password}
            className={`bg-blue-50 ${
              error.password ? "border-red-500" : "border-blue-700"
            } border-2 py-2 px-2 rounded-lg placeholder:text-black placeholder:opacity-80`}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg text-lg"
        >
          Sign up
        </button>
      </form>
    </section>
  );
}
