import { updateOrgEmailsService } from "api";
import { ChangeEmailModal, toast } from "components";
import { useApiRequest, useFetchOrganisation } from "hooks";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalProps } from "types";
type ActionType = "primary" | "support";
interface ChangeEmailProps extends ModalProps {
  callback: () => void;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({ show, close, callback }) => {
  const { run, data: response, error } = useApiRequest({});
  const { fetchOrgDetails } = useFetchOrganisation();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const action = searchParams.get("action") as ActionType;
  const handleSubmit = (data: { email: string }) => {
    if (action) run(updateOrgEmailsService({ email: data.email, action }));
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
      callback();
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <>
      <ChangeEmailModal show={show} close={modalClose} submit={handleSubmit} />
    </>
  );
};

export { ChangeEmail };
