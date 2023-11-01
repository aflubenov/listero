import { getTableName, pool } from "../api/pgDatabaseHelper";

export const getProjectList = async (ownerId: string): Promise<any[]> => {
  const res = await pool.query<any>(
    `select * from ${getTableName("projects")} 
     where owner_id = $1`,
    ["11111111-1111-1111-1111-111111111111"] //TODO: ANGEL esto tiene que ser genérico
  );

  return res.rows; //db.users;
};
