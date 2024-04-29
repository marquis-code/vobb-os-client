import { EmailUI } from "modules";

const Email = () => {
  const handleForgotPassword = (data: { email: string }) => {};

  return (
    <>
      <EmailUI submit={handleForgotPassword} apiError={"apiError"} loading={false} />
    </>
  );
};

export { Email };
