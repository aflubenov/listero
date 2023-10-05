"use client"
import { GridCustom } from './components/grid'
import { MainExtraInfo } from './components/mainExtraInfo'
import { useStorage } from './services/storageUtils'


export default function Home() {

  const { dataDefinition, rowData,
    storeData, addRow, downloadData, saveDataToServer, validateDataFromState,
    formData, status, isValidData } = useStorage("listero_v1.1_");

  return (<>
    <div className='container-fluid bg-header pt-5'>
      <MainExtraInfo
        fieldsDefinition={dataDefinition.formDefinition}
        fieldsData={formData}
        validationCallback={validateDataFromState}
      />
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
                    downloadData();
                  }}
                  className="btn btn-sm btn-secondary btn-custom"
                >
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
