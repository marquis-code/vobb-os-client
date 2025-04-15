"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Button } from "components/ui/button";
import { Checkbox } from "components/ui/checkbox";
import { Input } from "components/ui/input";
import { useClickOutside } from "hooks";

// Types for our items
interface BaseItem {
  _id: string;
}

interface StageItem extends BaseItem {
  color: string;
  title: string;
}

interface MemberItem extends BaseItem {
  avatarUrl?: string;
  first_name: string;
  last_name: string;
}

type SelectionPanelProps = {
  type: "stage" | "member";
  items: (StageItem | MemberItem)[];
  onSubmit: (selectedIds: string[]) => void;
  buttonText: string;
  loading?: boolean;
  className?: string;
  searchPlaceholder: string;
  selectedOptions?: string[];
  singleSelect?: boolean;
  close: () => void;
};

export function SelectionPanel({
  type,
  items,
  onSubmit,
  buttonText,
  searchPlaceholder,
  className,
  selectedOptions,
  loading,
  singleSelect = false,
  close
}: SelectionPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(selectedOptions ?? []);

  const ref = useRef(null);

  useClickOutside(ref, close);

  const filteredItems = items.filter((item) => {
    const name =
      type === "member"
        ? `${(item as MemberItem).first_name} ${(item as MemberItem).last_name}`
        : (item as StageItem).title;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleItemToggle = (itemId: string) => {
    if (singleSelect) {
      setSelectedIds([itemId]);
    } else {
      setSelectedIds((prev) =>
        prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
      );
    }
  };

  const handleSubmit = () => {
    onSubmit(selectedIds);
  };

  return (
    <div
      ref={ref}
      className={`w-full max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${
        className ? className : ""
      }`}>
      <div className="mb-4">
        <Input
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-2 mb-4 max-h-[300px] overflow-y-auto">
        {filteredItems.map((item) => (
          <div key={item._id} className="flex items-center justify-between py-2">
            <div className="flex items-center">
              {type === "stage" ? (
                <div
                  style={{
                    background: `${(item as StageItem).color}`
                  }}
                  className={`w-3 h-3 rounded-full mr-3 `}
                />
              ) : (
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage
                    src={(item as MemberItem).avatarUrl || "/placeholder.svg"}
                    alt={(item as MemberItem).first_name + "avatar"}
                  />
                  <AvatarFallback className="bg-vobb-primary-70">
                    {(item as MemberItem).first_name.charAt(0)}
                    {(item as MemberItem).last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <span className="text-sm font-medium">
                {type === "member"
                  ? `${(item as MemberItem).first_name} ${(item as MemberItem).last_name}`
                  : `${(item as StageItem).title}`}
              </span>
            </div>
            <Checkbox
              id={`item-${item._id}`}
              checked={selectedIds.includes(item._id)}
              onCheckedChange={() => handleItemToggle(item._id)}
            />
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        loading={loading}
        type="button"
        disabled={selectedIds.length < 1}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white">
        {buttonText}
      </Button>
    </div>
  );
}
