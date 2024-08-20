import { MixIcon } from "@radix-ui/react-icons";
import {
  AttributesTable,
  AttributeTableActions,
  Button,
  getAttributeTableColumns,
  Pagination
} from "components";
import { useMemo } from "react";
import { AttributesDataProps } from "types";

interface ClientAttributesProps extends AttributeTableActions {
  handleAddAttribute: () => void;
  handlePagination: (param: string, value: number) => void;
  clientAttributes: AttributesDataProps;
}

const ClientAttributes: React.FC<ClientAttributesProps> = ({
  handleAddAttribute,
  handleEditAttribute,
  handleDuplicateAttribute,
  handleRestoreAttribute,
  handleArchiveAttribute,
  handlePagination,
  clientAttributes
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

  const tableData = clientAttributes?.attributesArray || [];
  const metaData = clientAttributes?.attributesMetaData || {
    currentPage: 1,
    pageLimit: 0,
    totalCount: 0,
    totalPages: 0
  };

  const { currentPage, pageLimit = 20, totalCount, totalPages } = metaData;

  return (
    <>
      <section className="pb-8 mb-12 max-w-[800px]">
        <Button
          onClick={handleAddAttribute}
          className="flex mt-8 mb-6 gap-2 ml-auto"
          variant={"fill"}>
          <MixIcon /> New client attribute
        </Button>
        <AttributesTable columns={columns} data={tableData} />
        <Pagination
          handleChange={(val) => handlePagination("page", val)}
          handlePageLimit={(val) => handlePagination("limit", val)}
          totalCount={totalCount}
          pageLimit={pageLimit}
          totalPages={totalPages}
          currentPage={currentPage}
          className="mt-4"
          data-cy="pagination"
        />
      </section>
    </>
  );
};

export { ClientAttributes };
