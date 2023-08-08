import moment from "moment/moment";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/all";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  DeleteMenuItemTypeRequest,
  MenuItemTypeListRequest,
} from "../../APIRequest/MenuItemTypeApiRequest";
import { DeleteAlert } from "../../helper/DeleteAlert";

const MenuItemTypeList = () => {
  let [searchKeyword, setSearchKeyword] = useState("0");
  let [perPage, setPerPage] = useState(20);

  useEffect(() => {
    (async () => {
      await MenuItemTypeListRequest(1, perPage, searchKeyword);
    })();
  }, []);

  const headerStyle = {
    color: "#13678A"
  };

  let DataList = useSelector((state) => state.menuitemtype.List);
  let Total = useSelector((state) => state.menuitemtype.ListTotal);

  const handlePageClick = async (event) => {
    await MenuItemTypeListRequest(event.selected + 1, perPage, searchKeyword);
  };
  const searchData = async () => {
    await MenuItemTypeListRequest(1, perPage, searchKeyword);
  };
  const perPageOnChange = async (e) => {
    setPerPage(parseInt(e.target.value));
    await MenuItemTypeListRequest(1, e.target.value, searchKeyword);
  };
  const searchKeywordOnChange = async (e) => {
    setSearchKeyword(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKeyword("0");
      await MenuItemTypeListRequest(1, perPage, "0");
    }
  };

  const TextSearch = (e) => {
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      row.style.display = row.innerText.includes(e.target.value) ? "" : "none";
    });
  };

  const DeleteItem = async (id) => {
    let Result = await DeleteAlert();
    if (Result.isConfirmed) {
      let DeleteResult = await DeleteMenuItemTypeRequest(id);
      if (DeleteResult) {
        await MenuItemTypeListRequest(1, perPage, searchKeyword);
      }
    }
  };

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
                      <h5>MenuItem Type List</h5>
                    </div>

                    <div className="col-2">
                      <input
                        onKeyUp={TextSearch}
                        placeholder="Text Filter"
                        className="form-control form-control-sm"
                      />
                    </div>

                    <div className="col-2">
                      <select
                        onChange={perPageOnChange}
                        className="form-control mx-2 form-select-sm form-select form-control-sm"
                      >
                        <option value="20">20 Per Page</option>
                        <option value="30">30 Per Page</option>
                        <option value="50">50 Per Page</option>
                        <option value="100">100 Per Page</option>
                        <option value="100">200 Per Page</option>
                      </select>
                    </div>
                    <div className="col-4">
                      <div className="input-group mb-3">
                        <input
                          onChange={searchKeywordOnChange}
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Search.."
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                        />
                        <button
                          onClick={searchData}
                          className="btn  btn-success btn-sm mb-0"
                          type="button"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive table-section">
                        <table className="table">
                          <thead className="sticky-top bg-white">
                            <tr>
                              <th className="text-uppercase text-xxm font-weight-bolder opacity-7"style={headerStyle}>
                                No
                              </th>
                              <th className="text-uppercase text-xxm font-weight-bolder opacity-7"style={headerStyle}>
                                Name
                              </th>
                              <th className="text-uppercase text-xxm font-weight-bolder opacity-7"style={headerStyle}>
                                Created
                              </th>
                              <th className="text-uppercase text-xxm font-weight-bolder opacity-7"style={headerStyle}>
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {DataList.map((item, i) => (
                              <tr>
                                <td>
                                  <p className="text-xs text-start">{i + 1}</p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.ItemCategory}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {moment(item.CreatedDate).format(
                                      "MMMM Do YYYY"
                                    )}
                                  </p>
                                </td>
                                <td>
                                  <Link
                                    to={`/MenuItemTypeCreateUpdatePage?id=${item._id}`}
                                    className="btn btn-outline-light p-2 mb-0 btn-sm"
                                  >
                                    <AiOutlineEdit size={15} />
                                  </Link>
                                  <button
                                    onClick={DeleteItem.bind(this, item._id)}
                                    className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2"
                                  >
                                    <AiOutlineDelete size={15} />
                                  </button>
                                </td>
                              </tr>
                            ))}
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
                          pageCount={Total / perPage}
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

export default MenuItemTypeList;
