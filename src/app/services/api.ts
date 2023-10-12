import { TCellValue, TRowValue } from "../types";

const API_listaUrl = "api/data";

export const saveListToServer = async (
  formData: TCellValue[],
  rowData: TRowValue[],
  uuid: string
) => {
  const data = await fetch(API_listaUrl, {
    method: "POST",
    body: JSON.stringify({
      data: {
        institucion: formData[0].value, //TODO ANGEL: mejorar
        participantes: rowData,
        mainInfo: formData,
        uuid,
      },
    }),
  });

  if (!data.ok) {
    console.error("Error: ", data);
    throw new Error("error fetching");
  }

  const bodyResponse = await data.json();
  return bodyResponse;
};

export const getListFromServer = async (organizacion: string) => {
  const data = await fetch(
    `${API_listaUrl}?organizacion=${encodeURIComponent(organizacion)}`
  );

  if (!data.ok) {
    console.error("Error: ", data);
    throw new Error("error fetching");
  }

  const bodyResponse = await data.json();
  return bodyResponse;
};
