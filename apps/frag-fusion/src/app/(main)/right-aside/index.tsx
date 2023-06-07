"use client";

import { useState } from "react";
import { Button } from "@ff/ui";
import { motion } from "framer-motion";
import { PanelLeftOpen } from "lucide-react";

export function RightAside() {
  const [rightSideOpen, setRightSideOpen] = useState(true);
  return (
    <motion.aside
      animate={{ width: rightSideOpen ? 256 : 64 }}
      transition={{ duration: 0.2 }}
      className="relative hidden h-[calc(100vh-64px)] w-64 border-l  px-4 py-8 lg:block"
    >
      {rightSideOpen && (
        <p className="text-sm uppercase opacity-80">
          Friends{" "}
          <span className="text-green-600 dark:text-green-300">online</span> • 4
        </p>
      )}
      <Button
        onClick={() => setRightSideOpen(!rightSideOpen)}
        variant="secondary"
        size="sm"
        className="absolute -left-6 top-16"
      >
        <motion.div animate={{ rotate: rightSideOpen ? 0 : 180 }}>
          <PanelLeftOpen className="h-6 w-6" />
        </motion.div>
      </Button>
    </motion.aside>
  );
}
