"use client";
import React, { Ref, useRef, useState } from "react";
import { Formik, Form, Field, FormikProps } from "formik";
import WikiEditor from "@/components/WikiEditor";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useWikiDataStore } from "@/store/wikiData.store";
import { useSession } from "next-auth/react";
import { Switch } from "@/components/ui/switch";
import moment from "moment";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { SearchCode, SquarePen } from "lucide-react";

const CreateWiki: React.FC = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const { content, setContent } = useWikiDataStore();
  const ref: Ref<FormikProps<{ title: string; content: never[] }>> =
    useRef(null);

  const [isDraft, setIsDraft] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSuccessfulCreation = () => {
    setContent([]);
    toast({
      description: "Wiki Successfully Created!",
    });
  };

  const handleSubmit = async (values: any) => {
    setIsDisabled(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        title: values.title,
        content: content,
        isDraft: isDraft,
        owner: session?.user?.name,
        dateModified: moment().format("MM/DD/YYYY"),
        datePublished: isDraft
          ? "Status - Draft"
          : moment().format("MM/DD/YYYY"),
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch("/api/putWiki", requestOptions);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsDisabled(false);
      handleSuccessfulCreation();
    }
  };

  if (!session) {
    redirect("/login");
  }

  const handleIsDraftChange = () => {
    setIsDraft(!isDraft);
  };

  const handlePreviewWiki = () => {
    if (ref.current) {
      localStorage.setItem("title", ref.current.values.title);
    }
  };

  return (
    <div className="w-full h-screen max-w-6xl mx-auto my-10">
      <div className="flex items-start justify-center w-full mx-auto gap-x-2">
        <SquarePen
          style={{
            marginTop: "4px",
          }}
          size={64}
        />
        <p className="pt-2 pb-4 font-Proxima-Nova text-6xl font-black text-center">
          Create Wiki
        </p>
      </div>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Formik
          innerRef={ref}
          initialValues={{ title: "", content: [] }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="font-Proxima-Nova bg-white shadow-md rounded px-4 pt-4 pb-4 mb-2">
              <div className="mb-2">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-xl font-bold mb-2"
                >
                  Wiki Title
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Wiki Title"
                  disabled={isDisabled}
                />
                <WikiEditor
                  onPreviewWiki={handlePreviewWiki}
                  isCreatingWiki={true}
                />
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
              <div className="flex gap-x-2 items-center justify-center">
                <Button type={"submit"} disabled={isDisabled}>
                  Create Wiki
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default CreateWiki;
