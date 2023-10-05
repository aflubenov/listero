import { TDataDefinition } from "../types";
import { useValidations } from "./componentUtils";

type TCComponentProps = {
    data: TDataDefinition;
    value: { value: any };
    placeholder: string;
    required: boolean;
    validationCallback: () => {};
};


export const useComponents = () => {


    const COptions = (props: TCComponentProps) => {
        const { data, value, placeholder, validationCallback, required } = props;

        if (!data.options) throw "Options are required";

        const options = data.options;
        const { isValid, validateRequired } = useValidations(value.value, required, validationCallback);

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
        const { value, placeholder, validationCallback, required } = props;

        const { validateRequired, isValid } = useValidations(value.value, required, validationCallback);

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
        const { value, placeholder, validationCallback, required } = props;
        const { validateRequired, isValid } = useValidations(value.value, required, validationCallback);

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

    return {
        getComponent
    }
}