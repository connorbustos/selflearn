import { NextResponse } from "next/server";
import clientPromise from "../../../libs/db";

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collectionName =
      process.env.NODE_ENV === "development" ? "AllWikis" : "AllWikisProd";
    const result = await db.collection(collectionName).find().toArray();
    return NextResponse.json(result);
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}
