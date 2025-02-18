import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGlobe, FaMapMarkedAlt, FaRobot, FaArrowRight } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
      {/* Hero Section */}
      <div className="text-center flex flex-col items-center justify-center max-w-3xl">
        <h1 className="text-5xl font-bold mb-4">Plan Your Perfect Trip with AI</h1>
        <p className="text-lg text-gray-300 mb-6">
          Our AI-powered travel guide, powered by Gemini API, curates personalized itineraries and travel insights just for you.
        </p>
        <Link  href="/planner">
          <Button className="bg-green-500 hover:bg-green-600  px-6 py-3 flex items-center gap-2">
            Get Started <FaArrowRight />
          </Button>
        </Link>
      </div>
      
      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <FeatureCard icon={<FaGlobe size={32} />} title="Discover Destinations" description="Explore top travel destinations with curated insights." />
        <FeatureCard icon={<FaMapMarkedAlt size={32} />} title="AI-Powered Itineraries" description="Get personalized travel plans tailored to your preferences." />
        <FeatureCard icon={<FaRobot size={32} />} title="Smart Recommendations" description="Let AI suggest the best places to visit and dine." />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default LandingPage;
