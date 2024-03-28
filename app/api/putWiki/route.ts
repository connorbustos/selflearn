import { NextResponse } from "next/server";

import clientPromise from "../../../libs/db";



export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db
    .collection("AllWikis")
    .insertOne({ name: "API REQUEST" });
  return NextResponse.json({ message: "Post Request Working", result: result });
}
