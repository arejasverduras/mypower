import { ErrorItem } from "./ErrorItem/ErrorItem";

export type ErrorsType = string[];

interface ErrorsProps {
    errors: ErrorsType;
  }
  
  export const Errors = ({ errors }:ErrorsProps) => {
    return (
      <div className="space-y-4">
        {errors.length > 0 && errors.map((error, index) => <ErrorItem key={index} error={error} />)}
      </div>
    );
  };
  