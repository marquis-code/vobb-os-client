import { Routes } from "router";
import { VerifyPasswordUI } from "modules";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "hooks";
import { forgotPasswordVerifyService } from "api";
import { useMemo } from "react";
import { toast } from "components";
import { forgotPasswordParams } from "types";

const VerifyPassword = () => {
  const { run, data: response, error } = useApiRequest({});
  const handleVerifyCode = (data: forgotPasswordParams) => {
    run(forgotPasswordVerifyService(data));
  };
  const navigate = useNavigate();

  useMemo(() => {
    if (response?.status === 200) {
      localStorage.setItem("vobbOSAccess", response?.data?.data?.token);

      navigate(Routes.new_password);
      toast({
        description: response?.data?.message
      });
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error, navigate]);
  return (
    <>
      <VerifyPasswordUI submit={handleVerifyCode} />
    </>
  );
};

export { VerifyPassword };
