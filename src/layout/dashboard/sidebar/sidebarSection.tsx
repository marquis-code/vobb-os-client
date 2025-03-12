import { IconChevronDown, IconChevronUp, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideBarLink } from "./sidebarLinks";

interface SidebarSectionProps {
  links: SideBarLink[];
  active: string;
  setActive: (value: string) => void;
  searchQuery: string;
  sectionType: "dropdown" | "list";
  sectionTitle?: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  links,
  active,
  setActive,
  searchQuery,
  sectionType,
  sectionTitle
}) => {
  const [expandedLinks, setExpandedLinks] = useState<number[]>([]);
  const [isSectionOpen, setIsSectionOpen] = useState(true);

  const navigate = useNavigate();

  const expandLink = (index: number) => {
    setExpandedLinks((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleLinkClick = (link: SideBarLink, path?: string) => {
    setActive(link.value);
    if (path) {
      navigate(path);
    }
    if (link.linkType === "dropdown" || link.linkType === "standalone-cta") {
      const index = links.findIndex((l) => l.value === link.value);
      expandLink(index);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-start gap-2 last:border-none border-b border-vobb-neutral-30 py-1 px-2">
        {sectionType === "dropdown" && (
          <div
            onClick={() => setIsSectionOpen(!isSectionOpen)}
            className="w-full flex gap-2 items-center cursor-pointer p-2 pb-0 selection:bg-transparent">
            <span className="text-xs text-[#76777C] font-medium">{sectionTitle}</span>
            <IconChevronUp
              size={12}
              stroke={"#000000"}
              strokeWidth={1}
              className={`${!isSectionOpen && "rotate-180"}`}
            />
          </div>
        )}
        {isSectionOpen && (
          <div className="flex flex-col items-start gap-1 py-1 px-4 w-full">
            {links.map((link, index) => (
              <div className="w-full" key={index}>
                {link.linkType !== "standalone" ? (
                  <div
                    className="flex w-full items-center gap-2 py-2 cursor-pointer selection:bg-transparent"
                    onClick={() => handleLinkClick(link, link.path)}>
                    <div
                      className={`flex items-center ${
                        link.linkType === "dropdown" ? "w-auto" : "w-full"
                      } justify-between`}>
                      <div className="flex items-center gap-1">
                        {link.title.icon && link.linkType !== "standalone-cta" ? (
                          <span>{link.title.icon}</span>
                        ) : (
                          <IconChevronDown
                            className={`${expandedLinks.includes(index) && "rotate-180"}`}
                            size={12}
                            stroke={"#000000"}
                            strokeWidth={1}
                          />
                        )}
                        <span className="text-xs text-vobb-neutral-80 font-medium">
                          {link.title.text}
                        </span>
                      </div>

                      {link.linkType === "standalone-cta" && <IconPlus size={12} />}
                    </div>
                    {link.linkType === "dropdown" && (
                      <IconChevronDown
                        size={12}
                        stroke={"#000000"}
                        strokeWidth={1}
                        className={`${expandedLinks.includes(index) && "rotate-180"}`}
                      />
                    )}
                  </div>
                ) : (
                  link.linkType === "standalone" &&
                  link.path && (
                    <div
                      onClick={() => handleLinkClick(link, link.path)}
                      className={`relative flex items-center cursor-pointer justify-between p-2 rounded-md
                          selection:bg-transparent
                          ${
                            active === link.value
                              ? "bg-vobb-neutral-20"
                              : "hover:bg-vobb-neutral-20"
                          }`}>
                      <div className="flex items-center w-full justify-between">
                        <div className="flex items-center gap-1">
                          {link.title.icon && <span>{link.title.icon}</span>}
                          <span className="text-xs text-vobb-neutral-80 font-medium">
                            {link.title.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}

                {expandedLinks.includes(index) && (
                  <div className="relative selection:bg-transparent pl-2">
                    <div className="w-1 h-full absolute left-1 top-0 border-l border-dashed border-vobb-neutral-30"></div>
                    {(link.linkType === "dropdown" || link.linkType === "standalone-cta") &&
                      link.items
                        ?.filter((item) =>
                          item.title.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map(({ title, icon, path, value, cta }) => (
                          <div
                            key={value}
                            onClick={() =>
                              handleLinkClick({ value, path: path } as SideBarLink, path)
                            }
                            className={`relative flex items-center justify-between p-2 rounded-md cursor-pointer ${
                              value === active ? "bg-vobb-neutral-20" : "hover:bg-vobb-neutral-20"
                            }`}>
                            <div className="flex items-center text-vobb-neutral-80 text-xs font-medium gap-2">
                              <span>{icon}</span>
                              {title}
                            </div>

                            {cta && cta}
                          </div>
                        ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export { SidebarSection };
