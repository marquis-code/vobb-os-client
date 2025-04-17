"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Button } from "components/ui/button";
import { Checkbox } from "components/ui/checkbox";
import { Input } from "components/ui/input";
import { useClickOutside } from "hooks";

// Types for our items
interface BaseItem {
  id: string;
  name: string;
}

interface StageItem extends BaseItem {
  color: string;
}

interface MemberItem extends BaseItem {
  avatarUrl?: string;
  initials: string;
  color: string;
}

type SelectionPanelProps = {
  type: "stage" | "member";
  items: (StageItem | MemberItem)[];
  onSubmit: (selectedIds: string[]) => void;
  buttonText: string;
  loading?: boolean;
  searchPlaceholder: string;
  singleSelect?: boolean;
  close: () => void;
};

export function SelectionPanel({
  type,
  items,
  onSubmit,
  buttonText,
  searchPlaceholder,
  loading,
  singleSelect = false,
  close
}: SelectionPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const ref = useRef(null);

  useClickOutside(ref, close);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
          <div key={item.id} className="flex items-center justify-between py-2">
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
                    alt={item.name}
                  />
                  <AvatarFallback className={(item as MemberItem).color}>
                    {(item as MemberItem).initials}
                  </AvatarFallback>
                </Avatar>
              )}
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <Checkbox
              id={`item-${item.id}`}
              checked={selectedIds.includes(item.id)}
              onCheckedChange={() => handleItemToggle(item.id)}
            />
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={selectedIds.length < 1}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white">
        {buttonText}
      </Button>
    </div>
  );
}
