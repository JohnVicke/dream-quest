"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItemNoIndicator,
  SelectTrigger,
  SelectValue,
} from "@ff/ui";
import { Laptop, Loader2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggleSelect() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const TriggerIcon = theme === "dark" ? Moon : Sun;

  const toggleTheme = (value: string) => {
    if (!mounted) return;
    if (theme === value) return;
    if (value === "system") return setTheme(systemTheme!);
    setTheme(value);
  };

  return (
    <Select onValueChange={toggleTheme}>
      <SelectTrigger removeChevron className="w-fit">
        <SelectValue>
          {mounted ? <TriggerIcon /> : <Loader2 className="animate-spin" />}
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
        {systemTheme && (
          <SelectItemNoIndicator
            className="flex items-center gap-x-2"
            value="system"
          >
            <Laptop />
            System
          </SelectItemNoIndicator>
        )}
      </SelectContent>
    </Select>
  );
}
