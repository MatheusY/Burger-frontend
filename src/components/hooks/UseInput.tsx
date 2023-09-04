import { useEffect, useState } from "react";

const useInput = ({
  initialValue,
  validateValue,
}: {
  initialValue: string;
  validateValue: (value: string) => boolean;
}) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  useEffect(() => {
    setEnteredValue(initialValue);
  }, [initialValue, setEnteredValue]);

  const valueChangeHandler = (event: any) => {
    setEnteredValue(event.target.value);

    setIsTouched(true);
  };

  const valueBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
