import {
  ActivityCard,
  ActivityCardProps,
  DateFilter,
  LoadingSpinner,
  Pagination,
  SortBy
} from "components";
import { TeamActivityResponse } from "pages";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { optionType, QueryParamProps } from "types";

const sortOptions: optionType[] = [
  {
    label: "Date",
    value: "date"
  }
];

interface TeamActivityProps {
  teamActivities: {
    loading: boolean;
    data: TeamActivityResponse;
    params: QueryParamProps;
    handleFilter: (param: string, value: Date | string | number) => void;
  };
}
const TeamActivity: React.FC<TeamActivityProps> = ({
  teamActivities: { loading, data, params, handleFilter }
}) => {
  const { order: sortOrder, startDate, endDate } = params;
  const { currentPage, totalCount, totalPages, pageLimit = 20 } = data.metaData;

  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [sortBy, setSortBy] = useState<optionType | undefined>(sortOptions[0]);
  const activityList: ActivityCardProps[] = data?.activityArray?.map(
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
              handleChange: (val) => handleFilter("order", val as string)
            }}
            testId="sortBy"
          />
          <DateFilter
            showPreset
            value={date}
            handleChange={(val) => {
              setDate(val);
              if (val) {
                handleFilter(
                  "startDate",
                  val.from ? val.from.toISOString().slice(0, 10) : startDate
                );
                handleFilter("endDate", val.to ? val.to.toISOString().slice(0, 10) : endDate);
              }
            }}
            testId="dateFilter"
          />{" "}
        </div>
        {loading ? (
          <LoadingSpinner testId="loading" />
        ) : !activityList.length ? (
          <p data-testid="no-activities">No team activities for this time.</p>
        ) : (
          <>
            {activityList.map((item, index) => (
              <ActivityCard {...item} key={`${index}_${item.date}`} testId="activity-card" />
            ))}
            <Pagination
              handleChange={(val) => handleFilter("page", val)}
              handlePageLimit={(val) => handleFilter("limit", val)}
              totalCount={totalCount}
              pageLimit={pageLimit}
              totalPages={totalPages}
              currentPage={currentPage}
              testId="pagination"
            />
          </>
        )}
      </section>
    </>
  );
};

type teamActions = "created" | "edited" | "new_invitation" | "joined";

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
      message = <>{initiator === "self" ? "You" : initiator.name} created the team</>;
      break;
    case "new_invitation":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} invited a new member{" "}
          <span className="font-semibold">
            {Array.isArray(metadata?.modified_fields) && metadata.modified_fields.length > 0
              ? metadata.modified_fields.join(", ")
              : ""}
          </span>{" "}
        </>
      );
      break;
    case "edited":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} updated the following team information:{" "}
          <span className="font-semibold">
            {Array.isArray(metadata?.modified_fields) && metadata.modified_fields.length > 0
              ? metadata.modified_fields.join(", ")
              : ""}
          </span>{" "}
        </>
      );
      break;
    case "joined":
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
