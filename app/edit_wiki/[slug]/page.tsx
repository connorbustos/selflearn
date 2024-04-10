"use server";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { WikiData } from "../../types/Wiki";
import EditWikiLayout from "@/components/EditWikiLayout";

// THIS IS A SERVERSIDE COMPONENT.
// DO NOT USE ANY CLIENT-SIDE HOOKS.
export async function generateStaticParams() {
  try {
    const allWikisResponse = await fetch(
      `${process.env.LOCAL_TEST_URL}/api/getAllWikis`
    );
    const allWikiDraftsResponse = await fetch(
      `${process.env.LOCAL_TEST_URL}/api/getAllWikiDrafts`
    );

    const allWikis: WikiData[] = await allWikisResponse.json();
    const allWikiDrafts = await allWikiDraftsResponse.json();

    const combinedWikiList: WikiData[] = allWikis.concat(allWikiDrafts);

    const wikiDataList: WikiData[] = combinedWikiList.map((doc: any) => ({
      id: doc._id.toString(),
      title: doc.title,
      content: doc.content,
      owner: doc.owner,
      isDraft: doc.isDraft,
    }));

    return wikiDataList.map((wiki: WikiData) => ({
      slug: wiki.id,
    }));
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function generateSlug(slug: string) {
  const [wikiId, isDraft] = slug.split("-");
  let wikiData = [];
  try {
    const endpoint = isDraft ? "getWikiDraft" : "getWiki";
    const response = await fetch(
      `${process.env.LOCAL_TEST_URL}/api/${endpoint}?wikiId=${wikiId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch wiki data from ${endpoint}`);
    }
    wikiData = await response.json();
  } catch (error) {
    console.error(
      `Wiki data was null (${isDraft ? "getWikiDraft" : "getWiki"}):`,
      error
    );
  }
  return wikiData;
}

const EditWiki = async ({ params }: { params: { slug: string } }) => {
  const wikiData = await generateSlug(params.slug);
  return (
    <ChakraProvider>
      <div className="w-full py-4 px-4 content-center">
        {wikiData ? <EditWikiLayout wiki={wikiData} /> : <Spinner />}
      </div>
    </ChakraProvider>
  );
};

export default EditWiki;
