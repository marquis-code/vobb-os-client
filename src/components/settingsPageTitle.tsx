import { cn } from "lib";

interface Props {
  title: string;
  className?: string;
  description?: string;
}

const SettingsPageTitle = ({ title, className, description }: Props) => {
  return (
    <section className={cn("border-b border-vobb-neutral-20 mb-4 max-w-[800px]", className)}>
      <h1 className="text-lg font-bold mb-4">{title}</h1>
      {description && <p className="mb-4 -mt-2">{description}</p>}
    </section>
  );
};

export { SettingsPageTitle };
