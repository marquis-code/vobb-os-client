import { EmailUI } from "modules";

const Email = () => {
  const handleForgotPassword = (data: { email: string }) => {};

  return (
    <>
      <EmailUI submit={handleForgotPassword} />
    </>
  );
};

export { Email };
