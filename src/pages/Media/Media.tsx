import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import 'react-toastify/dist/ReactToastify.css';
import { DeleteModal } from "Common/DeleteModal";
import {
    getMediaList as onGetMediaList,
    addMediaList as onCreateMediaList,
    updateMediaList as onUpdateMediaList,
    deleteMediaList as onDeleteMediaList
} from "slices/media/thunk";
import {
    getMediaCategoryList as onGetMediaCategoryList,
} from "slices/mediaCategory/thunk";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { createSelector } from "reselect";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormValues {
    title: string;
    mediaCategoryId?: number;
}

interface FileEdit {
    url: string;
    size?: number;
    imageName?: string;
}

const url = process.env.REACT_APP_API_URL;


const Media = () => {
    document.title = "Media list";
    const dispatch = useDispatch<any>();

    const selectMediaContent = createSelector(
        (state: any) => state.Media.mediaList,
        (mediaList) => mediaList.content || []
    );

    const selectMediaCategoryContent = createSelector(
        (state: any) => state.MediaCategory.mediaCategoryList,
        (mediaCategoryList) => mediaCategoryList.content || []
    );

    const media = useSelector(selectMediaContent);
    console.log(media);

    const mediaCategory = useSelector(selectMediaCategoryContent)
    console.log(mediaCategory);


    useEffect(() => {
        dispatch(onGetMediaList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(onGetMediaCategoryList())
    }, [dispatch])




    const [listView, setListView] = useState<any[]>([]);
    const [mediaLists, setMediaLists] = useState<any>(null);
    const [addMedia, setAddMedia] = useState<boolean>(false);
    const [editMedia, setEditMedia] = useState<boolean>(false);
    const [editFile, setEditFile] = useState<FileEdit | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const [edit, setEdit] = useState<any>();
    const [file, setFile] = useState<File | null>(null);

    const handleCloseMedia = () => {
        setAddMedia(false);
        setEdit(null);
        setEditMedia(false);
        setFile(null);
        formik.resetForm();
    };

    const handleShowMedia = () => setAddMedia(true);

    const handleEdit = useCallback((item: any) => {
        const lastItem = item.row.original;

        setAddMedia(true);
        setEditMedia(true);
        setEdit({
            id: lastItem.id,
            mediaCategoryId: lastItem.categoryId,
            title: lastItem.title,
            imageUrl: lastItem.imageUrl
        });
        if (lastItem.imageUrl) {
            setEditFile({
                url: url + lastItem.imageUrl,
                imageName: lastItem.imageName || lastItem.imageUrl.split("/").pop(),
                size: lastItem.imageSize || null
            });
        }
    }, []);

    const handleChange = (ele: any) => {
        let search = ele.target.value.toLowerCase();
        if (search) {
            setListView(media.filter((item: any) =>
                item.fullName.toLowerCase().includes(search)
            ));
        } else {
            setListView(media);
        }
    };

    const handleDeleteShow = (ele: any) => {
        setShow(true);
        setMediaLists(ele);
    };

    const handleDeleteClose = () => setShow(false);

    const deleteModalFunction = () => {
        const deleteData = mediaLists?.row?.original?.id;
        if (deleteData) {
            dispatch(onDeleteMediaList(deleteData));
        }
        setShow(false);
    };

    useEffect(() => {
        setListView(media);
    }, [media]);


    const formik = useFormik<FormValues>({
        enableReinitialize: true,
        initialValues: {
            title: edit?.title || '',
            mediaCategoryId: edit?.mediaCategoryId
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please enter Title"),
            mediaCategoryId: Yup.number()
                .required("Please select a Media Category")
                .typeError("Please select a Media Category")
        }),

        onSubmit: async (values) => {
            if (!file && !editMedia) {
                toast.error("Please upload an image");
                return;
            }

            const mediaCreateDto = {
                title: values.title,
                mediaCategoryId: values.mediaCategoryId
            };

            const mediaUpdateDto = {
                title: values.title,
                mediaCategoryId: values.mediaCategoryId
            };

            const formData = new FormData();;
            if (editMedia) {
                formData.append("mediaUpdateDto", new Blob(
                    [JSON.stringify(mediaUpdateDto)],
                    { type: "application/json" }
                ));

                if (file) {
                    formData.append("image", file);
                } else if (!editFile) {
                    // eski rasm o‘chirildi va yangi rasm yuklanmadi
                    formData.append("deleteOldImage", "true");
                }

                dispatch(onUpdateMediaList({
                    id: edit.id,
                    updateFormData: formData,
                    updatedValues: {
                        title: values.title,
                        mediaCategoryId: values.mediaCategoryId,
                        imageUrl: file ? URL.createObjectURL(file) : editFile?.url || ""
                    }
                }));
            }
            else {
                formData.append("mediaCreateDto", new Blob(
                    [JSON.stringify(mediaCreateDto)],
                    { type: "application/json" }
                ));
                formData.append("image", file!);
                dispatch(onCreateMediaList(formData));
            }

            formik.resetForm();
            setFile(null);
            setEdit(null);
            setEditMedia(false);
            handleCloseMedia();
        }
    });

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
                header: "Image",
                enableColumnFilter: false,
                enableSorting: false,
                cell: (cell: any) => {
                    const imageUrl = cell.row.original?.imageUrl;
                    return (
                        <img
                            src={file ? URL.createObjectURL(file) : (url + imageUrl)}
                            alt="preview"
                            style={{ width: 60, height: 60, borderRadius: 2.5 }}
                        />
                    );
                }
            },
     {
    header: "Title",
    accessorKey: "title",
    enableColumnFilter: false,
    enableSorting: true,
    cell: ({ row }: any) => {
        const text = row.original.title || "";
        return (
            <span title={text}>
                {text.length > 25 ? `${text.slice(0, 25)}...` : text}
            </span>
        );
    }
},
{
    header: "Media Category",
    accessorKey: "categoryName",
    enableColumnFilter: false,
    enableSorting: true,
    cell: ({ row }: any) => {
        const text = row.original.categoryName || "";
        return (
            <span title={text}>
                {text.length > 20 ? `${text.slice(0, 20)}...` : text}
            </span>
        );
    }
},
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


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row id="facultyList">
                        <Col lg={12}>
                            <Card>
                                <Card.Header>
                                    <Row className="align-items-center g-2">
                                        <Col lg={3} className="me-auto">
                                            <h6 className="card-title mb-0">Media List</h6>
                                        </Col>
                                        <Col xl={2} md={3}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Search Media..."
                                                onChange={handleChange}
                                            />
                                        </Col>
                                        <Col className="col-md-auto">
                                            <Button variant="secondary" onClick={handleShowMedia}>
                                                <i className="bi bi-plus-circle me-1"></i> Add Media
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    {listView?.length ? (
                                        <TableContainer
                                            isPagination
                                            columns={columns}
                                            data={listView}
                                            customPageSize={10}
                                            divClassName="table-responsive"
                                            tableClass="table table-centered align-middle"
                                            theadClass="table-light"
                                            PaginationClassName="align-items-center mt-4 pt-3"
                                        />
                                    ) : (
                                        <div className="text-center py-4">
                                            <h5>No results found</h5>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <DeleteModal show={show} handleClose={handleDeleteClose} deleteModalFunction={deleteModalFunction} />

            <Modal show={addMedia} onHide={handleCloseMedia} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editMedia ? "Update Media" : "Add Media"}</Modal.Title>
                </Modal.Header>
                <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.title && !!formik.errors.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Media Category</Form.Label>
                            <Form.Select
                                name="mediaCategoryId"
                                value={formik.values.mediaCategoryId || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.mediaCategoryId && !!formik.errors.mediaCategoryId}
                            >
                                <option value="">Category...</option>
                                {Array.isArray(mediaCategory) && mediaCategory.length > 0 ? (
                                    mediaCategory.map((cat: any) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Loading...</option>
                                )}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.mediaCategoryId}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>

                            {editFile && !file && (
                                <div className="d-flex align-items-center mb-2">
                                    <img
                                        src={editFile.url}
                                        alt="old"
                                        style={{ width: 60, height: 60, borderRadius: 2.5, marginRight: 10 }}
                                    />
                                    <div className="flex-grow-1">
                                        <div>{editFile.imageName}</div>
                                        {editFile.size && (
                                            <div className="text-muted" style={{ fontSize: 12 }}>
                                                {(editFile.size / 1024).toFixed(1)} KB
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => setEditFile(null)}
                                    >
                                        <i className="ph-trash"></i>
                                    </Button>
                                </div>
                            )}

                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const target = e.target as HTMLInputElement;
                                    if (target.files && target.files.length > 0) {
                                        setFile(target.files[0]);
                                        setEditFile(null); 
                                    }
                                }}
                            />

                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseMedia}>Close</Button>
                        <Button type="submit" variant="primary">{editMedia ? "Update" : "Add Media"}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <ToastContainer />
        </React.Fragment>
    );
};

export default Media;




