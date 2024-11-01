import { IconPlus } from "@tabler/icons-react";
import { Button } from "components";
import React, { ReactNode } from "react";

export interface EmptyStateProps {
  pageIcon: ReactNode;
  title: string;
  description: string;
  ctaFunction?: () => void;
  btnIcon?: ReactNode;
  btnText?: string;
}

const TableEmptyState: React.FC<EmptyStateProps> = (props) => {
  const {
    pageIcon,
    title,
    description,
    ctaFunction,
    btnIcon = <IconPlus size={16} />,
    btnText
  } = props;

  return (
    <>
      <div className="bg-circle-pattern w-[300px] h-[395px]  m-auto bg-no-repeat bg-[length:600px_600px] bg-[center_top] relative">
        <span className="w-10 h-10 absolute top-[56.5%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          {pageIcon}
        </span>
      </div>
      <div className="flex flex-col justify-center items-center max-w-[300px] text-center m-auto">
        <p className="font-semibold text-base my-2">{title}</p>

        <p className="text-xs text-vobb-neutral-60">{description}</p>
        {btnText && (
          <Button onClick={ctaFunction} className="flex gap-1 mt-5 text-xs" variant={"fill"}>
            {btnIcon} {btnText}
          </Button>
        )}
      </div>
    </>
  );
};

export { TableEmptyState };
