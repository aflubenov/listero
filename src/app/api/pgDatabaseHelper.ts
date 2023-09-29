import Pool from "pg-pool";

export const pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
});

const TABLES: {
  [key: string]: string;
} = {
  candidates: "candidates",
  listero: "listero",
  //techs: "users_tech",
};

type Tables = "candidates" | "listero" | "other";

export const getTableName = (table: Tables): string =>
  `${process.env.PGSCHEMA}.${TABLES[table]}`;
