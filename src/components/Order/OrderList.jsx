import moment from "moment/moment";
import React, { Fragment, useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/all";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOrderRequest, OrderListRequest } from "../../APIRequest/OrderAPIRequest";
import { DeleteAlert } from "../../helper/DeleteAlert";

const OrderList = () => {

    let [searchKeyword,setSearchKeyword]=useState("0");
    let [perPage,setPerPage]=useState(20);

    useEffect(()=>{
        (async () => {
            await OrderListRequest(1,perPage,searchKeyword);
        })();
    },[])
    const headerStyle = {
        color: "#13678A"
      };

    let DataList=useSelector((state)=>(state.order.List));
    let Total=useSelector((state)=>(state.order.ListTotal))

    const handlePageClick = async (event) => {
        await OrderListRequest(event.selected + 1, perPage, searchKeyword)
    };

    const searchData=async () => {
        await OrderListRequest(1, perPage, searchKeyword)
    }

    const perPageOnChange=async (e) => {
        setPerPage(parseInt(e.target.value))
        await OrderListRequest(1, e.target.value, searchKeyword)
    }

    const searchKeywordOnChange=async (e) => {
        setSearchKeyword(e.target.value)
        if ((e.target.value).length === 0) {
            setSearchKeyword("0")
            await OrderListRequest(1, perPage, "0")
        }
    }

    const TextSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    }


    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed){
            let DeleteResult= await DeleteOrderRequest(id)
            if(DeleteResult){
                await OrderListRequest(1,perPage,searchKeyword);
            }
        }
    }

    return (
        <Fragment>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-4">
                                            <h5> Order List</h5>
                                        </div>

                                        <div className="col-2">
                                            <input onKeyUp={TextSearch} placeholder="Text Filter" className="form-control form-control-sm"/>
                                        </div>

                                        <div className="col-2">
                                            <select onChange={perPageOnChange} className="form-control mx-2 form-select-sm form-select form-control-sm" >
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                                <option value="100">200 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input onChange={searchKeywordOnChange} type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                <button onClick={searchData} className="btn  btn-success btn-sm mb-0" type="button">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        
                                                        <td className="text-uppercase text-xxm font-weight-bolder opacity-7 "style={headerStyle}>#SN</td>
                                                        <td className="text-uppercase text-xxm font-weight-bolder opacity-7 "style={headerStyle}>Order ID</td>
                                                        <td className="text-uppercase text-xxm font-weight-bolder opacity-7 "style={headerStyle}>Order Date</td>
                                                        <td className="text-uppercase text-xxm font-weight-bolder opacity-7 "style={headerStyle}>Customer Information</td>
                                                        <td className="text-uppercase text-xxm font-weight-bolder opacity-7 "style={headerStyle}>Address</td>
                                                        
                                                        <td className="text-uppercase text-xxm font-weight-bolder opacity-7 "style={headerStyle}>Total Amount</td>
                                                        
                                                        <td className="text-uppercase text-xxm font-weight-bolder opacity-7 "style={headerStyle}>Order Status</td>

                                                        <td className="text-uppercase text-xxm font-weight-bolder opacity-7 "style={headerStyle}>Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/*   "_id": "64d287b0311be9de916275a1",
                    "customerId": "64caba1ca3374e539dbcfca8",
                    "addressId": "64d287b0311be9de9162759f",
                    "orderType": "delivery",
                    "paymentMethod": "cash_on_delivery",
                    "discountAmount": 0,
                    "orderAmount": 10,
                    "status": "Pending",
                    "orderNote": "Don't bell the ring more then once",
                    "__v": 0,
                    "info": [
                        {
                            "_id": "64caba1ca3374e539dbcfca8",
                            "email": "tanim@gmail.com",
                            "firstName": "tanim saha",
                            "lastName": "khan",
                            "phoneNo": "+8801915995772",
                            "password": "$2b$10$kXWg81e8OSA3ZlLV7dIz5uvHHPVM5OuMLfokCegXnRoSFdtVuieme",
                            "photo": "",
                            "createdAt": "2023-08-02T20:18:36.282Z",
                            "updatedAt": "2023-08-02T20:18:36.282Z"
                        }
                    ],
                    "address": [
                        {
                            "_id": "64d287b0311be9de9162759f",
                            "address": "Kutatoli, Kuril, Dhaka",
                            "address_type": "Home Delivery",
                            "floor": "2A",
                            "house": "Ka-119/5",
                            "lat": 111,
                            "lng": 111,
                            "road": "Kazi Bari Mosjid Road", */}
                                                    {
                                                        DataList.map((item,i)=>
                                                            <tr>
                                                                <td><p className="text-xs text-start">{i+1}</p></td>
                                                                <td><p className="text-xs text-start">{item._id}</p></td>
                                                                <td><p className="text-xs text-start">
                                                                {moment(item.info[0]["createdAt"]).format("MMMM Do YYYY")}
                                                                    </p></td>
                                                                <td><p className="text-xs text-start">{item.info[0].email} <br />
                                                                {item.info[0].phoneNo} </p></td>
                                                                <td><p className="text-xs text-start">{item.address[0].address}, <br />
                                                                {item.address[0].house},<br />{item.address[0].road} </p></td>
                                                                <td><p className="text-xs text-start">{item.orderAmount}</p></td>
                                                                <td><p className="text-xs text-start" style={{color:"blue"}} >{item.status} <br />
                                                                {item.paymentMethod}
                                                                </p></td>
                                                                
                                                                <td>
                                                                    <Link to={`/OrderCreateUpdatePage?id=${item._id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                        <AiOutlineEdit size={15} />
                                                                    </Link>
                                                                    <button onClick={DeleteItem.bind(this,item._id)} className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                                                        <AiOutlineDelete size={15} />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <nav aria-label="Page navigation example">
                                                <ReactPaginate
                                                    previousLabel="<"
                                                    nextLabel=">"
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"
                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"
                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"
                                                    breakLabel="..."
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    pageCount={Total/perPage}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={handlePageClick}
                                                    containerClassName="pagination"
                                                    activeClassName="active"
                                                />
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default OrderList;