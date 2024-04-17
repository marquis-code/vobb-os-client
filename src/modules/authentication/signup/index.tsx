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

interface SignupData {
  email: string;
  password: string;
  captcha: string;
}

const initSignup: SignupData = {
  email: "",
  password: "",
  captcha: "",
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
    .matches(
      /@|#|&|\$]/,
      "Password should contain at least special character (e.g. @, #, &, $)"
    ),
  captcha: yup.string().required("Required"),
});

interface SignupProps {
  submit: (data) => void;
  clear: boolean;
}

const SignupUI = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<SignupData>({
    resolver: yupResolver(schema),
    defaultValues: initSignup,
  });

  const onSubmit: SubmitHandler<SignupData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <main>
        <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
          <LogoIcon className="mb-12 m-auto" />
          <h1 className="text-xl sm:text-2xl font-bold mb-2 text-vobb-neutral-100 text-center">
            Create a Vobb account
          </h1>
          <p className="mb-8 text-center">
            Access all Vobb's tools with just one account.
          </p>
          <form>
            <CustomInput
              label="Email"
              type="email"
              name="email"
              register={register}
              validatorMessage={errors.email?.message}
            />
            <PasswordInput
              label="Password"
              type="password"
              name="password"
              register={register}
              validatorMessage={errors.password?.message}
            />
            {process.env.REACT_APP_RECAPTCHA_SITE_KEY && (
              <ReCAPTCHA
                class="recaptcha"
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={(token) => {
                  setValue("captcha", token);
                }}
                ref={recaptchaRef}
              />
            )}
            <Button
              onClick={handleSubmit(onSubmit)}
              className="w-full mt-6"
              size={"default"}
              variant="fill"
            >
              Get started
            </Button>
          </form>
          <Button
            className="w-full mt-4 flex items-center gap-2 justify-center"
            size={"default"}
            variant="outline"
          >
            <GoogleLogoIcon width={20} /> Signup with Google
          </Button>
          <p className="mt-6 text-center text-[13px]">
            Already have an account?{" "}
            <Link
              className="text-vobb-primary-70 font-semibold"
              to={Routes.login}
            >
              Sign in
            </Link>
          </p>
        </section>
      </main>
    </>
  );
};

export { SignupUI };
