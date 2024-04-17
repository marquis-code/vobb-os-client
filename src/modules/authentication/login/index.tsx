import { LogoIcon } from "assets";
import {
  CustomInput,
  PasswordInput,
  Button,
  CheckboxWithText,
  UnsupportedScreenSize
} from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { GoogleLogoIcon } from "assets";
import { Routes } from "router";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { useMobile } from "hooks";

interface LoginData {
  email: string;
  password: string;
  captcha: string;
}

const initLogin: LoginData = {
  email: "",
  password: "",
  captcha: ""
};

const schema = yup.object({
  email: yup.string().email("Enter a valid email").required("Required"),
  password: yup.string().required("Required"),
  captcha: yup.string().required("Required")
});

interface LoginProps {
  submit: (data) => void;
  clear: boolean;
}

const LoginUI = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { isMobile } = useMobile({ size: 1024 });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
    defaultValues: initLogin
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    console.log(data);
  };

  return (
    <>
      {isMobile ? (
        <UnsupportedScreenSize />
      ) : (
        <main>
          <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
            <LogoIcon className="mb-12 m-auto" />
            <h1 className="text-xl sm:text-2xl font-bold mb-8 text-vobb-neutral-100 text-center">
              Sign in to your account
            </h1>
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
              <div className="flex items-center justify-between mb-4">
                <CheckboxWithText
                  label="Stay signed in for a week"
                  labelClassName="text-[13px]"
                  className="items-center"
                />

                <Link
                  className="text-vobb-primary-70 font-semibold text-[13px]"
                  to={Routes.forgot_password}>
                  Forgot password?
                </Link>
              </div>
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
                variant="fill">
                Sign in
              </Button>
            </form>
            <Button
              className="w-full mt-4 flex items-center gap-2 justify-center"
              size={"default"}
              variant="outline">
              <GoogleLogoIcon width={20} /> Signin with Google
            </Button>
            <p className="mt-6 text-center text-[13px]">
              Don't have an account?{" "}
              <Link className="text-vobb-primary-70 font-semibold" to={Routes.home}>
                Sign up
              </Link>
            </p>
          </section>
        </main>
      )}
    </>
  );
};

export { LoginUI };
