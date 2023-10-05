import { NextRequest, NextResponse } from "next/server";
import { getTableName, pool } from "../pgDatabaseHelper";
import { TRowValue } from "@/app/types";

// **** Functions **** //
const getAll = async (organizacion: string): Promise<any[]> => {
  const res = await pool.query<any>(
    `select * from ${getTableName("listero")} where organizacion = $1`,
    [organizacion]
  );

  return res.rows; //db.users;
};

const createData = async (
  organizacion: string,
  maininfo: any,
  participantes: TRowValue[]
): Promise<any> => {
  const ret = await pool.query<any>(
    `INSERT INTO ${getTableName(
      "listero"
    )} (id, organizacion, maininfo, participantes) VALUES(gen_random_uuid (),  $1, $2, $3) RETURNING id`,
    [organizacion, JSON.stringify(maininfo), JSON.stringify(participantes)]
  );

  return ret.rows[0];
};

const updateData = async (
  id: string,
  organizacion: string,
  maininfo: any,
  participantes: TRowValue[]
): Promise<any> => {
  const ret = await pool.query<any>(
    `UPDATE ${getTableName(
      "listero"
    )} SET organizacion = $1, maininfo = $2, participantes = $3 where id = $4 `,
    [organizacion, JSON.stringify(maininfo), JSON.stringify(participantes), id]
  );

  return ret;
};

export const GET = async (req: NextRequest) => {
  const organizacionFilter = req.nextUrl.searchParams.get("organizacion");

  if (!organizacionFilter) {
    return NextResponse.json(
      { error: "organizacion es un parametro requerido" },
      {
        status: 403,
      }
    );
  }

  const data = await getAll(organizacionFilter);

  return NextResponse.json({
    data,
  });
};

export const POST = async (req: NextRequest) => {
  const { data } = await req.json();
  /* return NextResponse.json({
    PGHOST: process.env.PGPORT,
    PGPORT: process.env.PGHOST,
    PGSCHEMA: process.env.PGSCHEMA,
    PGDATABASE: process.env.PGDATABASE,
    PGPASSWORD: process.env.PGPASSWORD,
    data: await getAll("alguna"),
    data2: await saveData(data.institucion, data.mainInfo, data.participantes),
    v:"6"
  });*/

  if (!data || !data.institucion || !data.participantes || !data.mainInfo) {
    return NextResponse.json(
      {
        error: "data, institucion, participantes y maininfo es requerido",
      },
      {
        status: 403,
      }
    );
  }

  const uuid = data.uuid;
  let ret;
  if (!uuid) {
    ret = await createData(data.institucion, data.mainInfo, data.participantes);
  } else {
    ret = await updateData(
      uuid,
      data.institucion,
      data.mainInfo,
      data.participantes
    );

    ret = { id: uuid };
  }

  return NextResponse.json({ msg: "ok", v: "10", ret });
};
