import { acceptInviteService, validateInviteService } from "api";
import { toast } from "components";
import { useApiRequest } from "hooks";
import { AcceptInviteUI } from "modules";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const AcceptInvite = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("user");
  const organisation = urlParams.get("org") ?? "";

  const { run: runValidate, error: validateError } = useApiRequest({});
  const {
    run: runAccept,
    data: acceptResponse,
    error: acceptError,
    requestStatus: acceptStatus
  } = useApiRequest({});

  const handleValidateInvite = () => runValidate(validateInviteService());

  const submit = (data) =>
    runAccept(
      acceptInviteService({
        first_name: data.firstName,
        last_name: data.lastName,
        password: data.password
      })
    );

  useMemo(() => {
    if (validateError) {
      navigate(`${Routes.invitation_failed}?error=${validateError?.response?.data?.error}`);
    }
  }, [validateError, navigate]);

  useMemo(() => {
    if (acceptResponse?.status === 201) {
      localStorage.setItem("vobbOSAccess", acceptResponse?.data?.data?.access_token);
      localStorage.setItem("vobbOSRefresh", acceptResponse?.data?.data?.refresh_token);
      navigate(Routes.invitation_success);
      toast({
        description: acceptResponse?.data?.message
      });
    } else if (acceptError) {
      toast({
        variant: "destructive",
        description: acceptError?.response?.data?.error
      });
    }
  }, [acceptResponse, acceptError, navigate]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("vobbOSAccess", token);
      handleValidateInvite();
    }
  }, []);

  return (
    <>
      <AcceptInviteUI
        submit={submit}
        clear={false}
        loading={acceptStatus.isPending}
        organization={organisation}
      />
    </>
  );
};

export { AcceptInvite };
