"use client"
import React, { useEffect } from 'react';
import { useState } from "react";
import { TDataDefinition, TRowValue } from "../types/index";
import { useValidations } from '../services/componentUtils';

type TGridProps = {
    definitions: TDataDefinition[];
    values: TRowValue[];
    showHeaders: boolean;
};

type THeaderGridProps = {
    data: TDataDefinition[];
};
const HeaderGrid = (props: THeaderGridProps) => {
    const { data } = props;
    console.log(data);
    return (
        <div className="row">
            {data.map((i, index) => (
                <div className={`col-md-${i.size}`} key={"col-nb-" + index}>
                    {i.name}
                </div>
            ))}
        </div>
    );
};

type TCComponentProps = {
    data: TDataDefinition;
    value: { value: any };
    placeholder: string;
    required: boolean;
};

const COptions = (props: TCComponentProps) => {
    const { data, value, placeholder } = props;

    if (!data.options) throw "Options are required";

    const options = data.options;
    const { isValid, validateRequired } = useValidations(value.value);

    return (
        <>
            <select className='form-control'
                onChange={(e) => {
                    value.value = e.target.value;
                    validateRequired(e.target.value);
                }}
                defaultValue={value.value}
            >
                {(!!placeholder) && <option
                    key={data.name + "idx-placeholder"}
                    value=""
                >{placeholder}</option>

                }
                {options.map((o, index) => (
                    <option key={data.name + "idx-" + index} value={o}>
                        {o}
                    </option>
                ))}
            </select>
            {(!isValid) && <div className="text-danger validation-text">
                <small>
                    Este campo es requerido
                </small>
            </div>}
        </>
    );
};



const CText = (props: TCComponentProps) => {
    const { value, placeholder } = props;

    const { validateRequired, isValid } = useValidations(value.value);

    return (
        <>
            <input
                className='form-control'
                onChange={(e) => {
                    value.value = e.target.value;
                }}
                onBlur={(e) => validateRequired(e.target.value)}
                placeholder={placeholder}
                type="text"
                defaultValue={value.value}
            />
            {(!isValid) && <div className="text-danger validation-text">
                <small>
                    Este campo es requerido
                </small>
            </div>}
        </>

    );
};
const CNumber = (props: TCComponentProps) => {
    const { value, placeholder } = props;
    const { validateRequired, isValid } = useValidations(value.value);

    return (
        <>
            <input
                className='form-control text-right'
                onChange={(e) => {
                    value.value = e.target.value;
                }}
                onBlur={(e) => validateRequired(e.target.value)}
                placeholder={placeholder}
                type="number"
                defaultValue={value.value}
            />
            {(!isValid) && <div className="text-danger validation-text">
                <small>
                    Este campo es requerido
                </small>
            </div>}
        </>
    );
};

const getComponent = (props: TCComponentProps) => {
    const { data } = props;

    switch (data.type) {
        case "options":
            return COptions;
            break;
        case "number":
        case "telephone":
            return CNumber;
        case "text":
            return CText;
        default:
            throw "unrecognized component";
            break;
    }
};

type TRowGridProps = {
    definitions: TDataDefinition[];
    values: TRowValue;
    mykey: string;
};
const CRowGrid = (props: TRowGridProps) => {
    const { definitions, values, mykey } = props;
    const componentsList = definitions.map((d) =>
        getComponent({ data: d, value: { value: "" }, placeholder: "", required: false }),
    );

    return (
        <div className="row mb-2">
            {componentsList.map((C, idx) => (
                <div
                    key={"colcolkey" + mykey + idx}
                    className={"col-md-" + definitions[idx].size}
                >
                    <C
                        key={"colkey" + mykey + idx}
                        data={definitions[idx]}
                        value={values[idx]}
                        placeholder={definitions[idx].name}
                        required={definitions[idx].required}
                    />
                </div>
            ))}
        </div>
    );
};


export const GridCustom = (props: TGridProps) => {
    const { values, definitions, showHeaders } = props;

    return (
        <>

            {showHeaders && <HeaderGrid data={definitions} />}
            {values.map((v, idx) => (
                <CRowGrid
                    key={"rowgrid" + idx}
                    mykey={"rowgrid-" + idx + "-"}
                    definitions={definitions}
                    values={v}
                />
            ))}


        </>
    );
};
