import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const RecaptchaUI: React.FC = () => {
  const [captcha, setCaptcha] = React.useState();
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);

  return (
    <div className="p-8">
      <ReCAPTCHA
        class="recaptcha"
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        onChange={(token) => {
          setCaptcha(token);
        }}
        ref={recaptchaRef}
      />
      {captcha ? (
        <>
          <h1 className="text-2xl mb-4 mt-6">Recaptcha token:</h1>
          <p className="text-xs text-vobb-neutral-70">{captcha}</p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export { RecaptchaUI };
