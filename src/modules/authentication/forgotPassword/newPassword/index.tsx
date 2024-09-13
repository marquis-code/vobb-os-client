import { Button, PasswordInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { resetPasswordData } from "types";

interface NewPasswordProps {
  submit: (data: resetPasswordData) => void;
  loading: boolean;
}
interface NewPasswordData {
  newPassword: string;
  confirmPassword: string;
}
const initPasswords: NewPasswordData = {
  newPassword: "",
  confirmPassword: ""
};

const NewPasswordUI: React.FC<NewPasswordProps> = ({ submit, loading }) => {
  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required("Required")
      .min(8, "Password should be at least 8 characters long")
      .matches(/[A-Z]/, "Password should contain an uppercase character")
      .matches(/[a-z]/, "Password should contain a lowercase character")
      .matches(/[0-9]/, "Password should contain at least one number")
      .matches(
        /[@#&$]/,
        "Password should contain at least one special character (e.g. @, #, &, $)"
      ),
    confirmPassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("newPassword"), ""], "Passwords must match")
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
    submit(data);
  };

  return (
    <main>
      <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
        <LockClosedIcon className="mb-12 mt-2 mx-auto w-8 h-8" data-testid="logo" />

        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-vobb-neutral-100 text-center">
          Set new Password
        </h1>
        <p className="text-center mb-8" data-testid="subtitle">
          Your new password must be different to previously used passwords.
        </p>

        <form>
          <PasswordInput
            data-testid="newPassword"
            label="New Password"
            type="password"
            name="newPassword"
            register={register}
            validatorMessage={errors.newPassword?.message}
          />
          <PasswordInput
            data-testid="confirmPassword"
            label="Confirm password"
            type="password"
            name="confirmPassword"
            register={register}
            validatorMessage={errors.confirmPassword?.message}
          />

          <Button
            onClick={handleSubmit(onSubmit)}
            loading={loading}
            type="submit"
            className="w-full mt-6"
            size={"default"}
            variant="fill"
            data-testid="reset-btn">
            Reset Password
          </Button>
        </form>
      </section>
    </main>
  );
};

export { NewPasswordUI };
