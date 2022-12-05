import React from "react";
import { createContext } from "react";
let theme={
    'light': true,
    'dark':false
}
const ThemeContext = createContext(theme);
export default ThemeContext;