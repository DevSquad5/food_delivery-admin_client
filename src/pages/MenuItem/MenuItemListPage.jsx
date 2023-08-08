import React, { Fragment, Suspense } from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import MenuItemList from "../../components/MenuItem/MenuItemList";

const MenuItemListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                        <MenuItemList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default MenuItemListPage;