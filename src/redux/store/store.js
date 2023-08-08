import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../state-slice/customer-slice";
import dashboardReducer from "../state-slice/dashboard-slice";
import menuitemReducer from "../state-slice/menuitem-slice";
import menuitemtypeReducer from "../state-slice/menuitemtype-slice";
import orderReducer from "../state-slice/order-slice";
import profileReducer from "../state-slice/profile-slice";
import reportReducer from "../state-slice/report-slice";
import settingsReducer from "../state-slice/settings-slice";


export default configureStore({
    reducer:{
        settings:settingsReducer,
        dashboard:dashboardReducer,
        profile:profileReducer,
        order:orderReducer,
        customer:customerReducer,
        menuitemtype:menuitemtypeReducer,
        menuitem:menuitemReducer,
        report:reportReducer,
        }
})