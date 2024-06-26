import { NextResponse } from "next/server";
import clientPromise from "../../../libs/db";

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collectionName =
      process.env.NODE_ENV === "development" ? "WikiDrafts" : "WikiDraftsProd";
    const url = new URL(request.url);
    const timestamp = url.searchParams.get("timestamp");
    // There was a bug on prod where if the request parameter wasn't used, data was forcefully cached.
    console.log(`getAllWikiDrafts Request received at timestamp: ${timestamp}`);
    const result = await db.collection(collectionName).find().toArray();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error:", error);
    // Throw the error to be caught by the caller
    throw new Error("Internal Server Error");
  }
}

export const dynamic = "force-dynamic";
