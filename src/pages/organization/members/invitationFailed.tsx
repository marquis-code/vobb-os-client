import { InvitationFailedUI } from "modules";

const InvitationFailed = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const errorMessage = urlParams.get("error") ?? "Bad link";
  return (
    <>
      <InvitationFailedUI error={errorMessage} />
    </>
  );
};

export { InvitationFailed };
