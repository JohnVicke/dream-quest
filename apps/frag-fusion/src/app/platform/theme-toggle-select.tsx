"use client";

import { useEffect, useState } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Select,
  SelectContent,
  SelectItemNoIndicator,
  SelectTrigger,
  SelectValue,
} from "@ff/ui";

export function ThemeToggleSelect() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const TriggerIcon = theme === "dark" ? Moon : Sun;

  return (
    <Select onValueChange={setTheme}>
      <SelectTrigger removeChevron className="w-fit">
        <SelectValue placeholder={<TriggerIcon />}>
          <TriggerIcon />
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItemNoIndicator
          value="light"
          className="flex items-center gap-x-2"
        >
          <Sun />
          <span>Light</span>
        </SelectItemNoIndicator>
        <SelectItemNoIndicator
          value="dark"
          className="flex items-center gap-x-2"
        >
          <Moon />
          Dark
        </SelectItemNoIndicator>
        <SelectItemNoIndicator
          className="flex items-center gap-x-2"
          value="system"
        >
          <Laptop />
          System
        </SelectItemNoIndicator>
      </SelectContent>
    </Select>
  );
}
