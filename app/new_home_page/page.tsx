"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import WikiCard from "@/components/WikiCard";
import MarkdownEditor from "@/components/MarkdownEditor";
import CreatorCard from "@/components/CreatorCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const NewHomePage = () => {
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
  ];

  const popularWikis = [
    {
      id: 1,
      title: "Basics of Machine Learning",
      description: "Dive into the world of machine learning and its uses.",
    },
    {
      id: 2,
      title: "Deep Learning and Neural Networks",
      description: "Explore the fundamentals of deep learning.",
    },
  ];

  const creators = [
    {
      id: 1,
      name: "Connor Bustos",
      wikisCount: 5,
    },
    {
      id: 2,
      name: "Isaac Kim",
      wikisCount: 8,
    },
    {
      id: 3,
      name: "Sahiti Hibane",
      wikisCount: 12,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const markdownText = `
  ## Getting Started with the Markdown Editor
  1. Add markdown text for what you want to teach the user
  2. Add code snippets in Python, Java, or C++!
  `;
  const filteredMaterials = learningMaterials.filter((material) =>
    material.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  const filteredPopularWikis = popularWikis.filter((wiki) => {
    return wiki.title.toLowerCase().startsWith(searchQuery.toLowerCase());
  });
  return (
    <div className="bg-gray-50">
      <div className="pt-4">
        <div className="mx-auto max-w-[75%] px-4 md:px-6 lg:px-12 grid gap-2">
          <div className="text-xl font-bold mr-8 flex items-end">
            Search Wikis
          </div>
          <Input
            type="text"
            placeholder="Enter Wiki Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-2"
          />
          <div className="overflow-hidden">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {filteredMaterials.slice(0, 8).map((material) => (
                    <WikiCard key={material.id} {...material} />
                  ))}
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {filteredMaterials.slice(0, 8).map((material) => (
                    <WikiCard key={material.id} {...material} />
                  ))}
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="text-xl font-bold mr-8 flex items-end mt-6">
            Try it out!
          </div>
          <div className="md-4 mb-6">
            <MarkdownEditor
              initialMarkdownText={markdownText}
              isOnViewWiki={false}
              isEditingProp={true}
            />
          </div>
          <div className="text-xl font-bold mr-8 flex items-end">
            Popular Wikis
          </div>
          <div className="flex-wrap justify-center grid grid-cols-2 md:grid-cols-4 gap-6 justify-center items-start mb-12">
            {filteredPopularWikis.map((wiki) => (
              <WikiCard key={wiki.id} {...wiki} />
            ))}
          </div>
          <div className="text-xl font-bold mr-8 flex items-end">
            Top Creators
          </div>
          <div className="flex-wrap justify-center grid grid-cols-2 md:grid-cols-4 gap-6 justify-center items-start mb-24">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} {...creator} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHomePage;
