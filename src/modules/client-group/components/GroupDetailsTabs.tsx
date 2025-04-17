import { FC, ReactNode } from "react";
import { GroupDetailsTabLengthProps } from "types/client-group";
import {
  IconCash,
  IconClipboardText,
  IconFiles,
  IconFlame,
  IconListCheck,
  IconMail,
  IconMessageCircle,
  IconUser,
  IconUsers,
  IconUsersGroup
} from "@tabler/icons-react";
import { cn } from "lib";

interface GroupDetailsTabsProps {
  handleMainTabChange: (tab: string) => void;
  mainTab: string;
  subTab: string;
  handleSubTabChange: (tabe: string) => void;
  groupDetailsTabLength: GroupDetailsTabLengthProps;
}

interface TabListData {
  title: string;
  key: string;
  icon: ReactNode;
  length?: number;
}

export const GroupDetailsTabs: FC<GroupDetailsTabsProps> = ({
  handleMainTabChange,
  mainTab,
  subTab,
  handleSubTabChange,
  groupDetailsTabLength
}) => {
  const { activity, email, tasks, comments, files, notes } = groupDetailsTabLength;

  const mainTabs: TabListData[] = [
    {
      title: "Activity",
      key: "activity",
      icon: <IconFlame size={16} />,
      length: activity
    },
    {
      title: "Emails",
      key: "emails",
      icon: <IconMail size={16} />,
      length: email
    },
    {
      title: "Tasks",
      key: "tasks",
      icon: <IconListCheck size={16} />,
      length: tasks
    },
    {
      title: "Files",
      key: "files",
      icon: <IconFiles size={16} />,
      length: files
    },
    {
      title: "Notes",
      key: "notes",
      icon: <IconClipboardText size={16} />,
      length: notes
    }
  ];
  const subTabs: TabListData[] = [
    {
      title: "Members",
      key: "members",
      icon: <IconUsersGroup size={16} />
    },
    {
      title: "Sales",
      key: "sales",
      icon: <IconCash size={16} />
    },
    {
      title: "Comments",
      key: "comments",
      icon: <IconMessageCircle size={16} />,
      length: comments
    }
  ];

  return (
    <>
      <section
        className="grid grid-cols-[2fr,1.25fr] -ml-4 w-[calc(100%+2rem)] items-center"
        data-testid="group-tabs-section">
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
              {length && length > 0 ? (
                <span className="bg-vobb-neutral-10 text-vobb-neutral-100 h-4 w-4 border text-[10px] rounded-sm">
                  {length}
                </span>
              ) : (
                ""
              )}
            </button>
          ))}
        </div>
        <div className="border-l border-b px-4 flex items-center gap-4">
          {subTabs.map(({ title, key, icon, length }) => (
            <button
              key={key}
              onClick={() => handleSubTabChange(key)}
              className={cn(
                "flex gap-1.5 items-center text-vobb-neutral-50 hover:text-vobb-primary-70 py-3 px-2",
                subTab === key
                  ? "border-b border-vobb-primary-70 -mb-[1px] text-vobb-primary-70"
                  : ""
              )}>
              {icon} {title}{" "}
              {length && length > 0 ? (
                <span className="bg-vobb-neutral-10 text-vobb-neutral-100 h-4 w-4 border text-[10px] rounded-sm">
                  {length}
                </span>
              ) : (
                ""
              )}
            </button>
          ))}
        </div>
      </section>
    </>
  );
};
