"use client";

import Link from "@/node_modules/next/link";
import { useState } from "react";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
      } else {
        console.log("User registration failed");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div
        className="shadow-lg p-5 rounded-lg border-t-4
            border-green-600"
      >
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            className="register"
            type="text"
            placeholder="First name"
          />

          <input
            onChange={(e) => setLastName(e.target.value)}
            className="register"
            type="text"
            placeholder="Last name"
          />

          <input
            onChange={(e) => setUsername(e.target.value)}
            className="register"
            type="text"
            placeholder="Username"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="register"
            type="password"
            placeholder="Password"
          />

          <button
            className="bg-green-600 text-white font-bold
                        cursor-pointer px-6 py-2"
          >
            Register
          </button>

          {error && (
            <div
              className="bg-red-500 text-white w-fit
                        text-sm py-1 px-3 rounded-md mt-2"
            >
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-center" href={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
