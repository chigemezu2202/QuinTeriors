import { Filter } from "./query-builder.js";

export const filtersWithNoDeletedItems: Filter[] = [
  {
    field: "deleted_at",
    operator: "IS", // Use IS operator for null checks
    value: null, // The function will now handle this safely!
  },
];

export const filtersWithOnlyDeletedItems: Filter[] = [
  {
    field: "deleted_at",
    operator: "IS NOT", // Use IS NOT operator for null checks  
    value : null, // The function will now handle this safely!
  },
];