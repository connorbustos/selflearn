import { NextResponse } from "next/server";

import { WikiContent, WikiData } from "@/app/types/Wiki";

import clientPromise from "../../../libs/db";

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const wikiData = await request.json();
  console.log(wikiData);
  const result = await db.collection("AllWikis").insertOne(wikiData);
  return NextResponse.json({ message: "Put Wiki Successful", result: result });
}
