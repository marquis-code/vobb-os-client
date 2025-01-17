import { resetPasswordService } from "api";
import { toast } from "components";
import { useApiRequest } from "hooks";
import { NewPasswordUI } from "modules";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { resetPasswordData } from "types/auth";
import Cookies from "js-cookie";

const NewPassword = () => {
  const navigate = useNavigate();
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const handleResetPassword = (data: resetPasswordData) => {
    run(resetPasswordService(data));
  };

  useMemo(() => {
    if (response?.status === 200) {
      navigate(Routes.new_password_completed);
      Cookies.remove("vobbOSAccess");
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error, navigate, toast]);

  return (
    <>
      <NewPasswordUI submit={handleResetPassword} loading={requestStatus.isPending} />
    </>
  );
};

export { NewPassword };
