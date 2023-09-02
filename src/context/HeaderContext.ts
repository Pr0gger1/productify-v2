import React, { createContext, Dispatch } from 'react';

interface IHeaderContext {
	showHeader: boolean;
	setShowHeader: (state: boolean) => void;
}

export const HeaderContext = createContext<IHeaderContext>({
	showHeader: true,
	setShowHeader: () => {},
});
