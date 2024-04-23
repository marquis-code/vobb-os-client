import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "components/ui/input-otp";

interface CustomInputOTPProps {
  value: string;
  onChange: (value: string) => void;
}
const CustomInputOTP: React.FC<CustomInputOTPProps> = ({ value, onChange }) => {
  return (
    <>
      <InputOTP autoFocus value={value} onChange={onChange} maxLength={6}>
        <InputOTPSlot className="border text-[15px] rounded-md text-vobb-neutral-100" index={0} />
        <InputOTPSlot className="border text-[15px] rounded-md text-vobb-neutral-100" index={1} />
        <InputOTPSlot className="border text-[15px] rounded-md text-vobb-neutral-100" index={2} />
        <InputOTPSeparator />
        <InputOTPSlot className="border text-[15px] rounded-md text-vobb-neutral-100" index={3} />
        <InputOTPSlot className="border text-[15px] rounded-md text-vobb-neutral-100" index={4} />
        <InputOTPSlot className="border text-[15px] rounded-md text-vobb-neutral-100" index={5} />
      </InputOTP>
    </>
  );
};

export { CustomInputOTP };
