"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import WikiEditor from "@/components/WikiEditor";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useWikiDataStore } from "@/store/wikiData.store";
import { useSession } from "next-auth/react";
import { Switch } from "@/components/ui/switch";
import moment from "moment";
import { WikiData } from "@/app/types/Wiki";

interface EditWikiLayoutProps {
  wiki: WikiData;
}

const EditWikiLayout: React.FC<EditWikiLayoutProps> = ({ wiki }) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const { content } = useWikiDataStore();

  const [isDraft, setIsDraft] = useState(wiki.isDraft);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSuccessfulEdit = () => {
    toast({
      description: "Wiki Successfully Edited!",
    });
  };

  const handleSubmit = async (values: any) => {
    setIsDisabled(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        id: wiki.id,
        title: values.title,
        content: content,
        isDraft: isDraft,
        owner: session?.user?.name,
        dateModified: moment().format("MM/DD/YYYY"),
        datePublished: isDraft
          ? "Status - Draft"
          : moment().format("MM/DD/YYYY"),
      });

      const deleteRequestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify({
          id: wiki.id,
        }),
      };

      const putRequestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const deleteResponse = await fetch(
        "http://localhost:3000/api/deleteWiki",
        deleteRequestOptions
      );

      const putResponse = await fetch(
        "http://localhost:3000/api/putWiki",
        putRequestOptions
      );
      const deleteResult = await deleteResponse.text();
      console.log(deleteResult);
      const putResult = await putResponse.text();
      console.log(putResult);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsDisabled(false);
      handleSuccessfulEdit();
    }
  };

  useEffect(() => {
    console.log(wiki);
  }, [content, wiki]);

  if (!session) {
    return (
      <div className="w-full max-w-6xl mx-auto my-10">
        Please login to view the content
      </div>
    );
  }

  const handleIsDraftChange = () => {
    setIsDraft(!isDraft);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-10">
      <h1 className="text-center text-2xl font-semibold mb-4">Edit Wiki</h1>{" "}
      <Formik
        initialValues={{ title: wiki.title ?? "", content: wiki.content ?? [] }}
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
                placeholder={"Enter Wiki Title"}
                disabled={isDisabled}
              />
              <WikiEditor wiki={wiki} />
            </div>
            <Toaster />
            <div className="flex items-center mb-2">
              <Switch
                checked={isDraft}
                disabled={isDisabled}
                onCheckedChange={handleIsDraftChange}
              />
              <span className="ml-2 align-middle">Save as Draft</span>
            </div>
            <div className="flex items-center justify-center">
              <Button type={"submit"} disabled={isDisabled}>
                Save Changes
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditWikiLayout;
