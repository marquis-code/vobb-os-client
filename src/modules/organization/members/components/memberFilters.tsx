import { ReactNode } from "react";

interface FilterProps {
  title: string;
  children: ReactNode;
}
const MemberFilters: React.FC<FilterProps> = ({ title, children }) => {
  return (
    <div className="flex justify-between items-center border-b py-[10px] px-4">
      <h2 className="font-bold">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export { MemberFilters };
