import {
  IconArrowNarrowDown,
  IconChartDots3,
  IconChevronDown,
  IconChevronUp,
  IconDeviceSdCard,
  IconDotsVertical,
  IconFolderOpen,
  IconList,
  IconPlus,
  IconSearch,
  IconSubtask,
  IconUsersGroup
} from "@tabler/icons-react";
import { Button, CustomInput } from "components";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Routes } from "router";

interface SidebarLinksProps {
  sideBarWidth: string;
  active: string;
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({ sideBarWidth, active }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clientMode, setClientMode] = useState(true);

  const sections = [
    {
      title: { icon: <IconArrowNarrowDown size={16} color="#494949" />, text: "Placeholder text" }
    },
    {
      title: { icon: <IconFolderOpen size={16} color="#494949" />, text: "Sales + Atlas" },
      items: []
    },
    {
      title: { icon: <IconChartDots3 size={16} color="#494949" />, text: "Pipeline Management" },
      items: [
        {
          title: "Pipelines",
          icon: <IconSubtask size={16} color="#494949" />,
          path: Routes.overview,
          value: "pipelines"
        },
        {
          title: "Clients",
          icon: <IconUsersGroup size={16} color="#494949" />,
          path: Routes.overview,
          value: "clients"
        },
        {
          title: "Lead Form Generation",
          icon: <IconFolderOpen size={16} color="#494949" />,
          path: Routes.overview,
          value: "lead-forms"
        },
        {
          title: "Vobb Drive",
          icon: <IconDeviceSdCard size={16} color="#494949" />,
          path: Routes.overview,
          value: "drive"
        }
      ]
    },
    {
      title: { text: "List" },
      items: [
        {
          title: "Call list",
          icon: <IconList size={16} color="#494949" />,
          path: Routes.overview,
          value: "call-list",
          cta: (
            <Button variant={"ghost"} className="p-0 h-full">
              {" "}
              <IconDotsVertical size={16} color="#494949" />{" "}
            </Button>
          )
        },
        {
          title: "Placeholder 1",
          icon: <IconArrowNarrowDown size={16} color="#494949" />,
          path: Routes.overview,
          value: "placeholder-1"
        },
        {
          title: "Placeholder 2",
          icon: <IconArrowNarrowDown size={16} color="#494949" />,
          path: Routes.overview,
          value: "placeholder-2"
        },
        {
          title: "Placeholder 3",
          icon: <IconArrowNarrowDown size={16} color="#494949" />,
          path: Routes.overview,
          value: "placeholder-3"
        }
      ]
    }
  ];

  return (
    <>
      <div className="p-4 overflow-auto">
        <div className="mb-6">
          <div className="flex justify-between gap-3">
            {clientMode ? (
              <Button
                variant={"outline"}
                className="flex items-center justify-center gap-1 flex-1 rounded-sm shadow-sm">
                <IconPlus size={14} color="#494949" />
                Create new client{" "}
              </Button>
            ) : (
              <CustomInput
                placeholder="Search Pipeline"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<IconSearch size={16} />}
              />
            )}
            <Button variant={"outline"} className="p-2 rounded-sm shadow-sm">
              <IconSearch size={16} color="#494949" onClick={() => setClientMode(!clientMode)} />
            </Button>
          </div>
        </div>

        {sections.map((section) => (
          <SidebarSection
            key={section.title.text}
            title={{
              text: section.title.text,
              icon: section.title.icon
            }}
            items={section.items}
            active={active}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </>
  );
};

interface SidebarSectionProps {
  title: { icon?: React.ReactNode; text: string };
  items?: {
    title: string;
    icon: React.ReactNode;
    path: string;
    value: string;
    cta?: React.ReactNode;
  }[];
  active: string;
  searchQuery: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, items, active, searchQuery }) => {
  const [isOpen, setIsOpen] = useState(true);

  const filteredItems = items?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredItems?.length === 0) return null;

  return (
    <div className="mb-6">
      <div
        className="flex items-center gap-4 py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-1">
          {title.icon && <span>{title.icon}</span>}
          <span>{title.text}</span>
        </div>
        {isOpen ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
      </div>
      {isOpen && (
        <div className="relative pl-4">
          {title.text === "Pipeline Management" && (
            <div className="absolute left-1.5 top-0 h-full border-l border-dashed border-gray-300" />
          )}

          {filteredItems?.map(({ title, icon, path, value, cta }) => (
            <Link
              key={value}
              to={path}
              className={`relative flex items-center justify-between p-2 rounded-md ${
                value === active
                  ? "bg-vobb-neutral-20 before:absolute before:left-[-11px] before:top-[15px] before:h-2 before:w-[2px] before:bg-vobb-primary-70 before:rounded-xl"
                  : "hover:bg-vobb-neutral-20"
              }`}>
              <div className="flex items-center gap-2">
                <span>{icon}</span>
                {title}
              </div>

              {cta && cta}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export { SidebarLinks };
