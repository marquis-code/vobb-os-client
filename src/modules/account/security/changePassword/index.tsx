import { Button, PasswordInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { LockClosedIcon } from "@radix-ui/react-icons";

interface ChangePasswordProps {
  submit: () => void;
}
interface ChangePasswordData {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
const initPasswords: ChangePasswordData = {
  currentPassword: "",
  password: "",
  confirmPassword: ""
};

const ChangePassword: React.FC<ChangePasswordProps> = ({ submit }) => {
  const schema = yup.object().shape({
    currentPassword: yup.string().required("Required"),
    password: yup
      .string()
      .required("Required")
      .min(8, "Password should be at least 8 characters long")
      .matches(/[A-Z]/, "Password should contain an uppercase character")
      .matches(/[a-z]/, "Password should contain an lowercase character")
      .matches(/[0-9]/, "Password should contain at least one number")
      .matches(/@|#|&|\$]/, "Password should contain at least special character (e.g. @, #, &, $)"),
    confirmPassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password"), ""], "Passwords must match")
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm<ChangePasswordData>({
    resolver: yupResolver(schema),
    defaultValues: initPasswords
  });

  const onSubmit: SubmitHandler<ChangePasswordData> = (data) => {
    submit();
  };

  return (
    <>
      <section className="grid grid-cols-[1fr,2fr] gap-8 border-b border-vobb-neutral-20 pb-8 mb-12 max-w-[800px]">
        <div>
          <h2 className="text-[16px] font-semibold mb-2">Password</h2>
          <p  className="text-xs">Update your password</p>
        </div>
        <form>
          <PasswordInput
            label="Current Password"
            type="password"
            name="currentPassword"
            register={register}
            validatorMessage={errors.currentPassword?.message}
          />
          <PasswordInput
            label="New Password"
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
          <div className="flex gap-2 justify-end max-w-[800px] pt-4">
            <Button disabled={!isDirty} onClick={() => reset()} variant={"outline"}>
              Cancel
            </Button>
            <Button disabled={!isDirty} onClick={handleSubmit(onSubmit)} variant={"fill"}>
              Save
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export { ChangePassword };
