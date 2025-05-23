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
import { loginData } from "types/auth";

interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
  recaptcha: string;
}

export const initLogin: LoginData = {
  email: "",
  password: "",
  rememberMe: true,
  recaptcha: ""
};

const schema = yup.object({
  email: yup.string().email("Enter a valid email").required("Required"),
  password: yup.string().required("Required"),
  rememberMe: yup.boolean(),
  recaptcha: yup.string().required("Required")
});

interface LoginProps {
  submit: (data: loginData) => void;
  loading: boolean;
  handleGoogleSignin: () => void;
}

const LoginUI: React.FC<LoginProps> = ({ submit, loading, handleGoogleSignin }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { isMobile } = useMobile({ size: 1024 });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
    defaultValues: initLogin
  });
  const onSubmit: SubmitHandler<LoginData> = (data) => {
    submit(data);
    if (getValues()?.recaptcha !== "") {
      setValue("recaptcha", "");
      recaptchaRef.current.reset();
    }
  };

  return (
    <>
      {isMobile ? (
        <UnsupportedScreenSize />
      ) : (
        <main>
          <section
            className="bg-circle-pattern max-w-[400px] m-auto text-vobb-neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4"
            data-testid="login-component">
            <LogoIcon className="mb-12 m-auto" data-testid="logo" />
            <h1 className="text-xl sm:text-2xl font-bold mb-8 text-vobb-neutral-100 text-center">
              Sign in to your account
            </h1>
            <form>
              <CustomInput
                data-testid="email"
                label="Email"
                type="email"
                name="email"
                register={register}
                validatorMessage={errors.email?.message}
              />
              <PasswordInput
                data-testid="password"
                label="Password"
                type="password"
                name="password"
                register={register}
                validatorMessage={errors.password?.message}
              />
              <div className="flex items-center justify-between mb-4" data-testid="rememberMe">
                <CheckboxWithText
                  label="Stay signed in for a week"
                  labelClassName="text-[13px]"
                  className="items-center"
                  handleChecked={(checked) => {
                    setValue("rememberMe", checked);
                  }}
                  checked={watch("rememberMe") ?? false}
                  data-testid="stay-signed-in"
                />

                <Link
                  className="text-vobb-primary-70 font-semibold text-[13px]"
                  to={Routes.forgot_password}>
                  Forgot password?
                </Link>
              </div>
              {process.env.REACT_APP_RECAPTCHA_SITE_KEY && (
                <ReCAPTCHA
                  id="g-recaptcha"
                  class="recaptcha"
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={(token) => {
                    setValue("recaptcha", token);
                  }}
                  ref={recaptchaRef}
                  data-testid="recaptcha"
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
                disabled={loading}
                className="w-full mt-6"
                size={"default"}
                variant="fill"
                data-testid="signin-btn">
                Sign in
              </Button>
            </form>
            <Button
              className="w-full mt-4 flex items-center gap-2 justify-center"
              size={"default"}
              variant="outline"
              disabled={loading}
              onClick={handleGoogleSignin}
              data-testid="signin-google-btn">
              <GoogleLogoIcon width={20} /> Sign in with Google
            </Button>
            <p className="mt-6 text-center text-[13px]" data-testid="dont-have-account">
              Don't have an account?{" "}
              <Link
                className="text-vobb-primary-70 font-semibold"
                to={Routes.home}
                data-testid="go-to-signup">
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
