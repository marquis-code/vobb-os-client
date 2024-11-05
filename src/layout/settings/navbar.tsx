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
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      navigate(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      navigate(history[newIndex]);
    }
  };
  useEffect(() => {
    setHistory((prevHistory) => {
      if (location.pathname !== prevHistory[prevHistory.length - 1]) {
        return [...prevHistory, location.pathname];
      }
      return prevHistory;
    });
    setCurrentIndex(history.length);
  }, [location.pathname]);

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
