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
        options: ["PM-26", "PM-28", "PM-30", "PM-33", "PM-36", "PM-40", "PM-45", "PM-50", "PM+50 ", "PF-26", "PF-28", "PF-30", "PF-33", "PF-36", "PF-40", "PF-45", "PF-50", "PF+50 ", "IAM-28", "IAM-31", "IAM-34", "IAM-38", "IAM-42", "IAM-47", "IAM-52", "IAM+52", "IAF-28", "IAF-31", "IAF-34", "IAF-38", "IAF-42", "IAF-47", "IAF-52", "IAF+52", "IBM-36", "IBM-40", "IBM-44", "IBM-48", "IBM-53", "IBM-58", "IBM-64", "IBM+64", "IBF-36", "IBF-40", "IBF-44", "IBF-48", "IBF-53", "IBF-58", "IBF-64", "IBF+64", "CMN-55", "CMN-60", "CMN-66", "CMN-73", "CMN-81", "CMN-90", " CMN+90", "CMG-55", "CMG-60", "CMG-66", "CMG-73", "CMG-81", "CMG-90", "CMG+90", "CFN-44", "CFN-48", "CFN-52", "CFN-57", "CFN-63", "CFN-70", "CFN+70", "CFG-44", "CFG-48", "CFG-52", "CFG-57", "CFG-63", "CFG-70", "CFG+70", "JMN-55", "JMN-60", "JMN-66", "JMN-73", "JMN-81", "JMN-90", "JMN-100", "JMN+ 100", "JMG-55", "JMG-60", "JMG-66", "JMG-73", "JMG-81", "JMG-90", "JMG-100", "JMG+ 100", "JFN-44", "JFN-48", "JFN-52", "JFN-57", "JFN-63", "JFN-70", " JFN-78 ", "JFN+78", "JFG-44", "JFG-48", "JFG-52", "JFG-57", "JFG-63", "JFG-70", "JFG-78", "JFG+78", "KNM-60", "KNM-66", "KNM-73", "KNM-81", "KNM-90", "KNM -100", "KNM+100", "KNF-48", "KNF-52", "KNF-57", "KNF-63", "KNF-70", "KNF+70", "SM-60", "SM-66 ", "SM-73", "SM-81", "SM-90", "SM-100", "SM+100", "SF-48", "SF-52", "SF-57", "SF-63", "SF-70", "SF+70"],
        sizeControl: 2,
        sizeLabel: 0
    },
    {
        name: "Grado",
        required: true,
        type: "options",
        options: ["Blanco", "Blanco / Amarillo", "Amarillo", "Amarillo / Naranja", "Naranja", "Naranja / Verde", "Verde", "Verde / Azul", "Azul", "Azul / Marrón", "Marrón", "Negro"],
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