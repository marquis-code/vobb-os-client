export const calculateNewActiveIndex = (
      activeIndex: number,
      draggedIndex: number,
      dropIndex: number
    ): number => {
      // If dragging from before active to after it, decrease active index
      if (draggedIndex < activeIndex && dropIndex >= activeIndex) {
        return activeIndex - 1;
      }
      // If dragging from after active to before it, increase active index
      if (draggedIndex > activeIndex && dropIndex <= activeIndex) {
        return activeIndex + 1;
      }
      // Otherwise active index doesn't change
      return activeIndex;
    };