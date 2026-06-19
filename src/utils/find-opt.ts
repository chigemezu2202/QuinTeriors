// *** The FindLeadsOptions interface defines the structure of the options object that can be passed to the getLeads function. It includes pagination, filtering, and sorting parameters.
export interface FindLeadsOptions {
  page: number;
  limit: number;
  status?: string | undefined;
  search?: string | undefined;
  sortField?: string | undefined;
  sortOrder?: "ASC" | "DESC" | undefined;
}