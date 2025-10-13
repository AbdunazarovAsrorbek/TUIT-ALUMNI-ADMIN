import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import 'react-toastify/dist/ReactToastify.css';
import {
    getNotification as onGetNotification,
    acceptRequest as onAcceptRequest,
    rejectRequest as onRejectRequest,
} from "slices/notification/thunk";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createSelector } from "reselect";

const url = process.env.REACT_APP_API_URL;

const Notification = () => {

    document.title = "Notification list";
    const dispatch = useDispatch<any>();

    const selectNotification = createSelector(
        (state: any) => state.Notification,
        (notification) => ({
            notification: notification.notification
        })
    );
    const { notification } = useSelector(selectNotification);

    console.log("notification", notification)

    useEffect(() => {
        const data = {
            name: "",
            status: null
        }
        dispatch(onGetNotification(data));
    }, [dispatch]);

    const [listView, setListView] = useState<any>();
    const [addNotification, setAddNotification] = useState<boolean>(false);
    const [activeButton, setActiveButton] = useState("pending");
    const [userData, setUserData] = useState(
        {
            id: 1,
            firstName: "",
            lastName: "",
            patronymic: "",
            imageUrl: null,
            faculty: "",
            currentCompany: "",
            position: "",
            phoneNumber: "",
            email: "",
            status: "",
            createdAt: "",
        }
    );

    //add
    const handleCloseNotification = () => {
        console.log("yopildi");

        setAddNotification(false);
    }
    const handleShowNotification = () => setAddNotification(true);



    //search
    const handleChange = (ele: any) => {
        let search = ele.target.value;
        if (search) {
            setListView(listView?.filter((item: any) => {
                const fullName = `${item.firstName} ${item.lastName} ${item.patronymic}`;
                return fullName.toLowerCase().includes(search.toLowerCase());
            }));

        } else {
            setListView(notification.content?.filter((item: any) => item.status?.toLowerCase().includes(activeButton)));
        }
    };
    const handleSort = (ele: any) => {
        let search = ele.target.value;
        setActiveButton(ele.target.value);
        if (search) {
            setListView(notification.content?.filter((item: any) => item.status?.toLowerCase().includes(search)));
        } else {
            setListView(notification.content);
        }
    };

    // Accept
    const handleAccept = async (item: any) => {
        await dispatch(onAcceptRequest(item.id));
        dispatch(onGetNotification({ name: "", status: null }));
    };
    //Reject
    const handleReject = async (item: any) => {
        await dispatch(onRejectRequest(item.id));
        dispatch(onGetNotification({ name: "", status: null }));
    };


    useEffect(() => {
        setListView(notification.content?.filter((item: any) => item.status?.toLowerCase().includes("pending")));
    }, [notification]);

    const handleShow = (data: any) => {
        handleShowNotification();
        setUserData(data)
    }

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
                header: "Student",
                accessorKey: "title",
                cell: (cell: any) => {
                    return (
                        <div className="d-flex align-items-center">
                            <div className="avatar-md bg-light rounded p-1 me-2">
                                {cell.row.original.imageUrl ? (
                                    <img src={url + cell.row.original.imageUrl} alt={cell.row.original.imgalt}
                                        className="img-fluid d-block user_img-d" />
                                ) : (
                                    <div className={"user_img-box"}>
                                        <p>{cell.row.original.firstName.charAt(0)}.{cell.row.original.lastName.charAt(0)}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h6 className="mb-0">
                                    <Link to={"#"}
                                        className="text-reset text-capitalize product-title">
                                        {cell.row.original.firstName} {cell.row.original.lastName} {cell.row.original.patronymic}
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
                header: "Faculty",
                accessorKey: "faculty",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Email",
                accessorKey: "email",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Status",
                accessorKey: "status",
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
                    return (
                        <ul className="d-flex gap-2 list-unstyled mb-0">
                            <li>
                                <Link to="#" className="btn btn-subtle-primary btn-icon btn-sm"
                                    onClick={() => handleShow(cell.row.original)}>
                                    <i className="ph-eye"></i></Link>
                            </li>
                            {cell.row.original.status?.toLowerCase() === "pending" && (
                                <>
                                    <li>
                                        <Link to="#" className="btn btn-subtle-secondary btn-icon btn-sm edit-item-btn"
                                            onClick={() => handleReject(cell.row.original)}>
                                            <i className="ph-x-thin"></i>

                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="btn btn-subtle-danger btn-icon btn-sm remove-item-btn"
                                            onClick={() => handleAccept(cell.row.original)}>
                                            <i className="ph-check-thin"></i>
                                        </Link>
                                    </li>
                                </>
                            )}
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

                    <Row id="notification">
                        <Col lg={12}>
                            <Card>
                                <Card.Header>
                                    <Row className="align-items-center g-2">
                                        <Col lg={3} className="me-auto">
                                            <h6 className="card-title mb-0">Notification List</h6>
                                        </Col>
                                        <Col className="col-md-auto">
                                            <Form.Select className="search" onChange={(e) => handleSort(e)}>
                                                <option value="pending">Pending</option>
                                                <option value="accepted">Accept</option>
                                                <option value="rejected">Reject</option>
                                            </Form.Select>
                                        </Col>

                                        <Col xl={2} md={3}>
                                            <div className="search-box">
                                                <Form.Control
                                                    type="text" className="search"
                                                    placeholder="Search notification..."
                                                    onChange={(e: any) => handleChange(e)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
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

            <Modal show={addNotification} onHide={handleCloseNotification} centered>
                <Modal.Header>
                    <Modal.Title>Bitiruvchi ma'lumoti:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="g-5">
                        <Col lg={3}>
                            <div className="avatar-xl bg-light rounded p-1 me-2">
                                {userData.imageUrl ? (
                                    <img src={`${url}${userData.imageUrl}`} alt="img"
                                        className="img-fluid d-block user_img-d" />
                                ) : (
                                    <div className="user_img-box">
                                        <p>{userData.firstName.charAt(0)}.{userData.lastName.charAt(0)}</p>
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col lg={9}>
                            <p className="m-0"><span className="fw-bold">Full Name:</span> {userData.firstName} {userData.lastName} {userData.patronymic}</p>
                            <p className="m-0"><span className="fw-bold">Email:</span> {userData.email}</p>
                            <p className="m-0"><span className="fw-bold">Current Company:</span> {userData.currentCompany}</p>
                            <p className="m-0"><span className="fw-bold">Faculty:</span> {userData.faculty}</p>
                            <p className="m-0"><span className="fw-bold">Tel:</span> {userData.phoneNumber}</p>
                            <p className="m-0"><span className="fw-bold">Position:</span> {userData.position}</p>
                            <p className="m-0"><span className="fw-bold">Status:</span> {userData.status}</p>
                            <p className="m-0"><span className="fw-bold">Created At:</span> {userData.createdAt}</p>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseNotification} style={{ display: "flex", alignItems: "center", justifyContent: "center" ,gap:7}}>
                        <i className="ph-x-bold"></i> Yopish
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </React.Fragment>
    );
};

export default Notification;