import { cn } from "lib";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "components/ui/breadcrumb";

interface NavBarProps {
  sideBarWidth: string;
  title: string;
  parent: string;
}

const NavBar: React.FC<NavBarProps> = ({ sideBarWidth, title, parent }) => {
  return (
    <>
      <header
        style={{ width: `calc(100dvw - ${sideBarWidth})`, left: sideBarWidth }}
        className="border-b border-vobb-neutral-30 w-full fixed top-0 right-0 px-4 py-1 h-[55px] flex items-center bg-white z-1">
        <Breadcrumb>
          <BreadcrumbList className="text-xs">
            <BreadcrumbItem>{parent}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
    </>
  );
};

export { NavBar };
