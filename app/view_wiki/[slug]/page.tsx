"use server";
import WikiLayout from "@/components/WikiLayout";
import { useUserDataStore } from "@/store/userData.store";
import { useWikiDataStore } from "@/store/wikiData.store";
import React, { useEffect } from "react";
import { WikiData } from "../../types/Wiki";
import { UserData } from "../../types/User";
import { getAllWikis } from "@/app/api/getAllWikis/route";
import { WithId } from "mongodb";
import { getWiki } from "@/app/api/getWiki/route";

const userData = {
  name: "Isaac Kim",
  username: "isaackimmi",
  password: "test",
};

export async function generateStaticParams() {
  try {
    const response: WithId<any>[] = await getAllWikis();

    const wikiDataList: WikiData[] = response.map((doc) => ({
      id: doc._id.toString(),
      title: doc.title,
      content: doc.content,
      owner: doc.owner,
    }));

    return wikiDataList.map((wiki: WikiData) => ({
      slug: wiki.id,
    }));
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

const ViewWiki = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const wikiData = await getWiki(slug);

  return (
    <div className="w-full py-4 px-4">
      {wikiData !== undefined ? (
        <WikiLayout wikiData={wikiData} />
      ) : (
        "wiki not found"
      )}
    </div>
  );
};

export default ViewWiki;
