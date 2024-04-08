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

interface WikiTableProps {
  owner: string;
}

const getUserCreatedWikis = async (owner: string) => {
  const response = await fetch("http://localhost:3000/api/getAllWikis");
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
  const response = await fetch("http://localhost:3000/api/getAllWikiDrafts");
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

const WikiTable = async ({ owner }: WikiTableProps) => {
  const data: Array<WikiData> = await getUserCreatedWikis(owner);
  const userDrafts: Array<WikiData> = await getUserWikiDrafts(owner);

  return (
    <div className="flex flex-col justify-center items-center w-full px-10">
      <Table>
        <TableCaption>Wiki Table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Date Published</TableHead>
            <TableHead className="text-right">Date Modified</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((wiki: WikiData) => {
            return (
              <TableRow key={data.indexOf(wiki)}>
                <TableCell>Published</TableCell>
                <TableCell>{wiki.title}</TableCell>
                <TableCell className="text-right">
                  {wiki.datePublished ?? "04/03/2024"}
                </TableCell>
                <TableCell className="text-right">
                  {wiki.dateModified ?? "04/04/2024"}
                </TableCell>
                <TableCell className="text-right">
                  <Button className="min-w-[96px] max-w-[96px]">
                    <Link href={`/view_wiki/${wiki.id}`}>View Wiki</Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
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
                <TableCell className="text-right">
                  {/** TODO: Make this button load the wiki draft contents into the wiki editor! */}
                  <Button className="min-w-[96px] max-w-[96px]">
                    Edit Wiki
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default WikiTable;