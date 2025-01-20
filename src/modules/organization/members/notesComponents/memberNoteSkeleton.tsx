const MemberNoteSkeleton: React.FC = () => {
  return (
    <div className="border rounded-md h-[216px] text-xs overflow-hidden flex flex-col justify-between animate-pulse">
      <div className="flex items-center justify-between p-4 border-b bg-vobb-neutral-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-vobb-neutral-30"></div>
            <div className="h-4 bg-vobb-neutral-30 rounded w-20"></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-7 w-16 bg-vobb-neutral-30 rounded"></div>
          <div className="h-7 w-7 bg-vobb-neutral-30 rounded"></div>
        </div>
      </div>

      <div className="flex flex-col py-3 px-4 flex-1">
        <div className="h-4 bg-vobb-neutral-30 rounded mb-2 w-3/4"></div>
        <div className="h-3 bg-vobb-neutral-30 rounded w-full"></div>
        <div className="h-3 bg-vobb-neutral-30 rounded mt-1 w-5/6"></div>
      </div>

      <div className="flex items-center justify-between p-4 border-t bg-vobb-neutral-10">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-vobb-neutral-30"></div>
          <div className="h-4 bg-vobb-neutral-30 rounded w-20"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-vobb-neutral-30 rounded"></div>
          <div className="h-4 bg-vobb-neutral-30 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
};

export { MemberNoteSkeleton };
