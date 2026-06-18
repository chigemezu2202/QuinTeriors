export type SortOrder = "ASC" | "DESC";

export function buildSortClause(
  sortField: string | undefined,
  sortOrder: string | undefined,
  allowedFields: string[],
  defaultField: string,
  defaultOrder: SortOrder = "DESC"
) {
  const field = allowedFields.includes(sortField || "")
    ? sortField!
    : defaultField;

  const order =
    sortOrder?.toUpperCase() === "ASC"
      ? "ASC"
      : defaultOrder;

  return `ORDER BY ${field} ${order}`;
}