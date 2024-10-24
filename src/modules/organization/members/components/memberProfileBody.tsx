import { ReactNode } from "react";

const MemberProfileBody = ({
  children,
  subSection
}: {
  children: ReactNode;
  subSection: ReactNode;
}) => {
  return (
    <>
      <section className="grid grid-cols-[2fr,1.25fr] divide-x -ml-4 w-[calc(100%+2rem)] min-h-screen">
        <section className="p-4">{children}</section>
        <div className="p-4">{subSection}</div>
      </section>
    </>
  );
};

export { MemberProfileBody };
