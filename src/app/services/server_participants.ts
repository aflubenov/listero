import { getTableName, pool } from "../api/pgDatabaseHelper";

export const getParticipationList = async (
  ownerId: string,
  projectId: string
): Promise<any[]> => {
  const res = await pool.query<any>(
    `select * from ${getTableName("listero")} 
     where owner_id = $1 and project_id = $2`,
    ["11111111-1111-1111-1111-111111111111", projectId] //TODO: ANGEL esto tiene que ser genérico
  );

  return res.rows; //db.users;
};
