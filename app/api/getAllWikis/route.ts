import { NextResponse } from "next/server";
import clientPromise from "../../../libs/db";

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collectionName =
      process.env.NODE_ENV === "development" ? "AllWikis" : "AllWikisProd";
    const url = new URL(request.url);
    const timestamp = url.searchParams.get("timestamp");
    // There was a bug on prod where if the request parameter wasn't used, data was forcefully cached.
    console.log(`getAllWikis Request received at timestamp: ${timestamp}`);
    const result = await db.collection(collectionName).find().toArray();
    const response = NextResponse.json(result);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}

export const dynamic = "force-dynamic";
