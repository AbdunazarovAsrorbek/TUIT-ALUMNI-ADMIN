import React from "react";
import {Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const PaginationFile = (props: any) => {
    const {
        isEmpty,
        totalPages,
        activePage,
        className,
        handleClick,
        handleNextPage,
        handlePrevPage,
        pageNumbers,
        totalElements,
        numberOfElements
    } = props;

    return (
        <React.Fragment>
            {isEmpty && <div id="noresult">
                <div className="text-center py-4">
                    <div className="avatar-md mx-auto mb-4">
                        <div className="avatar-title bg-light text-primary rounded-circle fs-4xl">
                            <i className="bi bi-search"></i>
                        </div>
                    </div>
                    <h5 className="mt-2">Sorry! No Result Found</h5>
                </div>
            </div>}

            {totalPages > 1 &&
                <Row className={`align-items-center ${className} justify-content-between text-center text-sm-start`}
                     id="pagination-element" style={{display: "flex"}}>
                    <div className="col-sm">
                        <div className="text-muted">
                            Showing <span className="fw-semibold">{totalElements}</span> of <span
                            className="fw-semibold">{numberOfElements}</span> Results
                        </div>
                    </div>

                    <div className="col-sm-auto  mt-3 mt-sm-0">
                        <div className="pagination-wrap hstack gap-2">
                            {(activePage + 1) <= 1 ? (
                                    <Link to="#" className="page-item disabled pagination-prev">Previous</Link>
                                ) :
                                (<Link to="#"
                                       className={(activePage + 1) <= 1 ? "page-item disabled pagination-prev" : "page-item pagination-prev"}
                                       onClick={() => handlePrevPage()}>Previous</Link>)
                            }

                            <ul className="pagination listjs-pagination mb-0">
                                {(pageNumbers || []).map((item: any, key: any) => (
                                    <React.Fragment key={key}>
                                        <li className={(activePage + 1) === item ? "active " : ""}>
                                            <Link className="page" to="#" key={key} id={item}
                                                  onClick={(e) => handleClick(item)}>
                                                {item}
                                            </Link>
                                        </li>

                                    </React.Fragment>
                                ))}
                            </ul>
                            {(activePage + 1) >= pageNumbers.length ? (
                                <Link to="#" className="page-item disabled pagination-next">Next</Link>
                            ) : (
                                <Link to="#"
                                      className={(activePage + 1) >= pageNumbers.length ? "page-item disabled pagination-next" : "page-item pagination-next"}
                                      onClick={() => handleNextPage()}>Next</Link>
                            )}

                        </div>
                    </div>
                </Row>}
        </React.Fragment>
    );
}

export default PaginationFile;