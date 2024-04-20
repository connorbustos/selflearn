import { NextResponse } from "next/server";
import clientPromise from "../../../libs/db";

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collectionName =
      process.env.NODE_ENV === "production" ? "WikiDraftsProd" : "WikiDrafts";
    const result = await db.collection(collectionName).find().toArray();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error:", error);
    // Throw the error to be caught by the caller
    throw new Error("Internal Server Error");
  }
}
