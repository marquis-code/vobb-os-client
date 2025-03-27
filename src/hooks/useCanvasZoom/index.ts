import { useState, useRef, useEffect, useCallback } from "react";

export interface IUseCanvasZoom {
  /** Current position of the canvas (x, y coordinates) */
  position: { x: number; y: number };
  /** Current zoom level of the canvas (scale factor) */
  zoom: number;
  /** Whether the canvas should automatically fit content to the view */
  fitToView: boolean;
  /** Current interaction mode: "pan" for moving the canvas, "select" for selecting elements, "centered" for centered view */
  interactionMode: "pan" | "select" | "centered";
  /** Reference to the container div element that holds the canvas */
  containerRef: React.RefObject<HTMLDivElement>;
  /** Whether the user is currently dragging the canvas */
  isDragging: boolean;
  /** Sets the zoom level of the canvas */
  setZoom: (zoom: number) => void;
  /** Toggles whether the canvas should automatically fit content to view */
  setFitToView: (fit: boolean) => void;
  /** Changes the interaction mode of the canvas */
  setInteractionMode: (mode: "pan" | "select" | "centered") => void;
  /** Sets the position of the canvas to specific coordinates */
  setPosition: (position: { x: number; y: number }) => void;
  /** Handles mouse down events on the canvas, initiating dragging in pan mode */
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** Handles mouse move events, updating position when dragging in pan mode */
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** Handles mouse up events, ending the dragging operation */
  handleMouseUp: () => void;
  
  /** 
   * Returns the CSS styles needed to apply zoom and position to the canvas
   * @returns Object containing transform, transformOrigin, transition, and optional width, height, and cursor properties
   */
  getZoomStyle: () => {
    transform: string;
    transformOrigin: string;
    transition: string;
    width?: string;
    height?: string;
    cursor?: string;
  };
  
  /** Resets the zoom and position to default values */
  resetZoom: () => void;
}

interface CanvasState {
  position: { x: number; y: number };       
  isDragging: boolean;                      
  startPanPosition: { x: number; y: number }; 
  zoom: number;                             
  fitToView: boolean;                      
  interactionMode: "pan" | "select" | "centered";
}

