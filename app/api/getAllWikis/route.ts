import { NextResponse } from "next/server";
import clientPromise from "../../../libs/db";

export async function getAllWikis() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("AllWikis").find().toArray();

    return result;
  } catch (error) {
    console.error("Error:", error);
    // Throw the error to be caught by the caller
    throw new Error("Internal Server Error");
  }
}
