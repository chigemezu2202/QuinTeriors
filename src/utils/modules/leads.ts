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
  return {
    field: [
      { name: "status", operator: "=", value: search },
      { name: "name", operator: "LIKE", value: search },
      { name: "email", operator: "LIKE", value: search }
      
    ]
  };
}