"use client";
import React from "react";
import { Formik, Form, Field } from "formik";

const NameForm: React.FC = () => {
  return (
    <div className="max-w-md mx-auto my-10">
      <h1 className="text-center text-2xl font-semibold mb-6">Name Form</h1>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values) => {
          alert(`Name: ${values.name}`);
        }}
      >
        {() => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NameForm;
