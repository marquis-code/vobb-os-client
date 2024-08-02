import { ChangeRoleModal } from "components";
import { initOptionType, roleOptions } from "lib/constants";
import { ModalProps, optionType } from "types";

interface ChangeRoleProps extends ModalProps {
  currentRole: string;
  name: string;
  id: string;
}

const ChangeRole = (props: ChangeRoleProps) => {
  return (
    <ChangeRoleModal
      initData={{
        role: roleOptions.find((item) => item.value === props.currentRole) ?? initOptionType
      }}
      submit={console.log}
      {...props}
    />
  );
};

export { ChangeRole };
