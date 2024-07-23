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
  items: { title: string; path?: string }[];
}

const NavBar: React.FC<NavBarProps> = ({ sideBarWidth, items }) => {
  return (
    <>
      <header
        style={{ width: `calc(100dvw - ${sideBarWidth})`, left: sideBarWidth }}
        className="border-b border-vobb-neutral-30 w-full fixed top-0 right-0 px-4 py-1 h-[55px] flex items-center bg-white z-[4]">
        <Breadcrumb>
          <BreadcrumbList className="text-xs">
            {items?.map((item, index) => (
              <>
                {item.path ? (
                  <BreadcrumbLink href={item.path}>{item.title}</BreadcrumbLink>
                ) : (
                  <BreadcrumbItem>{item.title}</BreadcrumbItem>
                )}
                {index !== items.length - 1 ? <BreadcrumbSeparator /> : ""}
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </header>
    </>
  );
};

export { NavBar };
