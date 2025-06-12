// Types
export interface Category {
    _id: string;
    name: string;
    color: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Input type for the form data
  export interface CategoryFormData {
    categoryName: string;
    categoryColor: string;
    createdBy: string;
  }
  
  // Payload for creating a category
  export interface CreateCategoryPayload {
    name: string;
    color: string;
    createdBy: string;
  }
  
  // Payload for updating a category
  export interface UpdateCategoryPayload {
    name?: string;
    color?: string;
    createdBy?: string; // it must be passed even if not changing, due to schema validation
  }