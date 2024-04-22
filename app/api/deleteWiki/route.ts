import { NextResponse } from "next/server";
import clientPromise from "../../../libs/db";
import { ObjectId } from "mongodb";

export async function DELETE(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const { id, isDraft } = await request.json();
  let collectionName = isDraft ? "WikiDrafts" : "AllWikis";
  if (process.env.NODE_ENV === "production") {
    collectionName += "Prod";
  }
  const objectId = new ObjectId(id);
  const result = await db
    .collection(collectionName)
    .deleteOne({ _id: objectId });
  return NextResponse.json({
    message: `Wiki ${isDraft ? "Draft" : ""} Deleted Successfully`,
    result: result,
  });
}
