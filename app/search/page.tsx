"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Grid, Text, Box, Input } from "@chakra-ui/react";
import styles from "../../css/SearchLearningPlans.module.css";
import { ChakraProvider } from "@chakra-ui/react";

const LearningMaterialsSearch = () => {
  // Sample list of learning materials
  const learningMaterials = [
    {
      id: 1,
      title: "Introduction to React",
      description: "Learn the basics of React.",
    },
    {
      id: 2,
      title: "Advanced React",
      description: "Dive deeper into React concepts.",
    },
    { id: 3, title: "React Hooks", description: "Understanding React Hooks." },
    {
      id: 4,
      title: "State Management in React",
      description: "Explore state management.",
    },
    {
      id: 5,
      title: "Web Development Fundamentals",
      description: "An introduction to HTML, CSS, and JavaScript.",
    },
    {
      id: 6,
      title: "Understanding Algorithms",
      description: "Basics of algorithms and their applications.",
    },
    {
      id: 7,
      title: "Data Structures 101",
      description:
        "Learn about common data structures used in software development.",
    },
    {
      id: 8,
      title: "Introduction to Databases",
      description: "Understanding relational and NoSQL databases.",
    },
    {
      id: 9,
      title: "Basics of Machine Learning",
      description: "Dive into the world of machine learning and its uses.",
    },
    {
      id: 10,
      title: "Deep Learning and Neural Networks",
      description: "Explore the fundamentals of deep learning.",
    },
    {
      id: 11,
      title: "Software Testing Fundamentals",
      description: "Learn various testing methodologies and practices.",
    },
    {
      id: 12,
      title: "Project Management Principles",
      description: "Introduction to effective project management.",
    },
    {
      id: 13,
      title: "User Experience Design",
      description: "Learn the principles of designing user-centric products.",
    },
    {
      id: 14,
      title: "Mobile App Development with Flutter",
      description: "Build cross-platform mobile apps with Flutter.",
    },
    {
      id: 15,
      title: "Cybersecurity Basics",
      description: "Learn about the fundamentals of cybersecurity.",
    },
    {
      id: 16,
      title: "Blockchain and Cryptocurrency",
      description:
        "Understanding the technology behind blockchain and cryptocurrencies.",
    },
    {
      id: 17,
      title: "Cloud Computing with AWS",
      description: "Get started with cloud computing on Amazon Web Services.",
    },
    {
      id: 18,
      title: "DevOps Practices",
      description: "Introduction to DevOps and its practices for CI/CD.",
    },
    {
      id: 19,
      title: "Game Development Basics",
      description: "Learn the basics of developing engaging video games.",
    },
    {
      id: 20,
      title: "Python for Data Analysis",
      description:
        "Using Python for data cleaning, analysis, and visualization.",
    },
    {
      id: 21,
      title: "Introduction to IoT",
      description: "Basics of Internet of Things and its applications.",
    },
    {
      id: 22,
      title: "Effective Communication Skills",
      description:
        "Improve your communication skills in a professional setting.",
    },
    {
      id: 23,
      title: "Leadership and Management",
      description: "Learn leadership skills for managing teams effectively.",
    },
    {
      id: 24,
      title: "Entrepreneurship Fundamentals",
      description: "Understand the basics of starting and running a business.",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredMaterials = learningMaterials.filter((material) =>
    material.title.toLowerCase().startsWith(searchQuery.toLowerCase())
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
            {filteredMaterials.map((material) => (
              <Link key={material.id} href="/" className={styles.card}>
                <Box
                  key={material.id}
                  minH="200px" // Minimum height to ensure boxes start the same size
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between" // Adjusts content spacing inside the box
                >
                  <Text fontSize="xl" as="b">
                    {material.title}
                  </Text>
                  <Text>{material.description}</Text>
                </Box>
              </Link>
            ))}
          </Grid>
        </Grid>
      </div>
    </ChakraProvider>
  );
};

export default LearningMaterialsSearch;
