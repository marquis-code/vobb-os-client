import { cn } from "lib";

export interface ActivityCardProps {
  message: string | React.ReactNode;
  date: string;
  time: string;
  isFirstAction: boolean;
  testId?: string;
}

const ActivityCard = ({ isFirstAction, date, time, message, testId }: ActivityCardProps) => {
  return (
    <div
      className={cn(
        "before:content-['_'] before:block before:w-[9px] before:h-[9px] before:z-[1] before:bg-vobb-primary-40 before:rounded-full before:absolute before:top-[6px] before:left-0 pl-5 relative",
        !isFirstAction
          ? "after:content-['_'] after:block after:w-[1px] after:h-[calc(100%+1rem)] after:bg-vobb-neutral-40 after:absolute after:top-2 after:left-1"
          : ""
      )}
      data-testid={testId}>
      <p className="mb-1">{message}</p>
      <p className="text-xs text-vobb-neutral-60">
        {date} at {time}
      </p>
    </div>
  );
};

export { ActivityCard };
