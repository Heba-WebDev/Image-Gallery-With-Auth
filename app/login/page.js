"use client";
import { useState, useEffect } from "react";
import { validateEmail } from "../../utils/Validation";
import signIn from "@/firebase/auth/signin";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { user: authedUser } = useAuthContext();

  useEffect(() => {
    if (authedUser) {
      router.push("/");
    }
  }, [authedUser, router]);
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
    if (validateEmail(user.email) && user.password) {
      try {
        const { result, error } = await signIn(user.email, user.password);
        if (result) {
          router.push("/");
        } else {
          console.log(error);
        }
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
  };
  return (
    <section className="flex flex-col justify-center items-center gap-2 h-[100vh]">
      <h2 className={`text-blue-600 font-bold text-3xl text-center`}>
        Login here
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
          Login
        </button>
      </form>
      <span>Demo account: user@example.com 1Password</span>
    </section>
  );
}
