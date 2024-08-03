import { Button, CustomInput } from "components";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Routes } from "router";
import { KeyIcon } from "assets";

interface ForgotPasswordProps {
  submit: ({ email }) => void;
  loading: boolean;
}
interface ForgotPasswordData {
  email: string;
}
const initMail: ForgotPasswordData = {
  email: ""
};

const EmailUI: React.FC<ForgotPasswordProps> = ({ submit, loading }) => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().email("Enter a valid email").required("Required")
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordData>({
    resolver: yupResolver(schema),
    defaultValues: initMail
  });

  const onSubmit: SubmitHandler<ForgotPasswordData> = (data) => {
    submit(data);
  };

  return (
    <main>
      <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
        <KeyIcon className="mb-12 mt-2 mx-auto w-8 h-8" data-cy="logo" />
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-vobb-neutral-100 text-center">
          Forgot Password?
        </h1>
        <p className="text-center mb-8" data-cy="subtitle">
          No worries, we’ll send you reset instructions.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Email"
            name="email"
            placeholder="Enter your email address"
            register={register}
            validatorMessage={errors.email?.message}
            data-cy="email"
          />

          <Button
            type="submit"
            className="w-full mt-6"
            size={"default"}
            variant="fill"
            data-cy="continue-btn">
            Continue
          </Button>
        </form>

        <Button
          onClick={() => navigate(Routes.login)}
          className="w-full mt-6 flex gap-4 items-center"
          size={"default"}
          variant="ghost"
          disabled={loading}
          loading={loading}
          data-cy="back-btn">
          <ArrowLeftIcon data-cy="arrow-icon" /> Back to log in
        </Button>
      </section>
    </main>
  );
};

export { EmailUI };
