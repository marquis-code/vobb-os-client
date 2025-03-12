import { cn } from "lib";

interface NavBarProps {
  sideBarWidth: string;
  collapse: boolean;
  title: string;
}

const NavBar: React.FC<NavBarProps> = ({ sideBarWidth, collapse, title }) => {
  return (
    <>
      <header
        style={{ width: `calc(100dvw - ${sideBarWidth})`, left: sideBarWidth }}
        className="border-b border-vobb-neutral-30 transition-all duration-300 w-full fixed top-0 right-0 px-4 py-1 h-[55px] flex items-center z-[200] bg-white">
        <div className="flex items-center gap-2">
          <p className={cn(`font-semibold text-black text-lg`, collapse ? "ml-[60px]" : "")}>
            {title}
          </p>
        </div>
      </header>
    </>
  );
};

export { NavBar };
