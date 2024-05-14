import { optionType } from "types";

interface OrgBranchData {
  name: string;
  country: optionType;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  timeZone: optionType;
}

const OrgBranchesUI = () => {
  return (
    <>
      <section className="border-b border-vobb-neutral-20 mb-4 max-w-[800px]">
        <h1 className="text-lg font-bold mb-4">Branches</h1>
      </section>
      <section className="grid gap-8 border-b border-vobb-neutral-20 pb-8 mb-12 max-w-[800px]">
        table
      </section>
    </>
  );
};

export { OrgBranchesUI };
