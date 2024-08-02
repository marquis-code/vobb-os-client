import { AcceptInviteUI } from "modules";

const AcceptInvite = () => {
  return (
    <>
      <AcceptInviteUI
        submit={console.log}
        clear={false}
        loading={false}
        organization={"Medium Intl."}
      />
    </>
  );
};

export { AcceptInvite };
