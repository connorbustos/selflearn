"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import WikiCard from "@/components/WikiCard";
import MarkdownEditor from "@/components/MarkdownEditor";
import CreatorCard from "@/components/CreatorCard";
import { useGetAllWikis } from "@/hooks/useGetAllWikis";
import WikiLoadingPlaceholder from "@/components/WikiLoadingPlaceholder";
import { marked } from "marked";
import { motion } from "framer-motion";
import { Img } from "@chakra-ui/react";
import { Flame, SearchCode, UserRoundSearch } from "lucide-react";
import StaticMarkdownEditor from "@/components/StaticMarkdownEditor";

export const dynamic = "force-dynamic";

const NewHomePage = () => {
  const { wikis, isLoading } = useGetAllWikis();
  const [searchQuery, setSearchQuery] = useState("");
  const [displayWikis, setDisplayWikis] = useState([]);
  const [popularWikis, setPopularWikis] = useState([]);
  const [uniqueCreators, setUniqueCreators] = useState<any>([]);

  const markdownText = `## Getting Started with the Markdown Editor
  1. Add markdown text for what you want to teach the user
  2. Add code snippets in Python, Java, or C++!
  3. Go to the Create page to start creating your own!
  `;

  function getFirstHeading(markdownText: string): string | null {
    let firstHeading: string | null = null;
    const renderer = new marked.Renderer();
    renderer.heading = function (text, level) {
      if (firstHeading === null) {
        firstHeading = text;
        return "";
      }
      return "";
    };
    marked(markdownText, { renderer });
    return firstHeading;
  }

  function filterDisplayWikis(wikis: any) {
    return wikis.map((wiki: any) => {
      const firstMarkdown = wiki.content.find(
        (content: any) => content.type === "markdown"
      );
      const description = firstMarkdown
        ? getFirstHeading(firstMarkdown.data)
        : "No description available";
      return {
        id: wiki._id,
        title: wiki.title,
        owner: wiki.owner,
        description: description,
      };
    });
  }

  const shuffleArray = (array: []) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  useEffect(() => {
    if (wikis) {
      setDisplayWikis(
        filterDisplayWikis(wikis).filter((wiki: any) =>
          wiki.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      );
    }
  }, [wikis, searchQuery]);

  useEffect(() => {
    if (wikis) {
      setPopularWikis(shuffleArray(filterDisplayWikis([...wikis])));

      const creatorsWikiCount: Creator = {};
      wikis.forEach((wiki: any) => {
        const creatorName = wiki.owner;
        if (creatorsWikiCount[creatorName]) {
          creatorsWikiCount[creatorName].wikisCount += 1;
        } else {
          creatorsWikiCount[creatorName] = { name: creatorName, wikisCount: 1 };
        }
      });
      const creatorsArray = Object.values(creatorsWikiCount);
      setUniqueCreators(creatorsArray);
    }
  }, [wikis]);

  if (isLoading) {
    return <WikiLoadingPlaceholder />;
  }

  return (
    <div className={`bg-gray-50 min-h-screen`}>
      <div className="pt-4">
        <div className="mx-auto max-w-[75%] px-4 md:px-6 lg:px-12 grid gap-2">
          <div>
            <div className="flex items-start justify-center w-full mx-auto gap-x-2">
              <SearchCode
                style={{
                  paddingTop: "6px",
                }}
                size={64}
              />
              <p className="pt-2 pb-4 font-Proxima-Nova text-6xl font-black text-center">
                Search Wikis
              </p>
            </div>
            <Input
              type="text"
              placeholder="Enter Wiki Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${
                displayWikis.length === 0 ? "mb-2" : "mb-14"
              }  max-w-[650px] mx-auto rounded-full border-4 text-center text-2xl min-h-[60px]`}
            />

            <motion.div
              className="text-8xl font-normal"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div
                className={`grid gap-6 my-6 ${
                  displayWikis.length === 0
                    ? "grid-cols-1"
                    : "grid-cols-2 md:grid-cols-4"
                }`}
              >
                {displayWikis && displayWikis.length > 0 ? (
                  displayWikis.map((wiki: any) => (
                    <WikiCard key={wiki.id} {...wiki} />
                  ))
                ) : (
                  <div className="w-full min-h-[300px] my-10 mx-auto">
                    <p className="m-auto font-Proxima-Nova font-bold text-4xl text-center">
                      no wikis found
                    </p>
                    <Img
                      src={`/sad-panda.png`}
                      alt="content"
                      className="mx-auto"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          <div className="text-xl font-bold mr-8 flex items-end">
            Try it out!
          </div>
          <div className="md-4 mb-6">
            <StaticMarkdownEditor
              initialMarkdownText={markdownText}
              isOnViewWiki={false}
              isEditingProp={true}
            />
          </div>
          <div className="flex items-start justify-start w-full mx-auto">
            <Flame
              style={{
                paddingTop: "6px",
              }}
              size={64}
            />
            <p className="pt-2 pb-4 font-Proxima-Nova text-6xl font-black text-center">
              Popular Wikis
            </p>
          </div>
          <div className="">
            <div className="flex-wrap justify-center grid grid-cols-2 md:grid-cols-4 gap-6 justify-center items-start mb-12">
              {popularWikis.map((wiki: any) => (
                <WikiCard key={wiki.id} {...wiki} />
              ))}
            </div>
          </div>
          <div className="flex items-start justify-start w-full mx-auto">
            <UserRoundSearch
              style={{
                paddingTop: "6px",
              }}
              size={64}
            />
            <p className="pt-2 pb-4 font-Proxima-Nova text-6xl font-black text-center">
              Top Creators
            </p>
          </div>
          <div className="max-h-[210px] mb-24">
            <div className="flex-wrap justify-center grid grid-cols-2 md:grid-cols-4 gap-6 justify-center items-start">
              {uniqueCreators.map((creator: any, index: number) => (
                <CreatorCard key={index} {...creator} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHomePage;
