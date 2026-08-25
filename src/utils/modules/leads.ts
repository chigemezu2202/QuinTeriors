import { Filter } from "../query-builder.js";

export interface constLeadsSortFields {
  allowedFields: string[],
  defaultField: string,
}

export const leadsSortFields: constLeadsSortFields = {
  allowedFields: [
    "id",
    "name",
    "status",
    "created_at",
    "updated_at",
  ],
  defaultField: "created_at",
}

export const column = () => {
  return "id, name, phone, email, message, service_id, status, ip_address, user_agent, created_at, updated_at, deleted_at";
}

export function createLeadsSearchFilter(search: string): Filter {

  // If an empty string or white space somehow gets here, strip it down
  const cleanSearch = search ? search.trim() : "";
  return {
    field: [
      { name: "status", operator: "=", value: cleanSearch },
      { name: "name", operator: "LIKE", value: cleanSearch },
      { name: "email", operator: "LIKE", value: cleanSearch }
    ]
  };
}