import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB

import clientPromise from "../../../libs/db";
import { WikiData } from "@/app/types/Wiki";

export async function getWiki(wikiId: string) {
  try {
    const client = await clientPromise;
    const db = client.db();
    console.log(new ObjectId(wikiId));

    const result = await db
      .collection("AllWikis")
      .findOne({ _id: new ObjectId(wikiId) });

    if (!result) {
      throw new Error("Wiki not found"); // Throw an error if the wiki with the specified ID is not found
    }

    const wikiData: WikiData = {
      id: result._id.toString(),
      title: result.title,
      content: result.content,
      owner: result.owner,
      // Map other properties as needed
    };

    return wikiData;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Internal Server Error");
  }
}
