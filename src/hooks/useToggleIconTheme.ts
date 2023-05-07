import { useMemo } from "react";
import { themes } from "../store/reducers/ThemeSlice";
import {themeSelector} from "../store";
import {useAppSelector} from "../store/store";

const useToggleIconTheme = (lightIcon: string, darkIcon: string) => {
    const currentTheme: string = useAppSelector(themeSelector);

    return useMemo((): string => {
         if (currentTheme === themes.light)
             return lightIcon;
        else
            return darkIcon;
    }, [darkIcon, lightIcon, currentTheme]);
}
export default useToggleIconTheme;