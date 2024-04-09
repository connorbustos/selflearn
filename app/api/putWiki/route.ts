import { NextResponse } from "next/server";
import { WikiData } from "@/app/types/Wiki";
import clientPromise from "../../../libs/db";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const wikiData: WikiData = await request.json();
  const isDraft: boolean = wikiData.isDraft || false;
  const collectionName = isDraft ? "WikiDrafts" : "AllWikis";
  const objectId = new ObjectId(wikiData.id);

  const result = await db
    .collection(collectionName)
    .replaceOne({ _id: objectId }, wikiData, { upsert: true });

  return NextResponse.json({
    message: `Wiki ${isDraft ? "Draft" : ""} Saved Successfully`,
    result: result,
  });
}
