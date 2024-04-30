import { forgotPasswordService } from "api";
import { useToast } from "components";
import { useApiRequest } from "hooks";
import { EmailUI } from "modules";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Email = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const handleForgotPassword = (data: { email: string }) => {
    run(forgotPasswordService(data));
  };

  useEffect(() => {
    if (requestStatus.isResolved && response?.status === 200) {
      toast({
        description: response?.data?.message
      });
    } else if (error) {
      toast({
        description: error?.response?.data?.error
      });
    }
  }, [response, error, navigate, requestStatus, location, toast]);

  return (
    <>
      <EmailUI submit={handleForgotPassword} />
    </>
  );
};

export { Email };
