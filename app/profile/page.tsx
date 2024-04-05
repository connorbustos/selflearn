"use client";
import { CardHeader, Card } from "@/components/ui/card";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { CircleUser } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Profile() {
  const { data: session } = useSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col justify-start items-start h-screen w-full py-20 px-10 gap-y-6">
      <Card>
        <CardHeader className="flex flex-row gap-x-2">
          <CircleUser />
          {session.user.name}
        </CardHeader>
      </Card>

      <div className="flex flex-col justify-center items-center w-full px-10">
        <Table>
          <TableCaption>Wiki Table</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Date Published</TableHead>
              <TableHead className="text-right">Date Revised</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Published</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">04/03/2024</TableCell>
              <TableCell className="text-right">04/04/2024</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
