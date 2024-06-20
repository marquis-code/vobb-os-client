import { LogoIcon } from "assets";
import { CustomInput, PasswordInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "components/ui/button";
import { GoogleLogoIcon } from "assets";
import { Routes } from "router";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

export interface SignupData {
  email: string;
  password: string;
  recaptcha: string;
}

const initSignup: SignupData = {
  email: "",
  password: "",
  recaptcha: ""
};

const schema = yup.object({
  email: yup.string().email("Enter a valid email").required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Password should be at least 8 characters long")
    .matches(/[A-Z]/, "Password should contain an uppercase character")
    .matches(/[a-z]/, "Password should contain an lowercase character")
    .matches(/[0-9]/, "Password should contain at least one number")
    .matches(/@|#|&|\$]/, "Password should contain at least special character (e.g. @, #, &, $)"),
  recaptcha: yup.string().required("Required")
});

interface SignupProps {
  submit: (data: SignupData) => void;
  clear: boolean;
  loading: boolean;
  handleGoogleSignup: () => void;
}

const SignupUI: React.FC<SignupProps> = ({ submit, loading, handleGoogleSignup }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<SignupData>({
    resolver: yupResolver(schema),
    defaultValues: initSignup
  });
  const onSubmit: SubmitHandler<SignupData> = (data) => {
    submit(data);
    if (getValues()?.recaptcha !== "") {
      setValue("recaptcha", "");
      recaptchaRef.current.reset();
    }
  };

  return (
    <>
      <main>
        <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
          <LogoIcon className="mb-12 m-auto" />
          <h1 className="text-xl sm:text-2xl font-bold mb-2 text-vobb-neutral-100 text-center">
            Create a Vobb account
          </h1>
          <p className="mb-8 text-center" data-cy="subtitle">
            Access all Vobb's tools with just one account.
          </p>
          <form>
            <CustomInput
              label="Email"
              type="email"
              name="email"
              register={register}
              validatorMessage={errors.email?.message}
              data-cy="email"
            />
            <PasswordInput
              label="Password"
              type="password"
              name="password"
              register={register}
              validatorMessage={errors.password?.message}
              data-cy="password"
            />
            {process.env.REACT_APP_RECAPTCHA_SITE_KEY && (
              <ReCAPTCHA
                class="recaptcha"
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={(token) => {
                  setValue("recaptcha", token);
                }}
                ref={recaptchaRef}
                data-cy="recaptcha"
              />
            )}
            {errors.recaptcha?.message && (
              <small className="block text-[11px] mt-1 text-error-10">
                {errors.recaptcha?.message}
              </small>
            )}
            <Button
              onClick={handleSubmit(onSubmit)}
              loading={loading}
              className="w-full mt-6"
              size={"default"}
              variant="fill"
              data-cy="signup-btn">
              Get started
            </Button>
          </form>
          <Button
            className="w-full mt-4 flex items-center gap-2 justify-center"
            size={"default"}
            variant="outline"
            onClick={handleGoogleSignup}
            data-cy="signup-google-btn">
            <GoogleLogoIcon width={20} /> Signup with Google
          </Button>
          <p className="mt-6 text-center text-[13px]" data-cy="already-have-account">
            Already have an account?{" "}
            <Link
              className="text-vobb-primary-70 font-semibold"
              to={Routes.login}
              data-cy="go-to-signin">
              Sign in
            </Link>
          </p>
        </section>
      </main>
    </>
  );
};

export { SignupUI };
