import { OrgAttributesUI } from "modules";
import { AddMemberAttribute } from "./addMemberAttribute";
import { useState } from "react";

const OrgAttributes = () => {
  const [addMemberAttr, setAddMemberAttr] = useState(false);
  return (
    <>
      <AddMemberAttribute close={() => setAddMemberAttr(false)} show={addMemberAttr} />
      <OrgAttributesUI handleAddMemberAttr={() => setAddMemberAttr(true)} />
    </>
  );
};

export { OrgAttributes };
