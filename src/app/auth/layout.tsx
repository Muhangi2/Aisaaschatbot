import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await currentUser();

  if (user) redirect("/");

  return (
    <div className="h-screen flex w-full justify-center bg-gradient-to-b from-[#1e3a8a]/10 to-[#eab308]/10 relative overflow-hidden">
      {/* Corner Gradients with Blue Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#1e3a8a]/30 to-transparent rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#1e3a8a]/30 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#1e3a8a]/30 to-transparent rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-[#1e3a8a]/30 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-cream flex-col pt-5 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          Hi, I’m your AI powered sales assistant, TeraSales AI!
          
        </h2>
        <p className="text-iridium md:text-sm mb-5">
          TeraSales AI is capable of capturing lead information without a form...{" "}
          <br />
          something never done before 😉
        </p>
        <Image
                       src="/images/website-chatbot.webp"
                       width={500}
                       height={600}
                       alt="AI Assistant Demo"
                       className="object-contain relative z-10 rounded-2xl shadow-2xl"
                     />
      </div>
      <div className="w-[600px] ld:w-full flex flex-col items-start p-2">
        {/* <Image
          src="/images/justlogoo.png"
          alt="LOGO"
          sizes="100vw"
          style={{
            width: "20%",
            height: "auto",
          }}
          width={0}
          height={0}
        /> */}
        {children}
      </div>
    </div>
  );
};

export default Layout;