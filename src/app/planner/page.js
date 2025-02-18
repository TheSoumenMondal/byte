"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateTravelItinerary } from "@/config/generatePlan.js";
import Markdown from "react-markdown";

const Page = () => {
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: "",
    preferences: [],
    additionalDetails: "",
  });

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      preferences: checked
        ? [...prev.preferences, name]
        : prev.preferences.filter((pref) => pref !== name),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setItinerary("Generating travel plan...");
    try {
      const res = await generateTravelItinerary(formData);
      setItinerary(
        typeof res === "string" ? res : JSON.stringify(res, null, 2)
      );
    } catch (error) {
      console.error("Error generating itinerary:", error);
      setItinerary("An error occurred while generating the itinerary.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-auto bg-gradient-to-b from-blue-900 to-gray-900 text-white flex flex-col md:flex-row items-center justify-center px-6 py-12 gap-6">
      <div className="w-full md:w-[35%] bg-white bg-opacity-10 p-8 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center text-white">
            Plan Your Dream Trip
          </h2>

          <Input
            name="destination"
            onChange={handleChange}
            placeholder="Enter your destination"
            value={formData.destination}
            className="text-gray-900 px-4 py-2 border border-indigo-300 rounded-lg focus:ring-indigo-500"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              name="startDate"
              onChange={handleChange}
              value={formData.startDate}
              className="text-gray-900 px-4 py-2 border border-indigo-300 rounded-lg focus:ring-indigo-500"
            />
            <Input
              type="date"
              name="endDate"
              onChange={handleChange}
              value={formData.endDate}
              className="text-gray-900 px-4 py-2 border border-indigo-300 rounded-lg focus:ring-indigo-500"
            />
          </div>

          <Input
            type="number"
            name="budget"
            onChange={handleChange}
            placeholder="Enter your budget"
            value={formData.budget}
            className="text-gray-900 px-4 py-2 border border-indigo-300 rounded-lg focus:ring-indigo-500"
          />

          <Input
            type="number"
            name="travelers"
            onChange={handleChange}
            placeholder="Number of travelers"
            value={formData.travelers}
            className="text-gray-900 px-4 py-2 border border-indigo-300 rounded-lg focus:ring-indigo-500"
          />

          <div>
            <p className="text-sm font-semibold text-white mb-2">Preferences</p>
            <div className="flex flex-wrap gap-3">
              {["Culture", "Adventure", "Relaxation", "Food"].map((pref) => (
                <label
                  key={pref}
                  className="flex items-center gap-2 text-white"
                >
                  <Checkbox
                    name={pref}
                    checked={formData.preferences.includes(pref)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(pref, checked)
                    }
                    className="text-indigo-600"
                  />
                  {pref}
                </label>
              ))}
            </div>
          </div>

          <Input
            name="additionalDetails"
            onChange={handleChange}
            placeholder="Any specific requests or details?"
            value={formData.additionalDetails}
            className="text-gray-900 px-4 py-2 border border-indigo-300 rounded-lg focus:ring-indigo-500"
          />

          <Button
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg shadow-lg"
            disabled={loading}
          >
            {loading ? "Generating..." : "Get my Travel Plan"}
          </Button>
        </form>
      </div>

      <div className="w-full md:w-[60%] h-full bg-white bg-opacity-10 p-6 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20">
        <ScrollArea className="overflow-auto h-[80vh]">
          <Markdown className="text-white text-lg leading-relaxed">
            {itinerary}
          </Markdown>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Page;
