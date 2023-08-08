import React, { Fragment, Suspense } from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import MenuItemReport from "../../components/Report/MenuItemReport";

const MenuItemReportPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                        <MenuItemReport/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default MenuItemReportPage;