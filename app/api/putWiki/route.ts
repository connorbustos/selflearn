import { NextResponse } from "next/server";
import { WikiData } from "@/app/types/Wiki";
import clientPromise from "../../../libs/db";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const wikiData: WikiData = await request.json();
  const isDraft: boolean = wikiData.isDraft || false;
  const objectId = new ObjectId(wikiData.id);
  delete wikiData.id;
  let collectionName = isDraft ? "WikiDrafts" : "AllWikis";
  if (process.env.NODE_ENV === "production") {
    collectionName += "Prod";
  }
  const result = await db
    .collection(collectionName)
    .replaceOne({ _id: objectId }, wikiData, { upsert: true });

  return NextResponse.json({
    message: `Wiki ${isDraft ? "Draft" : ""} Saved Successfully`,
    result: result,
  });
}
