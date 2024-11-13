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
  BackpackIcon,
  BellIcon,
  CardStackIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FaceIcon,
  FileTextIcon,
  GridIcon,
  HomeIcon,
  LockClosedIcon,
  MagicWandIcon,
  MoveIcon,
  PaperPlaneIcon,
  PersonIcon,
  TimerIcon
} from "@radix-ui/react-icons";
import { Button, CustomInput } from "components";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "router";
import { cn } from "lib";
import { useModalContext } from "context";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

interface SideBarProps {
  sideBarWidth: string;
  active: string;
}

interface SideBarProps {
  sideBarWidth: string;
  active: string;
}

const SideBar: React.FC<SideBarProps> = ({ sideBarWidth, active }) => {
  const navigate = useNavigate();
  const [searchSettings, setSearchSettings] = useState("");

  const [isAccountOpen, setIsAccountOpen] = useState(true);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(true);
  const [isReportsOpen, setIsReportsOpen] = useState(true);
  const [isAutomationOpen, setIsAutomationOpen] = useState(true);

  const accountItems = [
    { title: "Profile", icon: <PersonIcon />, path: Routes.profile, value: "profile" },
    { title: "Security", icon: <LockClosedIcon />, path: Routes.security, value: "security" },
    {
      title: "Personalizations",
      icon: <FaceIcon />,
      path: Routes.personalizations,
      value: "personalizations"
    },
    {
      title: "Notifications",
      icon: <BellIcon />,
      path: Routes.notifications,
      value: "notifications"
    },
    {
      title: "Account Activity",
      icon: <TimerIcon />,
      path: Routes.account_activity,
      value: "account activity"
    }
  ];

  const orgItems = [
    {
      title: "Organization",
      icon: <BackpackIcon />,
      path: Routes.organization,
      value: "organization"
    },
    { title: "Branches", icon: <HomeIcon />, path: Routes.branches, value: "branches" },
    { title: "Members", icon: <PersonIcon />, path: Routes.members, value: "members" },
    { title: "Teams", icon: <PersonIcon />, path: Routes.teams, value: "teams" },
    {
      title: "Bank Accounts",
      icon: <CardStackIcon />,
      path: Routes.bank_accounts,
      value: "bank accounts"
    },
    { title: "Branding", icon: <GridIcon />, path: Routes.branding, value: "branding" },
    { title: "Billing", icon: <FileTextIcon />, path: Routes.billing, value: "billing" },
    {
      title: "Communication",
      icon: <PaperPlaneIcon />,
      path: Routes.communication,
      value: "communication"
    },
    { title: "Attributes", icon: <MagicWandIcon />, path: Routes.attributes, value: "attributes" },
    { title: "Integrations", icon: <MoveIcon />, path: Routes.integrations, value: "integrations" },
    {
      title: "Migration from another CRM",
      icon: <AllSidesIcon />,
      path: Routes.migration,
      value: "migration"
    },
    {
      title: "Organization Activity",
      icon: <TimerIcon />,
      path: Routes.organization_activity,
      value: "organization activity"
    }
  ];

  const reportItems = [
    { title: "Reports", icon: <MoveIcon />, path: Routes.reports, value: "reports" }
  ];

  const automationItems = [
    { title: "Workflows", icon: <MoveIcon />, path: Routes.workflows, value: "workflows" }
  ];

  const filterItems = (items) => {
    if (!searchSettings) return items;
    return items.filter((item) => item.title.toLowerCase().includes(searchSettings.toLowerCase()));
  };

  const hasMatchingItems = (items) => {
    return filterItems(items).length > 0;
  };

  return (
    <aside style={{ width: sideBarWidth }} className="border-r h-full fixed top-0 left-0">
      <div className="border-b px-4 py-1 h-[55px] flex items-center">
        <Button onClick={() => navigate(Routes.overview)} variant="ghost" size="icon">
          <span className="sr-only">Back to overview</span>
          <ChevronLeftIcon />
        </Button>
        <p className="ml-2 font-bold text-lg">Settings</p>
      </div>
      <section className="p-4 overflow-auto">
        <div className="mb-6">
          <CustomInput
            placeholder="search"
            value={searchSettings}
            onChange={(e) => setSearchSettings(e.target.value)}
            icon={<IconSearch size={16} />}
          />
        </div>
        {/* Account Section */}
        {hasMatchingItems(accountItems) && (
          <div className="mb-6">
            <div
              className="flex gap-1 items-center cursor-pointer py-2 text-vobb-neutral-70"
              onClick={() => setIsAccountOpen(!isAccountOpen)}>
              <p className="text-xs">Account</p>
              {isAccountOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
            {isAccountOpen &&
              filterItems(accountItems).map(({ icon, title, value, path }) => (
                <Link
                  key={value}
                  className={cn(
                    "flex items-center gap-2 w-full hover:bg-gray-100 p-2 rounded-md mb-1",
                    value === active ? "bg-gray-100 font-semibold" : ""
                  )}
                  to={path}>
                  {icon}
                  {title}
                </Link>
              ))}
          </div>
        )}
        {/* Workspace Section */}
        {hasMatchingItems(orgItems) && (
          <div className="mb-6">
            <div
              className="flex gap-1 items-center cursor-pointer py-2 text-vobb-neutral-70"
              onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}>
              <p className="text-xs">Workspace</p>
              {isWorkspaceOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
            {isWorkspaceOpen &&
              filterItems(orgItems).map(({ icon, title, value, path }) => (
                <Link
                  key={value}
                  className={cn(
                    "flex items-center gap-2 w-full hover:bg-gray-100 p-2 rounded-md mb-1",
                    value === active ? "bg-gray-100 font-semibold" : ""
                  )}
                  to={path}>
                  {icon}
                  {title}
                </Link>
              ))}
          </div>
        )}

        {/* Reports section */}
        {hasMatchingItems(reportItems) && (
          <div className="mb-6">
            <div
              className="flex gap-1 items-center cursor-pointer py-2 text-vobb-neutral-70"
              onClick={() => setIsReportsOpen(!isReportsOpen)}>
              <p className="text-xs">Reports</p>
              {isReportsOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
            {isReportsOpen &&
              filterItems(reportItems).map(({ icon, title, value, path }) => (
                <Link
                  key={value}
                  className={cn(
                    "flex items-center gap-2 w-full hover:bg-gray-100 p-2 rounded-md mb-1",
                    value === active ? "bg-gray-100 font-semibold" : ""
                  )}
                  to={path}>
                  {icon}
                  {title}
                </Link>
              ))}
          </div>
        )}

        {/* Automations */}
        {hasMatchingItems(automationItems) && (
          <div className="mb-6">
            <div
              className="flex gap-1 items-center cursor-pointer py-2 text-vobb-neutral-70"
              onClick={() => setIsAutomationOpen(!isAutomationOpen)}>
              <p className="text-xs">Automation</p>
              {isAutomationOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
            {isAutomationOpen &&
              filterItems(automationItems).map(({ icon, title, value, path }) => (
                <Link
                  key={value}
                  className={cn(
                    "flex items-center gap-2 w-full hover:bg-gray-100 p-2 rounded-md mb-1",
                    value === active ? "bg-gray-100 font-semibold" : ""
                  )}
                  to={path}>
                  {icon}
                  {title}
                </Link>
              ))}
          </div>
        )}
      </section>
    </aside>
  );
};

export function BranchMenu() {
  const { setAddBranch } = useModalContext();
  const handleBranch = () => {
    setAddBranch(true);
  };
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
          <button className="font-medium flex items-center" onClick={handleBranch}>
            New Branch
            <IconPlus size={18} className="ml-2" />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { SideBar };
