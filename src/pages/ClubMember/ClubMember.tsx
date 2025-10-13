import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import 'react-toastify/dist/ReactToastify.css';
import { DeleteModal } from "Common/DeleteModal";
import {
    getClubMemberList as onGetMemberList,
    createClubMemberList as onCreateMemberList,
    updateClubMemberList as onUpdateClubMemberList,
    deleteClubMemberList as onDeleteClubMemberList
} from "slices/thunk";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { createSelector } from "reselect";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormValues {
    fullName: string;
    position: string;
    id?: number;
}

interface FileEdit {
    url: string;
    size?: number;
    imageName?: string;
}

const url = process.env.REACT_APP_API_URL;


const ClubMember = () => {
    document.title = "Member list";
    const dispatch = useDispatch<any>();

    const selectClubMember = createSelector(
        (state: any) => state.ClubMember,
        (clubMemberList) => clubMemberList.clubMember?.content || []
    );

    const ClubMember = useSelector(selectClubMember);
    console.log(ClubMember);


    useEffect(() => {
        dispatch(onGetMemberList());
    }, [dispatch]);

    const [listView, setListView] = useState<any[]>([]);
    const [MemberLists, setMemberLists] = useState<any>(null);
    const [addMember, setAddMember] = useState<boolean>(false);
    const [editMember, setEditMember] = useState<boolean>(false);
    const [editFile, setEditFile] = useState<FileEdit | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const [edit, setEdit] = useState<any>();
    const [file, setFile] = useState<File | null>(null);

    const handleCloseMember = () => {
        setAddMember(false);
        setEdit(null);
        setEditMember(false);
        setFile(null);
        formik.resetForm();
    };

    const handleShowMember = () => setAddMember(true);

    const handleEdit = useCallback((item: any) => {
        const lastItem = item.row.original;
        console.log("lastItem", lastItem);

        setAddMember(true);
        setEditMember(true);
        setEdit({
            id: lastItem.id,
            fullName: lastItem.fullName,
            position: lastItem.position,
        });

        // Eski file ni editFile state ga yozamiz
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
            setListView(ClubMember.filter((item: any) =>
                item.fullName.toLowerCase().includes(search)
            ));
        } else {
            setListView(ClubMember);
        }
    };

    const handleDeleteShow = (ele: any) => {
        setShow(true);
        setMemberLists(ele);
    };

    const handleDeleteClose = () => setShow(false);

    const deleteModalFunction = () => {
        const deleteData = MemberLists?.row?.original?.id;
        if (deleteData) {
            dispatch(onDeleteClubMemberList(deleteData));
        }
        setShow(false);
    };
    useEffect(() => {
        setListView(ClubMember);
    }, [ClubMember]);


    const formik = useFormik<FormValues>({
        enableReinitialize: true,
        initialValues: {
            fullName: edit?.fullName || '',
            position: edit?.position || '',
            id: edit?.id
        },

        validationSchema: Yup.object({
            fullName: Yup.string().required("Please enter full name"),
            position: Yup.string().required("Please enter position"),
        }),

        onSubmit: async (values) => {
            if (!file && !editMember) {
                toast.error("Please upload an image");
                return;
            }

            const clubMemberCreateDto = {
                fullName: values.fullName,
                position: values.position,
            };

            const clubMemberUpdateDto = {
                fullName: values.fullName,
                position: values.position
            };

            const formData = new FormData();;

            if (editMember) {
                formData.append("clubMemberUpdateDto", new Blob(
                    [JSON.stringify(clubMemberUpdateDto)],
                    { type: "application/json" }
                ));
            } else {
                formData.append("clubMemberCreateDto", new Blob(
                    [JSON.stringify(clubMemberCreateDto)],
                    { type: "application/json" }
                ));
            }


            if (file) {
                formData.append("image", file);
            }

            if (editMember) {
                await dispatch(onUpdateClubMemberList({
                    id: values.id,
                    updateFormData: formData,
                    updatedValues: {
                        fullName: values.fullName,
                        position: values.position
                    }
                }));
            
                dispatch(onGetMemberList());
            } else {
                await dispatch(onCreateMemberList(formData));
                dispatch(onGetMemberList());
            }
            formik.resetForm();
            setFile(null);
            setEdit(null);
            setEditMember(false);
            setEditFile(null); 
            handleCloseMember();
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
                header: "Full Name",
                accessorKey: "fullName",
                enableColumnFilter: false,
                enableSorting: true,
                cell: ({ row }: any) => {
                  const text = row.original.fullName || "";
                  return (
                    <span title={text}>
                      {text.length > 25 ? `${text.slice(0, 25)}...` : text}
                    </span>
                  );
                }
              },
              {
                header: "Position",
                accessorKey: "position",
                enableColumnFilter: false,
                enableSorting: true,
                cell: ({ row }: any) => {
                  const text = row.original.position || "";
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
                                            <h6 className="card-title mb-0">Member List</h6>
                                        </Col>
                                        <Col xl={2} md={3}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Search member..."
                                                onChange={handleChange}
                                            />
                                        </Col>
                                        <Col className="col-md-auto">
                                            <Button variant="secondary" onClick={handleShowMember}>
                                                <i className="bi bi-plus-circle me-1"></i> Add Member
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

            <Modal show={addMember} onHide={handleCloseMember} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editMember ? "Update Member" : "Add Member"}</Modal.Title>
                </Modal.Header>
                <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.fullName && !!formik.errors.fullName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.fullName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type="text"
                                name="position"
                                placeholder="Position"
                                value={formik.values.position}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.position && !!formik.errors.position}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.position}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>

                            {/* Agar eski rasm bo‘lsa */}
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

                            {/* Agar yangi fayl yuklansa */}
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const target = e.target as HTMLInputElement;
                                    if (target.files && target.files.length > 0) {
                                        setFile(target.files[0]);
                                        setEditFile(null); // eski rasmni almashtiramiz
                                    }
                                }}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseMember}>Close</Button>
                        <Button type="submit" variant="primary">{editMember ? "Update" : "Add Member"}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <ToastContainer />
        </React.Fragment>
    );
};

export default ClubMember;




