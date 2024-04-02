// import User from "@/app/models/user";
// import { UserData } from "@/app/types/User";
// import { NextResponse } from "@/node_modules/next/server";
// import bcrypt from "bcryptjs";
// import clientPromise from "../../../libs/db";

// export async function POST(request: Request) {
//   try {
//     const client = await clientPromise;
//     const db = client.db();

//     const { firstName, lastName, userName, password } = await request.json();
//     //const userData: UserData = await request.json();
//     //const hashedPassword = await bcrypt.hash(userData.password, 10);
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       firstName,
//       lastName,
//       userName,
//       password: hashedPassword,
//     });

//     //const userData: UserData = await request.json();
//     // const result = await db.collection("User").insertOne(userData);

//     return NextResponse.json({ message: "User registered." }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occurred while registering the user." },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "@/node_modules/next/server";
import bcrypt from "bcrypt";
import clientPromise from "../../../libs/db";

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { firstName, lastName, username, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData: any = {
      firstName,
      lastName,
      username,
      password: hashedPassword,
    };
    await db.collection("User").insertOne(userData);
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
