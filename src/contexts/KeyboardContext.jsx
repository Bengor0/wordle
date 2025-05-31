import { createContext } from "react";

const KeyboardContext = createContext({
    handleKeyClick: () => console.warn('KeyBoardContext: No handleKeyClick provider found!'),
    keyColors: new Map(),
});

export default KeyboardContext;