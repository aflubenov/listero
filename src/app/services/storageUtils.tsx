import { useEffect, useState } from "react";
import { TCellValue, TDataDefinition, TRowValue, TScreenConfiguration, TWorkingState, defaultScreenConfiguration } from "../types";
import { saveListToServer } from "./api";
import { jsPDF } from "jspdf";
import { writeFileXLSX, utils } from "xlsx";


export const useStorage = (baseName: string) => {

    const [dataDefinition, setDataDefinition] = useState<TScreenConfiguration>(defaultScreenConfiguration);
    const [rowData, setRowData] = useState<TRowValue[]>([]);
    const [formData, setFormData] = useState<TCellValue[]>(dataDefinition.formData);
    const [status, setStatus] = useState<TWorkingState>("idle");
    const [isValidData, setIsValidData] = useState<boolean>(false);
    const [showPrint, setShowPrint] = useState<boolean>(false);

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

    const downloadPDF = () => {
        setStatus("working");
        setShowPrint(true);
        setTimeout(() => {
            const doc = new jsPDF({
                orientation: "landscape",

            });
            /*
                    doc.text("hola", 10, 10);
                    const l = rowData.length;
                    const desfazaje = 20;
            
                    for (let i = 0; i < l; i++) {
            
                        const row = rowData[i];
                        doc.text(row.map(v => v.value).join(", "), 10, i * 10 + desfazaje);
                    }
            */
            const printNode = Array.from(document.getElementsByClassName("paraimprimir"));

            doc.html(printNode[0] as HTMLElement,
                {
                    callback: (doc) => {

                        setStatus("idle");
                        doc.save("lista.pdf");
                    },
                    autoPaging: true,
                    width: 400,
                    windowWidth: 1920
                }
            )

        }, 2000);

    }

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

        try {
            const bodyResponse = await saveListToServer(formData, rowData, getStoredUUID());
            const uuid = bodyResponse?.ret?.id;
            storeData(uuid);

            setStatus("done");

        } catch (error) {
            setStatus("error");
            alert("Ocurrió un error, por favor vuelva a intentar");
            setStatus("done");
            throw error;
        }
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

    const removeRow = (idx: number) => {
        if (confirm("Está seguro que desea eliminar esta fila?")) {
            rowData.splice(idx, 1);
            setRowData([...rowData]);

        }
    }

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

        //eslint disable-next-line
    }, [])




    return {
        dataDefinition,
        rowData,
        formData,
        storeData,
        downloadPDF,
        addRow,
        saveDataToServer,
        status,
        isValidData,
        validateDataFromState,
        removeRow,
        showPrint
    }

}



export type TConvertToExcel = {
    organizacion: string,
    screenConf: TScreenConfiguration
}



const convertOrganizacionToToCSV = ({ organizacion, screenConf }: TConvertToExcel) => {

    //console.log('averrrr: ', screenConf)

    const formBasicRow = screenConf.formData.map(v => v.value);
    const formEmptyRow = screenConf.formDefinition.map(v => " ");
    const participantsEmptyRow = screenConf.colDefinition.map(c => " ");
    const participantsRows = screenConf.listData.map(r => r.map(v => v.value));

    const finalList = [
        [...formBasicRow, ...participantsEmptyRow],
        ...participantsRows.map(r => [...formEmptyRow, ...r])
    ]

    return finalList;
}

const convertOrganizacionToToXLSX = ({ organizacion, screenConf }: TConvertToExcel) => {

    //console.log('averrrr: ', screenConf)
    const formEmptyRow = screenConf.formDefinition.reduce((prev, currDef) => ({
        ...prev,
        [currDef.name]: undefined
    }), {})


    const participantsEmptyRow = screenConf.colDefinition.reduce((prev, currDef) => ({
        ...prev,
        [currDef.name]: undefined
    }), {});

    const formBasicRow = screenConf.formDefinition.reduce((prev, currDef, idx) => ({
        ...prev,
        [currDef.name]: screenConf.formData[idx].value
    }), {})


    const getParticipantRow = (d: TRowValue) => {
        return screenConf.colDefinition.reduce((prevVal, currDef, idx) => ({
            ...prevVal,
            [currDef.name]: d[idx].value
        }), formEmptyRow)
    }

    const participantsRows = screenConf.listData.map(r => getParticipantRow(r));




    const finalList = [
        { ...formBasicRow, ...participantsEmptyRow },
        ...participantsRows
    ]

    return finalList;
}

export const convertToExcel = (data: TConvertToExcel[]) => {
    const screenConf = data[0].screenConf
    const finalList = [
        [... (screenConf.formDefinition.map(c => c.name)), ...(screenConf.colDefinition.map(c => c.name))]
    ];



    data.forEach(d => finalList.push(...convertOrganizacionToToCSV(d)));

    const curated = finalList
        .map((row) => {
            return row
                .map((c) => (c + "").replaceAll('"', "''").replaceAll(",", ";"))
                .join(",");
        })
        .join("\n");

    console.log('wiiiiiiiiiiiiiiiiiiiiiii: ', finalList);

    return curated;

}

export const convertToXLSX = (data: TConvertToExcel[]) => {

    const finalList: any[] = [];

    data.forEach(d => finalList.push(...convertOrganizacionToToXLSX(d)));

    const worksheet = utils.json_to_sheet(finalList)
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Lista")
    writeFileXLSX(workbook, "Lista.xlsx", { compression: true });
    //writeFileXLSX()
}