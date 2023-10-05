import { useEffect, useState } from "react";
import { TCellValue, TDataDefinition, TRowValue, TScreenConfiguration, TWorkingState, defaultScreenConfiguration } from "../types";


export const useStorage = (baseName: string) => {

    const [dataDefinition, setDataDefinition] = useState<TScreenConfiguration>(defaultScreenConfiguration);
    const [rowData, setRowData] = useState<TRowValue[]>([]);
    const [formData, setFormData] = useState<TCellValue[]>(dataDefinition.formData);
    const [status, setStatus] = useState<TWorkingState>("idle");
    const [isValidData, setIsValidData] = useState<boolean>(false);

    const dataDefinitionName = baseName + "dadaDefinition";
    const rowDataName = baseName + "rowData";
    const formDataName = baseName + "formData";
    const uuidName = baseName + "uuid";

    const storeData = (uuid: string | undefined) => {

        localStorage.setItem(dataDefinitionName, JSON.stringify(dataDefinition));
        localStorage.setItem(rowDataName, JSON.stringify(rowData));
        localStorage.setItem(formDataName, JSON.stringify(formData));
        if (uuid) {
            localStorage.setItem(uuidName, JSON.stringify(uuid));
        }
    }

    const getStoredUUID = () => {
        const lsUUID = localStorage.getItem(uuidName);
        if (!lsUUID) return undefined;
        return JSON.parse(lsUUID);
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


    const validateFormData = (formDefinition: TDataDefinition[], pFormData: TCellValue[]): boolean => {

        let isValid = true;

        if (pFormData.length > 0) {
            const l = formDefinition.length;
            for (let i = 0; i < l; i++) {
                if (formDefinition[i].required && !pFormData[i].value) {
                    //console.log('angel validando: ', formDefinition[i].name, ' con valor: ', pFormData[i].value)
                    isValid = false;
                    break;
                }
            }
        }

        return isValid;
    }

    const validateRowData = (data: TRowValue, colDefinition: TDataDefinition[]): boolean => {
        let isValid = true;

        const l = colDefinition.length;
        for (let i = 0; i < l; i++) {
            if (colDefinition[i].required && !data[i].value) {
                isValid = false;
                break;
            }
        }

        return isValid;
    }

    const validateData = (pFormData: TCellValue[], pRowData: TRowValue[], pScreenDefinition: TScreenConfiguration): boolean => {
        let isValid = true;

        if (pFormData) {
            isValid = validateFormData(pScreenDefinition.formDefinition, pFormData);
        }

        console.log('angel form validation: ', isValid);

        if (isValid && pRowData) {
            const l = pRowData.length;
            for (let i = 0; i < l && isValid; i++) {
                //console.log('angel por validar: ', pRowData[i])
                isValid = validateRowData(pRowData[i], pScreenDefinition.colDefinition);
            }
        }

        console.log('angel rows validation: ', isValid);

        setIsValidData(isValid);
        return isValid;
    }

    const validateDataFromState = () => validateData(formData, rowData, dataDefinition);

    const saveDataToServer = async () => {

        setStatus("working");
        const data = await fetch(`/api/data`, {
            method: "POST",
            body: JSON.stringify({
                data: {
                    institucion: formData[0].value, //TODO ANGEL: mejorar
                    participantes: rowData,
                    mainInfo: formData,
                    uuid: getStoredUUID(),
                }
            })
        })

        if (!data.ok) {
            setStatus("error");
            alert("Ocurrió un error, por favor vuelva a intentar");
            setStatus("done");
            throw new Error('Failed to fetch data')
        }

        const bodyResponse = await data.json();
        const uuid = bodyResponse?.ret?.id;
        storeData(uuid);

        setStatus("done");
        //        console.log('wiiii: ', await data.json());
    }



    const addRow = () => {

        const newRow: TRowValue = dataDefinition.colDefinition.map((d) => {
            return {
                value: "",
            };
        });

        const newRows = [...rowData, newRow];
        setRowData(newRows);
        validateData(formData, newRows, dataDefinition);
    };

    useEffect(() => {
        const lsDDefinition = localStorage.getItem(dataDefinitionName);
        let parsedDataDefinition: TScreenConfiguration;
        let parsedRowData: TRowValue[] = dataDefinition.listData;
        let parsedFormData: TCellValue[] = dataDefinition.formData;

        if (lsDDefinition) {
            parsedDataDefinition = JSON.parse(lsDDefinition) as TScreenConfiguration;
            setDataDefinition(parsedDataDefinition)

            const lsRowValues = localStorage.getItem(rowDataName);
            if (lsRowValues) {
                parsedRowData = JSON.parse(lsRowValues) as TRowValue[];
                setRowData(parsedRowData);
            }

            const lsFormValues = localStorage.getItem(formDataName);
            if (lsFormValues) {
                parsedFormData = JSON.parse(lsFormValues) as TCellValue[];
                setFormData(parsedFormData);
            } else setFormData(dataDefinition.formData);

            validateData(parsedFormData, parsedRowData, parsedDataDefinition);
        }


    }, [])


    return {
        dataDefinition,
        rowData,
        formData,
        storeData,
        downloadData,
        addRow,
        saveDataToServer,
        status,
        isValidData,
        validateDataFromState
    }

}