import { db } from "../config/db.js";

export async function paginate<T>({
  table,
  select,
  whereClause,
  values,
  orderBy,
  page,
  limit,
}: {
  table: string;
  select: string;
  whereClause?: string;
  values?: any[];
  orderBy?: string;
  page: number;
  limit: number;
}) {
  const offset = (page - 1) * limit;

  const dataQuery = `
        SELECT ${select}
        FROM ${table}
        ${whereClause || ""}
        ${orderBy || ""}
        LIMIT ? OFFSET ?
    `;

  const countQuery = `
        SELECT COUNT(*) AS total
        FROM ${table}
        ${whereClause || ""}
    `;

  const [rows] = await db.query(
    dataQuery,
    [...(values || []), limit, offset]
  );

  const [countRows] = await db.query(
    countQuery,
    values || []
  );

  const total =
    (countRows as Array<{ total: number }>)[0]?.total || 0;

  return {
    items: rows as T[],
    total,
    page,
    limit,
  };
}