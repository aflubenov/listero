import { useEffect, useState } from "react";
import { TDataDefinition, TRowValue, defaultCols } from "../types";


export const useStorage = (baseName: string) => {

    const [dataDefinition, setDataDefinition] = useState<TDataDefinition[]>(defaultCols);
    const [rowData, setRowData] = useState<TRowValue[]>([]);

    const dataDefinitionName = baseName + "dadaDefinition";
    const rowDataName = baseName + "rowData";

    const storeData = () => {
        localStorage.setItem(dataDefinitionName, JSON.stringify(dataDefinition));
        localStorage.setItem(rowDataName, JSON.stringify(rowData));
    }

    const downloadData = () => {
        const curated = rowData
            .map((row) => {
                return row
                    .map((c) => (c.value + "").replaceAll('"', "''").replaceAll(",", ";"))
                    .join(",");
            })
            .join("\n");

        const CSVFile = new Blob([curated], { type: "text/csv" });
        const temp_link = document.createElement("a");

        // Download csv file
        temp_link.download = "GfG.csv";
        const url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;

        // This link should not be displayed
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);

        // Automatically click the link to trigger download
        temp_link.click();
        document.body.removeChild(temp_link);
    };

    const saveDataToServer = async () => {

        const data = await fetch(`/api/data`, {
            method: "POST",
            body: JSON.stringify({
                data: {
                    institucion: "alguna",
                    participantes: rowData,
                    mainInfo: {}
                }
            })
        })

        if (!data.ok) {
            throw new Error('Failed to fetch data')
        }

        console.log('wiiii: ', await data.json());
    }



    const addRow = () => {

        const newRow: TRowValue = dataDefinition.map((d) => {
            return {
                value: "",
            };
        });

        setRowData([...rowData, newRow]);
    };

    useEffect(() => {
        const lsDDefinition = localStorage.getItem(dataDefinitionName);
        if (lsDDefinition) {
            setDataDefinition(JSON.parse(lsDDefinition) as TDataDefinition[])
        }

        const lsRowValues = localStorage.getItem(rowDataName);
        if (lsRowValues) {
            setRowData(JSON.parse(lsRowValues) as TRowValue[]);
        }


    }, [])


    return {
        dataDefinition,
        rowData,
        storeData,
        downloadData,
        addRow,
        saveDataToServer
    }

}