import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import 'react-toastify/dist/ReactToastify.css';
import { DeleteModal } from "Common/DeleteModal";
import {
    getMediaCategoryList as onGetMediaCategoryList,
    addMediaCategoryList as onAddMediaCategoryList,
    updateMediaCategoryList as onUpdateMediaCategoryList,
    deleteMediaCategoryList as onDeleteMediaCategoryList
} from "slices/mediaCategory/thunk";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createSelector } from "reselect";
import { useFormik } from "formik";
import * as Yup from "yup";

const MediaCategory = () => {

    document.title = "Media Category list";
    const dispatch = useDispatch<any>();

    const selectMediaCategoryList = createSelector(
        (state: any) => state.MediaCategory,
        (mediaCategory) => ({
            mediaCategoryList: mediaCategory.mediaCategoryList
        })
    );

    const { mediaCategoryList } = useSelector(selectMediaCategoryList);
    console.log(mediaCategoryList);

    useEffect(() => {
        dispatch(onGetMediaCategoryList());
    }, [dispatch]);

    const [listView, setListView] = useState<any>();
    const [mediaCategoryLists, setMediaCategoryLists] = useState<any>(null);
    const [addMediaCategory, setAddMediaCategory] = useState<boolean>(false);
    const [editMediaCategory, setEditMediaCategory] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [edit, setEdit] = useState<any>();
    //add
    const handleCloseMediaCategory = () => {
        setAddMediaCategory(false);
    }
    const handleShowMediaCategory = () => setAddMediaCategory(true);
    //edit
    const handleEdit = useCallback((item: any) => {
        const lastItem = item.row.original
        setAddMediaCategory(true);
        setEditMediaCategory(true);
        setEdit({
            id: lastItem.id,
            name: lastItem.name,
            description: lastItem.description
        });

    }, []);

    //search
    const handleChange = (ele: any) => {
        let search = ele.target.value;
        if (search) {
            setListView(mediaCategoryList.content?.filter((item: any) => item.name.toLowerCase().includes(search)));
        } else {
            setListView(mediaCategoryList.content);
        }
    };

    // delete
    const handleDeleteShow = (ele: any) => {
        setShow(true);
        setMediaCategoryLists(ele);
    };

    const handleDeleteClose = () => {
        setShow(false);
    }

    //delete modal
    const deleteModalFunction = () => {
        const deleteData = mediaCategoryLists.row.original.id || {};
        if (deleteData) {
            dispatch(onDeleteMediaCategoryList(deleteData));
        }
        setShow(false);
    };

    useEffect(() => {
        setListView(mediaCategoryList.content);
    }, [mediaCategoryList]);


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
                header: "Name",
                accessorKey: "name",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Description",
                accessorKey: "description",
                enableColumnFilter: false,
                enableSorting: true,
            },
            // {
            //     header: "Created At",
            //     accessorKey: "createdAt",
            //     enableColumnFilter: false,
            //     enableSorting: true,
            // },
            // {
            //     header: "Updated At",
            //     accessorKey: "updatedAt",
            //     enableColumnFilter: false,
            //     enableSorting: true,
            // },
            {
                header: "Action",
                enableColumnFilter: false,
                enableSorting: false,
                cell: (cell: any) => {
                    return (
                        <ul className="d-flex gap-2 list-unstyled mb-0">
                            <li>
                                <Link to="#" className="btn btn-subtle-secondary btn-icon btn-sm edit-item-btn"
                                    onClick={() => handleEdit(cell)}><i className="ph-pencil"></i></Link>
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

    // validation
    const formik: any = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: (edit && edit.name) || '',
            description: (edit && edit.description) || '',
            id: edit && edit.id,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            description: Yup.string().required("Please Enter Description"),
        }),

        onSubmit: (values: any) => {

            if (editMediaCategory) {
                const data: any = {
                    name: values.name,
                    description: values.description,
                    id: values.id
                }
                dispatch(onUpdateMediaCategoryList({ updateFormData: data, id: values.id }));
                formik.resetForm();
            } else {
                const data: any = {
                    name: values.name,
                    description: values.description
                }

                dispatch(onAddMediaCategoryList(data));
                formik.resetForm();
            }
            if (values === null) {
                handleShowMediaCategory();
            } else {
                setEdit(null);
                setEditMediaCategory(false);
                handleCloseMediaCategory();
            }
        }
    });

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row id="MediaCategoryList">
                        <Col lg={12}>
                            <Card>
                                <Card.Header>
                                    <Row className="align-items-center g-2">
                                        <Col lg={3} className="me-auto">
                                            <h6 className="card-title mb-0">Media Category List</h6>
                                        </Col>
                                        <Col xl={2} md={3}>
                                            <div className="search-box">
                                                <Form.Control
                                                    type="text" className="search"
                                                    placeholder="Search media category..."
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
                                                <Button variant="secondary" onClick={handleShowMediaCategory}>
                                                    <i className="bi bi-plus-circle align-baseline me-1"></i> Add
                                                    Media Category
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

            <Modal show={addMediaCategory} onHide={handleCloseMediaCategory}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMediaCategory ? "Update MediaCategory List" : "Add Media Category"}</Modal.Title>
                </Modal.Header>
                <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <Modal.Body>

                        <div className="mb-3">
                            <Form.Label htmlFor="Customer-Name-input">Media Category Name<span
                                className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                id="Customer-Name-input"
                                name="name"
                                placeholder="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.name}
                            />
                            {formik.errors.mediaCategory && formik.touched.name ? (
                                <Form.Control.Feedback
                                    type="invalid">{formik.errors.name}</Form.Control.Feedback>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <Form.Label htmlFor="Customer-Name-input">Media Category Description<span
                                className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                id="Customer-Name-input"
                                name="description"
                                placeholder="Description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.description}
                            />
                            {formik.errors.mediaCategory && formik.touched.description ? (
                                <Form.Control.Feedback
                                    type="invalid">{formik.errors.description}</Form.Control.Feedback>
                            ) : null}
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="btn btn-ghost-danger" onClick={handleCloseMediaCategory}>
                            <i className="bi bi-x-lg align-baseline me-1"></i> Close
                        </Button>
                        <Button type="submit" variant="primary"
                            id="add-btn">{editMediaCategory ? "Update" : "Add Media Category"}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <ToastContainer />
        </React.Fragment>
    );
};

export default MediaCategory;