import React, { Fragment } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FullscreenLoader from "./components/MasterLayout/FullscreenLoader";
import { getToken } from "./helper/SessionHelper";
import CustomerCreateUpdatePage from "./pages/Customer/CustomerCreateUpdatePage";
import CustomerListPage from "./pages/Customer/CustomerListPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import MenuItemCreateUpdatePage from "./pages/MenuItem/MenuItemCreateUpdatePage";
import MenuItemListPage from "./pages/MenuItem/MenuItemListPage";
import MenuItemTypeCreateUpdatePage from "./pages/MenuItemType/MenuItemTypeCreateUpdatePage";
import MenuItemTypeListPage from "./pages/MenuItemType/MenuItemTypeListPage";
import Page404 from "./pages/NotFound/Page404";
import OrderListPage from "./pages/Order/OrderListPage";
import PurchaseReportPage from "./pages/Report/PurchaseReportPage";
import ReturnReportPage from "./pages/Report/ReturnReportPage";
import SaleReportPage from "./pages/Report/SaleReportPage";
import CreatePasswordPage from "./pages/Users/CreatePasswordPage";
import LoginPage from "./pages/Users/LoginPage";
import ProfilePage from "./pages/Users/ProfilePage";
import SendOTPPage from "./pages/Users/SendOTPPage";
import VerifyOTPPage from "./pages/Users/VerifyOTPPage";
const App = () => {
    if(getToken()){
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/CustomerCreateUpdatePage" element={<CustomerCreateUpdatePage />}/>
                        <Route exact path="/CustomerListPage" element={<CustomerListPage />}/>
                        <Route exact path="/MenuItemTypeCreateUpdatePage" element={<MenuItemTypeCreateUpdatePage />}/>
                        <Route exact path="/MenuItemTypeListPage" element={<MenuItemTypeListPage />}/>
                        <Route exact path="/MenuItemCreateUpdatePage" element={<MenuItemCreateUpdatePage />}/>
                        <Route exact path="/MenuItemListPage" element={<MenuItemListPage />}/>
                        <Route exact path="/OrderListPage" element={<OrderListPage />}/>
                        <Route exact path="/PurchaseReportPage" element={<PurchaseReportPage />}/>
                        <Route exact path="/ReturnReportPage" element={<ReturnReportPage />}/>
                        <Route exact path="/SaleReportPage" element={<SaleReportPage />}/>
                        {/* <Route exact path="/MenuItemReportPage" element={<MenuItemReportPage />}/> */}
                        <Route exact path="/" element={<DashboardPage />}/>
                        <Route exact path="/Profile" element={<ProfilePage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </BrowserRouter>
                <FullscreenLoader/>
            </Fragment>
        );
    }
    else {
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/Login" replace />}/>
                        <Route exact path="/Login" element={<LoginPage />}/>
                        <Route exact path="/SendOTP" element={<SendOTPPage/>}/>
                        <Route exact path="/VerifyOTP" element={<VerifyOTPPage/>}/>
                        <Route exact path="/CreatePassword" element={<CreatePasswordPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </BrowserRouter>
                <FullscreenLoader/>
            </Fragment>
        );
    }
};
export default App;