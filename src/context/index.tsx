import React, { FC } from "react";
import { LoadingContextProvider } from "./loading";


const GlobalContext: FC = ({ children }) => {
    return <LoadingContextProvider>{children}</LoadingContextProvider>
}

export default GlobalContext