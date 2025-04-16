import {
  IconArrowsDiagonal,
  IconChevronDown,
  IconChevronUp,
  IconPlus,
  IconStatusChange,
  IconSubtask
} from "@tabler/icons-react";
import { ModalEmptyState } from "components";
import CreateGroupDealModal from "components/modalVariants/createGroupDealModal";
import { useState } from "react";

export const GroupSales = ({
  pipeline
}: {
  pipeline: {
    _id: string;
    name: string;
  };
}) => {
  const [isShowingDeals, setIsShowingDeals] = useState(false);
  const [isShowingInterestedOfferings, setIsShowingInterestedOfferings] = useState(false);
  const [isShowingNewDealModal, setIsShowingNewDealModal] = useState(false);

  return (
    <section className="bg-white pb-6">
      <div className="w-full rounded-lg p-1 flex flex-col bg-[#fbfbfb] border-[0.5px] border-[#eaecf0] gap-1 *:rounded *:bg-white *:border-[0.5px] *:border-[#eaecf0]">
        <div className="px-4 py-1.5 flex justify-between items-center">
          <p className="text-xs flex items-center gap-2 text-[#101323] font-medium">
            <IconArrowsDiagonal size={12} />
            Deal List
          </p>
          <button
            onClick={() => setIsShowingDeals(!isShowingDeals)}
            className="size-[26px] rounded border-[0.5px] border-[#dddfe5] grid place-items-center">
            {isShowingDeals ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
          </button>
        </div>
        {isShowingDeals && (
          <>
            <div className="px-4 py-1.5">
              <button
                className="flex shadow-[0px_1px_2px_0px_#1018280D] bg-white border-[0.5px] border-[#dddfe5] py-1.5 px-2 rounded items-center gap-1"
                onClick={() => setIsShowingNewDealModal(true)}>
                <IconPlus size={12} />
                <p className="text-[#344054] font-medium text-xs">New Deal</p>
              </button>
            </div>
            <div className="py-2">
              <ModalEmptyState
                pageIcon={<IconStatusChange size={40} />}
                title="Group currently has no deals"
                description=""
                ctaFunction={() => setIsShowingNewDealModal(true)}
                btnIcon={<IconPlus />}
                btnText="New deal"
              />
            </div>
          </>
        )}
      </div>
      <div className="mt-3 w-full rounded-lg p-1 flex flex-col bg-[#fbfbfb] border-[0.5px] border-[#eaecf0] gap-1 *:rounded *:bg-white *:border-[0.5px] *:border-[#eaecf0]">
        <div className="px-4 py-1.5 flex justify-between items-center">
          <p className="text-xs flex items-center gap-2 text-[#101323] font-medium">
            <IconArrowsDiagonal size={12} />
            Interested offerings
          </p>
          <button
            onClick={() => setIsShowingInterestedOfferings(!isShowingInterestedOfferings)}
            className="size-[26px] rounded border-[0.5px] border-[#dddfe5] grid place-items-center">
            {isShowingInterestedOfferings ? (
              <IconChevronUp size={14} />
            ) : (
              <IconChevronDown size={14} />
            )}
          </button>
        </div>
        {isShowingInterestedOfferings && (
          <>
            <div className="px-4 py-1.5">
              <button className="flex shadow-[0px_1px_2px_0px_#1018280D] bg-white border-[0.5px] border-[#dddfe5] py-1.5 px-2 rounded items-center gap-1">
                <IconPlus size={12} />
                <p className="text-[#344054] font-medium text-xs">Add interested offering</p>
              </button>
            </div>
            <div className="py-4 px-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <IconSubtask size={16} />
                  <p className="text-vobb-neutral-60 text-xs">Pipeline</p>
                </div>
                <p className="border-[0.5px] border-vobb-neutral-30 rounded p-1 text-vobb-neutral-80 text-xs w-fit">
                  {pipeline?.name}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <CreateGroupDealModal
        show={isShowingNewDealModal}
        close={() => setIsShowingNewDealModal(false)}
      />
    </section>
  );
};
