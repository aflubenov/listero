"use client"
import React from 'react';
import { TDataDefinition, TRowValue } from "../../types/index";
import { useComponents } from '../../services/useComponents';

type TGridProps = {
    definitions: TDataDefinition[];
    values: TRowValue[];
    showHeaders: boolean;
    validationCallback: () => {};
    deleteCallback: (idx: number) => void;
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
                <div className={`col-md-${i.sizeControl}`} key={"col-nb-" + index}>
                    {i.name}
                </div>
            ))}
        </div>
    );
};



type TRowGridProps = {
    definitions: TDataDefinition[];
    values: TRowValue;
    mykey: string;
    validationCallback: () => {}
};
const CRowGrid = (props: TRowGridProps) => {
    const { definitions, values, mykey, validationCallback } = props;
    const { getComponent } = useComponents();

    const componentsList = definitions.map((d) =>
        getComponent({ data: d, value: { value: "" }, placeholder: "", required: false, validationCallback }),
    );

    return (
        <div className="row mb-2">
            {componentsList.map((C, idx) => (
                <>
                    <div
                        key={"colcolkey" + mykey + idx}
                        className={" mb-2 col-lg-" + definitions[idx].sizeControl}
                    >
                        <C
                            key={"colkey" + mykey + idx}
                            data={definitions[idx]}
                            value={values[idx]}
                            placeholder={definitions[idx].name}
                            required={definitions[idx].required}
                            validationCallback={validationCallback}
                        />
                    </div>

                </>
            ))}
            <div className='d-md-block d-lg-none' style={{ borderBottom: "1px solid lightgray", width: "100%" }}></div>
        </div>
    );
};


export const GridCustom = (props: TGridProps) => {
    const { values, definitions, showHeaders,
        validationCallback, deleteCallback } = props;

    return (
        <>

            {showHeaders && <HeaderGrid data={definitions} />}
            {values.map((v, idx) => (
                <div
                    key={"div_rowgrid_" + idx}
                    className='row no-gutters '>
                    <div className='col-11 '>
                        <CRowGrid
                            key={"rowgrid" + idx}
                            mykey={"rowgrid-" + idx + "-"}
                            definitions={definitions}
                            values={v}
                            validationCallback={validationCallback}
                        />
                    </div>
                    <div className='col-1 text-center '>
                        <button onClick={(e) => deleteCallback(idx)}
                            className='btn btn-danger btn-sm btn-grid-delete'

                        ><i className="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>

            ))}


        </>
    );
};
