"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import WikiEditor from "@/components/WikiEditor";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useWikiDataStore } from "@/store/wikiData.store";
import { useSession } from "next-auth/react";

const CreateWiki: React.FC = () => {
  const { toast } = useToast();

  const { data: session } = useSession();

  const { title, content, owner } = useWikiDataStore();

  const handleSubmit = async (values: any) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        title: values.title,
        content: content,
        owner: session?.user?.name,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(
        "http://localhost:3000/api/putWiki",
        requestOptions
      );
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  if (!session) {
    return (
      <div className="w-full max-w-6xl mx-auto my-10">
        Please login to view the content
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-10">
      <h1 className="text-center text-2xl font-semibold mb-4">Create Wiki</h1>{" "}
      <Formik
        initialValues={{ title: title ?? "", content: content ?? [] }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="bg-white shadow-md rounded px-4 pt-4 pb-4 mb-2">
            <div className="mb-2">
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Wiki Title
              </label>
              <Field
                id="title"
                name="title"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Wiki Title"
              />
              <WikiEditor />
            </div>
            <Toaster />
            <div className="flex items-center justify-center">
              <Button type={"submit"}>Create Wiki</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateWiki;
