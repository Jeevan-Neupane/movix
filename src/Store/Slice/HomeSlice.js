import { createSlice } from "@reduxjs/toolkit"; 


const initialState={
    url:{},
    genres:{},

};


const homeSlice=createSlice({
    name:"home",
    initialState,
    reducers:{
        getApiConfiguration:(state,action)=>{
            state.url=action.payload;
            
        },
        getGenresConfiguration:(state,action)=>{
            state.genres=action.payload;

        }

    }

})

export const {getApiConfiguration,getGenresConfiguration}=homeSlice.actions;
export default homeSlice.reducer;