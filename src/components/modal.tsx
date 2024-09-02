import { useClickOutside } from "hooks";
import { useRef } from "react";
import { cn } from "lib";
import { ModalProps } from "types";

interface ModalUIProps extends ModalProps {
  children: any;
  position?: "centered" | "left" | "right";
  dialogClassName?: string;
  contentClassName?: string;
  testId?: string;
}

const Modal: React.FC<ModalUIProps> = ({
  children,
  position = "centered",
  close,
  show,
  dialogClassName,
  contentClassName,
  testId
}) => {
  const modalRef = useRef(null);
  useClickOutside(modalRef, close);

  if (!show) return null;

  return (
    <>
      <aside
        className={cn(
          "w-full h-full fixed bg-[#344054]/30 bg-opacity-75 z-[1500] p-4 top-0 left-0 flex",
          dialogClassName
        )}
        data-cy={testId}>
        <section
          ref={modalRef}
          className={cn(
            `bg-white p-4 rounded-lg w-full max-w-[450px] max-h-[90dvh] overflow-auto`,
            `${position === "right" ? "" : position === "left" ? "" : "m-auto"}`,
            contentClassName
          )}>
          {children}
        </section>
      </aside>
    </>
  );
};

export { Modal };
