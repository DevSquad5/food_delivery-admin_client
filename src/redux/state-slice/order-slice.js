import { createSlice } from "@reduxjs/toolkit";
export const orderSlice=createSlice({
    name:'order',
    initialState:{
        List:[],
        ListTotal:0,
        FormValue:{
            Name:"",
            Phone:"",
            Email:"",
            Address:""
        }
    },
    reducers:{
        SetOrderList:(state,action)=>{
            state.List=action.payload
        },
        SetOrderListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        OnChangeOrderInput:(state,action)=>{
            state.FormValue[`${action.payload.Name}`]=action.payload.Value;
        },
        ResetOrderFormValue:(state,action)=>{
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
        }
    }
})

export  const {SetOrderList,SetOrderListTotal,OnChangeOrderInput,ResetOrderFormValue}=orderSlice.actions;
export default  orderSlice.reducer;