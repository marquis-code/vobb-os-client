import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "lib";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface SidebarSectionProps {
  title: string;
  items: {
    title: string;
    icon: React.ReactNode;
    path: string;
    value: string;
  }[];
  active: string;
  searchQuery: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, items, active, searchQuery }) => {
  const [isOpen, setIsOpen] = useState(true);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div
        className="flex gap-1 items-center cursor-pointer py-2 text-vobb-neutral-70"
        onClick={() => setIsOpen(!isOpen)}>
        <p className="text-xs">{title}</p>
        {isOpen ? (
          <ChevronDownIcon width={14} height={14} color="#101323" />
        ) : (
          <ChevronRightIcon width={14} height={14} color="#101323" />
        )}
      </div>
      {isOpen &&
        filteredItems.map(({ icon, title, value, path }) => (
          <Link
            key={value}
            className={cn(
              "flex items-center gap-2 w-full hover:bg-gray-100 p-2 rounded-md mb-1",
              value === active ? "bg-gray-100 font-semibold" : ""
            )}
            to={path}
            data-testid={`${title}-link`}>
            {icon}
            {title}
          </Link>
        ))}
    </div>
  );
};

export { SidebarSection };
