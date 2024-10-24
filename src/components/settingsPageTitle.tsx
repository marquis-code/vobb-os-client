import {
  BadgeIcon,
  CardStackIcon,
  DotFilledIcon,
  DotIcon,
  IdCardIcon
} from "@radix-ui/react-icons";
import { IconBuilding, IconBuildingArch, IconMail } from "@tabler/icons-react";
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
      {city && (
        <div className="flex items-center gap-3  bg-vobb-neutral-25 p-3 border-t border-vobb-neutral-20">
          <p className="flex items-center gap-2 border border-vobb-neutral-40 px-3 py-2 shadow-sm rounded-sm text-xs">
            <IconBuilding color="#667085" size={16} /> {city}
          </p>
          <DotFilledIcon color="#B5B5B5" />
          <p className="flex items-center gap-2 border border-vobb-neutral-40 px-3 py-2 shadow-sm rounded-sm text-xs">
            <IconBuildingArch color="#667085" size={16} /> {province}
          </p>
          <DotFilledIcon color="#B5B5B5" />

          <p className="flex items-center gap-2 border border-vobb-neutral-40 px-3 py-2 shadow-sm rounded-sm text-xs">
            <IconMail color="#667085" size={16} /> {zipcode}
          </p>
        </div>
      )}
    </section>
  );
};

export { SettingsPageTitle };
