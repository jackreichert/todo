import { IsErrorProp } from "../../types"

export function InputError({ isError }: IsErrorProp) {
    if (isError) {
        return <div data-testid="task-error" className="text-red-600">Please enter a task longer than 3 letters.</div>;
    } else {
        return (<span data-testid="task-error" />)
    }
}
