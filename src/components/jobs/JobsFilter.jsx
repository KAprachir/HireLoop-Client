"use client";

import { TextField, Label, Input, Select, ListBox } from "@heroui/react";
import { Magnifier } from "@gravity-ui/icons";

export default function JobFilters({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  isRemoteOnly,
  setIsRemoteOnly,
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-8">
      {/* Keyword Input Field */}
      <TextField name="search" className="w-full">
        <Label className="text-zinc-400 text-sm font-medium mb-1.5 block">
          Search Jobs
        </Label>
        <div className="relative flex items-center">
          <Magnifier className="absolute left-3 text-zinc-500 w-4 h-4 z-10" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Title, company, skills..."
            className="pl-9 w-full bg-zinc-950 border border-zinc-800 rounded-xl text-white py-2 px-3 text-sm focus:outline-none focus:border-zinc-700 transition"
          />
        </div>
      </TextField>

      {/* Employment Type Selector */}
      <Select
        className="w-full"
        placeholder="All Types"
        value={selectedType}
        onChange={(val) => setSelectedType(val || "all")}
      >
        <Label className="text-zinc-400 text-sm font-medium mb-1.5 block">
          Job Type
        </Label>
        <Select.Trigger className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-white p-2 text-sm flex justify-between items-center">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl p-1 text-white shadow-xl z-50">
          <ListBox>
            <ListBox.Item
              id="all"
              className="p-2 rounded-lg hover:bg-zinc-800 cursor-pointer text-sm"
            >
              All Types
            </ListBox.Item>
            <ListBox.Item
              id="full-time"
              className="p-2 rounded-lg hover:bg-zinc-800 cursor-pointer text-sm"
            >
              Full-time
            </ListBox.Item>
            <ListBox.Item
              id="part-time"
              className="p-2 rounded-lg hover:bg-zinc-800 cursor-pointer text-sm"
            >
              Part-time
            </ListBox.Item>
            <ListBox.Item
              id="contract"
              className="p-2 rounded-lg hover:bg-zinc-800 cursor-pointer text-sm"
            >
              Contract
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      {/* Domain Category Selector */}
      <Select
        className="w-full"
        placeholder="All Categories"
        value={selectedCategory}
        onChange={(val) => setSelectedCategory(val || "all")}
      >
        <Label className="text-zinc-400 text-sm font-medium mb-1.5 block">
          Category
        </Label>
        <Select.Trigger className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-white p-2 text-sm flex justify-between items-center">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl p-1 text-white shadow-xl z-50">
          <ListBox>
            <ListBox.Item
              id="all"
              className="p-2 rounded-lg hover:bg-zinc-800 cursor-pointer text-sm"
            >
              All Categories
            </ListBox.Item>
            <ListBox.Item
              id="technology"
              className="p-2 rounded-lg hover:bg-zinc-800 cursor-pointer text-sm"
            >
              Technology
            </ListBox.Item>
            <ListBox.Item
              id="design"
              className="p-2 rounded-lg hover:bg-zinc-800 cursor-pointer text-sm"
            >
              Design
            </ListBox.Item>
            <ListBox.Item
              id="marketing"
              className="p-2 rounded-lg hover:bg-zinc-800 cursor-pointer text-sm"
            >
              Marketing
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      {/* Location / Remote Setup Selector */}
      <Select
        className="w-full"
        placeholder="All Workplaces"
        value={isRemoteOnly ? "remote" : "all"}
        onChange={(val) => setIsRemoteOnly(val === "remote")}
      >
        <Label className="text-zinc-400 text-sm font-medium mb-1.5 block">
          Workplace
        </Label>
        <Select.Trigger className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-white p-2 text-sm flex justify-between items-center">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl p-1 text-white shadow-xl z-50">
          <ListBox>
            <ListBox.Item
              id="all"
              className="p-2 rounded-lg hover:bg-zinc-800 cursor-pointer text-sm"
            >
              All Locations
            </ListBox.Item>
            <ListBox.Item
              id="remote"
              className="p-2 rounded-lg hover:bg-zinc-800 cursor-pointer text-sm"
            >
              Remote Only
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}
