import Link from "next/link";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface CreatorCardProps {
  id: number;
  name: string;
  wikisCount: number;
}

const CreatorCard = ({ id, name, wikisCount }: CreatorCardProps) => {
  return (
    <Link key={id} href="/" className="flex flex-col items-start">
      <Card className="w-full min-w-[250px] rounded-2xl shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:-translate-y-2 flex justify-between min-h-[200px] max-h-[200px] p-4 bg-white">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/32989507?v=4"
              alt="Profile Picture"
            />
          </Avatar>
          <div className="ml-4">
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <CardDescription className="text-sm">
              {wikisCount} Wikis
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center mt-4 space-x-4">
          <div className="flex items-center space-x-1">
            <i className="fas fa-book" aria-hidden="true"></i>{" "}
            <span className="text-sm">{/* Number of study sets */}</span>
          </div>
          <div className="flex items-center space-x-1">
            <i className="fas fa-users" aria-hidden="true"></i>{" "}
            <span className="text-sm">{/* Number of classes */}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CreatorCard;
