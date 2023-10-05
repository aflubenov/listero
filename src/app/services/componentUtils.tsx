import { useEffect, useState } from "react";

export const useValidations = (value: any, isRequired: boolean, validationCallback: () => {}) => {
    const [isValid, setIsValid] = useState<boolean>(true);

    const validateRequired = (value: string) => {
        if (!value || value == "" || value == undefined || value == null) {
            setIsValid(false);

        } else {
            setIsValid(true);
        }
        validationCallback();

    }

    useEffect(() => {
        isRequired && validateRequired(value);
        // eslint-disable-next-line
    }, []);

    return {
        validateRequired: isRequired ? validateRequired : () => { },
        isValid
    }
}
