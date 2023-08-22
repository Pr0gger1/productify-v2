import { useMemo } from 'react';
import { useAppSelector } from 'store';
import { themeSelector } from 'store/selectors';
import { ThemeType } from 'types/slices/SliceStates';

const useToggleIconTheme = (lightIcon: string, darkIcon: string) => {
	const currentTheme: ThemeType = useAppSelector(themeSelector);

	return useMemo((): string => {
		if (currentTheme === 'light') return lightIcon;
		else return darkIcon;
	}, [darkIcon, lightIcon, currentTheme]);
};
export default useToggleIconTheme;
