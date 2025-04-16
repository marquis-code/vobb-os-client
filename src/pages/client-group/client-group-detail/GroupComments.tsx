import { IconArrowsDiagonal, IconChevronDown } from "@tabler/icons-react";

export const GroupComments = () => {
  return (
    <section className="bg-white pb-6">
      <div className="w-full rounded-lg p-1 flex flex-col bg-[#fbfbfb] border-[0.5px] border-[#eaecf0] gap-1 *:rounded *:bg-white *:border-[0.5px] *:border-[#eaecf0]">
        <div className="px-4 py-1.5 flex justify-between items-center">
          <p className="text-xs flex items-center gap-2 text-[#101323] font-medium">
            <IconArrowsDiagonal size={12} />
            Comment List
          </p>
          <button className="size-[26px] rounded border-[0.5px] border-[#dddfe5] grid place-items-center">
            <IconChevronDown size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
