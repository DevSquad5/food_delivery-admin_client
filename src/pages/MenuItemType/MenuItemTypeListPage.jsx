import React, { Fragment, Suspense } from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import MenuItemTypeList from "../../components/MenuItemType/MenuItemTypeList";

const MenuItemTypeListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <MenuItemTypeList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default MenuItemTypeListPage;