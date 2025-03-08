import { SettingsPageTitle } from "components";
import { ReactNode } from "react";
import { Switch } from "components/ui/switch";
import {
  BookingAndPayment,
  ClientManagement,
  PipelineStage,
  SecurityAlerts,
  SystemAlerts,
  TaskManagement
} from "./notices";

interface NotificationProps {
  key: string;
  notification: ReactNode;
  inAppEnabled: boolean;
  emailEnabled: boolean;
  popUpEnabled: boolean;
  loadingApp: boolean;
  loadingEmail: boolean;
  loadingPopup: boolean;
  onAppChange: () => void;
  onEmailChange: () => void;
  onPopUpChange: () => void;
}

const initNotifications = {
  clientMgt: {
    inApp: true,
    email: true,
    popUp: false
  },
  taskMgt: {
    inApp: false,
    email: false,
    popUp: false
  },
  sysAlert: {
    inApp: true,
    email: true,
    popUp: false
  },
  boookingAndPayment: {
    inApp: true,
    email: true,
    popUp: false
  },
  pipelineStage: {
    inApp: true,
    email: true,
    popUp: false
  },
  securityAlerts: {
    inApp: true,
    email: true,
    popUp: false
  }
};

const NotificationsUI = ({ submit, loading }) => {
  const notices: NotificationProps[] = [
    {
      key: "client-mgt",
      notification: <ClientManagement />,
      inAppEnabled: initNotifications.clientMgt.inApp,
      emailEnabled: initNotifications.clientMgt.email,
      popUpEnabled: initNotifications.clientMgt.popUp,
      loadingApp: loading,
      loadingEmail: loading,
      loadingPopup: loading,
      onAppChange: () => submit({ enable: !initNotifications.clientMgt.inApp }),
      onEmailChange: () => submit({ enable: !initNotifications.clientMgt.email }),
      onPopUpChange: () => submit({ enable: !initNotifications.clientMgt.popUp })
    },
    {
      key: "task-mgt",
      notification: <TaskManagement />,
      inAppEnabled: initNotifications.taskMgt.inApp,
      emailEnabled: initNotifications.taskMgt.email,
      popUpEnabled: initNotifications.taskMgt.popUp,
      loadingApp: loading,
      loadingEmail: loading,
      loadingPopup: loading,
      onAppChange: () => submit({ enable: !initNotifications.taskMgt.inApp }),
      onEmailChange: () => submit({ enable: !initNotifications.taskMgt.email }),
      onPopUpChange: () => submit({ enable: !initNotifications.taskMgt.popUp })
    },
    {
      key: "system-alert",
      notification: <SystemAlerts />,
      inAppEnabled: initNotifications.sysAlert.inApp,
      emailEnabled: initNotifications.sysAlert.email,
      popUpEnabled: initNotifications.sysAlert.popUp,
      loadingApp: loading,
      loadingEmail: loading,
      loadingPopup: loading,
      onAppChange: () => submit({ enable: !initNotifications.sysAlert.inApp }),
      onEmailChange: () => submit({ enable: !initNotifications.sysAlert.email }),
      onPopUpChange: () => submit({ enable: !initNotifications.sysAlert.popUp })
    },
    {
      key: "booking",
      notification: <BookingAndPayment />,
      inAppEnabled: initNotifications.boookingAndPayment.inApp,
      emailEnabled: initNotifications.boookingAndPayment.email,
      popUpEnabled: initNotifications.boookingAndPayment.popUp,
      loadingApp: loading,
      loadingEmail: loading,
      loadingPopup: loading,
      onAppChange: () => submit({ enable: !initNotifications.boookingAndPayment.inApp }),
      onEmailChange: () => submit({ enable: !initNotifications.boookingAndPayment.email }),
      onPopUpChange: () => submit({ enable: !initNotifications.boookingAndPayment.popUp })
    },
    {
      key: "pipeline-stage",
      notification: <PipelineStage />,
      inAppEnabled: initNotifications.pipelineStage.inApp,
      emailEnabled: initNotifications.pipelineStage.email,
      popUpEnabled: initNotifications.pipelineStage.popUp,
      loadingApp: loading,
      loadingEmail: loading,
      loadingPopup: loading,
      onAppChange: () => submit({ enable: !initNotifications.pipelineStage.inApp }),
      onEmailChange: () => submit({ enable: !initNotifications.pipelineStage.email }),
      onPopUpChange: () => submit({ enable: !initNotifications.pipelineStage.popUp })
    },
    {
      key: "security-alert",
      notification: <SecurityAlerts />,
      inAppEnabled: initNotifications.securityAlerts.inApp,
      emailEnabled: initNotifications.securityAlerts.email,
      popUpEnabled: initNotifications.securityAlerts.popUp,
      loadingApp: loading,
      loadingEmail: loading,
      loadingPopup: loading,
      onAppChange: () => submit({ enable: !initNotifications.securityAlerts.inApp }),
      onEmailChange: () => submit({ enable: !initNotifications.securityAlerts.email }),
      onPopUpChange: () => submit({ enable: !initNotifications.securityAlerts.popUp })
    }
  ];

  return (
    <>
      <div className="flex justify-between items-center border-b border-vobb-neutral-20 mb-4 pb-3">
        <SettingsPageTitle
          title="Notifications"
          className="border-none mb-0 w-[448px]"
          headerClassname="mb-0"
        />
        <div className=" grid grid-cols-3 gap-6 justify-end text-vobb-neutral-60">
          <p className="w-32">In-app</p>
          <p className="w-32">Email</p>
          <p className="w-32">Push Notification</p>
        </div>
      </div>

      <div>
        {notices.map(
          ({
            key,
            notification,
            inAppEnabled,
            emailEnabled,
            popUpEnabled,
            loadingApp,
            loadingEmail,
            loadingPopup,
            onAppChange,
            onEmailChange,
            onPopUpChange
          }) => (
            <div key={key} className="flex justify-between items-center mb-10">
              <div className="w-[448px]">{notification}</div>
              <div className=" grid grid-cols-3 gap-6 justify-end text-vobb-neutral-60">
                <span className="w-32">
                  <Switch
                    checked={inAppEnabled}
                    onCheckedChange={onAppChange}
                    disabled={loadingApp}
                    testId={`${key}-app`}
                    className="w-12 h-7"
                    thumbClassname="w-6 h-6 data-[state=checked]:translate-x-5"
                  />
                </span>{" "}
                <span className="w-32">
                  <Switch
                    checked={emailEnabled}
                    onCheckedChange={onEmailChange}
                    disabled={loadingEmail}
                    testId={`${key}-email`}
                    className="w-12 h-7"
                    thumbClassname="w-6 h-6 data-[state=checked]:translate-x-5"
                  />
                </span>{" "}
                <span className="w-32">
                  <Switch
                    checked={popUpEnabled}
                    onCheckedChange={onPopUpChange}
                    disabled={loadingPopup}
                    testId={`${key}-popup`}
                    className="w-12 h-7"
                    thumbClassname="w-6 h-6 data-[state=checked]:translate-x-5"
                  />
                </span>{" "}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export { NotificationsUI };
