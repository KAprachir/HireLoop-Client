"use client";

import React from "react";
import { Card } from "@heroui/react";

/**
 * Updated StatsGrid Component
 * Fully expands across its parent container while keeping p-4 padding.
 */
export default function StatsGrid({ stats = [] }) {
  return (
    // The wrapper retains p-4 and expands to full available width
    <div className="w-full p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {stats.map((item, index) => {
          const IconComponent = item.icon;

          return (
            <Card
              key={index}
              className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 shadow-sm w-full"
            >
              <Card.Header className="flex flex-col items-start gap-4 p-0 w-full">
                {/* Icon Container */}
                {IconComponent && (
                  <div className="flex items-center justify-center p-2.5 rounded-lg bg-[#27272a] text-white">
                    <IconComponent className="w-5 h-5" />
                  </div>
                )}

                {/* Text Titles */}
                <div className="flex flex-col gap-1 items-start w-full">
                  <span className="text-xs font-normal text-[#a1a1aa] whitespace-nowrap">
                    {item.title}
                  </span>
                  <span className="text-2xl font-semibold text-white tracking-tight">
                    {item.value}
                  </span>
                </div>
              </Card.Header>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
