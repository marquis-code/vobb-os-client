import { EditBranchModal } from "components";
import { ModalProps } from "types";

interface Props extends ModalProps {
  id: string;
}

const EditBranch: React.FC<Props> = ({ show, close, id }) => {
  return (
    <>
      <EditBranchModal
        show={show}
        close={close}
        submit={console.log}
        initData={{
          name: "test",
          country: { label: "test", value: "test" },
          addressLine1: "test",
          addressLine2: "test",
          postalCode: "test",
          timeZone: { label: "test", value: "test" },
          state: "test",
          city: "test"
        }}
      />
    </>
  );
};

export { EditBranch };
