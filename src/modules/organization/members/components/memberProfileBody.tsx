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
      <section className="grid grid-cols-[2fr,1.25fr] -ml-4 w-[calc(100%+2rem)]">
        <section className="border-b p-4">{children}</section>
        <div className="border-l border-b p-4">{subSection}</div>
      </section>
    </>
  );
};

export { MemberProfileBody };
