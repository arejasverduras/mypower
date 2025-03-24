import { ErrorItem } from "./ErrorItem/ErrorItem";

export type ErrorsType = string[];

interface ErrorsProps {
    errors: ErrorsType;
  }
  
  export const Errors = ({ errors }:ErrorsProps) => {
    return (
      <>
        {errors.length > 0 && errors.map((error, index) => <ErrorItem key={index} error={error} />)}
      </>
    );
  };
  