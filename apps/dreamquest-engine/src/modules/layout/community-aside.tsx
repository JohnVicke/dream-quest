"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlusIcon } from "lucide-react";

import { Community } from "@dq/db";
import { Button } from "@dq/ui/button";

type AsideContentProps = {
  communities: Community[];
};

export function CommunityAside(props: AsideContentProps) {
  return (
    <div>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <Link passHref href="/community/create">
          <Button
            variant="ghost"
            size="sm"
            className="flex w-fit items-center gap-x-2"
          >
            <PlusIcon className="h-6 w-6" />
            Create community
          </Button>
        </Link>
      </motion.div>
      <div className="my-4" />
      <motion.p
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        className="text-sm uppercase opacity-80"
      >
        Communities {props.communities.length}
      </motion.p>
      <div className="my-2" />
      <ul className="flex flex-col gap-2">
        {props.communities.map((community, i) => (
          <motion.li
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.2 + i * 0.1 }}
            key={community.id}
          >
            <Link
              className="hover:underline"
              passHref
              href={`/c/${community.name}`}
            >
              /c/{community.name}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
