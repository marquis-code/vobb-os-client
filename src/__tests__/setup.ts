// setupTests.ts or your current setup file

import "@testing-library/jest-dom/vitest";

// Mock for ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock for scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock for IntersectionObserver
class MockIntersectionObserver {
  // Declare the callback and options properties
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options || {};
  }

  observe() {}
  unobserve() {}
  disconnect() {}

  // Add any properties needed for your tests
  root: Element | null = null;
  rootMargin: string = "";
  thresholds: number[] = [];
  takeRecords: () => IntersectionObserverEntry[] = () => [];
}

// Assign the mock to the global object
global.IntersectionObserver = MockIntersectionObserver;
