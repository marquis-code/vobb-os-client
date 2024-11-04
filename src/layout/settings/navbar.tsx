import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "components/ui/breadcrumb";
import React from "react";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  sideBarWidth: string;
  items: { title: string; path?: string }[];
}

const NavBar: React.FC<NavBarProps> = ({ sideBarWidth, items }) => {
  const navigate = useNavigate();

  return (
    <>
      <header
        style={{ width: `calc(100dvw - ${sideBarWidth})`, left: sideBarWidth }}
        className="border-b border-vobb-neutral-30 w-full fixed top-0 right-0 px-4 py-1 h-[55px] flex items-center bg-white z-[4]">
        <Breadcrumb>
          <BreadcrumbList className="text-xs">
            {items.length > 2 && (
              <span className="flex gap-2 items-center">
                <IconArrowNarrowLeft
                  onClick={() => navigate(-1)}
                  color="#101323"
                  size={18}
                  className="cursor-pointer"
                />
                {items.length > 1 && (
                  <IconArrowNarrowRight
                    onClick={() => navigate(+1)}
                    color="#101323"
                    size={18}
                    className="cursor-pointer"
                  />
                )}
              </span>
            )}
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.path ? (
                  <BreadcrumbLink href={item.path}>{item.title}</BreadcrumbLink>
                ) : (
                  <BreadcrumbItem
                    className={
                      index === items.length - 1 ? "text-vobb-neutral-100 font-medium" : ""
                    }>
                    {item.title}
                  </BreadcrumbItem>
                )}
                {index !== items.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </header>
    </>
  );
};

export { NavBar };
