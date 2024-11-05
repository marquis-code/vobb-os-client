import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "components/ui/breadcrumb";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavBarProps {
  sideBarWidth: string;
  items: { title: string; path?: string }[];
}

const NavBar: React.FC<NavBarProps> = ({ sideBarWidth, items }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Track navigation history
  useEffect(() => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, currentIndex + 1);
      if (location.pathname !== newHistory[newHistory.length - 1]) {
        return [...newHistory, location.pathname];
      }
      return prev;
    });
    setCurrentIndex((prev) => {
      if (location.pathname !== history[prev]) {
        return prev + 1;
      }
      return prev;
    });
  }, [location.pathname]);

  const handleBack = () => {
    if (currentIndex > 0) {
      navigate(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleForward = () => {
    if (currentIndex < history.length - 1) {
      navigate(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };
  console.log(history);
  return (
    <header
      style={{ width: `calc(100dvw - ${sideBarWidth})`, left: sideBarWidth }}
      className="border-b border-vobb-neutral-30 w-full fixed top-0 right-0 px-4 py-1 h-[55px] flex items-center bg-white z-[4]">
      <Breadcrumb>
        <BreadcrumbList className="text-xs">
          {items.length > 2 && (
            <span className="flex gap-2 items-center">
              <IconArrowNarrowLeft
                onClick={handleBack}
                color={currentIndex > 0 ? "#101323" : "#D1D5DB"}
                className={currentIndex > 0 ? "cursor-pointer" : "cursor-not-allowed"}
                size={18}
              />
              <IconArrowNarrowRight
                onClick={handleForward}
                color={currentIndex < history.length - 1 ? "#101323" : "#D1D5DB"}
                className={
                  currentIndex < history.length - 1 ? "cursor-pointer" : "cursor-not-allowed"
                }
                size={18}
              />
            </span>
          )}
          {items?.map((item, index) => (
            <React.Fragment key={index}>
              {item.path ? (
                <BreadcrumbLink href={item.path}>{item.title}</BreadcrumbLink>
              ) : (
                <BreadcrumbItem
                  className={index === items.length - 1 ? "text-vobb-neutral-100 font-medium" : ""}>
                  {item.title}
                </BreadcrumbItem>
              )}
              {index !== items.length - 1 ? <BreadcrumbSeparator /> : ""}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};

export { NavBar };
