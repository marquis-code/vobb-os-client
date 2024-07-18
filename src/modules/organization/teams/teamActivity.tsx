import {
  ActivityCard,
  ActivityCardProps,
  DateFilter,
  Pagination,
  SortBy,
  SortOrderType
} from "components";
import { teamActivityMockData } from "lib";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { optionType } from "types";

const sortOptions: optionType[] = [
  {
    label: "Date",
    value: "date"
  }
];

const TeamActivity = () => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [sortBy, setSortBy] = useState<optionType | undefined>(sortOptions[0]);
  const [sortOrder, setSortOrder] = useState<SortOrderType | undefined>(undefined);

  const activityList: ActivityCardProps[] = teamActivityMockData.map(
    ({ date, time, action, metadata, initiator }) => ({
      time,
      date,
      message: getMessage({ action, metadata, initiator }),
      isFirstAction: action === "created"
    })
  );

  return (
    <>
      <section className="grid gap-4 max-w-[800px] mt-4">
        <div className="flex gap-2">
          <SortBy
            isClearable
            sort={{
              active: sortBy,
              items: sortOptions,
              handleChange: setSortBy
            }}
            order={{
              show: true,
              active: sortOrder,
              handleChange: setSortOrder
            }}
          />
          <DateFilter showPreset value={date} handleChange={setDate} />
        </div>
        {activityList.map((item, index) => (
          <ActivityCard {...item} key={`${index}_${item.date}`} />
        ))}
        <Pagination
          handleChange={console.log}
          handlePageLimit={console.log}
          totalCount={16}
          pageLimit={20}
          totalPages={1}
          currentPage={1}
        />
      </section>
    </>
  );
};

type teamActions = "created" | "edited" | "new_invitation" | "new_member";

type initiator = { name: string; id: string } | "self";

export interface TeamActivityData {
  action: teamActions;
  date: string;
  time: string;
  metadata: any | undefined;
  initiator: initiator;
}

const getMessage = ({
  action,
  metadata,
  initiator
}: {
  action: teamActions;
  metadata: any;
  initiator: initiator;
}) => {
  let message: string | React.ReactNode = "";
  switch (action) {
    case "created":
      message = <>{initiator === "self" ? "you" : initiator.name} created the team</>;
      break;
    case "new_invitation":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} invited a new member{" "}
          <span className="font-semibold">{metadata?.memberName}</span>
        </>
      );
      break;
    case "edited":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} updated the following team information:{" "}
          <span className="font-semibold">{metadata.fields}</span>
        </>
      );
      break;
    case "new_member":
      message = (
        <>
          <span className="font-semibold">{initiator === "self" ? "You" : initiator.name}</span>{" "}
          joined the team
        </>
      );
      break;
    default:
      message = "Unidentified action";
      break;
  }
  return message;
};

export { TeamActivity };
