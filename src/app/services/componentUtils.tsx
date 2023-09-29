import { useEffect, useState } from "react";

export const useValidations = (value: any) => {
    const [isValid, setIsValid] = useState<boolean>(true);

    const validateRequired = (value: string) => {
        if (!value || value == "" || value == undefined || value == null) {
            setIsValid(false);

        } else {
            setIsValid(true);
        }
    }

    useEffect(() => {
        validateRequired(value);
        // eslint-disable-next-line
    }, []);

    return {
        validateRequired, isValid
    }
}
