import React, {createContext, Dispatch} from 'react';

interface IHeaderContext {
    showHeader: boolean;
    setShowHeader: Dispatch<React.SetStateAction<boolean>>
}

export const HeaderContext = createContext<IHeaderContext>({
	showHeader: true,
	setShowHeader: () => {}
});
