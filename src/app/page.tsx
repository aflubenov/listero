"use client"
import { GridCustom } from './components/grid'
import { MainExtraInfo } from './components/mainExtraInfo'
import { useStorage } from './services/storageUtils'


export default function Home() {

  const { dataDefinition, rowData,
    storeData, addRow, downloadData, saveDataToServer } = useStorage("listero_v1_");

  return (<>
    <div className='container-fluid bg-header pt-5'>
      <MainExtraInfo />
      <div className='container'>
        <hr />
        <strong>Lista de Buena Fe</strong>
        <hr />
      </div>
      <div className='container'>
        <GridCustom
          showHeaders={false}
          definitions={dataDefinition}
          values={rowData} />

        <hr />
        <div className='row'>
          <div className='col-md-6'>
            <button onClick={addRow} className="btn btn-sm btn-primary btn-add-competidor">
              Añadir Competidor
            </button>
          </div>
          <div className='col-md-6 text-right'>

            <button
              onClick={async () => {
                storeData();
                await saveDataToServer();
                alert("Sus datos fueron enviados exitosamente!");
              }}
              className="btn btn-sm btn-info btn-custom"
            >
              Enviar
            </button>
            <button
              onClick={() => {
                downloadData();
              }}
              className="btn btn-sm btn-secondary ml-2 btn-custom"
            >
              Descargar
            </button>
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
