import React, { Fragment, Suspense } from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import OrderList from "../../components/Order/OrderList";

const OrderListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <OrderList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default OrderListPage;