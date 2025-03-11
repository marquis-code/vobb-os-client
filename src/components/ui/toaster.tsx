import { IconAlertCircle, IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "./toast";
import { useToast } from "./use-toast";
import { Row } from "layout";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant = "success", ...props }) {
                let variantIcon;
                if (variant === "destructive") {
                  variantIcon = <IconCircleX className="text-destructive w-[18px] h-[18px]" />;
                } else if (variant === "success") {
                  variantIcon = <IconCircleCheck className="text-success-40 w-[18px] h-[18px]" />;
                } else {
                  variantIcon = <IconAlertCircle className="text-vobb-warning-10 w-[18px] h-[18px]" />;
                }
        return (
          <Toast key={id} variant={variant} {...props} className="max-w-max">
            <Row className="items-center gap-2 w-full">
              {variantIcon}
              <div className="w-full flex items-center justify-between">
                <div>
                  <div className="grid gap-1">
                    {title && <ToastTitle>{title}</ToastTitle>}
                    {description && <ToastDescription>{description}</ToastDescription>}
                  </div>
                  {action}
                </div>
                <ToastClose />
              </div>
            </Row>
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}