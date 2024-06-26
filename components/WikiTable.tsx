"use client";
import { WikiData } from "@/app/types/Wiki";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface WikiTableProps {
  owner: string;
}

const getUserCreatedWikis = async (owner: string) => {
  const timestamp = new Date().getTime();
  const response = await fetch(`/api/getAllWikis?timestamp=${timestamp}`, {
    cache: "reload",
  });
  const data = await response.json();

  const wikisWithMappedIds = data.map((wiki: any) => {
    return {
      ...wiki,
      id: wiki._id,
    };
  });

  return wikisWithMappedIds.filter((wiki: WikiData) => {
    return wiki.owner === owner;
  });
};

const getUserWikiDrafts = async (owner: string) => {
  const timestamp = new Date().getTime();
  const response = await fetch(`/api/getAllWikiDrafts?timestamp=${timestamp}`, {
    cache: "reload",
  });
  const data = await response.json();
  const wikisWithMappedIds = data.map((wiki: any) => {
    return {
      ...wiki,
      id: wiki._id,
    };
  });
  return wikisWithMappedIds.filter((wiki: WikiData) => {
    return wiki.owner === owner;
  });
};

const WikiTable = ({ owner }: WikiTableProps) => {
  const [userWikis, setUserWikis] = useState(Array<WikiData> || []);
  const [userDrafts, setUserDrafts] = useState(Array<WikiData> || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWikiData = async (owner: string) => {
      try {
        const wikis: Array<WikiData> = await getUserCreatedWikis(owner);
        const drafts: Array<WikiData> = await getUserWikiDrafts(owner);

        setUserWikis(wikis);
        setUserDrafts(drafts);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWikiData(owner);
  }, [owner]);

  return (
    <ChakraProvider>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 1 }}
        className={`flex flex-col justify-center items-center w-full px-20 py-10 border-8 rounded-3xl shadow-xl`}
      >
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <Table className="rounded-3xl">
            <TableCaption>Wiki Table</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="font-Proxima-Nova font-bold text-right">
                  Date Published
                </TableHead>
                <TableHead className="font-Proxima-Nova font-bold text-right">
                  Date Modified
                </TableHead>
                <TableHead className="font-Proxima-Nova font-bold text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-Proxima-Nova font-normal text-md">
              {userDrafts.map((wiki: WikiData) => {
                return (
                  <TableRow key={userDrafts.indexOf(wiki)}>
                    <TableCell>Draft</TableCell>
                    <TableCell>{wiki.title}</TableCell>
                    <TableCell className="text-right">
                      {wiki.datePublished ?? "04/03/2024"}
                    </TableCell>
                    <TableCell className="text-right">
                      {wiki.dateModified ?? "04/04/2024"}
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <Link href={`/edit_wiki/${wiki.id}-isDraft`}>
                          <Button className="min-w-[96px] max-w-[96px]">
                            Edit Wiki
                          </Button>
                        </Link>
                      </motion.div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {userWikis.map((wiki: WikiData) => {
                return (
                  <TableRow key={userWikis.indexOf(wiki)}>
                    <TableCell>Published</TableCell>
                    <TableCell>{wiki.title}</TableCell>
                    <TableCell className="text-right">
                      {wiki.datePublished ?? "04/03/2024"}
                    </TableCell>
                    <TableCell className="text-right">
                      {wiki.dateModified ?? "04/04/2024"}
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <Link href={`/edit_wiki/${wiki.id}`}>
                          <Button className="min-w-[96px] max-w-[96px]">
                            Edit Wiki
                          </Button>
                        </Link>
                      </motion.div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </motion.div>
    </ChakraProvider>
  );
};

export default WikiTable;
