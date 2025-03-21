import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { cn } from "lib";
import { FC, ReactElement, useState, useEffect } from "react";
import { optionType } from "types";

type TabType = {
  count?: number;
  icon: ReactElement;
  component: ReactElement;
};

/**
 * TabsPanel Component
 * 
 * Tabs component that can optionally sync with URL parameters.
 * 
 * @component
 * 
 * @example
 * // Basic usage with internal state only
 * <TabsPanel
 *   tabs={[
 *     {
 *       label: "Details",
 *       value: "details",
 *       icon: <Icon size={14} />,
 *       component: <p>Details Content</p>
 *     },
 *     // More tabs...
 *   ]}
 * />
 * 
 * @example
 * // Usage with URL synchronization
 * <TabsPanel
 *   tabs={PRIMARY_TABS}
 *   syncWithUrl={true}
 *   urlParam={params.tab}
 *   onUrlChange={(value) => navigate(Routes.client(params.id, value))}
 * />
 * 
 * @param {Object} props - Component props
 * @param {Array<TabType & optionType>} props.tabs - Array of tab objects containing:
 *   - label: Display text for the tab
 *   - value: Unique identifier for the tab
 *   - icon: React element for the tab icon
 *   - component: React element to render as tab content
 *   - count: Optional counter to display beside the tab (e.g. for notifications)
 * @param {string} [props.containerClassName] - Optional CSS class for the container
 * @param {boolean} [props.syncWithUrl=false] - Whether to sync tab state with URL
 * @param {string} [props.urlParam] - Current URL parameter value to sync with
 * @param {Function} [props.onUrlChange] - Callback when tab changes, to update URL
 */
interface Props {
  tabs: Array<TabType & optionType>;
  containerClassName?: string;
  syncWithUrl?: boolean;
  urlParam?: string;
  onUrlChange?: (value: string) => void;
}

export const TabsPanel: FC<Props> = ({ 
  tabs, 
  containerClassName,
  syncWithUrl = false,
  urlParam,
  onUrlChange
}) => {
  const getDefaultTabValue = () => {
    if (syncWithUrl && urlParam && tabs.some(tab => tab.value === urlParam)) {
      return urlParam;
    }
    return tabs.length > 0 ? tabs[0].value : '';
  };
  
  const [activeTab, setActiveTab] = useState(getDefaultTabValue());
  
  useEffect(() => {
    if (syncWithUrl && urlParam && tabs.some(tab => tab.value === urlParam)) {
      setActiveTab(urlParam);
    }
  }, [urlParam, syncWithUrl, tabs]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (syncWithUrl && onUrlChange) {
      onUrlChange(value);
    }
  };

  return (
    <Tabs 
      defaultValue={activeTab} 
      value={activeTab} 
      onValueChange={handleTabChange} 
      className={cn("w-full", containerClassName)}
    >
      <TabsList className="w-full p-0 px-4 max-h-[48px] border-y rounded-none h-full bg-transparent gap-4 justify-start">
        {tabs.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className={cn(
              "max-h-max border-b-2 border-transparent p-4 px-2 text-xs text-[#98A2B3] font-medium bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none shadow-none rounded-none",
              { "border-vobb-primary-80": activeTab === item.value }
            )}
          >
            {item.icon}
            <span className={cn("mx-2", { "text-vobb-primary-80": activeTab === item.value })}>
              {item.label}
            </span>
            {item.count ? (
              <span className="border border-[#DDDFE5] bg-[#FBFBFB] rounded-[4px] py-[1px] p-[5px] font-normal">
                {item.count}
              </span>
            ) : null}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

TabsPanel.displayName = "TabsPanel";