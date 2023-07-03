"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@dq/ui/button";

export function SettingsAside() {
  const router = useRouter();
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
      className="flex flex-col gap-y-4"
    >
      <Button
        onClick={() => router.back()}
        size="sm"
        className="flex w-full items-center gap-x-2"
      >
        <ArrowLeftIcon className="h-6 w-6" />
        Exit settings
      </Button>
      <div className="my-2" />
      <ul className="flex flex-col">
        {sections.map((section, i) => (
          <li key={`${section.section}-${i}`}>
            <p className="text-xs uppercase opacity-80">{section.section}</p>
            <ul className="flex flex-col gap-2">
              {section.links.map((link, j) => (
                <Link
                  key={`${link.name}-${j}`}
                  className="hover:underline"
                  passHref
                  href={`/${link.href}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="my-2 h-1 bg-background/50" />
            </ul>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

type Section = {
  section: string;
  links: {
    href: string;
    name: string;
  }[];
};

const sections: Section[] = [
  {
    section: "Appearance",
    links: [
      {
        href: "appearance",
        name: "Appearance",
      },
    ],
  },
];
