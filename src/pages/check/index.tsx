import { getParticipationList } from "@/app/api/data/route";
import { TConvertToExcel, convertToExcel } from "@/app/services/storageUtils";
import { TCellValue, TRowValue, defaultScreenConfiguration } from "@/app/types";
import { NextRequest, NextResponse } from "next/server"



export const getServerSideProps = async function (req: NextRequest, res: NextResponse) {


    //await saveListToServer([{ value: 1 }], [], "");
    //const data = await getListFromServer("la institucion arreglada");

    const data = await getParticipationList("la institucion arreglada");
    return {
        props: {
            data: JSON.stringify(data)
        }

    };
}

const Index = (props: any) => {

    console.log('aver lasprops: ', JSON.parse(props.data));

    const data = JSON.parse(props.data) as {
        organizacion: string,
        maininfo: TCellValue[],
        participantes: TRowValue[]
    }[];

    const screenConf = defaultScreenConfiguration; //TODO: ANGEL ver la forma de obtener esto de manera genérica


    const curated = convertToExcel(data.map((d): TConvertToExcel => {
        return {
            organizacion: d.organizacion,
            screenConf: {
                colDefinition: screenConf.colDefinition,
                formData: d.maininfo,
                formDefinition: screenConf.formDefinition,
                listData: d.participantes
            }
        }
    }))


    const descargar = () => {

        const CSVFile = new Blob([curated], { type: "text/csv" });
        const temp_link = window.document.createElement("a");

        // Download csv file
        temp_link.download = "participantes.csv";
        const url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;

        // This link should not be displayed
        temp_link.style.display = "none";
        window.document.body.appendChild(temp_link);

        // Automatically click the link to trigger download
        temp_link.click();
        window.document.body.removeChild(temp_link);
    }

    return (
        <>

            here you'll see your list
            <button
                onClick={descargar}
            >Descargar</button>
        </>
    )
}

export default Index