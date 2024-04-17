import { useEffect, useState } from "react";

interface MobileProps {
  size?: number;
  onMobile?: () => void;
  onDesktop?: () => void;
}

const useMobile = ({ size = 800, onMobile, onDesktop }: MobileProps) => {
  const [isMobile, setMobile] = useState(window.innerWidth <= size ? true : false);

  const screenSizeUpdate = () => {
    if (window.innerWidth <= size) {
      setMobile(true);
      onMobile && onMobile();
    } else if (window.innerWidth > size) {
      setMobile(false);
      onDesktop && onDesktop();
    }
  };

  window.addEventListener("resize", screenSizeUpdate);
  window.addEventListener("onload", screenSizeUpdate);

  useEffect(() => {
    screenSizeUpdate();
  }, [window.innerWidth, size]);

  return { isMobile };
};

export { useMobile };
