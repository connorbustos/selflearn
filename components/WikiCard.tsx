import Link from "next/link";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { CircleUser, SquareTerminal } from "lucide-react";

interface WikiCardProps {
  id: number;
  title: string;
  description: string;
  owner: string;
}

const WikiCard = ({ id, title, description, owner }: WikiCardProps) => {
  return (
    <Link key={id} href={`/view_wiki_client/${id}`} className="flex flex-col">
      <Card className="w-full min-w-[250px] rounded-2xl shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between min-h-[200px] max-h-[200px] relative overflow-hidden">
        <div className="absolute -top-[60px] -left-[80px] w-[180px]">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill={"#F2F4F8"}
              d="M51.6,-24.3C65.7,-5.3,75.2,21.8,65.8,37.3C56.5,52.8,28.2,56.7,3.9,54.5C-20.5,52.2,-40.9,43.8,-49.9,28.6C-58.9,13.3,-56.3,-8.9,-46.1,-25.6C-35.8,-42.3,-17.9,-53.5,0.4,-53.7C18.7,-54,37.4,-43.2,51.6,-24.3Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <CardHeader className="z-[100]">
          <CardTitle className="font-Proxima-Nova text-xl font-bold truncate">
            <SquareTerminal />
            <p className="pt-1">{title}</p>
          </CardTitle>
          <CardDescription className="font-Proxima-Nova text-sm truncate">
            {description}
          </CardDescription>
          <CardFooter className="font-Proxima-Nova text-[12px] w-full p-0 gap-x-2 pt-10">
            <CircleUser />
            {owner}
          </CardFooter>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default WikiCard;
