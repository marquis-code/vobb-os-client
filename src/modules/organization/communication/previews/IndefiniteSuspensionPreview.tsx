import { useUserContext } from "context";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";

const IndefiniteSuspensionPreview = () => {
  const { orgDetails } = useUserContext();

  return (
    <section>
      <Avatar className="w-16 h-16">
        <AvatarImage src={orgDetails?.logo} alt="logo" />

        <AvatarFallback>
          {orgDetails?.organisation?.charAt(0).toUpperCase()}
          {orgDetails?.organisation?.charAt(1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="py-8">
        <h1 className="text-3xl text-center mb-10 text-gray-900 font-inter capitalize">
          Indefinite suspension of {orgDetails?.organisation}'s Vobb Workspace
        </h1>
        <div className="pb-8">
          <p className="text-xl text-gray-900 mb-6 font-semibold">Hi (your team member's name),</p>
          <p className="text-base text-gray-500 mb-4 leading-7">
            We regret to inform you that your access to {orgDetails?.organisation}'s Vobb workspace
            has been indefinitely suspended, effective immediately for the following reason:
          </p>
          <p className="text-base text-gray-900 mb-4 leading-7 font-semibold pl-4 py-1 border-l-2 border-vobb-primary-70">
            (the reason for suspension)
          </p>
          <p className="text-base text-gray-500 mb-4 leading-7">
            Your access will remain suspended (expiration date of suspension). During this time, you
            will be unable to log in to the Vobb platform or participate in any activities within
            our workspace.
          </p>
          <p className="text-base text-gray-500 mb-4 leading-7">
            If you have any questions or would like to discuss this matter further, please feel free
            to reach out to your team lead.
          </p>
        </div>
        <div className="leading-8 text-base text-gray-500">
          <p>
            Thanks,
            <br /> The team
          </p>
        </div>
      </div>
      <footer className="border-t border-gray-300 pt-8">
        <p className="text-base text-gray-500 leading-7">
          This email was sent to{" "}
          <span className="text-vobb-primary-70 font-semibold">{orgDetails?.primaryEmail}</span>. If
          this is not you, please ignore this email.
        </p>
        <p className="text-base text-gray-500 leading-7 mt-4">
          © 2024 Vobb
          <br />
          71-75 Shelton Street, London, United Kingdom.
        </p>
      </footer>
    </section>
  );
};

export { IndefiniteSuspensionPreview };
