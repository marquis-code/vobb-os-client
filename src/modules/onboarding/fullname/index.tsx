import { FullnameFormData, FullnameFormProps } from "types/interfaces";
import { PersonalIcon } from "assets";
import { Button, CustomInput } from "components";
import { useEffect, useState } from "react";

const Fullname: React.FC<FullnameFormProps> = ({ initData, submit }) => {
  const [state, setState] = useState(initFullnameData);
  const { firstName, lastName } = state;
  const [error, setError] = useState<FullnameFormErrors>();

  useEffect(() => {
    initData && setState(initData);
  }, [initData]);

  const handleSubmit = () => {
    const errors: FullnameFormErrors = {};

    if (firstName.trim().length === 0) errors.firstName = "Required";
    if (lastName.trim().length === 0) errors.lastName = "Required";

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      submit(state);
    }
  };
  return (
    <div className="max-w-[400px] m-auto">
      <PersonalIcon className="mb-6 m-auto" />
      <div className="mb-4 text-center mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-vobb-neutral-100 text-center">
          Fullname information
        </h2>
        <p>Help us get to know you better</p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <CustomInput
          type="text"
          name="firstname"
          placeholder="First name"
          onChange={(e) => setState((prev) => ({ ...prev, firstName: e.target.value }))}
          validatorMessage={error?.firstName}
        />

        <CustomInput
          type="text"
          name="lastName"
          placeholder="Last name"
          onChange={(e) => setState((prev) => ({ ...prev, lastName: e.target.value }))}
          validatorMessage={error?.lastName}
        />

        <Button
          onClick={() => handleSubmit()}
          className="w-full mt-6"
          size={"default"}
          variant="fill">
          Continue
        </Button>
      </form>
    </div>
  );
};
export { Fullname };

interface FullnameFormErrors {
  firstName?: string;
  lastName?: string;
}

const initFullnameData: FullnameFormData = {
  firstName: "",
  lastName: ""
};
