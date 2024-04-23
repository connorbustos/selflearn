"use client";
import { TypeAnimation } from "react-type-animation";

export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen font-Proxima-Nova">
      {/* main welcome section */}
      <div className="w-full h-[80vh] flex flex-col justify-center items-center gap-y-2">
        <p className="text-8xl font-normal">
          Welcome to <span className="text-8xl font-black">Selflearn.</span>
        </p>
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
      </div>

      {/* banner */}
      <div className="font-bold">banner</div>

      {/* How it works */}
      <div>how it works</div>
    </div>
  );
}
