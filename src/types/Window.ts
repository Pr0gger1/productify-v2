import {Dispatch, SetStateAction} from 'react';

export default interface IWindowAnchor {
    anchor: HTMLElement | null,
    setAnchor: Dispatch<SetStateAction<HTMLElement | null>>
};
