import React, { Fragment, Suspense } from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import MenuItemCreateUpdate from "../../components/MenuItem/MenuItemCreateUpdate";

const MenuItemCreateUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <MenuItemCreateUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default MenuItemCreateUpdatePage;