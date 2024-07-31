import { LogoIcon } from "assets";
import { CustomInput, PasswordInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "components/ui/button";

export interface AcceptInviteData {
  firstName: string;
  lastName: string;
  password: string;
}

const initAcceptInvite: AcceptInviteData = {
  firstName: "",
  lastName: "",
  password: ""
};

const schema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Password should be at least 8 characters long")
    .matches(/[A-Z]/, "Password should contain an uppercase character")
    .matches(/[a-z]/, "Password should contain an lowercase character")
    .matches(/[0-9]/, "Password should contain at least one number")
    .matches(/@|#|&|\$]/, "Password should contain at least special character (e.g. @, #, &, $)")
});

interface AcceptInviteProps {
  submit: (data: AcceptInviteData) => void;
  clear: boolean;
  loading: boolean;
  organization: string;
}

const AcceptInviteUI: React.FC<AcceptInviteProps> = ({ submit, loading, organization }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AcceptInviteData>({
    resolver: yupResolver(schema),
    defaultValues: initAcceptInvite
  });
  const onSubmit: SubmitHandler<AcceptInviteData> = (data) => {
    submit(data);
  };
  return (
    <>
      <main>
        <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
          <LogoIcon className="mb-12 m-auto" />
          <h1 className="text-xl sm:text-2xl font-bold mb-2 text-vobb-neutral-100 text-center">
            Join {organization} on Vobb
          </h1>
          <p className="mb-8 text-center">Access all Vobb's tools with just one account.</p>
          <form>
            <CustomInput
              label="First name"
              type="text"
              name="firstName"
              register={register}
              validatorMessage={errors.firstName?.message}
            />
            <CustomInput
              label="Last name"
              type="text"
              name="lastName"
              register={register}
              validatorMessage={errors.lastName?.message}
            />
            <PasswordInput
              label="Password"
              type="password"
              name="password"
              register={register}
              validatorMessage={errors.password?.message}
            />

            <Button
              onClick={handleSubmit(onSubmit)}
              loading={loading}
              className="w-full mt-6"
              size={"default"}
              variant="fill">
              Accept invitation
            </Button>
          </form>
        </section>
      </main>
    </>
  );
};

export { AcceptInviteUI };
