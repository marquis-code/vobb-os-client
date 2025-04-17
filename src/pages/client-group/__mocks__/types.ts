// Mock types for testing
export interface MockClientGroupTableData {
    id: string;
    name: string;
    clients: number;
    pipeline: { 
      name: string;
      _id?: string;
    };
    date: string;
    time: string; // Added this required field
    assignedTo?: { 
      name: string; 
      avatar: string;
    };
    stage?: string;
  }
  
  export interface MockPipeline {
    _id: string;
    name: string;
  }
  
  export interface MockClientType {
    _id: string;
    name: string;
  }