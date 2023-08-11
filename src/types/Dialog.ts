import {Dispatch, SetStateAction} from 'react';

interface DialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

export type { DialogProps };