import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import 'react-toastify/dist/ReactToastify.css';
import { DeleteModal } from "Common/DeleteModal";
import {
    getNewsList as onGetNewsList,
    deleteNewsList as onDeleteNewsList
} from "slices/pages/news/thunk";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createSelector } from "reselect";
const url = process.env.REACT_APP_API_URL;

const News = () => {

    document.title = "News list";
    const dispatch = useDispatch<any>();

    const selectNewsList = createSelector(
        (state: any) => state.News,
        (news) => ({
            newsList: news.newsList
        })
    );

    const { newsList } = useSelector(selectNewsList);
    console.log(newsList)



    const [listView, setListView] = useState<any>();
    const [newsLists, setNewsLists] = useState<any>(null);
    const [show, setShow] = useState<boolean>(false);
    const [pagination, setPagination] = useState({ size: 10, page: 0 });
    const [searchData, setSearchData] = useState({
        title: '',
        shortInfo: '',
        url: ''
    });


    //search
    const handleChange = (ele: any) => {
        let search = ele.target.value;
        if (search) {
            setListView(newsList.content?.filter((item: any) => item.title.toLowerCase().includes(search)));
        } else {
            setListView(newsList.content);
        }
    };

    // delete
    const handleDeleteShow = (ele: any) => {
        setShow(true);
        setNewsLists(ele);
    };

    const handleDeleteClose = () => {
        setShow(false);
    }

    //delete modal
    const deleteModalFunction = () => {
        const deleteData = newsLists.row.original.id || {};
        console.log(deleteData);
        if (deleteData) {
            dispatch(onDeleteNewsList(deleteData));
        }
        setShow(false);
    };

    useEffect(() => {
        setListView(newsList.content);
    }, [newsList]);
    useEffect(() => {
        dispatch(onGetNewsList({ searchData, pagination }));
    }, [dispatch]);

    //columns
    const columns = useMemo(
        () => [
            {
                header: (
                    <Form.Check>
                        <Form.Check.Input type="checkbox" value="option" id="checkAll" />
                        <Form.Check.Label htmlFor="checkAll"></Form.Check.Label>
                    </Form.Check>
                ),
                cell: (cell: any) => {
                    return (
                        <Form.Check className="checkbox-product-list">
                            <Form.Check.Input type="checkbox" value="2" id="checkbox-2" />
                            <Form.Check.Label htmlFor="checkbox-2"></Form.Check.Label>
                        </Form.Check>
                    );
                },
                id: "#",
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                header: "№",
                enableColumnFilter: false,
                enableSorting: false,
                cell: (cell: any) => {
                    return (
                        <span>{cell.row.index + 1}</span>
                    )
                }
            },
            {
                header: "News title",
                accessorKey: "title",
                cell: (cell: any) => {
                    return (
                        <div className="d-flex align-items-center">
                            <div className="avatar-lg bg-light rounded p-1 me-2">
                                <img src={url + cell.row.original.image.url} alt={cell.row.original.image.name}
                                    className="img-fluid d-block product-img" style={{ maxHeight: '100%', width: '100%' }} />
                            </div>
                            <div>
                                <h6 className="mb-0">
                                    <Link to={`#`}
                                        className="text-reset text-capitalize product-title">
                                        {cell.row.original.title.length > 50
                                            ? `${cell.row.original.title.slice(0, 50)}...`
                                            : cell.row.original.title}
                                    </Link>
                                </h6>
                            </div>
                        </div>
                    );
                },
                enableColumnFilter: false,
                enableSorting: true
            },
            {
                header: "URL",
                accessorKey: "url",
                cell: (cell: any) => {
                    return (
                        <div>
                            <p>
                                {cell.row.original.url.length > 30
                                    ? `${cell.row.original.url.slice(0, 30)}...`
                                    : cell.row.original.url}
                            </p>
                        </div>
                    )
                },
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Created At",
                accessorKey: "createdAt",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Updated At",
                accessorKey: "updatedAt",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Action",
                enableColumnFilter: false,
                enableSorting: false,
                cell: (cell: any) => {
                    console.log(cell)
                    return (
                        <ul className="d-flex gap-2 list-unstyled mb-0">
                            <li>
                                <Link to={`/create-news?id=${cell.row?.original.id}`} className="btn btn-subtle-secondary btn-icon btn-sm edit-item-btn">
                                    <i className="ph-pencil"></i>
                                </Link>
                            </li>
                            <li className={"mx-2"}>
                                <Link to="#" className="btn btn-subtle-danger btn-icon btn-sm remove-item-btn"
                                    onClick={() => handleDeleteShow(cell)}><i className="ph-trash"></i></Link>
                            </li>
                        </ul>
                    );
                }
            },
        ], []
    );

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <Row id="newsList">
                        <Col lg={12}>
                            <Card>
                                <Card.Header>
                                    <Row className="align-items-center g-2">
                                        <Col lg={3} className="me-auto">
                                            <h6 className="card-title mb-0">News List</h6>
                                        </Col>
                                        <Col xl={2} md={3}>
                                            <div className="search-box">
                                                <Form.Control
                                                    type="text" className="search"
                                                    placeholder="Search news..."
                                                    onChange={(e: any) => handleChange(e)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>
                                        <Col className="col-md-auto">
                                            <div className="hstack gap-2">
                                                <Link to="/create-news" className={"btn btn-secondary"}>
                                                    <i className="bi bi-plus-circle align-baseline me-1"></i> Add
                                                    News
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body className="mt-3">
                                    {
                                        listView && listView.length > 0 ?
                                            <TableContainer
                                                isPagination={true}
                                                columns={columns}
                                                data={listView || []}
                                                customPageSize={10}
                                                divClassName="table-responsive table-card"
                                                tableClass="table table-centered align-middle table-custom-effect table-nowrap mb-0"
                                                theadClass="table-light"
                                                PaginationClassName="align-items-center mt-4 pt-3"
                                                isBordered={false}
                                            />
                                            :
                                            <div id="noresult">
                                                <div className="text-center py-4">
                                                    <div className="avatar-md mx-auto mb-4">
                                                        <div
                                                            className="avatar-title bg-primary-subtle text-primary rounded-circle fs-5xl">
                                                            <i className="bi bi-search"></i>
                                                        </div>
                                                    </div>
                                                    <h5 className="mt-2">Sorry! No Result Found</h5>
                                                </div>
                                            </div>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Container>
            </div>
            <DeleteModal show={show} handleClose={handleDeleteClose} deleteModalFunction={deleteModalFunction} />

            <ToastContainer />
        </React.Fragment>
    );
};

export default News;