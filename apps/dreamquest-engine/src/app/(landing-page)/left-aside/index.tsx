"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PanelLeftOpen, PlusIcon } from "lucide-react";

import { Button } from "@dq/ui/button";

export function LeftAside() {
  const [rightSideOpen, setRightSideOpen] = useState(true);
  return (
    <motion.aside
      animate={{ width: rightSideOpen ? 256 : 24 }}
      transition={{ duration: 0.2 }}
      className="relative mr-8 hidden h-[calc(100vh-64px)] w-64 border-r px-4 py-8 lg:block"
    >
      {rightSideOpen && (
        <div>
          <p className="text-sm uppercase opacity-80">
            Communities{" "}
            <span className="text-green-600 dark:text-green-300">online</span> •
            4
          </p>
          <div className="my-4" />
          <Link href="/community/create" className="flex items-center gap-x-2">
            <PlusIcon className="h-6 w-6" />
            Create community
          </Link>
        </div>
      )}
      <Button
        onClick={() => setRightSideOpen(!rightSideOpen)}
        variant="secondary"
        size="sm"
        className="absolute -right-6 top-16"
      >
        <motion.div animate={{ rotate: rightSideOpen ? 180 : 0 }}>
          <PanelLeftOpen className="h-6 w-6" />
        </motion.div>
      </Button>
    </motion.aside>
  );
}
