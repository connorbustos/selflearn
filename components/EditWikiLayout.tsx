"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import WikiEditor from "@/components/WikiEditor";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Switch } from "@/components/ui/switch";
import moment from "moment";
import { WikiData } from "@/app/types/Wiki";

import { useWikiDataStore } from "@/store/wikiData.store";

interface EditWikiLayoutProps {
  wiki: WikiData;
}

const EditWikiLayout: React.FC<EditWikiLayoutProps> = ({ wiki }) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const { content, setContent, setTitle } = useWikiDataStore();

  const [isDraft, setIsDraft] = useState(wiki.isDraft);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSuccessfulEdit = () => {
    setContent([]);
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
          isDraft: wiki.isDraft,
        }),
      };

      const putRequestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const deleteResponse = await fetch(
        "/api/deleteWiki",
        deleteRequestOptions
      );

      const putResponse = await fetch("/api/putWiki", putRequestOptions);
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
        {({ setFieldValue }) => (
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
              <WikiEditor wiki={wiki} setFieldValue={setFieldValue} />
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
