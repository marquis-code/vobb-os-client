import { Button, CustomInput, PasswordInput } from "components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeftIcon,
  CheckCircledIcon,
  EnvelopeClosedIcon,
  KeyboardIcon,
  LockClosedIcon
} from "@radix-ui/react-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
interface ForgotPasswordProps {
  submit: () => void;
}
interface ForgotPasswordData {
  email: string;
}
const initMail: ForgotPasswordData = {
  email: ""
};

const ForgotPasswordUI: React.FC<ForgotPasswordProps> = ({ submit }) => {
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
    submit();
  };

  return (
    <main>
      <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
        <KeyboardIcon className="mb-12 mt-2 mx-auto w-8 h-8" />

        <h1 className="text-xl sm:text-2xl font-bold mb-8 text-vobb-neutral-100 text-center">
          Forgot Password?
        </h1>
        <p className="text-center mb-8">No worries, we’ll send you reset instructions.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Email"
            type="email"
            name="email"
            register={register}
            validatorMessage={errors.email?.message}
          />
          <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
            Continue
          </Button>
        </form>

        <Button
          onClick={() => navigate("/")}
          className="w-full mt-6 flex gap-4 items-center"
          size={"default"}
          variant="link">
          <ArrowLeftIcon /> Back to log in
        </Button>
      </section>
    </main>
  );
};

export { ForgotPasswordUI };

//InputCode.tsx
interface InputCodeProps {
  submit: () => void;
}

const InputCode: React.FC<InputCodeProps> = ({ submit }) => {
  const [otp, setOtp] = useState("");

  return (
    <form onSubmit={() => submit()}>
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Continue
      </Button>

      <p className="cursor-pointer mx-auto mt-8 text-center">
        Didn't receive the code? <strong className="text-vobb-primary-70">Click to resend</strong>
      </p>
    </form>
  );
};

//NewPassword.tsx
interface NewPasswordProps {
  submit: () => void;
}
interface NewPasswordData {
  password: string;
  confirmPassword: string;
}
const initPasswords: NewPasswordData = {
  password: "",
  confirmPassword: ""
};

const NewPassword: React.FC<NewPasswordProps> = ({ submit }) => {
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(12, "Password must be at least 12 characters")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
        "Password must contain at least one number and one symbol"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), ""], "Passwords must match")
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewPasswordData>({
    resolver: yupResolver(schema),
    defaultValues: initPasswords
  });

  const onSubmit: SubmitHandler<NewPasswordData> = (data) => {
    submit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordInput
        label="Password"
        type="password"
        name="password"
        register={register}
        validatorMessage={errors.password?.message}
      />
      <PasswordInput
        label="Confirm password"
        type="password"
        name="confirmPassword"
        register={register}
        validatorMessage={errors.confirmPassword?.message}
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Reset Password
      </Button>
    </form>
  );
};
