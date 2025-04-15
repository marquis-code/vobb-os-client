import { IconAt, IconUserCircle, IconUsersGroup } from "@tabler/icons-react";
import { Avatar, AvatarImage, AvatarFallback } from "components/ui/avatar";
import dayjs from "dayjs";
import { GroupActivityItem } from "types/client-group";

const GroupActivitiesUI = ({
  groupId,
  groupName,
  groupActivities
}: {
  groupId: string;
  groupName: string;
  groupActivities: GroupActivityItem[];
}) => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case "created-group":
        return <IconUserCircle color="#4a22eb" size={12} />;
      case "added-client":
        return <IconUsersGroup color="#4a22eb" size={12} />;
      case "removed-client":
        return <IconUsersGroup color="#4a22eb" size={12} />;
      default:
        return <IconAt color="#4a22eb" size={12} />;
    }
  };

  const getActionText = (item: GroupActivityItem) => {
    switch (item.action) {
      case "created-group":
        return (
          <>
            <span className="font-medium capitalize">{item.initiator.name}</span> created a group{" "}
            <span className="text-[#4A22EB] font-medium">{groupName}</span>
          </>
        );
      case "added-client":
        return (
          <>
            <span className="font-medium capitalize text-[#475467]">{item.initiator.name}</span>{" "}
            added client{" "}
            <Avatar className="h-5 w-5 inline-block mx-1">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt={item.meta.client?.name || ""}
              />
              <AvatarFallback className="text-[10px]">
                {getInitials(item.meta.client?.name || "")}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium capitalize">{item.meta.client?.name}</span> to{" "}
            <span className="text-[#4A22EB] font-medium">{groupName}</span>
          </>
        );
      case "removed-client":
        return (
          <>
            <span className="font-medium capitalize text-[#475467]">{item.initiator.name}</span>{" "}
            removed client{" "}
            <Avatar className="h-5 w-5 inline-block mx-1">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt={item.meta.client?.name || ""}
              />
              <AvatarFallback className="text-[10px]">
                {getInitials(item.meta.client?.name || "")}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium capitalize">{item.meta.client?.name} from</span>{" "}
            <span className="text-[#4A22EB] font-medium">{groupName}</span>
          </>
        );
      case "assigned-member":
        return (
          <>
            <span className="font-medium capitalize text-[#475467]">{item.initiator.name}</span>{" "}
            assigned member{" "}
            {item.meta.member?.name ? (
              <>
                <Avatar className="h-5 w-5 inline-block mx-1">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt={item.meta.member.name}
                  />
                  <AvatarFallback className="text-[10px]">
                    {getInitials(item.meta.member.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium capitalize">{item.meta.member.name}</span>
              </>
            ) : (
              <span className="font-medium">Unknown</span>
            )}
          </>
        );
      default:
        return (
          <span className="font-medium text-[#475467]">
            {item.initiator.name} {item.action.split("-").join(" ")}
          </span>
        );
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return dayjs(date).format("YYYY-MM-DD HH:mm a");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <section className=" ">
      <div className="py-4 pl-8 px-5 border-b-[0.5px] border-[#ebecf0]">
        <p className="font-bold">Group Activity</p>
      </div>
      <div className="flex flex-col pt-6 py-4 pl-12 px-5">
        {groupActivities.map((activity) => (
          <div className="flex gap-2 items-start">
            <div className="flex flex-col items-center h-[60px]">
              <div className="grid place-items-center bg-[#f2f0fb] rounded-full size-5">
                {getActionIcon(activity.action)}
              </div>
              <span className="flex-1 block border-r-[0.5px] border-[#e0e0e0] h-full"></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#667085] font-medium">
              <Avatar className="size-6 mr-2">
                <AvatarImage
                  src={activity.initiator.avatar || "/placeholder.svg"}
                  alt={activity.initiator.name}
                />
                <AvatarFallback className="text-[10px]">
                  {getInitials(activity.initiator.name)}
                </AvatarFallback>
              </Avatar>
              <p className="flex gap-1 items-center">{getActionText(activity)}</p>
              <p>on {formatDate(activity.time)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default GroupActivitiesUI;
