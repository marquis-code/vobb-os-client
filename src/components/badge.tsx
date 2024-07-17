import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "./ui";
import { cn } from "lib";

interface BadgeProps {
  text: string;
  btnText: string;
  action?: () => void;
  className?: string;
  btnClassName?: string;
  variant: "light" | "outline";
  type: "warning" | "success" | "neutral" | "error" | "brand";
  badge: "trailing" | "leading";
  size: "md" | "lg";
}

const Badge = (props: BadgeProps) => {
  const { text, btnText, className, btnClassName, action, variant, type, size, badge } = props;

  const types = {
    warning: {
      container:
        variant === "outline"
          ? "text-warning-30 border-warning-30 bg-white hover:bg-warning-0"
          : "text-warning-30 border-[#FEDF89] bg-[#FFFAEB] hover:bg-[#FEF0C7]",
      button:
        variant === "outline"
          ? "text-warning-30 border-warning-30 bg-white"
          : "text-warning-30 border-[#FEDF89] bg-white"
    },
    success: {
      container:
        variant === "outline"
          ? "text-success-30 border-success-30 bg-white hover:bg-success-0"
          : "text-success-30 border-[#ABEFC6] bg-[#ECFDF3] hover:bg-[#DCFAE6]",
      button:
        variant === "outline"
          ? "text-success-30 border-success-30 bg-white"
          : "text-success-30 border-[#ABEFC6] bg-white"
    },
    neutral: {
      container:
        variant === "outline"
          ? "text-vobb-neutral-70 border-vobb-neutral-30 bg-white hover:bg-vobb-neutral-10"
          : "text-vobb-neutral-70 border-vobb-neutral-40 bg-vobb-neutral-10 hover:bg-vobb-neutral-20",
      button:
        variant === "outline"
          ? "text-vobb-neutral-70 border-vobb-neutral-30 bg-white"
          : "text-vobb-neutral-70 border-vobb-neutral-40 bg-white"
    },
    error: {
      container:
        variant === "outline"
          ? "text-error-30 border-error-30 bg-white hover:bg-error-0"
          : "text-error-30 border-[#FECDCA] bg-[#FEF3F2] hover:bg-[#FEE4E2]",
      button:
        variant === "outline"
          ? "text-error-30 border-error-30 bg-white"
          : "text-error-30 border-[#FECDCA] bg-white"
    },
    gray: { container: "", button: "" },
    brand: {
      container:
        variant === "outline"
          ? "text-vobb-primary-70 border-vobb-primary-30 bg-white hover:bg-vobb-primary-10"
          : "text-vobb-primary-70 border-vobb-primary-40 bg-vobb-primary-10 hover:bg-vobb-primary-20",
      button:
        variant === "outline"
          ? "text-vobb-primary-70 border-vobb-primary-30 bg-white"
          : "text-vobb-primary-70 border-vobb-primary-40 bg-white"
    }
  };

  const fontSize = size === "md" ? "text-xs" : "text-normal";
  const direction = badge === "leading" ? "flex-row-reverse gap-2" : "flex-row";

  return (
    <section
      className={cn(
        "mb-4 p-1 rounded-3xl border bg-warning-0 border-warning-30 text-warning-30 flex gap-4 justify-between items-center",
        types[type].container,
        direction,
        fontSize,
        className
      )}>
      <p className="font-medium px-2">{text}</p>
      {action && (
        <Button
          onClick={action}
          className={cn(
            "flex gap-1 rounded-2xl ml-auto py-1 px-2 h-fit !bg-white",
            types[type].button,
            fontSize,
            btnClassName
          )}
          variant={"outline"}>
          {btnText} <ArrowRightIcon />
        </Button>
      )}
    </section>
  );
};

export { Badge };
