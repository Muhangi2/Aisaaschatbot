import { onGetBlogPosts } from "@/actions/landing";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import ChatFrame from "@/components/chatframe/chatFrame";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { getMonthName } from "@/lib/utils";


// Define pricingCards based on the screenshot
const pricingCards = [
  {
    title: "Standard",
    description: "Perfect for trying Tellar AI",
    price: "$0/month",
    features: ["1 domain", "10 contacts", "10 Emails per month"],
  },
  {
    title: "Plus",
    description: "For serious agency owners",
    price: "$67/month",
    features: ["2 domain", "50 contacts", "50 Emails per month"],
  },
  {
    title: "Ultimate",
    description: "The ultimate agency kit",
    price: "$97/month",
    features: ["Unlimited domain", "500 Contacts", "500 Emails"],
  },
];

export default async function Home() {
  // const posts = await onGetBlogPosts();

  return (
    <main className="bg-gradient-to-b from-[#1e3a8a]/10 to-[#eab308]/10 min-h-screen relative overflow-hidden">
      {/* Corner Gradients with Blue Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#1e3a8a]/30 to-transparent rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#1e3a8a]/30 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#1e3a8a]/30 to-transparent rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-[#1e3a8a]/30 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <NavBar />

      {/* Hero Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex flex-col max-w-xl">
              <div className="mb-8">
                <span className="text-[#1e3a8a] bg-gradient-to-r from-[#1e3a8a]/10 to-[#eab308]/10 px-6 py-3 rounded-full text-sm font-medium inline-block shadow-md">
                  An AI powered sales assistant chatbot
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-sans font-extrabold mb-6 text-[#1e3a8a] leading-tight tracking-tight">
                Elevate Your Sales with AI Precision
              </h1>
              <p className="text-lg text-[#4b5563] mb-8 font-sans">
                Unleash TeraSales AI on your website with a simple code snippet and watch your conversions soar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/sign-in">
                <Button className="bg-gradient-to-r from-[#1e3a8a] to-[#60a5fa] hover:from-[#1e2a78] hover:to-[#3b82f6] font-bold text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all">
                  Get Started
                </Button>
                </Link>

                <Link href="/auth/sign-in">
                <Button variant="outline" className="border-[#eab308] text-[#eab308] hover:bg-[#eab308]/10 font-bold px-8 py-6 rounded-full text-lg shadow-md hover:shadow-lg transition-all">
                  Explore Features
                </Button>
                </Link>
              </div>
            </div>
            <div className="relative mt-10 lg:mt-0">
              <div className="absolute -z-10 w-96 h-96 bg-gradient-to-r from-[#1e3a8a]/20 to-[#eab308]/10 rounded-full blur-3xl -top-20 -right-20"></div>
              <Image
                src="/images/website-chatbot.webp"
                width={500}
                height={600}
                alt="AI Assistant Demo"
                className="object-contain relative z-10 rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#fafafa] to-[#f0f0f0] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold mb-4 text-[#1e3a8a] tracking-tight">
              Power Up Your Business
            </h2>
            <p className="text-lg text-[#4b5563] max-w-2xl mx-auto font-sans">
              Discover how TeraSales AI drives growth and engagement effortlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-t-4 border-[#eab308]">
              <div className="bg-[#1e3a8a]/10 p-3 rounded-full w-fit mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1e3a8a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-sans font-bold mb-2 text-[#1e3a8a]">Seamless Setup</h3>
              <p className="text-[#4b5563] font-sans">
                Integrate TeraSales AI into your website in just minutes—no technical skills or coding expertise required.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-t-4 border-[#eab308]">
              <div className="bg-[#1e3a8a]/10 p-3 rounded-full w-fit mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1e3a8a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 16V8"></path>
                  <path d="M8 12h8"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-sans font-bold mb-2 text-[#1e3a8a]">Always On</h3>
              <p className="text-[#4b5563] font-sans">
                Engage your customers 24/7 with an AI that never sleeps, ensuring you capture every lead and opportunity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-t-4 border-[#eab308]">
              <div className="bg-[#1e3a8a]/10 p-3 rounded-full w-fit mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1e3a8a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h20"></path>
                  <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
                  <path d="m7 15 5 6 5-6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-sans font-bold mb-2 text-[#1e3a8a]">Smart Responses</h3>
              <p className="text-[#4b5563] font-sans">
                Deliver personalized, context-aware replies to each visitor, enhancing engagement and boosting conversions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-t-4 border-[#eab308]">
              <div className="bg-[#1e3a8a]/10 p-3 rounded-full w-fit mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1e3a8a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-sans font-bold mb-2 text-[#1e3a8a]">Email Marketing</h3>
              <p className="text-[#4b5563] font-sans">
                Automate targeted email campaigns to nurture leads, drive sales, and keep your audience engaged effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold mb-4 text-[#1e3a8a] tracking-tight">
              Choose What Fits You Right
            </h2>
            <p className="text-lg text-[#4b5563] max-w-2xl mx-auto font-sans">
              Our straightforward pricing plans are tailored to meet your needs. If you're not ready to commit you can get started for free.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {pricingCards.map((card) => (
              <Card
                key={card.title}
                className="bg-white shadow-lg hover:shadow-xl transition-all rounded-2xl border-t-4 border-[#eab308]"
              >
                <CardHeader>
                  <CardTitle className="text-[#1e3a8a] font-sans font-bold">{card.title}</CardTitle>
                  <CardDescription className="text-[#4b5563]">{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-[#1e3a8a]">{card.price}</p>
                  <ul className="mt-4 space-y-2">
                    {card.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-[#4b5563] font-sans">
                        <Check className="w-5 h-5 text-[#1e3a8a] mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-[#1e3a8a] to-[#60a5fa] hover:from-[#1e2a78] hover:to-[#3b82f6] text-white font-bold rounded-full w-full">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-[#1e3a8a]/10 to-[#eab308]/10 py-12 px-6 text-[#1e3a8a] relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-sans font-bold mb-4">TeraSales AI</h3>
            <p className="text-sm font-sans">
              Supercharge your sales with cutting-edge AI technology.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-sans font-bold mb-4">Navigation</h3>
            <ul className="text-sm font-sans space-y-2">
              <li><Link href="/" className="hover:text-[#eab308] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#eab308] transition-colors">About</Link></li>
              <li><Link href="/pricing" className="hover:text-[#eab308] transition-colors">Pricing</Link></li>
              <li><Link href="/features" className="hover:text-[#eab308] transition-colors">Features</Link></li>
              <li><Link href="/blog" className="hover:text-[#eab308] transition-colors">Blog</Link></li>
              <li><Link href="/support" className="hover:text-[#eab308] transition-colors">Support</Link></li>
              <li><Link href="/contact" className="hover:text-[#eab308] transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-sans font-bold mb-4">Get in Touch</h3>
            <p className="text-sm font-sans">
              Email: hello@terasales.ai<br />
              Phone: (555) 123-4567<br />
              Address: 456 Innovation St, Future City
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm font-sans">
          © {new Date().getFullYear()} TeraSales AI. All rights reserved.
        </div>
      </footer>
      <ChatFrame/>
    </main>
  );
}