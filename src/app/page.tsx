"use client"
import { GridCustom } from './components/grid'
import { defaultCols, defaultData } from './types'

export default function Home() {
  return (<>
    <div className='container-fluid bg-header pt-5'>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-2'>
            <img width="158" src="/imgs/logo.png" />
          </div>
          <div className='col-8'>
            <h1>INSCRIPCIONES</h1>
            <p>
              <strong>
                Por favor cargar los datos institucionales y de cada competididor en la siguiente planilla.
              </strong>
            </p>
            <p>

              Una vez terminado y controlado hacer click en enviar y en descargar para obtener una copia de tu planilla de inscripción, para un doble control enviar la planilla descargada a Secretaría FJS.
            </p>
            <p>
              <strong>
                IMPORTANTE:
              </strong> una vez descargada la planilla no modificar el archivo.

            </p>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-md-2'>
            Institución
          </div>
          <div className='col-md-4'>
            <input type="text" className='form-control' />
          </div>
          <div className='col-md-3'>
            Cantidad de competidores
          </div>
          <div className='col-md-3'>
            <input type="text" className='form-control' />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-2'>
            Profesor
          </div>
          <div className='col-md-4'>
            <input type="text" className='form-control' />
          </div>
          <div className='col-md-2'>
            Delegado
          </div>
          <div className='col-md-4'>
            <input type="text" className='form-control' />
          </div>
        </div>
      </div>
      <div className='container'>
        <hr />
        <strong>Lista de Buena Fe</strong>
        <hr />
      </div>
      <div className='container'>
        <GridCustom
          showHeaders={false}
          definitions={defaultCols} values={defaultData} />

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
