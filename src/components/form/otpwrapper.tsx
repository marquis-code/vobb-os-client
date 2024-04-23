import React from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";
interface OTPWrapperProps {
  value: string;
  setValue: (newValue: string) => void;
  className?: string;
}

const OTPWrapper: React.FC<OTPWrapperProps> = ({ value, setValue, className }) => {
  return (
    <InputOTP
      maxLength={6}
      value={value}
      onChange={(value) => setValue(value)}
      className={className}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
};

export { OTPWrapper };
