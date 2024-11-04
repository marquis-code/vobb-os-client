import { verifyEmailMemberService } from "api";
import { useApiRequest } from "hooks";
import { MemberEmailVerifyUI } from "modules";
import { useEffect, useMemo, useState } from "react";

const MemberEmailVerify = () => {
  const [message, setMessage] = useState({ status: "", message: "" });
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const { run, data: response, requestStatus, error } = useApiRequest({});

  const handleVerifyEmail = () => {
    if (token) run(verifyEmailMemberService(token));
  };
  useMemo(() => {
    if (response?.status === 200) {
      setMessage({ status: "All done, yay!", message: response?.data?.message });
    } else if (error) {
      setMessage({ status: "Something went wrong!", message: error?.response?.data?.error });
    }
  }, [response, error]);

  useEffect(() => {
    if (token) {
      handleVerifyEmail();
    }
  }, []);
  return (
    <>
      <MemberEmailVerifyUI loading={requestStatus.isPending} message={message} />
    </>
  );
};

export { MemberEmailVerify };
