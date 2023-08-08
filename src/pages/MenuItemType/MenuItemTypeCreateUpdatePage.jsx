import React, { Fragment, Suspense } from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import MenuItemTypeCreateUpdate from "../../components/MenuItemType/MenuItemTypeCreateUpdate";

const MenuItemTypeCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <MenuItemTypeCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default MenuItemTypeCreateUpdatePage;