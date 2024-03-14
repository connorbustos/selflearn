import React, { useState } from "react";

export default function LoginForm() {
    return <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4
        border-green-600">
            <h1 className="text-xl font-bold my-4">SelfLearn</h1>

            <form className="flex flex-col gap-3">
                <input className="login" type="text" placeholder="Username" />
                <input className="login" type="password" placeholder="Password" />

            </form>
        </div>
     </div>
}