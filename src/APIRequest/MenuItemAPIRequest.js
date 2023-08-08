import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import {
    OnChangeMenuItemInput,
    ResetMenuItemFormValue,
    SetMenuItemList,
    SetMenuItemListTotal,
    SetMenuItemTypeDropDown
} from "../redux/state-slice/menuitem-slice";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import store from "../redux/store/store";
const AxiosHeader={headers:{"token":getToken()}}

export async function MenuItemListRequest(pageNo, perPage, searchKeyword) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/ItemList/"+pageNo+"/"+perPage+"/"+searchKeyword;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetMenuItemList(result.data['data'][0]['Rows']))
                store.dispatch(SetMenuItemListTotal(result.data['data'][0]['Total'][0]['count']))
            } else {
                store.dispatch(SetMenuItemList([]))
                store.dispatch(SetMenuItemListTotal(0))
                ErrorToast("No Data Found")
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}



export async function MenuItemTypeDropDownRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/CategoryTypesDropDown";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'].length > 0) {
                store.dispatch(SetMenuItemTypeDropDown(result.data['data']))
                debugger;
            } else {
                store.dispatch(SetMenuItemTypeDropDown([]))
                ErrorToast("No MenuItem Type Found")
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}


export async function CreateMenuItemRequest(PostBody,ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL;
        (ObjectID!==0)?URL = BaseURL+"/UpdateItem/"+ObjectID: URL = BaseURL+"/CreateItem";
        
        const result = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Request Successful");
            store.dispatch(ResetMenuItemFormValue())
            return  true;
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}



export async function FillMenuItemFormRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/MenuItemDetailsByID/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            let FormValue=result.data['data'][0];
            store.dispatch(OnChangeMenuItemInput({Name:"TypeID",Value:FormValue['TypeID']}));
            store.dispatch(OnChangeMenuItemInput({Name:"Amount",Value:FormValue['Amount']}));
            store.dispatch(OnChangeMenuItemInput({Name:"Note",Value:FormValue['Note']}));
            return  true;
        } else {
            debugger;
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        debugger;
        //ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}



export async function DeleteMenuItemRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/deleteItem/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Request Successful");
            return  true
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}

