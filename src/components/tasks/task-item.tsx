"use client";

import type React from "react";

import {
  IconCircleCheck,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconInbox,
  IconPointFilled,
  IconTrash,
  IconUser
} from "@tabler/icons-react";
import { Button } from "components/ui/button";
import { cn, shortenText } from "lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import type { TaskColumnConfig } from "./tasks-container";

export interface TaskItemProps {
  id: string;
  title: string;
  dueDate?: string;
  object?: string;
  assignedTo?: Array<{
    name: string;
    avatar?: string | File;
  }>;
  status?: string;
  onChangeStatus?: (id: string, status: string) => void;
  onDeleteTask?: (id: string) => void;
  onOpenEditTask?: (id: string) => void;
  columns?: TaskColumnConfig[];
  [key: string]: any; // Allow for dynamic properties
}

export function calculateDueDate(dueDate: string) {
  if (!dueDate) {
    return { displayText: "", textStyle: {} };
  }

  const today = new Date();
  const dueDateObj = new Date(dueDate);

  if (isNaN(dueDateObj.getTime())) {
    return { displayText: "No Due date", textStyle: { color: "#1d2939" } };
  }

  let displayText;
  let textStyle: { color?: string } = {};

  if (isSameDay(dueDateObj, today)) {
    displayText = "Due Today";
    textStyle = { color: "#EDA12F" };
  } else {
    const daysDifference = differenceInCalendarDays(dueDateObj, today);

    if (daysDifference > 0 && daysDifference <= 5) {
      displayText = `Due in ${daysDifference} day${daysDifference > 1 ? "s" : ""}`;
      textStyle = { color: "#EDA12F" };
    } else {
      displayText = `Due ${formatDate(dueDateObj)}`;
    }
  }

  return { displayText, textStyle };
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function differenceInCalendarDays(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date1.getTime() - date2.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getOrdinal(day: number): string {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatDate(date: Date): string {
  const day = date.getDate();
  const ordinal = getOrdinal(day);
  const base = format(date, "MMM, yyyy");

  return `${day}${ordinal} ${base}`;
}

export function TaskItem({
  id,
  title,
  dueDate,
  object = "General",
  assignedTo = [],
  status = "incomplete",
  onChangeStatus = () => {},
  onDeleteTask = () => {},
  onOpenEditTask = () => {},
  columns = [
    { key: "dueDate", label: "Due date" },
    { key: "object", label: "Object" },
    { key: "assignedTo", label: "Assigned to" },
    { key: "actions", label: "" }
  ],
  ...rest
}: TaskItemProps) {
  const { displayText, textStyle } = dueDate
    ? calculateDueDate(dueDate)
    : { displayText: "", textStyle: {} };

  const getStatusIcon = () => {
    if (status === "complete") {
      return (
        <span
          onClick={(e) => {
            onChangeStatus(id, "incomplete");
            e.stopPropagation();
          }}
          className="rounded-full cursor-pointer"
          data-testid="mark-incomplete">
          <IconCircleCheckFilled color="#4A22EB" size={14} />
        </span>
      );
    }
    return (
      <span
        onClick={(e) => {
          onChangeStatus(id, status === "incomplete" ? "complete" : "complete");
          e.stopPropagation();
        }}
        className="border rounded-full cursor-pointer"
        data-testid={`mark-${status === "incomplete" ? "complete" : "incomplete"}`}>
        <IconCircleCheck color="#fff" size={10} />
      </span>
    );
  };

  const getMenuOptions = () => {
    if (status === "incomplete") {
      return {
        primary: {
          label: "Archive task",
          action: () => onChangeStatus(id, "archived"),
          icon: <IconInbox size={16} color="#101323" />,
          testId: "archive-task"
        }
      };
    } else if (status === "complete") {
      return {
        primary: {
          label: "Archive task",
          action: () => onChangeStatus(id, "archived"),
          icon: <IconInbox size={16} color="#101323" />,
          testId: "archive-task"
        }
      };
    } else {
      return {
        primary: {
          label: "Unarchive task",
          action: () => onChangeStatus(id, "incomplete"),
          icon: <IconInbox size={16} color="#101323" />,
          testId: "unarchive-task"
        }
      };
    }
  };

  const menuOptions = getMenuOptions();

  // Render column content based on column key
  const renderColumnContent = (column: TaskColumnConfig) => {
    // If column has a custom render function, use it
    if (column.render) {
      return column.render(rest[column.key] || null, {
        id,
        title,
        dueDate,
        object,
        assignedTo,
        status,
        ...rest
      });
    }

    // Default renderers for common columns
    switch (column.key) {
      case "dueDate":
        return (
          <p
            style={{
              ...textStyle,
              ...(status === "complete" && { textDecorationColor: textStyle.color || "inherit" })
            }}
            className={status === "complete" ? "line-through" : ""}>
            {displayText}
          </p>
        );
      case "object":
        return (
          <Button
            variant="outline"
            className={cn(
              "w-fit justify-start text-left items-center font-normal text-xs h-9 py-1 px-3 gap-1"
            )}>
            <IconPointFilled color="#eda12f" size={20} /> {object}
          </Button>
        );
      case "assignedTo":
        return assignedTo.length > 1 ? (
          <Button
            variant="outline"
            className={cn(
              "w-fit justify-start text-left items-center font-normal text-xs h-9 py-1 px-3 gap-1"
            )}>
            <IconUser className="-mt-0.5 text-vobb-neutral-60" size={16} />
            {assignedTo.length} Assignees
          </Button>
        ) : (
          <Button
            variant="outline"
            className={cn(
              "w-fit justify-start text-left items-center font-normal text-xs h-9 py-1 px-3 gap-1"
            )}>
            <Avatar className="w-5 h-5">
              <AvatarImage
                src={
                  assignedTo[0]?.avatar instanceof File
                    ? URL.createObjectURL(assignedTo[0]?.avatar)
                    : assignedTo[0]?.avatar || ""
                }
                alt="profile picture"
              />
              <AvatarFallback className="text-[10px]">
                {assignedTo[0]?.name
                  ? assignedTo[0].name.charAt(0) + assignedTo[0].name.charAt(1)
                  : "NA"}
              </AvatarFallback>
            </Avatar>
            <p>{assignedTo[0]?.name || "Unassigned"}</p>
          </Button>
        );
      case "actions":
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <TaskMenu primaryAction={menuOptions.primary} onDeleteTask={() => onDeleteTask(id)} />
          </div>
        );
      default:
        // For any other column, try to render the value directly
        return <div>{rest[column.key] || ""}</div>;
    }
  };

  return (
    <div
      className="border-b px-4 py-2 grid grid-cols-[1fr,1.5fr] items-center hover:bg-accent hover:text-accent-foreground cursor-pointer"
      onClick={() => onOpenEditTask(id)}
      data-testid={`${status}-task`}>
      <div className="flex items-center gap-2">
        {getStatusIcon()}
        <p className={cn("capitalize", status === "complete" && "opacity-50 line-through")}>
          {shortenText(title, 40)}
        </p>
      </div>
      <div
        className={cn("grid items-center", status === "complete" && "opacity-50")}
        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
        {columns.map((column) => (
          <div key={column.key}>{renderColumnContent(column)}</div>
        ))}
      </div>
    </div>
  );
}

interface TaskMenuProps {
  primaryAction: {
    label: string;
    action: () => void;
    icon: React.ReactNode;
    testId?: string;
  };
  onDeleteTask: () => void;
}

function TaskMenu({ primaryAction, onDeleteTask }: TaskMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-2" data-testid="menu-tasks">
          <span className="sr-only">Open menu</span>
          <IconDotsVertical size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg px-1 space-y-1.5 w-[184px]">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={primaryAction.action}
            className="flex gap-2 items-center cursor-pointer text-vobb-neutral-70 text-xs"
            data-testid={primaryAction.testId}>
            <span>{primaryAction.icon}</span>
            {primaryAction.label}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDeleteTask}
            className="flex gap-2 items-center text-[#912018] hover:!text-[#912018] hover:!bg-[#fef3f2] cursor-pointer text-xs "
            data-testid="delete-task">
            <span>
              <IconTrash size={16} />
            </span>
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
