import { NextResponse } from "next/server";

import clientPromise from "../../../libs/db";

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db();

  //   const result = await db
  //     .collection("exampleCollection")
  //     .insertOne({ name: "API REQUEST FOR VIDEO!!" });

  const result = {};

  return NextResponse.json({ message: "Post Request Working", result: result });
}
