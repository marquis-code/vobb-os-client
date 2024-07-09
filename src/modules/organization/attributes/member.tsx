import { MixIcon } from "@radix-ui/react-icons";
import {
  AttributesTable,
  AttributeTableActions,
  Button,
  getAttributeTableColumns,
  Pagination
} from "components";
import { useUserContext } from "context";
import { useMemo } from "react";

interface MemberAttributesProps extends AttributeTableActions {
  handleAddAttribute: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}

const MemberAttributes: React.FC<MemberAttributesProps> = ({
  handleAddAttribute,
  handleEditAttribute,
  handleDuplicateAttribute,
  handleRestoreAttribute,
  handleArchiveAttribute,
  limit,
  setLimit,
  setPage
}) => {
  const columns = useMemo(
    () =>
      getAttributeTableColumns({
        handleEditAttribute,
        handleDuplicateAttribute,
        handleRestoreAttribute,
        handleArchiveAttribute
      }),
    [handleEditAttribute, handleDuplicateAttribute, handleRestoreAttribute, handleArchiveAttribute]
  );
  const { orgAttributes } = useUserContext();
  const tableData = orgAttributes?.attributesArray || [];
  const metaData = orgAttributes?.attributesMetaData || {
    currentPage: 1,
    pageLimit: 0,
    totalCount: 0,
    totalPages: 0
  };

  return (
    <>
      <section className="pb-8 mb-12 max-w-[800px]">
        <Button
          onClick={handleAddAttribute}
          className="flex mt-8 mb-6 gap-2 ml-auto"
          variant={"fill"}>
          <MixIcon /> New member attribute
        </Button>
        <AttributesTable columns={columns} data={tableData} />
        <Pagination
          handleChange={setPage}
          handlePageLimit={setLimit}
          totalCount={metaData.totalCount}
          pageLimit={limit}
          totalPages={metaData.totalPages}
          currentPage={metaData.currentPage}
          className="mt-4"
        />
      </section>
    </>
  );
};

export { MemberAttributes };
