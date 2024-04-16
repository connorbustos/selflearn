"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Grid, Text, Box, Input, Spinner } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

import styles from "../../css/SearchLearningPlans.module.css";

const ViewAllWikis = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [wikis, setWikis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchLearningMaterials = async () => {
      const response = await fetch("/api/getAllWikis");
      if (!response.ok) {
        throw new Error("Failed to fetch learning materials");
      }
      const data = await response.json();
      setWikis(data);
      try {
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLearningMaterials();
  }, []);

  const filteredWikis = wikis.filter(
    (wiki: any) =>
      typeof wiki.title === "string" &&
      wiki.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <ChakraProvider>
      <div className={styles.searchContainer}>
        <Grid px={{ base: "4", md: "8", lg: "12" }} gap={6}>
          <Input
            type="text"
            placeholder="Search learning materials..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <Grid
            templateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(6, 1fr)" }}
            gap={6}
            justifyContent="center"
            alignItems="start"
          >
            {isLoading ? (
              <div className="absolute inset-0 flex justify-center items-center pt-80">
                <Spinner size="xl" />
              </div>
            ) : (
              filteredWikis.map((wiki: any) => (
                <Link
                  key={wiki._id}
                  href={`/view_wiki/${wiki._id}`}
                  className={styles.card}
                >
                  <Box
                    minH="200px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Text fontSize="xl" as="b">
                      {wiki.title}
                    </Text>
                    <Text>{wiki.data}</Text>
                  </Box>
                </Link>
              ))
            )}
          </Grid>
        </Grid>
      </div>
    </ChakraProvider>
  );
};

export default ViewAllWikis;
