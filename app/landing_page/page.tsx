"use client";
import { TypeAnimation } from "react-type-animation";
import { Variants, motion } from "framer-motion";
import { ChevronsDown, Github, Linkedin } from "lucide-react";
import { Img } from "@chakra-ui/react";
import Link from "next/link";

const bannerContent = [
  {
    heading: "Markdown + Code Editing Support",
    subheading:
      "Dive into creating coding content effortlessly using Markdown and an integrated code editor, all runnable directly in your browser.",
    imgSrc: "create-wiki.png",
  },
  {
    heading: "AI-Generated Learning Material",
    subheading:
      "Unleash the power of AI to effortlessly generate learning markdown material tailored to your needs, saving you time and effort.",
    imgSrc: "ai-generated-content.png",
  },
  {
    heading: "Dashboard Management",
    subheading:
      "Stay in control of your wikis' progress - edit, preview, and seamlessly switch between publishing and drafting with ease.",
    imgSrc: "dashboard.png",
  },
  {
    heading: "Explore and Learn",
    subheading:
      "Embark on a journey of discovery on our Home page, where you can dive into wikis crafted by fellow creators, learning and growing together.",
    imgSrc: "home-demo.png",
  },
];

const teamInfo = [
  {
    name: "Isaac Kim",
    role: "Frontend Engineer",
    description: "Class of 2024.",
    linkedInUrl: "https://www.linkedin.com/in/isaac-kimmi/",
    githubUrl: "https://github.com/isaackimmi",
  },
  {
    name: "Sahiti Hibane",
    role: "Frontend Engineer",
    description: "Class of 2024.",
    linkedInUrl: "https://www.linkedin.com/in/sahiti-hibane/",
    githubUrl: "https://github.com/goodCodeForGood",
  },
  {
    name: "Connor Bustos",
    role: "Full Stack Engineer",
    description: "Class of 2024.",
    linkedInUrl: "https://www.linkedin.com/in/connorbustos/",
    githubUrl: "https://github.com/connorbustos",
  },
];

const titleVariant: Variants = {
  offscreen: {
    opacity: 0, // For even elements, animate from right (+300), for odd animate from left (-300)
  },
  onscreen: {
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.1,
      duration: 1.1,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="w-screen h-screen bg-gray-50 font-Proxima-Nova">
      <link rel="stylesheet" href="https://use.typekit.net/urj3apl.css" />
      <div
        className={`w-full min-h-screen flex flex-col justify-center items-center gap-y-2 relative bg-[url("/hero-blob.svg")] bg-cover bg-no-repeat bg-center`}
      >
        <motion.p
          className="text-8xl font-normal"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-8xl font-black">SelfLearn.</span>
        </motion.p>
        <TypeAnimation
          sequence={[
            500,
            "Built for Students.",
            2000,
            "Built for Educators.",
            2000,
            "Built for Enthusiasts.",
            2000,
            "Built for Everyone.",
            () => {
              console.log("Sequence completed");
            },
          ]}
          speed={50}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{
            fontSize: "2em",
            display: "inline-block",
            fontFamily: "Proxima-Nova",
            fontWeight: 500,
          }}
        />
        <div className="absolute animate-bounce bottom-[100px]">
          <ChevronsDown />
        </div>
      </div>

      {/* banner */}
      <div className={`w-full flex flex-col gap-y-14`}>
        {bannerContent.map((elem, idx) => {
          const cardVariants: Variants = {
            offscreen: {
              x: idx % 2 === 0 ? -1000 : 1000, // For even elements, animate from right (+300), for odd animate from left (-300)
            },
            onscreen: {
              x: 0,
              transition: {
                type: "spring",
                bounce: 0.1,
                duration: 0.7,
              },
            },
          };

          return (
            <motion.div
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ amount: 1, once: true }}
              key={idx}
              className={`w-4/5 mx-auto gap-x-20 flex flex-${
                idx % 2 === 0 ? "row-reverse" : "row"
              } items-center`}
            >
              <motion.div className="relative w-1/2">
                <div className="absolute -top-[70px] -left-[90px] w-[200px] h-[100px] -z-[20]">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#F2F4F8"
                      d="M56.9,-46.8C67.8,-31.7,66.6,-8.4,59.2,9.3C51.8,27.1,38.3,39.2,25.5,40.6C12.8,42,0.8,32.6,-16,26.9C-32.8,21.2,-54.4,19.3,-62.5,7.5C-70.5,-4.3,-65.1,-25.9,-52.4,-41.4C-39.7,-56.9,-19.9,-66.3,1.6,-67.6C23,-68.8,46,-61.9,56.9,-46.8Z"
                      transform="translate(100 100)"
                    />
                  </svg>
                </div>
                <div className={`font-black text-4xl`}>{elem.heading}</div>
                <div className={`font-regular text-2xl `}>
                  {elem.subheading}
                </div>
              </motion.div>

              <motion.div className="w-1/2" variants={cardVariants}>
                <Img src={`/${elem.imgSrc}`} alt="content" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* About Us */}
      <div className={`w-screen mx-auto pt-10 pb-20`}>
        <motion.p
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ amount: 1, once: true }}
          className="text-8xl text-center font-bold font-Proxima-Nova"
          variants={titleVariant}
        >
          Meet the Team.
        </motion.p>

        <div className="w-fit flex flex-row mx-auto gap-x-8 pt-12">
          {teamInfo.map((member, idx) => {
            const cardVariants: Variants = {
              offscreen: {
                opacity: 0,
              },
              onscreen: {
                opacity: 1,
                transition: {
                  bounce: 0.1,
                  duration: 1,
                },
              },
            };
            return (
              <motion.div
                initial={"offscreen"}
                whileInView={"onscreen"}
                viewport={{ amount: 1, once: true }}
                variants={cardVariants}
                key={idx}
                className="flex flex-col gap-y-8 justify-center items-center border-0 w-96 h-96 font-Proxima-Nova rounded-xl shadow-xl"
              >
                <Img width={"90px"} src={"/profile-icon.svg"} />
                <div>
                  <p className="font-bold text-2xl text-center">
                    {member.name}
                  </p>
                  <p className="m-auto font-normal text-xl text-center">
                    {member.role}
                  </p>
                  <p className="m-auto font-normal text-xl text-center">
                    {member.description}
                  </p>
                  <div className="flex pt-8 flex-row gap-x-6 items-center justify-center">
                    <Link href={member.linkedInUrl} target="_blank">
                      <Linkedin />
                    </Link>
                    <Link href={member.githubUrl} target="_blank">
                      <Github />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
