import { TCellValue, TRowValue } from "../types";

const API_listUrl = "api/data";
const API_participants = "api/getparticipanlist";
const API_projects = "api/projects";

export const saveListToServer = async (
  formData: TCellValue[],
  rowData: TRowValue[],
  uuid: string,
  projectId: string
) => {
  const data = await fetch(API_listUrl, {
    method: "POST",
    body: JSON.stringify({
      data: {
        institucion: formData[0].value, //TODO ANGEL: mejorar
        participantes: rowData,
        mainInfo: formData,
        uuid,
        projectId,
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
    `${API_listUrl}?organizacion=${encodeURIComponent(organizacion)}`
  );

  if (!data.ok) {
    console.error("Error: ", data);
    throw new Error("error fetching");
  }

  const bodyResponse = await data.json();
  return bodyResponse;
};

export const getListParticipantListFromServer = async (
  ownerId: string,
  tokenId: string,
  projectId: string
) => {
  const data = await fetch(
    `${API_participants}?ownerid=${encodeURIComponent(
      ownerId
    )}&projectid=${encodeURIComponent(projectId)}`,
    {
      headers: {
        Authorization: "Bearer " + tokenId,
      },
    }
  );

  if (!data.ok) {
    console.error("Error: ", data);
    throw new Error("error fetching");
  }

  const bodyResponse = await data.json();
  return bodyResponse;
};

export type TProject = {
  name: string;
  id: string;
  owner_id: string;
};
export const getProjectListFromServer = async (
  ownerId: string,
  tokenId: string
) => {
  const data = await fetch(
    `${API_projects}?ownerid=${encodeURIComponent(ownerId)}`,
    {
      headers: {
        Authorization: "Bearer " + tokenId,
      },
    }
  );

  if (!data.ok) {
    console.error("Error: ", data);
    throw new Error("error fetching");
  }

  const bodyResponse = (await data.json()) as { data: TProject[] };
  return bodyResponse;
};
