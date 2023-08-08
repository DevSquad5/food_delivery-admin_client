import { createSlice } from "@reduxjs/toolkit";
export const menuitemSlice=createSlice({
    name:'menuitem',
    initialState:{
        List:[],
        ListTotal:0,
        MenuItemTypeDropDown:[],
        FormValue:{
            CategoryId:"",
            ItemImage:"",
            ItemName:"",
            Description:"",
            Discount:"",
            UnitPrice:""

        }
    },
    reducers:{
        SetMenuItemList:(state,action)=>{
            state.List=action.payload
        },
        SetMenuItemListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        SetMenuItemTypeDropDown:(state,action)=>{
            state.MenuItemTypeDropDown=action.payload
        },
        OnChangeMenuItemInput:(state,action)=>{
            state.FormValue[`${action.payload.Name}`]=action.payload.Value;
        },
        ResetMenuItemFormValue:(state,action)=>{
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
        }
    }
})

export  const {SetMenuItemList,SetMenuItemListTotal,OnChangeMenuItemInput,SetMenuItemTypeDropDown,ResetMenuItemFormValue}=menuitemSlice.actions;
export default menuitemSlice.reducer;