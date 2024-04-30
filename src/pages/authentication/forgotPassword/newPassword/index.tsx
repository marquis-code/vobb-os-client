import { resetPasswordService } from "api";
import { useToast } from "components";
import { useApiRequest } from "hooks";
import { NewPasswordUI } from "modules";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Routes } from "router";
import { resetPasswordData } from "types/auth";

const NewPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { run, data: response, requestStatus, error } = useApiRequest({});

  const [searchParams] = useSearchParams();
  const encodedToken = searchParams.get("token");
  const token = encodedToken ? decodeURIComponent(encodedToken) : null;

  const handleResetPassword = (data: resetPasswordData) => {
    run(resetPasswordService(data, token));
  };

  useEffect(() => {
    if (requestStatus.isResolved && response?.status === 201) {
      navigate(Routes.new_password_completed);
    } else if (error) {
      toast({
        description: error?.response?.data?.error
      });
    }
  }, [response, error, navigate, requestStatus, location, toast]);

  return (
    <>
      <NewPasswordUI submit={handleResetPassword} />
    </>
  );
};

export { NewPassword };
