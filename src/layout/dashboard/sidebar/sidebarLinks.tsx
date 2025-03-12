import {
  IconAd2,
  IconBell,
  IconCaretRight,
  IconChartLine,
  IconClipboard,
  IconFiles,
  IconFolderOpen,
  IconLayoutDashboard,
  IconPlus,
  IconSearch,
  IconSubtask,
  IconUserCircle
} from "@tabler/icons-react";
import { Button, CustomInput } from "components";
import React, { useState } from "react";
import { Routes } from "router";
import { SidebarSection } from "./sidebarSection";

interface SidebarLinksProps {
  sideBarWidth: string;
  active: string;
}

interface LinkTitle {
  icon?: React.ReactNode;
  text: string;
}
interface DropdownItems {
  title: string;
  icon: React.ReactNode;
  path: string;
  value: string;
  cta?: React.ReactNode;
}
export interface SideBarLink {
  title: LinkTitle;
  linkType?: "dropdown" | "standalone-cta" | "standalone";
  items?: DropdownItems[];
  path?: string;
  value: string;
}
interface SidebarSection {
  links: SideBarLink[];
  sectionTitle?: string;
  sectionType: "dropdown" | "list";
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({ active }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clientMode, setClientMode] = useState(true);
  const [activeLink, setActiveLink] = useState(active);

  const sections: SidebarSection[] = [
    {
      sectionType: "list",
      links: [
        {
          title: {
            icon: <IconLayoutDashboard size={16} color="#494949" />,
            text: "Overview"
          },
          linkType: "standalone",
          path: Routes.overview,
          value: "overview"
        },
        {
          title: {
            icon: <IconBell size={16} color="#494949" />,
            text: "Notifications"
          },
          linkType: "standalone",
          path: Routes.overview,
          value: "notifications"
        },
        {
          title: {
            icon: <IconClipboard size={16} color="#494949" />,
            text: "Tasks"
          },
          linkType: "standalone",
          path: Routes.overview,
          value: "tasks"
        }
      ]
    },
    {
      sectionType: "list",
      links: [
        {
          title: { icon: <IconUserCircle size={16} color="#494949" />, text: "Clients" },
          linkType: "standalone",
          path: Routes.overview,
          value: "clients"
        },
        {
          title: { text: "Pipeline" },
          linkType: "standalone-cta",
          value: "pipeline",
          items: [
            {
              title: "Pipelines",
              icon: <IconSubtask size={16} color="#494949" />,
              path: Routes.pipelines,
              value: "pipelines"
            },
            {
              title: "Pipeline name",
              icon: <IconSubtask size={16} color="#494949" />,
              path: Routes.pipelines,
              value: "Pipelines"
            }
          ]
        },
        {
          title: { icon: <IconFiles size={16} color="#494949" />, text: "Forms" },
          linkType: "standalone",
          path: Routes.overview,
          value: "forms"
        },
        {
          title: { text: "Lists" },
          linkType: "standalone-cta",
          path: Routes.overview,
          value: "lists"
        },
        {
          title: { text: "Packages" },
          linkType: "standalone-cta",
          path: Routes.overview,
          value: "packages"
        },
        {
          title: {
            icon: <IconFolderOpen size={16} color="#494949" />,
            text: "Sales"
          },
          linkType: "dropdown",
          items: [
            {
              title: "Sales 1",
              icon: <IconSubtask size={16} color="#494949" />,
              path: Routes.overview,
              value: "sales"
            }
          ],
          value: "sales"
        },
        {
          title: {
            icon: <IconCaretRight size={16} color="#494949" />,
            text: "Automations"
          },
          linkType: "dropdown",
          items: [
            {
              title: "Automation 1",
              icon: <IconSubtask size={16} color="#494949" />,
              path: Routes.overview,
              value: "automation"
            }
          ],
          value: "automations"
        }
      ]
    },
    {
      sectionTitle: "More products",
      sectionType: "dropdown",
      links: [
        {
          title: { text: "Drive", icon: <IconFolderOpen size={16} color="#494949" /> },
          path: Routes.drive,
          linkType: "standalone",
          value: "drive"
        },
        {
          title: { text: "Sendup", icon: <IconAd2 size={16} color="#494949" /> },
          path: Routes.overview,
          linkType: "standalone",
          value: "sendup"
        },
        {
          title: { text: "Books", icon: <IconChartLine size={16} color="#494949" /> },
          path: Routes.overview,
          linkType: "standalone",
          value: "books"
        }
      ]
    }
  ];

  return (
    <>
      <div className="overflow-auto h-[80vh] no-scrollbar">
        <div className="px-4 py-2 border-b border-vobb-neutral-30">
          <div className="flex justify-around gap-3">
            {clientMode ? (
              <Button
                variant={"outline"}
                className="flex items-center justify-center gap-1 flex-1 rounded-sm shadow-sm border-[#DDDFE5] text-vobb-neutral-80 font-medium text-xs">
                <IconPlus size={14} color="#494949" />
                Create new client{" "}
              </Button>
            ) : (
              <CustomInput
                placeholder="Search Pipeline"
                value={searchQuery}
                parentClassName="mb-0"
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<IconSearch size={14} />}
              />
            )}
            <Button variant={"outline"} className="p-2 rounded-sm shadow-sm border-[#DDDFE5">
              <IconSearch size={14} color="#494949" onClick={() => setClientMode(!clientMode)} />
            </Button>
          </div>
        </div>

        <div className="">
          {sections.map((section, index) => (
            <SidebarSection
              key={index}
              links={section.links}
              sectionType={section.sectionType}
              active={activeLink}
              setActive={setActiveLink}
              searchQuery={searchQuery}
              sectionTitle={section.sectionTitle}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export { SidebarLinks };
