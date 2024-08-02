import { EnvelopeClosedIcon, FileTextIcon, PersonIcon } from "@radix-ui/react-icons";
import { cn } from "lib";
import {
  CheckSquareIcon,
  FolderIcon,
  LineChartUpIcon,
  UserCircleIcon,
  MessageChatSquareIcon
} from "assets";
import { ReactNode, useContext } from "react";
import { MemberProfileContext } from "context";

interface MemberProfileTabsProps {
  handleMainTabChange: (tab: string) => void;
  mainTab: string;
}

interface TabListData {
  title: string;
  key: string;
  icon: ReactNode;
}

const MemberProfileTabs: React.FC<MemberProfileTabsProps> = (props) => {
  const { handleMainTabChange, mainTab } = props;

  const { subTab, handleUpdateSubTab } = useContext(MemberProfileContext);

  const mainTabs: TabListData[] = [
    {
      title: "Activity",
      key: "activity",
      icon: <LineChartUpIcon stroke="#000" width={16} height={16} />
    },
    {
      title: "Emails",
      key: "emails",
      icon: <EnvelopeClosedIcon width={16} height={16} />
    },
    {
      title: "Assigned Clients",
      key: "clients",
      icon: <PersonIcon width={16} height={16} />
    },
    {
      title: "Tasks",
      key: "tasks",
      icon: <CheckSquareIcon width={16} height={16} />
    },
    {
      title: "Notes",
      key: "notes",
      icon: <FileTextIcon width={16} height={16} />
    },
    {
      title: "Files",
      key: "files",
      icon: <FolderIcon width={16} height={16} />
    }
  ];
  const subTabs: TabListData[] = [
    {
      title: "Details",
      key: "details",
      icon: <UserCircleIcon width={16} height={16} />
    },
    {
      title: "Comments",
      key: "comments",
      icon: <MessageChatSquareIcon width={16} height={16} />
    }
  ];

  return (
    <>
      <section className="grid grid-cols-[2fr,1.25fr] -ml-4 w-[calc(100%+2rem)] items-center">
        <div className="border-b px-4 flex items-center gap-4">
          {mainTabs.map(({ title, key, icon }) => (
            <button
              key={key}
              onClick={() => handleMainTabChange(key)}
              className={cn(
                "flex gap-2 items-center text-vobb-neutral-50 hover:text-vobb-neutral-100 py-3",
                mainTab === key
                  ? "border-b border-vobb-neutral-100 -mb-[1px] text-vobb-neutral-100"
                  : ""
              )}>
              {icon} {title}
            </button>
          ))}
        </div>
        <div className="border-l border-b px-4 flex items-center gap-4">
          {subTabs.map(({ title, key, icon }) => (
            <button
              key={key}
              onClick={() => handleUpdateSubTab(key)}
              className={cn(
                "flex gap-2 items-center text-vobb-neutral-50 hover:text-vobb-neutral-100 py-3",
                subTab === key
                  ? "border-b border-vobb-neutral-100 -mb-[1px] text-vobb-neutral-100"
                  : ""
              )}>
              {icon} {title}
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export { MemberProfileTabs };
