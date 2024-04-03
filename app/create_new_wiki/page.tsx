"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import WikiEditor from "@/components/WikiEditor";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useWikiDataStore } from "@/store/wikiData.store";

const CreateWiki: React.FC = () => {
  const { toast } = useToast();

  const { title, content, owner } = useWikiDataStore();

  const handleSubmit = async (values: any) => {
    console.log(values);
  };

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
