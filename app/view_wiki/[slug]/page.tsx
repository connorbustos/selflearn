"use server";
import WikiLayout from "@/components/WikiLayout";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { WikiData } from "../../types/Wiki";

// THIS IS A SERVERSIDE COMPONENT.
// DO NOT USE ANY CLIENT-SIDE HOOKS.

const api_url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL;

export async function generateStaticParams() {
  try {
    const response = await fetch(`${api_url}/api/getAllWikis`);
    const data = await response.json();

    const wikiDataList: WikiData[] = data.map((doc: any) => ({
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
  const response = await fetch(`${api_url}/api/getWiki?wikiId=${params.slug}`);
  const wikiData = await response.json();

  return (
    <ChakraProvider>
      <div className="w-full py-4 px-4 content-center">
        {wikiData ? <WikiLayout wikiData={wikiData} /> : <Spinner />}
      </div>
    </ChakraProvider>
  );
};

export default ViewWiki;
