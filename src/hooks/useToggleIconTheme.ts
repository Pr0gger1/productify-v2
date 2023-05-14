import { useMemo } from "react";
import {themeSelector} from "../store";
import {useAppSelector} from "../store/store";
import { ThemeType } from "../interfaces/slices/SliceStates";

const useToggleIconTheme = (lightIcon: string, darkIcon: string) => {
    const currentTheme: ThemeType = useAppSelector(themeSelector);

    return useMemo((): string => {
         if (currentTheme === "light")
             return lightIcon;
        else return darkIcon;
    }, [darkIcon, lightIcon, currentTheme]);
}
export default useToggleIconTheme;