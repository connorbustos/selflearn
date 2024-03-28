"use client";
import WikiLayout from "@/components/WikiLayout";
import { useUserDataStore } from "@/store/userData.store";
import { useWikiDataStore } from "@/store/wikiData.store";
import React, { useState, useEffect } from "react";
import { WikiData } from "../../types/Wiki";
import { UserData } from "../../types/User";
import { WithId } from "mongodb";
// import { getWiki } from "@/app/api/getWiki/route";

const userData = {
  name: "Isaac Kim",
  username: "isaackimmi",
  password: "test",
};

// export async function generateStaticParams() {
//   try {
//     const response_fetch = await fetch("/api/getAllWikis");
//     const data = await response_fetch.json();

//     const wikiDataList: WikiData[] = data.map((doc: any) => ({
//       id: doc._id.toString(),
//       title: doc.title,
//       content: doc.content,
//       owner: doc.owner,
//     }));

//     return wikiDataList.map((wiki: WikiData) => ({
//       slug: wiki.id,
//     }));
//   } catch (error) {
//     console.error("Error:", error);
//     return [];
//   }
// }

const ViewWiki = ({ params }: { params: { slug: string } }) => {
  const [wikiData, setWikiData] = useState<WikiData | undefined>(undefined);

  useEffect(() => {
    ``;
    const fetchWikiData = async () => {
      try {
        console.log(params.slug);
        const response = await fetch(`/api/getWiki?wikiId=${params.slug}`);
        const data = await response.json();
        setWikiData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchWikiData();
  }, [params.slug]);

  return (
    <div className="w-full py-4 px-4">
      {wikiData ? <WikiLayout wikiData={wikiData} /> : "Wiki not found"}
    </div>
  );
};

export default ViewWiki;
