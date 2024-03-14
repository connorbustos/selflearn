import Link from "@/node_modules/next/link";
import React, { useState } from "react";

export default function LoginForm() {
    return <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4
        border-green-600">
            <h1 className="text-xl font-bold my-4">SelfLearn</h1>

            <form className="flex flex-col gap-3">
                <input className="login" type="text" placeholder="Username" />
                <input className="login" type="password" placeholder="Password" />
                <button className="bg-green-600 text-white font-bold
                cursor-pointer px-6 py-2">Login</button>

                <div className="bg-red-500 text-white w-fit
                text-sm py-1 px-3 rounded-md mt-2">Error message</div>

                <Link className="text-sm mt-3 text-center" 
                href={'@/components/register'}>
                    Don't have an account? <span 
                    className="underline">Register</span>
                </Link>
            </form>
        </div>
     </div>
}