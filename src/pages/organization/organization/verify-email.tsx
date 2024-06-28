import { verifyOrgEmailsService } from "api";
import { OTPModal, toast } from "components";
import { useUserContext } from "context";
import { useApiRequest, useFetchOrganisation } from "hooks";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalProps } from "types";
type ActionType = "primary" | "support";

const VerifyEmail: React.FC<ModalProps> = ({ show, close }) => {
  const { orgDetails } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const action = searchParams.get("action") as ActionType;

  const email =
    action === "primary" ? orgDetails?.pendingPrimaryEmail : orgDetails?.pendingSecondaryEmail;

  const { run, data: response, error, requestStatus } = useApiRequest({});
  const { fetchOrgDetails } = useFetchOrganisation();

  const handleSubmit = (data: { otp: string }) => {
    if (action) run(verifyOrgEmailsService({ token: data.otp, action }));
  };

  const modalClose = () => {
    searchParams.delete("action");
    navigate(`${location.pathname}?${searchParams.toString()}`);
    close();
  };
  useMemo(() => {
    if (response?.status === 200) {
      fetchOrgDetails();
      toast({
        description: response?.data?.message
      });
      modalClose();
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <>
      <OTPModal
        title="Verify Your Email"
        text={`We’ve sent a 6-character code to ${email} The code expires shortly, so please enter it soon.`}
        show={show}
        close={modalClose}
        submit={handleSubmit}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { VerifyEmail };
