"use client";

import Link from "@/node_modules/next/link";
import { useState } from "react";

export default function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (         
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4
            border-green-600">
                <h1 className="text-xl font-bold my-4">Register</h1>

                <form className="flex flex-col gap-3">
                    <input 
                        onChange={e => setFirstName(e.target.value)} 
                        className="register" 
                        type="text" 
                        placeholder="First name" 
                    />

                    <input 
                        onChange={e => setLastName(e.target.value)} 
                        className="register" 
                        type="text" 
                        placeholder="Last name" 
                    />

                    <input 
                        onChange={e => setUserName(e.target.value)}
                        className="register" 
                        type="text" 
                        placeholder="Username"
                    />
                        
                    <input 
                        onChange={e => setPassword(e.target.value)}
                        className="register" 
                        type="password" 
                        placeholder="Password" 
                    />

                    <button className="bg-green-600 text-white font-bold
                        cursor-pointer px-6 py-2">Register
                    </button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit
                        text-sm py-1 px-3 rounded-md mt-2">{error}</div>
                    )}

                    <Link className="text-sm mt-3 text-center" 
                    href={'/login'}>
                        Already have an account? <span 
                        className="underline">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}