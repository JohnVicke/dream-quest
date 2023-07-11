"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@dq/ui";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@dq/ui/popover";
import { ScrollArea } from "@dq/ui/scroll-area";

import ThemeToggleSelect from "./theme-toggle-select";

export function MobileDropdown(props: {}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="group relative">
          <div className="relative flex h-8 w-8 transform items-center justify-center overflow-hidden rounded-full shadow-md transition-all duration-200">
            <div className="flex h-[20px] w-[20px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300">
              <div className="h-[2px] w-full origin-left transform bg-white transition-all duration-300 group-focus:translate-x-10"></div>
              <div className="h-[2px] w-full transform rounded bg-white transition-all duration-300 delay-75 group-focus:translate-x-10"></div>
              <div className="h-[2px] w-full origin-left transform bg-white transition-all duration-300 delay-150 group-focus:translate-x-10"></div>

              <div className="absolute top-2.5 flex w-0 -translate-x-10 transform items-center justify-between transition-all duration-500 group-focus:w-12 group-focus:translate-x-0">
                <div className="absolute h-[2px] w-5 rotate-0 transform bg-white transition-all duration-500 delay-300 group-focus:rotate-45"></div>
                <div className="absolute h-[2px] w-5 -rotate-0 transform bg-white transition-all duration-500 delay-300 group-focus:-rotate-45"></div>
              </div>
            </div>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="z-40 mt-2 h-[calc(100vh-4rem)] w-screen animate-none rounded-none border-none bg-background transition-transform md:hidden">
        <ScrollArea className="pb-8">
          {props?.items?.docs?.map((item, index) => (
            <div key={index} className="flex flex-col space-y-3 pt-6">
              <h4 className="font-bold">{item.title}</h4>
              {item?.items?.length &&
                item.items.map((item) => (
                  <PopoverClose asChild key={item.href}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex py-1 text-base font-medium text-muted-foreground transition-colors hover:text-primary",
                          item.href === pathname && "text-foreground",
                        )}
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noreferrer" : ""}
                      >
                        {item.title}
                        {item.label && (
                          <span className="ml-2 rounded-md bg-teal-100 px-1.5 py-0.5 text-xs no-underline group-hover:no-underline dark:bg-teal-600">
                            {item.label}
                          </span>
                        )}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </PopoverClose>
                ))}
            </div>
          ))}
        </ScrollArea>
        <div className="border-t pt-4">
          <ThemeToggleSelect />
        </div>
      </PopoverContent>
    </Popover>
  );
}
