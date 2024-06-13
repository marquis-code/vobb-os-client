import { ModalProps } from "types/interfaces";
import { Modal } from "../modal";
import { Button } from "../ui";
import {
  ArrowTopRightIcon,
  Cross1Icon,
  GearIcon,
  ThickArrowRightIcon
} from "@radix-ui/react-icons";
import { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "components/ui/accordion";
import { Link } from "react-router-dom";
import { Routes } from "router";

interface PreventDeleteBranchModalProps extends ModalProps {
  handleContinue: (teamId?: string) => void;
  name: string;
}

const PreventDeleteBranchModal: React.FC<PreventDeleteBranchModalProps> = ({
  show,
  close,
  handleContinue,
  name
}) => {
  return (
    <>
      <Modal contentClassName="max-w-[600px]" show={show} close={close}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">Unable to delete branch - {name}</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <div className="mb-8">
          <p className="text-sm text-vobb-neutral-70 mb-4">
            You cannot delete a non-empty branch. Please transfer the teams under this branch to a
            different branch or remove all team members.
          </p>
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold !no-underline py-2">
                <span className="hover:underline">Finance (3 members)</span>
                <Button
                  className="ml-auto mr-2 font-semibold text-vobb-primary-70 gap-1"
                  variant={"ghost"}
                  size={"sm"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleContinue("1234");
                  }}>
                  Transfer <ThickArrowRightIcon />
                </Button>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="leading-6">
                  <li>Jola Agbayi</li>
                  <li>Jola Agbayi</li>
                  <li>Jola Agbayi</li>
                </ul>
                <Link
                  className="flex items-center gap-1 text-vobb-primary-70 font-medium hover:underline mt-2 text-xs w-fit"
                  target="blank"
                  to={Routes.team("")}>
                  Go to team
                  <ArrowTopRightIcon />
                </Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold !no-underline py-2">
                <span className="hover:underline">Applications (2 members)</span>
                <Button
                  className="ml-auto mr-2 font-semibold text-vobb-primary-70 gap-1"
                  variant={"ghost"}
                  size={"sm"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleContinue("1234");
                  }}>
                  Transfer <ThickArrowRightIcon />
                </Button>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="leading-6">
                  <li>Jola Agbayi</li>
                  <li>Jola Agbayi</li>
                </ul>
                <Link
                  className="flex items-center gap-1 text-vobb-primary-70 font-medium hover:underline mt-2 text-xs w-fit"
                  target="blank"
                  to={Routes.team("")}>
                  Go to team
                  <ArrowTopRightIcon />
                </Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold !no-underline py-2">
                <span className="hover:underline">Customer Success (12 members)</span>
                <Button
                  className="ml-auto mr-2 font-semibold text-vobb-primary-70 gap-1"
                  variant={"ghost"}
                  size={"sm"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleContinue("1234");
                  }}>
                  Transfer <ThickArrowRightIcon />
                </Button>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="leading-6">
                  <li>Jola Agbayi</li>
                  <li>Jola Agbayi</li>
                  <li>Jola Agbayi</li>
                  <li>Jola Agbayi</li>
                  <li>Jola Agbayi</li>
                  <li>Jola Agbayi</li>
                </ul>
                <Link
                  className="flex items-center gap-1 text-vobb-primary-70 font-medium hover:underline mt-2 text-xs w-fit"
                  target="blank"
                  to={Routes.team("")}>
                  View all members
                  <ArrowTopRightIcon />
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={close} size={"default"} variant={"outline"}>
            Cancel
          </Button>
          <Button
            className="gap-1"
            size={"default"}
            variant={"fill"}
            onClick={() => handleContinue()}>
            Transfer all <ThickArrowRightIcon />
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { PreventDeleteBranchModal };
