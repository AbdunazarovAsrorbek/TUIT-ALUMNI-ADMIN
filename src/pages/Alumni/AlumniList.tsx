import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import 'react-toastify/dist/ReactToastify.css';
import { DeleteModal } from "Common/DeleteModal";
import {
    getAlumniList as onGetAlumniList,
    deleteAlumniList as onDeleteAlumniList
} from "slices/alumni/thunk";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const url = process.env.REACT_APP_API_URL;

const AlumniList = () => {
    document.title = "Alumni list";
    const dispatch = useDispatch<any>();
    const selectAlumniList = (state: any) => state.Alumni;
    const { alumniList } = useSelector(selectAlumniList);

    useEffect(() => {
        const alumniData = {
            firstName: null,
            lastName: null,
            patronymic: null,
            username: null,
            phoneNumber: null,
            email: null,
            facultyId: null,
            graduationYear: null
        }
        const page = {
            size: 100,
            page: 0
        }

        dispatch(onGetAlumniList({ alumniData, page }));
    }, [dispatch]);

    console.log(alumniList)
    const [listView, setListView] = useState<any>();
    const [alumniLists, setAlumniLists] = useState<any>(null);
    const [show, setShow] = useState<boolean>(false);

    //search
    const handleChange = (ele: any) => {
        let search = ele.target.value;
        if (search) {
            setListView(alumniList.content?.filter((item: any) => item.name.toLowerCase().includes(search)));
        } else {
            setListView(alumniList.content);
        }
    };

    // delete
    const handleDeleteShow = (ele: any) => {
        setShow(true);
        setAlumniLists(ele);
    };

    const handleDeleteClose = () => {
        setShow(false);
    }

    //delete modal
    const deleteModalFunction = () => {
        const deleteData = alumniLists.row.original.id || {};
        console.log(deleteData);
        if (deleteData) {
            dispatch(onDeleteAlumniList(deleteData));
        }
        setShow(false);
    };

    useEffect(() => {
        setListView(alumniList?.content);
    }, [alumniList]);

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
                                        {`${cell.row.original.firstName} ${cell.row.original.lastName} ${cell.row.original.patronymic}`.length > 20
                                            ? `${`${cell.row.original.firstName} ${cell.row.original.lastName} ${cell.row.original.patronymic}`.slice(0, 20)}...`
                                            : `${cell.row.original.firstName} ${cell.row.original.lastName} ${cell.row.original.patronymic}`}
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
                header: "Graduation Year",
                accessorKey: "graduationYear",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Faculty",
                accessorKey: "faculty",
                enableColumnFilter: false,
                enableSorting: true,
                cell: ({ row }) => {
                    const text = row.original.faculty || "";
                    return text.length > 20 ? `${text.slice(0, 20)}...` : text;
                }
            },
            {
                header: "Email",
                accessorKey: "email",
                enableColumnFilter: false,
                enableSorting: true,
                cell: ({ row }) => {
                    const text = row.original.email || "";
                    return text.length > 25 ? `${text.slice(0, 25)}...` : text;
                }
            },
            {
                header: "Current Company",
                accessorKey: "currentCompany",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Position",
                accessorKey: "position",
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

                    <Row id="alumniList">
                        <Col lg={12}>
                            <Card>
                                <Card.Header>
                                    <Row className="align-items-center g-2">
                                        <Col lg={3} className="me-auto">
                                            <h6 className="card-title mb-0">Alumni List</h6>
                                        </Col>
                                        <Col xl={2} md={3}>
                                            <div className="search-box">
                                                <Form.Control
                                                    type="text" className="search"
                                                    placeholder="Search alumni..."
                                                    onChange={(e: any) => handleChange(e)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>
                                        <Col className="col-md-auto">
                                            <div className="hstack gap-2">
                                                <Button className="btn btn-subtle-danger d-none" id="remove-actions">
                                                    <i className="ri-delete-bin-2-line"></i>
                                                </Button>

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
export default AlumniList;