import { Check } from "assets";

const InvitationFailedUI = ({ error }: { error: string }) => {
  return (
    <main>
      <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
        <Check className="mb-12 mt-2 mx-auto w-8 h-8" />
        <h1 className="text-xl sm:text-2xl font-bold mb-8 text-vobb-neutral-100 text-center">
          Uh-oh, something went wrong!
        </h1>
        <p className="text-center">{error}</p>
        <p className="text-center mt-8 text-vobb-neutral-70">
          Please contact your organization admin for assistance
        </p>
      </section>
    </main>
  );
};

export { InvitationFailedUI };
