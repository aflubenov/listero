
import { useStorage } from "@/app/services/storageUtils";
import { MainExtraInfo, MainHeader } from "./mainExtraInfo";
import { GridCustom } from "./grid";

export const ListFilling = () => {

    const { dataDefinition, rowData,
        showPrint,
        storeData, addRow, downloadPDF, saveDataToServer, validateDataFromState,
        formData, status, isValidData, removeRow } = useStorage("listero_v1.6_");

    return (<>
        <div className='container-fluid bg-header pt-5'>
            {showPrint &&
                <div style={{
                    display: "none"
                }}>
                    <div className="paraimprimir p-5">
                        <table className="maintabla mb-4">
                            <tr className="mainfila" style={{
                                borderBottom: "1px solid darkgray"
                            }}>
                                {

                                    dataDefinition.formDefinition.map(
                                        (h, idx) => <td
                                            key={"maincelda_head_" + idx}
                                            className="maincelda p-2">
                                            <b>
                                                {h.name}
                                            </b>
                                        </td>
                                    )
                                }
                            </tr>
                            <tr className="mainfila">
                                {
                                    formData.map((d, idx) => <td
                                        key={"maincelda_data_" + idx}
                                        className={"maincelda "}>
                                        <div className={"m-2 p-2 " + + (dataDefinition.formDefinition[idx].type === "number" ? " text-right" : "")} style={{
                                            borderLeft: idx > 0 ? "1px solid lightgray" : "none",
                                            width: "100%"
                                        }}>
                                            {d.value}

                                        </div>
                                    </td>)

                                }
                            </tr>
                        </table>
                        <div style={{
                            borderBottom: "3px solid black"
                        }}>

                            <h1>
                                <b>Lista de Buena Fe</b>
                            </h1>
                        </div>

                        <table className="datatabla mt-4">
                            <tr className="datafila" style={{
                                borderBottom: "1px solid darkgray"
                            }}>
                                {
                                    dataDefinition.colDefinition.map((c, idx) => <td
                                        key={"datacelda_head_" + idx}
                                        className="datacelda p-2">
                                        <b>
                                            {c.name}
                                        </b>
                                    </td>)
                                }
                            </tr>
                            {
                                rowData.map((r, idx) => <tr
                                    key={"datacefila_" + idx}
                                    className="datafila">
                                    {
                                        r.map((c, idx) => <td
                                            key={"datacelda_data_" + idx}
                                            className="datacelda">
                                            <div className={"m-2 p-2 " + + (dataDefinition.colDefinition[idx].type === "number" ? " text-right" : "")} style={{
                                                borderLeft: idx > 0 ? "1px solid lightgray" : "none",
                                                width: "100%"
                                            }}>
                                                {c.value}

                                            </div>
                                        </td>)
                                    }
                                </tr>)
                            }

                        </table>
                    </div>

                </div>
            }
            <div className='container mt-5'>
                <MainHeader />

                <MainExtraInfo
                    fieldsDefinition={dataDefinition.formDefinition}
                    fieldsData={formData}
                    validationCallback={validateDataFromState}
                />
            </div>
            <div className='container'>
                <hr />
                <strong>Lista de Buena Fe</strong>
                <hr />
            </div>
            <div className='container'>
                <GridCustom
                    showHeaders={false}
                    definitions={dataDefinition.colDefinition}
                    values={rowData}
                    validationCallback={validateDataFromState}
                    deleteCallback={removeRow}
                />

                <hr />
                <div className='row'>
                    <div className='col-lg-3 mb-2 text-center'>
                        <button
                            disabled={status == "working" || status == "error"}
                            onClick={addRow} className="btn btn-sm btn-primary btn-add-competidor">
                            Añadir Competidor
                        </button>
                    </div>
                    <div className='col-lg-2'></div>
                    <div className='col-xl-7'>
                        <div className='row'>
                            <div className='col-lg-6'></div>
                            <div className='col-lg-3 mb-2 text-center'>

                                <button
                                    disabled={status == "working" || status == "error" || !isValidData}
                                    onClick={async () => {
                                        await saveDataToServer();
                                        alert("Sus datos fueron enviados exitosamente!");
                                    }}
                                    className="btn btn-sm btn-info btn-custom"
                                >
                                    {
                                        status === "working" && <div className="spinner-border spinner-border-sm text-light mr-2" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    }
                                    Enviar
                                </button>
                            </div>
                            <div className='col-lg-3 text-center'>
                                <button
                                    disabled={status == "working" || status == "error" || !isValidData}
                                    onClick={() => {
                                        downloadPDF();
                                    }}
                                    className="btn btn-sm btn-secondary btn-custom"
                                >
                                    {
                                        status === "working" && <div className="spinner-border spinner-border-sm text-light mr-2" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    }
                                    Descargar
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
            <div className='container text-center mt-5'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                        <p>
                            Los datos proporcionados en la siguiente lista serán considerados oficiales para las inscripciones institucionales de los competidores.
                            <br />Ante cualquier duda dirigirse a martin.nunes2@gmail.com.

                        </p>
                        <small>
                            Desarrollado por Martin Nunes / Angel Lubenov
                        </small>
                        <p className='mt-2'>
                        </p>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        </div>

    </>
    )
}