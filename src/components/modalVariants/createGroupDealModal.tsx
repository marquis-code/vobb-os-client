import { IconX } from "@tabler/icons-react";
import { SelectInput } from "components/form";
import { Modal } from "components/modal";
import { Button } from "components/ui";
import { ModalProps } from "types";

interface CreateGroupDealModalProps extends ModalProps {}

const CreateGroupDealModal = ({ show, close }: CreateGroupDealModalProps) => {
  return (
    <Modal
      contentClassName="max-w-[944px] p-0"
      show={show}
      close={close}
      testId="createGroupDeal-modal">
      <div className="flex items-center justify-between px-4 py-2 border-b border-vobb-neutral-20">
        <h2 className="text-xs font-semibold font-inter text-vobb-neutral-95">New deal</h2>
        <Button
          onClick={close}
          variant={"ghost"}
          size={"icon"}
          data-testid="close-btn"
          className="border p-1.5 size-fit shadow-sm">
          <IconX size={14} />
        </Button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          close();
        }}>
        <div className="p-4 flex flex-col *:mb-0 gap-3 border-y-[0.5px] border-[#e0e0e0]">
          <SelectInput
            onChange={console.log}
            label="Package"
            className="mb-0"
            placeholder="Select package"
            options={[]}
          />
          <SelectInput
            onChange={console.log}
            label="Offering"
            className="mb-0"
            placeholder="Select offering"
            options={[]}
          />
          <SelectInput
            onChange={console.log}
            label="Service/Product"
            className="mb-0"
            placeholder="Select service"
            options={[]}
          />
          <SelectInput
            onChange={console.log}
            label="Deal Manager"
            className="mb-0"
            placeholder="Select Deal Manager"
            options={[]}
          />
          <div className="border-t-[0.5px] border-vobb-neutral-30 pt-4">
            <p className="font-bold text-xs text-vobb-neutral-90  mb-3">Additional Information</p>
            <SelectInput
              onChange={console.log}
              label="Urgency Level"
              className="mb-0"
              placeholder="Select level Manager"
              options={[
                {
                  value: "low",
                  label: "Low level"
                },
                {
                  value: "mid",
                  label: "Medium level"
                },
                {
                  value: "high",
                  label: "High level"
                }
              ]}
            />
          </div>
        </div>
        <div className="px-4 bg-[#fafafa] flex justify-between py-2">
          <Button
            onClick={() => close()}
            className="text-xs rounded-sm"
            size={"default"}
            variant={"outline"}>
            Cancel
          </Button>
          <Button type="submit" size={"default"} variant={"fill"} className="text-xs rounded-sm">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default CreateGroupDealModal;
