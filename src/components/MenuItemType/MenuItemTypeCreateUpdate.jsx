import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreateMenuItemTypeRequest,
  FillMenuItemTypeFormRequest,
} from "../../APIRequest/MenuItemTypeApiRequest";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import { OnChangeMenuItemTypeInput } from "../../redux/state-slice/menuitemtype-slice";
import store from "../../redux/store/store";

const MenuItemTypeCreateUpdate = () => {
  let FormValue = useSelector((state) => state.menuitemtype.FormValue);
  let navigate = useNavigate();
  let [ObjectID, SetObjectID] = useState(0);

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      SetObjectID(id);
      (async () => {
        await FillMenuItemTypeFormRequest(id);
      })();
    }
  }, []);

  const SaveChange = async () => {
    if (IsEmpty(FormValue.ItemCategory)) {
      ErrorToast("MenuItem Type Name Required !");
    } else {
      if (await CreateMenuItemTypeRequest(FormValue, ObjectID)) {
        navigate("/MenuItemTypeListPage");
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <h5>Save Menu Item Category</h5>
                <hr className="bg-light" />

                <div className="col-4 p-2">
                  <label className="form-label">Menu Item Category Name</label>
                  <input
                    onChange={(e) => {
                      store.dispatch(
                        OnChangeMenuItemTypeInput({
                          Name: "ItemCategory",
                          Value: e.target.value,
                        })
                      );
                    }}
                    value={FormValue.ItemCategory}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 p-2">
                  <button
                    onClick={SaveChange}
                    className="btn btn-sm my-3 btn-success"
                  >
                    Save Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemTypeCreateUpdate;
