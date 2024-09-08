import type { MouseEvent } from 'react';

export type Setting = {
    text: string;
    handleClick(event: MouseEvent): void;
}
