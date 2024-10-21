import {
  BadgeIcon,
  CardStackIcon,
  DotFilledIcon,
  DotIcon,
  IdCardIcon
} from "@radix-ui/react-icons";
import { UserCircleIcon } from "assets";
import { cn } from "lib";

interface Props {
  title: string;
  className?: string;
  description?: string;
  city?: string;
  province?: string;
  zipcode?: string;
}

const SettingsPageTitle = ({ title, className, description, city, province, zipcode }: Props) => {
  return (
    <section className={cn("border-b border-vobb-neutral-20 mb-4 max-w-[800px]", className)}>
      <h1 className="text-lg font-bold mb-4">{title}</h1>
      {description && <p className="mb-4 -mt-2">{description}</p>}
      <div className="flex items-center gap-3  bg-vobb-neutral-25 p-3 border-t border-vobb-neutral-20">
        <p className="flex items-center gap-2 border border-vobb-neutral-40 px-3 py-2 shadow-sm rounded-sm text-xs">
          <UserCircleIcon className="h-4 w-4" /> {city}
        </p>
        <DotFilledIcon color="#B5B5B5" />
        <p className="flex items-center gap-2 border border-vobb-neutral-40 px-3 py-2 shadow-sm rounded-sm text-xs">
          <CardStackIcon className="h-4 w-4" /> {province}
        </p>
        <DotFilledIcon color="#B5B5B5" />

        <p className="flex items-center gap-2 border border-vobb-neutral-40 px-3 py-2 shadow-sm rounded-sm text-xs">
          <IdCardIcon className="h-4 w-4" /> {zipcode}
        </p>
      </div>{" "}
    </section>
  );
};

export { SettingsPageTitle };
