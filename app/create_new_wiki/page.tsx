"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import MarkdownEditor from "@/components/MarkdownEditor";
const NameForm: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-10">
      <h1 className="text-center text-2xl font-semibold mb-4">Create Wiki</h1>{" "}
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values) => {
          {
            /* API call for saving the current wiki*/
          }
          alert(`Name: ${values.name}`);
        }}
      >
        {() => (
          <Form className="bg-white shadow-md rounded px-4 pt-4 pb-4 mb-2">
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Wiki Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Wiki Name"
              />
              <MarkdownEditor initialMarkdownText={""} isEditingProp={true} />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NameForm;
