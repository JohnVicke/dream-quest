"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { cn } from "@dq/ui";
import { Button } from "@dq/ui/button";

export function LeftAside(
  props: React.PropsWithChildren<{ className?: string }>,
) {
  const [rightSideOpen, setRightSideOpen] = useState(true);
  return (
    <motion.aside
      animate={{ width: rightSideOpen ? 256 : 24 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group sticky mr-8 hidden h-full w-64 border-r py-8 pl-4 pr-6 lg:block",
        props.className,
      )}
    >
      {rightSideOpen && props.children}
      <Button
        onClick={() => setRightSideOpen(!rightSideOpen)}
        variant="secondary"
        size="sm"
        className="absolute -right-3 top-40 h-6 w-6 rounded-full p-2"
      >
        <motion.div
          animate={{
            rotate: rightSideOpen ? 180 : 0,
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </motion.div>
      </Button>
    </motion.aside>
  );
}
