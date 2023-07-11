import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./Slice/HomeSlice";
import { getApiConfiguration,getGenresConfiguration } from "./Slice/HomeSlice";


export const store=configureStore({
    reducer:{
        home:HomeSlice,

    }
})

export {getApiConfiguration,getGenresConfiguration};