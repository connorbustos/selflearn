"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";

const NameForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <ChakraProvider>
      <Box maxW="md" mx="auto" my="10">
        <Text textAlign="center" fontSize="2xl" fontWeight="semibold" mb="6">
          Name Form
        </Text>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={() => {
            setSubmitted(true);
          }}
        >
          {() => (
            <Form>
              <VStack spacing="4" bg="white" p="8" rounded="md" shadow="md">
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    variant="filled"
                    placeholder="Enter your name"
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">
                  Submit
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
        {submitted && (
          <Text textAlign="center" fontSize="xl" fontWeight="bold" mt="4">
            Checkmate
          </Text>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default NameForm;
