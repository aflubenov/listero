import { getParticipationList } from "@/app/services/server_participants";
import { TConvertToExcel, convertToExcel, convertToXLSX } from "@/app/services/storageUtils";
import { TCellValue, TRowValue, defaultScreenConfiguration } from "@/app/types";
import { NextRequest, NextResponse } from "next/server"



export const getServerSideProps = async function (req: NextRequest, res: NextResponse) {


    const data = await getParticipationList("la institucion arreglada");
    return {
        props: {
            data: JSON.stringify(data)
        }

    };
}

const Index = (props: any) => {

    //console.log('aver lasprops: ', JSON.parse(props.data));

    const data = JSON.parse(props.data) as {
        organizacion: string,
        maininfo: TCellValue[],
        participantes: TRowValue[]
    }[];

    const screenConf = defaultScreenConfiguration; //TODO: ANGEL ver la forma de obtener esto de manera genérica


    const dataForExport = data.map((d): TConvertToExcel => {
        return {
            organizacion: d.organizacion,
            screenConf: {
                colDefinition: screenConf.colDefinition,
                formData: d.maininfo,
                formDefinition: screenConf.formDefinition,
                listData: d.participantes
            }
        }
    });



    const descargar = () => {

        const curated = convertToExcel(dataForExport)
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
            <span>Click para </span>
            <button
                onClick={() => convertToXLSX(dataForExport)}
            >Descargar</button>
        </>
    )
}

export default Index