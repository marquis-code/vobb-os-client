import { cn } from "lib";

interface Props {
  title: string;
  className?: string;
}

const SettingsPageTitle = ({ title, className }: Props) => {
  return (
    <section className={cn("border-b border-vobb-neutral-20 mb-4 max-w-[800px]", className)}>
      <h1 className="text-lg font-bold mb-4">{title}</h1>
    </section>
  );
};

export { SettingsPageTitle };
