import React, { ReactNode } from "react";
import { Button } from "components/ui";
import { IconPlus } from "@tabler/icons-react";

interface EmptyStateProps {
  pageIcon: ReactNode;
  title: string;
  description: string;
  ctaFunction?: () => void;
  btnIcon?: ReactNode;
  btnText?: string;
}
const ModalEmptyState: React.FC<EmptyStateProps> = (props) => {
  const {
    pageIcon,
    title,
    description,
    ctaFunction,
    btnIcon = <IconPlus size={18} />,
    btnText
  } = props;

  return (
    <div className={"w-full mx-auto"}>
      <div className="bg-circle-pattern h-[395px]  m-auto bg-no-repeat bg-[length:350px_350px] bg-[center_top] relative">
        <span className="w-10 h-10 absolute top-[33%] left-[50.25%] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          {pageIcon}
        </span>
      </div>
      <div className="flex flex-col justify-center items-center text-center -mt-52 ">
        <p className="font-semibold text-base my-2 text-vobb-neutral-100 ">{title}</p>

        <p className="text-xs max-w-[245px] text-vobb-neutral-60">{description}</p>
        {btnText && (
          <Button onClick={ctaFunction} className="flex gap-2 mt-5" variant={"fill"}>
            {btnIcon} {btnText}
          </Button>
        )}
      </div>
    </div>
  );
};

export { ModalEmptyState };
