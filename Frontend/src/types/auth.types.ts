/* eslint-disable @typescript-eslint/no-explicit-any */

type InputProps = {
    type: string,
    label: string,
    placeholder: string,
    value: string | undefined,
    onchange: React.ChangeEventHandler<HTMLInputElement>,
    message: any
}

type BtnProps = {
    label: string,
    onclick: React.MouseEventHandler<HTMLButtonElement>
}

type User = {
    user: {
        name: string;
    }
}


export  type { InputProps, BtnProps, User };