//  ********  Query Builder Types

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface SortOptions {
  sortField?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface ColumnConfig {
  name: string;
  operator?: "=" | "LIKE" | "IS" | "IS NOT";
  value: any;
}

export interface Filter {
  // field can be a single column string, OR an array of different column setups
  field: string | ColumnConfig[];
  operator?: "=" | "LIKE" | "IS" | "IS NOT";
  value?: any;
}

//   ********  Query Builder Functions
export function buildWhereClause(filters: Filter[]) {
  const conditions: string[] = [];
  const values: any[] = [];

  for (const filter of filters) {
    // CASE 1: Handle an array of different columns grouped by OR
    if (Array.isArray(filter.field)) {
      const subConditions: string[] = [];

      for (const col of filter.field) {
        let op = col.operator || "=";
        let val = col.value;

        if (val === null) {
          op = op === "IS NOT" ? "IS NOT" : "IS";
          subConditions.push(`${col.name} ${op} NULL`);
        } else {
          const finalValue = op === "LIKE" ? `%${val}%` : val;
          subConditions.push(`${col.name} ${op} ?`);
          values.push(finalValue);
        }
      }

      conditions.push(`(${subConditions.join(" OR ")})`);
    }
    // CASE 2: Handle a single column (like before)
    else {
      let op = filter.operator || "=";
      let val = filter.value;

      if (val === null) {
        op = op === "IS NOT" ? "IS NOT" : "IS";
        conditions.push(`${filter.field} ${op} NULL`);
      } else {
        const finalValue = op === "LIKE" ? `%${val}%` : val;
        conditions.push(`${filter.field} ${op} ?`);
        values.push(finalValue);
      }
    }
  }

  return {
    whereClause: conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "",
    values,
  };
}
