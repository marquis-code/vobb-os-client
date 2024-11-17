import { changeMemberRoleService } from "api";
import { ChangeRoleModal, toast } from "components";
import { useApiRequest } from "hooks";
import { initOptionType, roleOptions } from "lib/constants";
import { useMemo } from "react";
import { ModalProps, optionType } from "types";

interface ChangeRoleProps extends ModalProps {
  currentRole: string;
  name: string;
  id: string;
  callback: () => void;
}

const ChangeRole = (props: ChangeRoleProps) => {
  const { id, close, callback } = props;
  const { run, data: response, error, requestStatus } = useApiRequest({});

  const submit = (data: { role: optionType }) => {
    run(changeMemberRoleService({ member: id, role: data.role.value }));
  };

  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
      close();
      callback();
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <ChangeRoleModal
      initData={{
        role: roleOptions.find((item) => item.value === props.currentRole) ?? initOptionType
      }}
      submit={submit}
      {...props}
      loading={requestStatus.isPending}
    />
  );
};

export { ChangeRole };
