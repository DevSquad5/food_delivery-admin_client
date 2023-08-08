import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateMenuItemRequest, FillMenuItemFormRequest, MenuItemTypeDropDownRequest } from "../../APIRequest/MenuItemAPIRequest";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import { OnChangeMenuItemInput } from "../../redux/state-slice/menuitem-slice";
import store from "../../redux/store/store";


const MenuItemCreateUpdate = () => {
    let FormValue=useSelector((state)=>(state.menuitem.FormValue));
    let navigate=useNavigate();
    let [ObjectID,SetObjectID]=useState(0);

    useEffect(()=>{
        (async () => {
            await MenuItemTypeDropDownRequest();
        })();

        let params= new URLSearchParams(window.location.search);
        let id=params.get('id');
        if(id!==null){
            SetObjectID(id);
            (async () => {
               await FillMenuItemFormRequest(id)
            })();
        }

    },[])

    let MenuItemTypeDropDown=useSelector((state)=>(state.menuitem.MenuItemTypeDropDown));
/* UnitPrice,Description,ItemName,ItemImage */

    const SaveChange = async () => {
        if(IsEmpty(FormValue.CategoryId)){
            ErrorToast("MenuItem Type Required !")
        }
        else if(IsEmpty(FormValue.ItemImage)){
            ErrorToast("MenuItem Image URL Required !")
        }
        
        else if(FormValue.UnitPrice===0){
            ErrorToast("MenuItem UnitPrice Required !")
        }
        else if(IsEmpty(FormValue.ItemName)){
            ErrorToast("Menu Item Name Required !")
        }
        else if(IsEmpty(FormValue.Description)){
            ErrorToast("Menu Item Description Required !")
        }
        
        else {
            if(await CreateMenuItemRequest(FormValue,ObjectID)){
                navigate("/MenuItemListPage")
            }
        }
    }



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <h5>Save MenuItem</h5>
                                <hr className="bg-light"/>
                                <div className="col-4 p-2">
                                    <label className="form-label">MenuItem Type</label>
                                    <select onChange={(e)=>{store.dispatch(OnChangeMenuItemInput({Name:"CategoryId",Value:e.target.value}))}} value={FormValue.CategoryId} className="form-select form-select-sm">
                                        <option value="">Select Type</option>
                                        {
                                            MenuItemTypeDropDown.map((item,i)=>{
                                                return( <option key={i.toLocaleString()} value={item._id}>{item.ItemCategory}</option>)
                                            })
                                        }
                                    </select>
                                
                                
                                </div>
                                
                                {/* Item,Name,category,UnitPrice,Description,Discount */}
                                <div className="col-4 p-2">
                                    <label className="form-label">Item Image</label>
                                    <input onChange={(e)=>{store.dispatch(OnChangeMenuItemInput({Name:"ItemImage",Value:e.target.value}))}} value={FormValue.ItemImage} className="form-control form-control-sm" type="text"/>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="form-label">Item Name</label>
                                    <input onChange={(e)=>{store.dispatch(OnChangeMenuItemInput({Name:"ItemName",Value:e.target.value}))}} value={FormValue.ItemName} className="form-control form-control-sm" type="text"/>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="form-label">Description</label>
                                    <input onChange={(e)=>{store.dispatch(OnChangeMenuItemInput({Name:"Description",Value:e.target.value}))}} value={FormValue.Description} className="form-control form-control-sm" type="text"/>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="form-label">Discount</label>
                                    <input onChange={(e)=>{store.dispatch(OnChangeMenuItemInput({Name:"Discount",Value:e.target.value}))}} value={FormValue.Discount} className="form-control form-control-sm" type="number"/>
                                </div>
                                
                                <div className="col-4 p-2">
                                    <label className="form-label">MenuItem Price</label>
                                    <input onChange={(e)=>{store.dispatch(OnChangeMenuItemInput({Name:"UnitPrice",Value:e.target.value}))}} value={FormValue.UnitPrice} className="form-control form-control-sm" type="number"/>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-4 p-2">
                                    <button onClick={SaveChange}  className="btn btn-sm my-3 btn-success">Save Change</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuItemCreateUpdate;