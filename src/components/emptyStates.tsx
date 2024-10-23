import { PlusCircledIcon } from "@radix-ui/react-icons";
import React, { ReactNode } from "react";
import { Button } from "./ui";
interface EmptyStateProps {
  pageIcon: ReactNode;
  title: string;
  description: string;
  ctaFunction?: () => void;
  btnIcon?: ReactNode;
  btnText?: string;
}

const EmptyStates: React.FC<EmptyStateProps> = (props) => {
  const {
    pageIcon,
    title,
    description,
    ctaFunction,
    btnIcon = <PlusCircledIcon />,
    btnText
  } = props;

  return (
    <>
      <section className="bg-circle-pattern w-[300px] h-[396px] m-auto bg-no-repeat bg-[length:400px_400px] bg-[center_50px] relative">
        <span className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          {pageIcon}
        </span>
        <div className="text-center flex flex-col justify-center items-center pt-[270px]">
          <p className="font-semibold text-base my-2">{title}</p>

          <p className="text-xs">{description}</p>
          {btnText && (
            <Button onClick={ctaFunction} className="flex gap-2 mt-5" variant={"fill"}>
              {btnIcon} {btnText}
            </Button>
          )}
        </div>
      </section>
    </>
  );
};

export { EmptyStates };
