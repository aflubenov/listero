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

const save = async (
  organizacion: string,
  maininfo: any,
  participantes: TRowValue[]
): Promise<any> => {
  try {
    const ret = await pool.query(
      `INSERT INTO ${getTableName(
        "listero"
      )} (organizacion, maininfo, participantes) VALUES( $1, $2, $3)`,
      [organizacion, JSON.stringify(maininfo), JSON.stringify(participantes)]
    );
  } catch (e) {
    throw e;
  }

  return true;
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

  await save(data.institucion, data.mainInfo, data.participantes);
  //console.log("wiiiiiiii: ", data);

  return NextResponse.json({ msg: "ok" });
};