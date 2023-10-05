export type TColumnTypes = "text" | "number" | "telephone" | "options";

export type TDataDefinition = {
    name: string;
    type: TColumnTypes;
    options?: any[];
    required: boolean;
    sizeControl: number;
    sizeLabel: number;
};

export type TCellValue = {
    value: any;
};

export type TRowValue = TCellValue[];

const defaultCols: TDataDefinition[] = [
    {
        name: "Apellido",
        required: true,
        type: "text",
        sizeControl: 2,
        sizeLabel: 0,
    },
    {
        name: "Nombre",
        required: true,
        type: "text",
        sizeControl: 2,
        sizeLabel: 0
    },
    {
        name: "M/F",
        required: true,
        type: "options",
        options: ["masc", "fem"],
        sizeControl: 1,
        sizeLabel: 0
    },
    {
        name: "CAT",
        required: true,
        type: "options",
        options: ["pm-26", "pm-00", "pm-15"],
        sizeControl: 2,
        sizeLabel: 0
    },
    {
        name: "Grado",
        required: true,
        type: "options",
        options: ["amarillo", "blanco", "verde", "rojo", "negro"],
        sizeControl: 2,
        sizeLabel: 0
    },
    {
        name: "DNI",
        required: true,
        type: "number",
        sizeControl: 2,
        sizeLabel: 0

    },
    {
        name: "Año Nac.",
        required: true,
        type: "number",
        sizeControl: 1,
        sizeLabel: 0

    },
];

const defaultData: TRowValue[] = [
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

export type TWorkingState = "idle" | "working" | "done" | "error";

const defaultFormFields: TDataDefinition[] = [
    {
        name: "Institución",
        required: true,
        sizeControl: 4,
        type: "text",
        sizeLabel: 2,
    },
    {
        name: "Cantidad de competidores",
        required: true,
        sizeControl: 3,
        type: "text",
        sizeLabel: 3,
    },
    {
        name: "Profesor",
        required: true,
        sizeControl: 4,
        type: "text",
        sizeLabel: 2,
    },
    {
        name: "Delegado",
        required: true,
        sizeControl: 4,
        type: "text",
        sizeLabel: 2,
    },
]

export type TScreenConfiguration = {
    colDefinition: TDataDefinition[],
    formDefinition: TDataDefinition[],

    listData: TRowValue[],
    formData: TCellValue[];
}

export const defaultScreenConfiguration: TScreenConfiguration = {
    colDefinition: defaultCols,
    formDefinition: defaultFormFields,

    listData: [],
    formData: [
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
    ],

}