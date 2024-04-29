import { NewPasswordUI } from "modules";

const NewPassword = () => {
  const handleForgotPassword = (data) => {};

  return (
    <>
      <NewPasswordUI submit={handleForgotPassword} apiError={"apiError"} loading={false} />
    </>
  );
};

export { NewPassword };
