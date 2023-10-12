import { useComponents } from "@/app/services/useComponents";
import { TDataDefinition, TRowValue } from "@/app/types";

type TMainExtraInfoProps = {
    fieldsDefinition: TDataDefinition[],
    fieldsData: TRowValue,
    validationCallback: () => {},
}
export const MainExtraInfo = (props: TMainExtraInfoProps) => {

    const { fieldsDefinition, fieldsData, validationCallback } = props;

    const { getComponent } = useComponents();

    const componentsList = fieldsDefinition.map((d) =>
        getComponent({ data: d, value: { value: "" }, placeholder: "", required: false, validationCallback }),
    );

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-2 text-left'>
                    <img className="img-fluid" src="/imgs/logo.png" />
                </div>
                <div className='col-8'>
                    <h1 className="d-sm-none d-none d-md-block">
                        <strong>

                            INSCRIPCIONES
                        </strong>
                    </h1>
                    <h2 className="d-sm-block d-md-none">
                        <strong>

                            INSCRIPCIONES
                        </strong>
                    </h2>
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
                {
                    componentsList.map((C, idx) => <>
                        <div
                            key={"labelkey" + idx}
                            className={`mb-3 col-md-${fieldsDefinition[idx].sizeLabel}`}>
                            {fieldsDefinition[idx].name}
                        </div>
                        <div className={`mb-3 col-md-${fieldsDefinition[idx].sizeControl}`}>
                            <C
                                key={"formFieldKey" + idx}
                                data={fieldsDefinition[idx]}
                                placeholder=""
                                required={fieldsDefinition[idx].required}
                                value={fieldsData[idx]}
                                validationCallback={validationCallback}
                            />
                        </div>
                    </>)
                }

            </div>

        </div>
    )
}