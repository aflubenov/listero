export type TColumnTypes = "text" | "number" | "telephone" | "options";

export type TDataDefinition = {
    name: string;
    type: TColumnTypes;
    options?: any[];
    required: boolean;
    size: number;
};

export type TCellValue = {
    value: any;
};

export type TRowValue = TCellValue[];

export const defaultCols: TDataDefinition[] = [
    {
        name: "Apellido",
        required: true,
        type: "text",
        size: 2,
    },
    {
        name: "Nombre",
        required: true,
        type: "text",
        size: 2,
    },
    {
        name: "M/F",
        required: true,
        type: "options",
        options: ["masc", "fem"],
        size: 1,
    },
    {
        name: "CAT",
        required: true,
        type: "options",
        options: ["pm-26", "pm-00", "pm-15"],
        size: 2
    },
    {
        name: "Grado",
        required: true,
        type: "options",
        options: ["amarillo", "blanco", "verde", "rojo", "negro"],
        size: 2
    },
    {
        name: "DNI",
        required: true,
        type: "number",
        size: 2,
    },
    {
        name: "Año Nac.",
        required: true,
        type: "number",
        size: 1
    },
];

export const defaultData: TRowValue[] = [
    [
        { value: "nunes" },
        { value: "martin" },
        { value: "masc" },
        { value: "pm-26" },
        { value: "amarillo" },
        { value: "35293031" },
        { value: "2000" },
    ],
    [
        { value: "lubenov" },
        { value: "angel" },
        { value: "masc" },
        { value: "pm-00" },
        { value: "blanco" },
        { value: "35293031" },
        { value: "1980" },
    ],
    [
        { value: "dominguez" },
        { value: "david" },
        { value: "masc" },
        { value: "pm-15" },
        { value: "verde" },
        { value: "35293031" },
        { value: "1990" },
    ],
];
