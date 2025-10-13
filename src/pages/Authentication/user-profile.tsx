import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import withRouter from "Common/withRouter";
import Breadcrumb from "Common/BreadCrumb";
import { getAdminById as onGetAdminById } from "slices/thunk";

// import avatar from "../../assets/images/users/avatar-1.jpg";

const UserProfile = () => {
    document.title = "Admin Profile";

    const dispatch = useDispatch<any>();

    const admin = useSelector((state: any) => state.Admin.getAdminByIdList);

    useEffect(() => {
        dispatch(onGetAdminById());

    }, [dispatch]);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: admin?.firstName || "",
            lastName: admin?.lastName || "",
            patronymic: admin?.patronymic || "",
            username: admin?.username || "",
            email: admin?.email || "",
            phoneNumber: admin?.phoneNumber || "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First name required"),
            lastName: Yup.string().required("Last name required"),
            patronymic: Yup.string().required("Patronymic required"),
            username: Yup.string().required("Username required"),
            email: Yup.string().nullable(),
            phoneNumber: Yup.string().nullable(),
        }),
        onSubmit: (values) => {
            console.log("Updated values:", values);
            // bu yerda dispatch(updateAdmin(values)) qilasiz
        },
    });

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Breadcrumb */}
                    <Breadcrumb title="Steex" pageTitle="Accounts" />

                    <Row>
                        <Col lg="12">
                            <Card>
                                <Card.Body>
                                    <div className="d-flex">
                                        <div style={{ width: 65, height: 65, borderRadius: "50%", background: "#CCC", marginRight: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}>

                                            <h6 style={{ fontSize: 25, padding: 0, margin: 0 }}>
                                                {admin?.lastName?.[0]}.{admin?.firstName?.[0]}
                                            </h6>
                                            {/* <img
                                                src={avatar}
                                                alt=""
                                                className="avatar-md rounded-circle img-thumbnail"
                                            /> */}
                                        </div>
                                        <div className="flex-grow-1 align-self-center">
                                            <div className="text-muted">
                                                {/* Ism Familiya Patronymic yonma-yon */}
                                                <h5>
                                                    Full Name: <span style={{color:"#777"}}>{admin?.firstName} {admin?.lastName} {admin?.patronymic}</span>
                                                </h5>
                                                {/* Username va Role */}
                                                <p className="mb-1"><span style={{ color: "#000", fontWeight: 550 }}>Username:</span> {admin?.username}</p>
                                                <p className="mb-0"><span style={{ color: "#000", fontWeight: 550 }}>Role:</span> {admin?.roles}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <h4 className="card-title mb-4">Edit Profile</h4>

                    <Card>
                        <Card.Body>
                            <Form
                                className="form-horizontal"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}
                            >
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                value={validation.values.firstName}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                isInvalid={
                                                    validation.touched.firstName &&
                                                    !!validation.errors.firstName
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {validation.errors.firstName as string}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={validation.values.lastName}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                isInvalid={
                                                    validation.touched.lastName &&
                                                    !!validation.errors.lastName
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {validation.errors.lastName as string}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Patronymic</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="patronymic"
                                                value={validation.values.patronymic}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                isInvalid={
                                                    validation.touched.patronymic &&
                                                    !!validation.errors.patronymic
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {validation.errors.patronymic as string}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                value={validation.values.username}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                isInvalid={
                                                    validation.touched.username &&
                                                    !!validation.errors.username
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {validation.errors.username as string}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={validation.values.email}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="phoneNumber"
                                                value={validation.values.phoneNumber}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="text-center mt-4">
                                    <Button type="submit" variant="danger">
                                        Update Profile
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withRouter(UserProfile);
