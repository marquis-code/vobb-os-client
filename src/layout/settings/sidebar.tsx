import logo from "../../assets/vectors/illustrations/logoIcon.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import {
  AllSidesIcon,
  ArrowLeftIcon,
  BackpackIcon,
  BadgeIcon,
  BellIcon,
  CardStackIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  FaceIcon,
  FileTextIcon,
  GridIcon,
  HomeIcon,
  IdCardIcon,
  LockClosedIcon,
  MagicWandIcon,
  MoveIcon,
  PaperPlaneIcon,
  PersonIcon,
  PlusCircledIcon
} from "@radix-ui/react-icons";
import { useState } from "react";
import { ChevronLeftDoubleIcon, MailIcon } from "assets";
import { Button } from "components";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "router";
import { cn } from "lib";

interface SideBarProps {
  sideBarWidth: string;
  active: string;
}

const SideBar: React.FC<SideBarProps> = ({ sideBarWidth, active }) => {
  const navigate = useNavigate();

  const accountItems = [
    {
      title: "Profile",
      icon: <PersonIcon width={14} height={14} color="#101323" />,
      path: Routes.profile,
      value: "profile"
    },
    {
      title: "Security",
      icon: <LockClosedIcon width={14} height={14} color="#101323" />,
      path: Routes.security,
      value: "security"
    },
    {
      title: "Personalizations",
      icon: <FaceIcon width={14} height={14} color="#101323" />,
      path: Routes.personalizations,
      value: "personalizations"
    },
    {
      title: "Notifications",
      icon: <BellIcon width={14} height={14} color="#101323" />,
      path: Routes.profile,
      value: "notifications"
    }
  ];

  const orgItems = [
    {
      title: "Organization",
      icon: <BackpackIcon width={14} height={14} color="#101323" />,
      path: Routes.organization,
      value: "organization"
    },
    {
      title: "Branches",
      icon: <HomeIcon width={14} height={14} color="#101323" />,
      path: Routes.branches,
      value: "branches"
    },
    {
      title: "Bank Accounts",
      icon: <CardStackIcon width={14} height={14} color="#101323" />,
      path: Routes.profile,
      value: "bank accounts"
    },
    {
      title: "Branding",
      icon: <GridIcon width={14} height={14} color="#101323" />,
      path: Routes.profile,
      value: "notifications"
    },
    {
      title: "Billing",
      icon: <FileTextIcon width={14} height={14} color="#101323" />,
      path: Routes.profile,
      value: "notifications"
    },
    {
      title: "Communication",
      icon: <PaperPlaneIcon width={14} height={14} color="#101323" />,
      path: Routes.profile,
      value: "notifications"
    },
    {
      title: "Attributes",
      icon: <MagicWandIcon width={14} height={14} color="#101323" />,
      path: Routes.profile,
      value: "notifications"
    },
    {
      title: "Integrations",
      icon: <PlusCircledIcon width={14} height={14} color="#101323" />,
      path: Routes.profile,
      value: "migration"
    },
    {
      title: "Migration from another CRM",
      icon: <AllSidesIcon width={14} height={14} color="#101323" />,
      path: Routes.profile,
      value: "migration"
    }
  ];

  const reportItems = [
    {
      title: "Reports",
      icon: <MoveIcon width={14} height={14} color="#101323" />,
      path: Routes.profile,
      value: "reports"
    }
  ];

  const automationItems = [
    {
      title: "Workflows",
      icon: <MoveIcon width={14} height={14} color="#101323" />,
      path: Routes.profile,
      value: "profile"
    }
  ];
  return (
    <aside
      style={{ width: sideBarWidth }}
      className="border-r border-vobb-neutral-30 h-full fixed top-0 left-0">
      <div className="border-b border-vobb-neutral-30 px-4 py-1 h-[55px] flex items-center">
        <Button onClick={() => navigate(Routes.overview)} variant={"ghost"} size={"icon"}>
          <ChevronLeftIcon />
        </Button>
        <p className="ml-2 font-workSans font-bold text-lg">Settings</p>
      </div>
      <section style={{ height: "calc(100dvh - 55px)" }} className="p-4 overflow-auto no-scrollbar">
        <div className="mb-6">
          <p className="text-xs text-vobb-neutral-50 mb-2 font-light">Account</p>
          {accountItems.map(({ icon, title, value, path }) => (
            <Link
              key={value}
              className={cn(
                "flex items-center gap-2 w-full hover:bg-vobb-neutral-10 p-2 rounded-md text-vobb-neutral-100 font-medium mb-1",
                value === active ? "bg-vobb-neutral-10 font-semibold" : ""
              )}
              to={path}>
              {icon}
              {title}
            </Link>
          ))}
        </div>
        <div className="mb-6">
          <p className="text-xs text-vobb-neutral-50 mb-2 font-light">Workspace</p>
          {orgItems.map(({ icon, title, value, path }) => (
            <Link
              key={value}
              className={cn(
                "flex items-center gap-2 w-full hover:bg-vobb-neutral-10 p-2 rounded-md text-vobb-neutral-100 font-medium mb-1",
                value === active ? "bg-vobb-neutral-10 font-semibold" : ""
              )}
              to={path}>
              {icon}
              {title}
            </Link>
          ))}
        </div>
        <div className="mb-6">
          <p className="text-xs text-vobb-neutral-50 mb-2 font-light">Reports</p>
          {reportItems.map(({ icon, title, value, path }) => (
            <Link
              key={value}
              className={cn(
                "flex items-center gap-2 w-full hover:bg-vobb-neutral-10 p-2 rounded-md text-vobb-neutral-100 font-medium mb-1",
                value === active ? "bg-vobb-neutral-10 font-semibold" : ""
              )}
              to={path}>
              {icon}
              {title}
            </Link>
          ))}
        </div>
        <div className="mb-0">
          <p className="text-xs text-vobb-neutral-50 mb-2 font-light">Automations</p>
          {automationItems.map(({ icon, title, value, path }) => (
            <Link
              key={value}
              className={cn(
                "flex items-center gap-2 w-full hover:bg-vobb-neutral-10 p-2 rounded-md text-vobb-neutral-100 font-medium mb-1",
                value === active ? "bg-vobb-neutral-10 font-semibold" : ""
              )}
              to={path}>
              {icon}
              {title}
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
};

export function BranchMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-0 font-workSans font-bold text-lg text-vobb-neutral-100">
          HQ <ChevronDownIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-4 mt-1">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            HQ <span className="ml-auto rounded-full bg-vobb-primary-70 p-1"></span>
          </DropdownMenuItem>
          <DropdownMenuItem>Branch 1</DropdownMenuItem>
          <DropdownMenuItem>Branch 2</DropdownMenuItem>
          <DropdownMenuItem>Branch 3</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="font-medium flex items-center">
            New Branch
            <PlusCircledIcon className="ml-2" />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { SideBar };
