import { NextResponse } from "next/server";
import clientPromise from "../../../libs/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collectionName =
      process.env.NODE_ENV === "development" ? "AllWikis" : "AllWikisProd";
    const result = await db.collection(collectionName).find().toArray();
    const response = NextResponse.json(result);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}
