import { IsErrorProp } from "../../types"

export const errorText = "Please enter a task longer than 3 letters.";

export function InputError({ isError }: IsErrorProp) {
    if (isError) {
        return <div data-testid="task-error" className="text-red-600">{errorText}</div>;
    } else {
        return (<span data-testid="task-error" />)
    }
}
