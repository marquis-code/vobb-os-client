import { MixIcon } from "@radix-ui/react-icons";
import {
  AttributesTable,
  AttributeTableActions,
  Button,
  getAttributeTableColumns,
  Pagination
} from "components";
import { AttributesTableMock } from "lib";
import { useMemo } from "react";

interface ClientAttributesProps extends AttributeTableActions {
  handleAddAttribute: () => void;
}

const ClientAttributes: React.FC<ClientAttributesProps> = ({
  handleAddAttribute,
  handleEditAttribute,
  handleDuplicateAttribute,
  handleRestoreAttribute,
  handleArchiveAttribute
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

  return (
    <>
      <section className="pb-8 mb-12 max-w-[800px]">
        <Button
          onClick={handleAddAttribute}
          className="flex mt-8 mb-6 gap-2 ml-auto"
          variant={"fill"}>
          <MixIcon /> New client attribute
        </Button>
        <AttributesTable columns={columns} data={AttributesTableMock} />
        <Pagination
          handleChange={console.log}
          handlePageLimit={console.log}
          totalCount={3}
          pageLimit={3}
          totalPages={1}
          currentPage={1}
          className="mt-4"
        />
      </section>
    </>
  );
};

export { ClientAttributes };
