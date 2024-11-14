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
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { useModalContext } from "context";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { SidebarSection } from "./sidebarSection";

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
      path: Routes.notifications,
      value: "notifications"
    },
    {
      title: "Account Activity",
      icon: <TimerIcon width={14} height={14} color="#101323" />,
      path: Routes.account_activity,
      value: "account activity"
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
      title: "Members",
      icon: <PersonIcon width={14} height={14} color="#101323" />,
      path: Routes.members,
      value: "members"
    },
    {
      title: "Teams",
      icon: <PersonIcon width={14} height={14} color="#101323" />,
      path: Routes.teams,
      value: "teams"
    },
    {
      title: "Bank Accounts",
      icon: <CardStackIcon width={14} height={14} color="#101323" />,
      path: Routes.bank_accounts,
      value: "bank accounts"
    },
    {
      title: "Branding",
      icon: <GridIcon width={14} height={14} color="#101323" />,
      path: Routes.branding,
      value: "branding"
    },
    {
      title: "Billing",
      icon: <FileTextIcon width={14} height={14} color="#101323" />,
      path: Routes.billing,
      value: "billing"
    },
    {
      title: "Communication",
      icon: <PaperPlaneIcon width={14} height={14} color="#101323" />,
      path: Routes.communication,
      value: "communication"
    },
    {
      title: "Attributes",
      icon: <MagicWandIcon width={14} height={14} color="#101323" />,
      path: Routes.attributes,
      value: "attributes"
    },
    {
      title: "Integrations",
      icon: <MoveIcon width={14} height={14} color="#101323" />,
      path: Routes.integrations,
      value: "integrations"
    },
    {
      title: "Migration from another CRM",
      icon: <AllSidesIcon width={14} height={14} color="#101323" />,
      path: Routes.migration,
      value: "migration"
    },
    {
      title: "Organization Activity",
      icon: <TimerIcon width={14} height={14} color="#101323" />,
      path: Routes.organization_activity,
      value: "organization activity"
    }
  ];

  const reportItems = [
    {
      title: "Reports",
      icon: <MoveIcon width={14} height={14} color="#101323" />,
      path: Routes.reports,
      value: "reports"
    }
  ];

  const automationItems = [
    {
      title: "Workflows",
      icon: <MoveIcon width={14} height={14} color="#101323" />,
      path: Routes.workflows,
      value: "workflows"
    }
  ];

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
            placeholder="Search settings"
            value={searchSettings}
            onChange={(e) => setSearchSettings(e.target.value)}
            icon={<IconSearch size={16} />}
          />
        </div>
        <SidebarSection
          title="Account"
          items={accountItems}
          active={active}
          searchQuery={searchSettings}
        />
        <SidebarSection
          title="Workspace"
          items={orgItems}
          active={active}
          searchQuery={searchSettings}
        />
        <SidebarSection
          title="Reports"
          items={reportItems}
          active={active}
          searchQuery={searchSettings}
        />
        <SidebarSection
          title="Automation"
          items={automationItems}
          active={active}
          searchQuery={searchSettings}
        />
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
