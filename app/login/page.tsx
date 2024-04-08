"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Login to SelfLearn with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => signIn("github")}>Sign in with Github</Button>
        </CardContent>
      </Card>
    </div>
  );
}
