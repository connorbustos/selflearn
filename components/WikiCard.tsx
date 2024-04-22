import Link from "next/link";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface WikiCardProps {
  id: number;
  title: string;
  description: string;
}

const WikiCard = ({ id, title, description }: WikiCardProps) => {
  return (
    <Link key={id} href={`/view_wiki/${id}`} className="flex flex-col">
      <Card className="w-full min-w-[250px] rounded-2xl shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:-translate-y-1.25 flex flex-col justify-between min-h-[200px] max-h-[200px]">
        <CardHeader>
          <CardTitle className="text-xl font-normal truncate">
            {title}
          </CardTitle>
          <CardDescription className="truncate">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default WikiCard;
