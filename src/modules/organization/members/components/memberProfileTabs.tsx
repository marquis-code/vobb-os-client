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
import {
  IconClipboardText,
  IconFileText,
  IconFlame,
  IconListCheck,
  IconMail,
  IconMessageCircle,
  IconUser,
  IconUsers
} from "@tabler/icons-react";

interface MemberProfileTabsProps {
  handleMainTabChange: (tab: string) => void;
  mainTab: string;
}

interface TabListData {
  title: string;
  key: string;
  icon: ReactNode;
  length?: number;
}

const MemberProfileTabs: React.FC<MemberProfileTabsProps> = (props) => {
  const { handleMainTabChange, mainTab } = props;

  const { subTab, handleUpdateSubTab } = useContext(MemberProfileContext);

  const mainTabs: TabListData[] = [
    {
      title: "Activity",
      key: "activity",
      icon: <IconFlame size={16} />,
      length: 2
    },
    {
      title: "Emails",
      key: "emails",
      icon: <IconMail size={16} />,
      length: 4
    },
    {
      title: "Assigned Clients",
      key: "clients",
      icon: <IconUsers size={16} />
    },
    {
      title: "Tasks",
      key: "tasks",
      icon: <IconListCheck size={16} />,
      length: 3
    },
    {
      title: "Files",
      key: "files",
      icon: <IconFileText size={16} />
    },
    {
      title: "Notes",
      key: "notes",
      icon: <IconClipboardText size={16} />
    }
  ];
  const subTabs: TabListData[] = [
    {
      title: "Details",
      key: "details",
      icon: <IconUser size={16} />
    },
    {
      title: "Comments",
      key: "comments",
      icon: <IconMessageCircle size={16} />,
      length: 5
    }
  ];

  return (
    <>
      <section className="grid grid-cols-[2fr,1.25fr] -ml-4 w-[calc(100%+2rem)] items-center">
        <div className="border-b px-4 flex items-center gap-4">
          {mainTabs.map(({ title, key, icon, length }) => (
            <button
              key={key}
              onClick={() => handleMainTabChange(key)}
              className={cn(
                "flex gap-1.5 items-center text-vobb-neutral-50 hover:text-vobb-primary-70 py-3 px-2",
                mainTab === key
                  ? "border-b border-vobb-primary-70 -mb-[1px] text-vobb-primary-70"
                  : ""
              )}>
              {icon} {title}{" "}
              {length && (
                <span className="bg-vobb-neutral-10 text-vobb-neutral-100 h-4 w-4 border text-[10px] rounded-sm">
                  {length}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="border-l border-b px-4 flex items-center gap-4">
          {subTabs.map(({ title, key, icon, length }) => (
            <button
              key={key}
              onClick={() => handleUpdateSubTab(key)}
              className={cn(
                "flex gap-1.5 items-center text-vobb-neutral-50 hover:text-vobb-primary-70 py-3 px-2",
                subTab === key
                  ? "border-b border-vobb-primary-70 -mb-[1px] text-vobb-primary-70"
                  : ""
              )}>
              {icon} {title}{" "}
              {length && (
                <span className="bg-vobb-neutral-10 text-vobb-neutral-100 h-4 w-4 border text-[10px] rounded-sm">
                  {length}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export { MemberProfileTabs };
