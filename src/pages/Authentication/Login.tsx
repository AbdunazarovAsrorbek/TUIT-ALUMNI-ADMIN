import React, { useEffect, useState } from 'react';
import { Card, Col, Button, Form, Alert, Spinner } from 'react-bootstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import { useSelector, useDispatch } from "react-redux";
import withRouter from 'Common/withRouter';

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, resetLoginFlag } from "../../slices/thunk";
import { createSelector } from 'reselect';

//import images

const Signin = (props: any) => {
    const dispatch: any = useDispatch();

    const selectAccountAndLogin = createSelector(
        (state: any) => state.Account,
        (state: any) => state.Login,
        (account, login) => ({
            error: login.error,
            loading: login.loading,
            errorMsg: login.errorMsg,
        })
    );

    const { error, loading, errorMsg } = useSelector(selectAccountAndLogin);
    const [userLogin, setUserLogin] = useState<any>([]);
    const [passwordShow, setPasswordShow] = useState<boolean>(false);


    const validation: any = useFormik({
        enableReinitialize: true,

        initialValues: {
            email: userLogin.email || '',
            password: userLogin.password || '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Your Email"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values, props.router.navigate));
        }
    });

    useEffect(() => {
        if (errorMsg) {
            setTimeout(() => {
                dispatch(resetLoginFlag());
            }, 3000);
        }
    }, [dispatch, errorMsg]);

    document.title = "Alumni - TUIT";
    return (
        <ParticlesAuth>
            <React.Fragment>
                <Col xxl="6" className="mx-auto">
                    <Card className="mb-0 border-0 shadow-none mb-0">
                        <Card.Body className="p-sm-5 m-lg-4">
                            <div className="text-center mt-5">
                                <h5 className="fs-3xl">Hush kelibsiz</h5>
                                <p className="text-muted">Bitiruvchilar uyushmasi admin paneliga kirish.</p>
                            </div>
                            <div className="p-2 mt-5">
                                {error && error ? (<Alert variant="danger"> {error} </Alert>) : null}

                                <Form action="#" onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}>

                                    <Form.Group className="mb-3" controlId="formUsername">
                                        <Form.Label>Username <span className="text-danger">*</span></Form.Label>
                                        <div className="position-relative">
                                            <Form.Control
                                                type="text"
                                                name="email"
                                                className="form-control password-input"
                                                placeholder="Enter username"
                                                required
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.email || ""}
                                                isInvalid={
                                                    validation.touched.email && validation.errors.email ? true : false
                                                }
                                            />
                                        </div>
                                        {validation.touched.email && validation.errors.email ? (
                                            <Form.Control.Feedback type="invalid">
                                                {validation.errors.email}
                                            </Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPassword">

                                        <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                            <Form.Control
                                                type={passwordShow ? "text" : "password"}
                                                className="form-control pe-5 password-input "
                                                placeholder="Enter password" required
                                                name="password"
                                                value={validation.values.password || ""}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                isInvalid={
                                                    validation.touched.password && validation.errors.password ? true : false
                                                }
                                            />
                                            {validation.touched.password && validation.errors.password ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {validation.errors.password}
                                                </Form.Control.Feedback>
                                            ) : null}
                                            <Button
                                                variant="link"
                                                className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                type="button" id="password-addon"
                                                onClick={() => setPasswordShow(!passwordShow)}>
                                                <i className="ri-eye-fill align-middle"></i>
                                            </Button>
                                        </div>
                                    </Form.Group>

                                    <Form.Group controlId="formRememberMe">
                                        <Form.Check type="checkbox" label="Remember me" id="auth-remember-check" />
                                    </Form.Group>

                                    <div className="mt-4">
                                        <Button
                                            className="btn btn-primary w-100"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading && <Spinner size='sm' />} {" "} Kirish
                                        </Button>
                                    </div>

                                </Form>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </React.Fragment>
        </ParticlesAuth>
    );
};

export default withRouter(Signin);