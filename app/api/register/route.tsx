import User from "@/app/models/user";
// import { connectMongoDB } from "@/libs/db";
import { NextResponse } from "@/node_modules/next/server";
import bcrypt from "bcryptjs";
// require("dotenv").config(/app/.env); 

export async function POST(req) {
  try {
    const { firstName, lastName, userName, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    await User.create({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
