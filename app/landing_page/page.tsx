"use client";
import { TypeAnimation } from "react-type-animation";
import { Variants, motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { ChevronsDown } from "lucide-react";
import { useEffect, useRef } from "react";

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

const cardVariants: Variants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 },
};

export default function LandingPage() {
  const control = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, isInView]);
  return (
    <div className="w-screen h-screen font-Proxima-Nova">
      <link rel="stylesheet" href="https://use.typekit.net/urj3apl.css" />
      {/* main welcome section */}
      <div className="w-full min-h-screen flex flex-col justify-center items-center gap-y-2 relative">
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
      <div className="w-full flex flex-col gap-y-14" ref={ref}>
        {bannerContent.map((elem, idx) => {
          return (
            <div
              key={idx}
              className={`w-4/5 mx-auto gap-x-6 flex flex-${
                idx % 2 === 0 ? "row-reverse" : "row"
              }`}
            >
              <motion.div variants={cardVariants} className="w-1/2">
                <div className="font-black text-4xl">{elem.heading}</div>
                <div className="font-regular text-2xl">{elem.subheading}</div>
              </motion.div>
              <Image
                className="w-1/2"
                width={100}
                height={100}
                src={`/${elem.imgSrc}`}
                alt="content"
              />
            </div>
          );
        })}
      </div>

      {/* How it works */}
      <div>how it works</div>
    </div>
  );
}
