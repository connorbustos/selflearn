import { ObjectId } from "mongodb";
import clientPromise from "../../../libs/db";
import { WikiData } from "@/app/types/Wiki";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const wikiId = request.nextUrl.searchParams.get("wikiId");
    console.log(wikiId);
    if (!wikiId) {
      throw new Error("Wiki ID is required");
    }
    const collectionName =
      process.env.NODE_ENV === "development" ? "WikiDrafts" : "WikiDraftsProd";

    const result = await db
      .collection(collectionName)
      .findOne({ _id: new ObjectId(wikiId) });
    if (!result) {
      throw new Error("Wiki not found");
    }

    const wikiData: WikiData = {
      id: result._id.toString(),
      title: result.title,
      content: result.content,
      owner: result.owner,
      isDraft: result.isDraft,
    };

    console.log(result);

    return new Response(JSON.stringify(wikiData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
