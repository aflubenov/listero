import { MainExtraInfo } from "@/app/components/list-filling/mainExtraInfo";
import { DefaultLayout } from "@/app/layouts/default"
import { TCellValue, TDataDefinition } from "@/app/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';

import { useState } from "react"

type TFieldConfigurationProps = {
    needsOptions: boolean,
    data: TDataDefinition,
    updateDataCallback: (p: TDataDefinition) => void
}
const FieldConfiguration = (props: TFieldConfigurationProps) => {
    const { needsOptions, data, updateDataCallback } = props;


    return <>
        <form>
            <div className="form-group">
                <label className="control-label">Nombre</label>
                <div>
                    <input
                        onChange={(e) => {
                            data.name = e.target.value;
                            updateDataCallback({ ...data })
                        }
                        }
                        type="text"
                        defaultValue={data.name}
                        className="form-control input-lg"
                        placeholder="the name for this field" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label">Tamaño del nombre</label>
                <div>
                    <input
                        onChange={(e) => {
                            data.sizeLabel = parseInt(e.target.value, 10);
                            updateDataCallback({ ...data })
                        }}
                        type="number"
                        defaultValue={data.sizeLabel}
                        className="form-control input-lg" placeholder="the name for this field" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label"><input
                    onChange={(e) => {
                        data.required = e.target.checked;
                        updateDataCallback({ ...data });
                    }}
                    type="checkbox"
                    defaultChecked={data.required} /> Es Obligatorio</label>
            </div>
            <div className="form-group">
                <label className="control-label">Tamaño del control</label>
                <div>
                    <input
                        onChange={(e) => {
                            data.sizeControl = parseInt(e.target.value, 10);
                            updateDataCallback({ ...data })
                        }}
                        type="number" defaultValue={data.sizeControl} className="form-control input-lg" placeholder="the name for this field" />
                </div>
            </div>
        </form>
    </>
}

type TextFieldConfigurationProps = {
    addCallback: (data: TDataDefinition) => void,
    updateCallback: (data: TDataDefinition) => void,
    fieldData?: TDataDefinition
}
const TextFieldConfiguration = (props: TextFieldConfigurationProps) => {
    const { addCallback, fieldData, updateCallback } = props;
    const newField: TDataDefinition = fieldData || {
        name: "default",
        required: true,
        sizeControl: 3,
        sizeLabel: 2,
        type: "text",
    };

    const [hNewField, setHNewField] = useState<TDataDefinition>(newField);


    return <>
        <h4><FontAwesomeIcon icon={faClosedCaptioning} /> Nuevo campo de texto </h4>
        <div className="row">
            <div className="col-md-3">
                <FieldConfiguration
                    needsOptions={false}
                    data={hNewField}
                    updateDataCallback={setHNewField}
                />

            </div>
        </div>
        <div className="row">
            <button
                onClick={() => fieldData ? updateCallback(hNewField) : addCallback(hNewField)}
                className="btn btn-primary">Aceptar</button>
            <button className="btn btn-cancel">Cancelar</button>
        </div>
        <h4>Vista Previa</h4>
        <MainExtraInfo
            validationCallback={() => true}
            fieldsData={[{ value: "texto de ejemplo" }]}
            fieldsDefinition={[hNewField]}></MainExtraInfo>
    </>
}

const Index = () => {

    const [formFieldDefinition, setFormFieldDefinition] = useState<TDataDefinition[]>([]);
    const [fakeFormData, setFakeFormData] = useState<TCellValue[]>([]);
    const [showTextField, setShowTextField] = useState<boolean>(false);
    const [editingField, setEditingField] = useState<{ idx: number, data: TDataDefinition }>();

    const updateFormField = (p: TDataDefinition) => {
        if (!editingField) return;

        formFieldDefinition[editingField.idx] = editingField.data;
        setFormFieldDefinition([...formFieldDefinition]);
        setShowTextField(false);
        setEditingField(undefined);
    }

    const startEditingFormField = (idx: number) => {
        setEditingField({
            idx,
            data: formFieldDefinition[idx]
        })
        setShowTextField(true);

    }

    const addFormField = (p: TDataDefinition) => {
        setFormFieldDefinition(
            [...formFieldDefinition, p]
        )
        setFakeFormData([...fakeFormData, { value: "" }])
    }


    const addTextField = (newField: TDataDefinition) => {

        addFormField(newField);
        setShowTextField(false);
    }


    return <DefaultLayout>
        <div className="Container mt-5 text-center">
            <h1>List Maker</h1>

        </div>
        <div className="container">
            <MainExtraInfo
                fieldsDefinition={formFieldDefinition}
                fieldsData={fakeFormData}
                validationCallback={() => true}
            />
        </div>
        <div className="container">
            <h3>Configuración</h3>
            <div className="row">
                {
                    formFieldDefinition.map((f, idx) => <>
                        <div className={"col-md-" + (f.sizeLabel)} key={"formfieldef_" + idx}>
                            <button
                                onClick={() => startEditingFormField(idx)}
                                className="btn btn-info">{f.name}</button>
                        </div><div className={"col-md-" + f.sizeControl} key={"formfieldef2_" + idx}></div>
                    </>)
                }
            </div>
            <h3>Tools</h3>
            <div className="row">
                <div className="col-md-3">
                    <button
                        onClick={() => setShowTextField(!showTextField)}
                        className="btn btn-secondary"><FontAwesomeIcon icon={faClosedCaptioning} /> Add Text Field</button>


                </div>
            </div>
            <div className="container">
                {
                    showTextField && <TextFieldConfiguration
                        addCallback={addTextField}
                        updateCallback={updateFormField}
                        fieldData={editingField?.data}
                    />
                }
            </div>
        </div>
    </DefaultLayout>
}

export default Index