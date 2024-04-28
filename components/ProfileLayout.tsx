"use client";
import { CircleUser } from "lucide-react";
import { Card, CardHeader } from "./ui/card";
import { ReactNode } from "react";

interface ProfileLayoutProps {
  user: string;
  children: ReactNode;
}

const ProfileLayout = ({ user, children }: ProfileLayoutProps) => {
  return (
    <div className="flex flex-col justify-start items-start min-h-screen w-full py-20 px-10 gap-y-6">
      <Card className="border-0">
        <CardHeader className="flex flex-row gap-x-2">
          <CircleUser />
          {user ?? ""}
        </CardHeader>
      </Card>
      {children}
    </div>
  );
};

export default ProfileLayout;
