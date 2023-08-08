import { createSlice } from "@reduxjs/toolkit";
export const menuitemtypeSlice=createSlice({
    name:'menuitemtype',
    initialState:{
        List:[],
        ListTotal:0,
        FormValue:{
            Name:""
        }
    },
    reducers:{
        SetMenuItemTypeList:(state,action)=>{
            state.List=action.payload
        },
        SetMenuItemTypeListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        OnChangeMenuItemTypeInput:(state,action)=>{
            state.FormValue[`${action.payload.Name}`]=action.payload.Value;
        },
        ResetMenuItemTypeFormValue:(state,action)=>{
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
        }
    }
})

export  const {SetMenuItemTypeList,SetMenuItemTypeListTotal,OnChangeMenuItemTypeInput,
ResetMenuItemTypeFormValue
}=menuitemtypeSlice.actions;
export default  menuitemtypeSlice.reducer;