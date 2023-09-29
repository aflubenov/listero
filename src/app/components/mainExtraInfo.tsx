export const MainExtraInfo = () => {

    return (
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
    )
}