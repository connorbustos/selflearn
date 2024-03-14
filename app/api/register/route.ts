import { NextResponse } from "@/node_modules/next/server";

export async function POST(req) {
    try {
        const {firstName, lastName, userName, password}  
        = await req.json();

        console.log("first: ", firstName);
        console.log("last: ", lastName);
        console.log("username: ", userName);
        console.log("pass: ", password);

        return NextResponse.json(
            {message: "User registered."},
            {status: 201}
        ); 
    } 
    
    catch (error) {
        return NextResponse.json(
            {message: "An error occurred while registering the user."},
            {status: 500}
        );
    }
}