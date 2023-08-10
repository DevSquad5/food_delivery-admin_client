import React, { useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useSelector } from "react-redux";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ExpensesSummary, PurchaseSummary, ReturnSummary, SaleSummary } from "../../APIRequest/SummaryAPIRequest";
const Dashboard = () => {

    useEffect(()=>{
        (async () => {
            await ExpensesSummary()
            await SaleSummary()
            await ReturnSummary()
            await PurchaseSummary()
        })();
    },[])

    let ExpenseChart = useSelector((state) => state.dashboard.ExpenseChart);
    let ExpenseTotal = useSelector((state) => state.dashboard.ExpenseTotal);

    let SaleChart = useSelector((state) => state.dashboard.SaleChart);
    let SaleTotal = useSelector((state) => state.dashboard.SaleTotal);

    let ReturnChart = useSelector((state) => state.dashboard.ReturnChart);
    let ReturnTotal = useSelector((state) => state.dashboard.ReturnTotal);


    let PurchaseChart = useSelector((state) => state.dashboard.PurchaseChart);
    let PurchaseTotal = useSelector((state) => state.dashboard.PurchaseTotal);

    return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 p-2">
                        <div className="card">
                            <div className="card-body">
                                <span className="h5">
                                    <CurrencyFormat value={ExpenseTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </span>
                                <p>Total Order</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 p-2">
                        <div className="card">
                            <div className="card-body">
                               <span className="h5">
                                    <CurrencyFormat value={SaleTotal} displayType={'text'} thousandSeparator={true}  />
                                </span>
                                <p>Total Item</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 p-2">
                        <div className="card">
                            <div className="card-body">
                               <span className="h5">
                                    <CurrencyFormat value={PurchaseTotal} displayType={'text'} thousandSeparator={true}  />
                                </span>
                                <p>Total Category</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 p-2">
                        <div className="card">
                            <div className="card-body">
                               <span className="h5">
                                    <CurrencyFormat value={ReturnTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </span>
                                <p>Total Return</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 p-2">
                        <div className="card">
                            <div className="card-body">
                                <span className="h6">Order Last 30 Days</span>
                                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                    <AreaChart width={500} height={200} data={ExpenseChart} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="TotalAmount" stroke="#CB0C9F" fill="#CB0C9F" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-2">
                        <div className="card">
                            <div className="card-body">
                                <span className="h6">Item Last 30 Days</span>
                                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                    <AreaChart width={500} height={200} data={SaleChart} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="TotalAmount" stroke="#8884d8" fill="#8884d8" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-2">
                        <div className="card">
                            <div className="card-body">
                                <span className="h6">Category Last 30 Days</span>
                                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                    <AreaChart width={500} height={200} data={PurchaseChart} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="TotalAmount" stroke="#00A884" fill="#00A884" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-2">
                        <div className="card">
                            <div className="card-body">
                                <span className="h6">Return Last 30 Days</span>
                                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                    <AreaChart width={500} height={200} data={ReturnChart} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="TotalAmount" stroke="#CB0C9F" fill="#CB0C9F" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};
export default Dashboard;