export const useCanvasZoom = (blocksLength: number): IUseCanvasZoom => {
  // Initialize state with default values
  const [canvasState, setCanvasState] = useState<CanvasState>({
    position: { x: 0, y: 0 },
    isDragging: false,
    startPanPosition: { x: 0, y: 0 },
    zoom: 100,                
    fitToView: false,
    interactionMode: "select"     
  });
  
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Helper function to update canvas state partially
   * Allows updating only specific properties while preserving others
   */
  const updateCanvasState = useCallback((newState: Partial<CanvasState>) => {
    setCanvasState((prevState) => ({ ...prevState, ...newState }));
  }, []);

  /**
   * Effect to refresh fit-to-view when the number of blocks changes
   * Resets and reapplies fit-to-view to ensure proper scaling
   */
  useEffect(() => {
    if (canvasState.fitToView) {
      updateCanvasState({ fitToView: false });
      // Delay re-enabling to allow DOM to update
      setTimeout(() => updateCanvasState({ fitToView: true }), 0);
    }
  }, [blocksLength, canvasState.fitToView, updateCanvasState]);

  /**
   * Handler for mouse down events
   * Initiates dragging if in pan mode
   */
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (canvasState.interactionMode === "pan") {
      setCanvasState(prevState => ({
        ...prevState,
        isDragging: true,
        // Calculate offset between mouse position and current canvas position
        startPanPosition: {
          x: e.clientX - prevState.position.x,
          y: e.clientY - prevState.position.y
        }
      }));
    }
  }, [canvasState.interactionMode, canvasState.position]);

  /**
   * Handler for mouse move events
   * Updates canvas position during dragging in pan mode
   */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (canvasState.isDragging && canvasState.interactionMode === "pan") {
      setCanvasState(prevState => ({
        ...prevState,
        // Calculate new position based on mouse movement and starting offset
        position: {
          x: e.clientX - prevState.startPanPosition.x,
          y: e.clientY - prevState.startPanPosition.y
        }
      }));
    }
  }, [canvasState.isDragging, canvasState.interactionMode, canvasState.startPanPosition]);

  /**
   * Handler for mouse up events
   * Ends dragging operation
   */
  const handleMouseUp = useCallback(() => {
    updateCanvasState({ isDragging: false });
  }, [updateCanvasState]);

  /**
   * Calculates the appropriate scale factor for fit-to-view mode
   * Based on container size and estimated content dimensions
   * @returns Scale factor (between 0 and 1)
   */
  const calculateScaleForContent = useCallback(() => {
    if (!containerRef.current) return 1;

    // Get container dimensions
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    // Estimate content dimensions based on blocks sizes
    const blockWidth = 360;
    const blockHeight = 100;
    const blockMargin = 32;
    const horizontalPadding = 20;
    const verticalPadding = 20;

    // Calculate total content dimensions
    const contentWidth = blockWidth + horizontalPadding;
    const contentHeight = (blocksLength * (blockHeight + blockMargin)) + verticalPadding;

    // Calculate scale factors for width and height
    const scaleX = containerWidth / contentWidth;
    const scaleY = containerHeight / contentHeight;

    // Use the smaller scale to ensure everything fits, but cap at 1 to prevent zooming in
    return Math.min(scaleX, scaleY, 1);
  }, [blocksLength]);

  /**
   * Generates CSS transform styles based on current canvas state
   * Handles different interaction modes and zoom levels
   * @returns Object with CSS style properties
   */
  const getZoomStyle = useCallback(() => {
    const scale = calculateScaleForContent();
    
    // Base style properties common to all modes
    const baseStyle = {
      transformOrigin: "center center",
      transition: canvasState.isDragging ? "none" : "transform 0.2s ease-out", // Disable transition during drag
      width: "100%",
      height: "100%"
    };
    
    // Handle fit-to-view mode
    if (canvasState.fitToView) {
      return {
        ...baseStyle,
        transform: "translate(0px, 0px)" // Reset position for fit view
      };
    }
  
    // Handle centered mode
    if (canvasState.interactionMode === "centered") {
      return {
        ...baseStyle,
        transform: `scale(${scale}) translate(0px, 0px)` // Apply calculated scale
      };
    }
  
    // Handle normal pan/select mode
    return {
      ...baseStyle,
      transform: `scale(${canvasState.zoom / 100}) translate(${canvasState.position.x}px, ${canvasState.position.y}px)`,
      cursor: canvasState.interactionMode === "pan" ? (canvasState.isDragging ? "grabbing" : "grab") : "default",
      width: undefined, // Remove width/height constraints for normal mode
      height: undefined
    };
  }, [calculateScaleForContent, canvasState.fitToView, canvasState.interactionMode, canvasState.isDragging, canvasState.zoom, canvasState.position]);

  /**
   * Resets zoom and canvas state to default values
   */
  const resetZoom = useCallback(() => {
    updateCanvasState({
      zoom: 100,
      position: { x: 0, y: 0 },
      fitToView: false,
      interactionMode: "select"
    });
  }, [updateCanvasState]);

  /**
   * Sets the zoom level
   * Supports both direct value and function update patterns
   */
  const setZoom = useCallback((zoomValue: number | ((prev: number) => number)) => {
    if (typeof zoomValue === 'function') {
      setCanvasState(prevState => ({
        ...prevState,
        zoom: zoomValue(prevState.zoom)
      }));
    } else {
      updateCanvasState({ zoom: zoomValue });
    }
  }, [updateCanvasState]);

  const setFitToView = useCallback((fitToView: boolean) => {
    updateCanvasState({ fitToView });
  }, [updateCanvasState]);


  const setInteractionMode = useCallback((interactionMode: "pan" | "select" | "centered") => {
    updateCanvasState({ interactionMode });
  }, [updateCanvasState]);


  const setPosition = useCallback((position: { x: number; y: number }) => {
    updateCanvasState({ position });
  }, [updateCanvasState]);

  return {
    position: canvasState.position,
    zoom: canvasState.zoom,
    fitToView: canvasState.fitToView,
    interactionMode: canvasState.interactionMode,
    containerRef,
    isDragging: canvasState.isDragging,
    setZoom,
    setFitToView,
    setInteractionMode,
    setPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    getZoomStyle,
    resetZoom
  };
};