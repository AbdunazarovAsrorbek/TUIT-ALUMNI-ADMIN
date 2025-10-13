import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { FormikErrors, useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import Dropzone from "react-dropzone";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import * as Yup from "yup";
import {
    addNewsList as createNewNews,
    updateNewsList as updateNewNews
} from "../../../slices/pages/news/thunk";
import moment from "moment/moment";
import { createSelector } from "reselect";
import { getNewsById as onGetNewsById } from "../../../slices/pages/news/thunk";


const CreateNewsPage = () => {
    const dispatch = useDispatch<any>();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const navigate = useNavigate();

    const news = createSelector(
        (state: any) => state.News,
        (news) => ({
            newsData: news.news
        })
    );

    const { newsData } = useSelector(news);

    const [selectFile, setSelectFile] = useState<any>([]);
    const [edit, setEdit] = useState<boolean>(false);
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [editFile, setEditFile] = useState({ url: "", contentType: "", size: 0 });
    const [editContent, setEditContent] = useState(
        {
            title: "",
            img: '',
            url: '',
            shortInfo: '',
            status: '',
            publishedAt: ''
        }
    );

    const editorRef = useRef<{
        getContent: () => string;
        setContent: (content: string) => void;
    } | null>(null);

    const handleEditorInit = (_evt: any, editor: any) => {
        editorRef.current = editor;
        setIsEditorReady(true);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: editContent.title || '',
            shortInfo: editContent.shortInfo || '',
            image: editContent.img || '',
            url: editContent.url || '',
            status: editContent.status || '',
            publishedAt: editContent.publishedAt || ''
        },

        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter Your Product Name"),
            shortInfo: Yup.string().required("Please Enter Your Product Name"),
            image: Yup.mixed().required("Please Enter Your Category Image"),
            url: Yup.string().required("Please Enter Your Category Image"),
            publishedAt: Yup.string().required("Please Enter Your Category Image"),
        }),

        onSubmit: async (values) => {

            const formData = new FormData();
            const data = {
                id: id,
                title: values.title,
                shortInfo: values.shortInfo,
                content: editorRef.current ? editorRef.current.getContent() : "",
                url: values.url,
                publishedAt: moment(values.publishedAt).format("DD/MM/YYYY HH:mm:ss"),
                status: values.status,
                image: editFile
            }
            console.log(data)

            formData.append(
                "newsDto",
                new Blob([JSON.stringify(data)], { type: "application/json" }),
                "newsDto.json"
            );

            formData.append("imageFile", values.image);

            if (edit) {
                const response = await dispatch(updateNewNews({ formData: formData, id: id }));
                // navigate(`/apps-ecommerce-product-details/?id=${response.payload.id}`);
            } else {
                let resData = await dispatch(createNewNews(formData));
                if (resData.payload) {
                    navigate(`/news-list`);
                }
            }
        }
    });

    // Helper functions
    function formatBytes(bytes: any, decimals: number = 2) {
        if (!bytes || bytes === 0) return "0 Bytes";
        const k: number = 1024;
        const dm: number = decimals < 0 ? 0 : decimals;
        const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    const handleAcceptFile = (files: any) => {
        const newImages = files?.map((file: any) => {
            return Object.assign(file, {
                priView: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            });
        });
        setSelectFile([...selectFile, ...newImages]);
    };

    useEffect(() => {
        if (id) {
            dispatch(onGetNewsById(id));
        }
    }, [dispatch]);

    useEffect(() => {
        if (Object.keys(newsData).length > 0 && id) {
            setEditContent((editContent: any) => ({
                ...editContent,
                title: newsData.title,
                img: newsData.image,
                url: newsData.url,
                shortInfo: newsData.shortInfo,
                status: newsData.status,
                publishedAt: moment(newsData.publishedAt, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DDTHH:mm"),

            }));
            setEditFile(newsData.image);
            setEdit(true);
            if (isEditorReady) {
                editorRef.current?.setContent(newsData.content || "<p></p>");
            }
        }
    }, [newsData, isEditorReady]);

    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    <Form autoComplete="off" onSubmit={formik.handleSubmit} className={"container-fluid m-auto"}>
                        <Row>
                            <Col xxl={8}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5" className="mb-3">News Information:</Card.Title>
                                        <p className="text-muted">
                                            Product Information refers to any information held byan
                                            organisation about the products it produces, buys, sells or distributes.
                                        </p>
                                        <hr />
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="title">Title <span
                                                className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="title"
                                                name="title"
                                                placeholder="title"
                                                value={formik.values.title}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                isInvalid={!!formik.errors.title} />
                                            {formik.errors.title && formik.touched.title ? (
                                                <Form.Control.Feedback
                                                    type="invalid">{formik.errors.title}</Form.Control.Feedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Form.Label htmlFor="url">URL <span
                                                className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="url"
                                                name="url"
                                                placeholder="url"
                                                value={formik.values.url}
                                                onChange={(e) => {
                                                    let newValue = e.target.value
                                                        .replace(/['"@#$%&*\+/`~‘\s]/g, '')
                                                        .slice(0, 60);
                                                    formik.setFieldValue("url", newValue);

                                                }}
                                                onBlur={formik.handleBlur}
                                                onFocus={() => {
                                                    if (!formik.values.url) {
                                                        let res = formik.values.title.toLowerCase();
                                                        let res1 = res.replace(/['"@#$%&*-+/`~‘’]/g, '');
                                                        let res2 = res1.replace(/\s+/g, '-');
                                                        res2 = res2.substring(0, 60);
                                                        formik.setFieldValue("url", res2);
                                                    }
                                                }}
                                                isInvalid={!!formik.errors.url}
                                            />
                                            {formik.errors.url && formik.touched.url ? (
                                                <Form.Control.Feedback
                                                    type="invalid">{formik.errors.url}</Form.Control.Feedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Form.Label htmlFor="shortInfo">Short Description <span
                                                className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                id="shortInfo"
                                                name="shortInfo"
                                                placeholder="Short info..."
                                                value={formik.values.shortInfo}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                isInvalid={!!formik.errors.shortInfo} />
                                            {formik.errors.shortInfo && formik.touched.shortInfo ? (
                                                <Form.Control.Feedback
                                                    type="invalid"> {formik.errors.shortInfo} </Form.Control.Feedback>
                                            ) : null}
                                        </div>

                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Body>
                                        <Card.Title className="mb-3">Content:</Card.Title>
                                        <Editor
                                            apiKey="xp4ri1ccrmgo38j6mh711jbm1mowwru2koo2djq46svwmqdp"
                                            onInit={handleEditorInit}
                                            initialValue="<p></p>"
                                            init={{
                                                height: 500,
                                                plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table wordcount help quickbars emoticons',
                                                imagetools_cors_hosts: 'picsum.photos',
                                                menubar: 'file edit view insert format tools table help',
                                                toolbar:
                                                    'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | source code | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | fullscreen preview save | insertfile image media link anchor codesample | ltr rtl',
                                                content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
                                            }}
                                        />

                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title className="mb-3">Details:</Card.Title>
                                        <p className="text-muted">
                                            Product Information refers to any information held.
                                        </p>
                                        <hr />
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="publishedAt">Date<span
                                                className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="datetime-local"
                                                id="publishedAt"
                                                name="publishedAt"
                                                placeholder="publishedAt"
                                                value={formik.values.publishedAt}
                                                onChange={(e) => {
                                                    const rawValue = e.target.value;
                                                    formik.setFieldValue("publishedAt", rawValue);
                                                }}
                                                onBlur={formik.handleBlur}
                                                isInvalid={!!formik.errors.publishedAt} />
                                            {formik.errors.publishedAt && formik.touched.publishedAt ? (
                                                <Form.Control.Feedback
                                                    type="invalid">{formik.errors.publishedAt}</Form.Control.Feedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Form.Label
                                                htmlFor="newsStatusd">Status</Form.Label>
                                            <Form.Select
                                                id="newsStatusd"
                                                name="status"
                                                value={formik.values.status}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                isInvalid={!!formik.errors.status}>
                                                <option value="false">No Active</option>
                                                <option value="true">Active</option>
                                            </Form.Select>
                                            {formik.errors.status && formik.touched.status ? (
                                                <Form.Control.Feedback
                                                    type="invalid"> {formik.errors.status} </Form.Control.Feedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Form.Label htmlFor="product-images-input">Product img</Form.Label>
                                            <Dropzone
                                                onDrop={(acceptFile: any) => {
                                                    handleAcceptFile(acceptFile);
                                                    formik.setFieldValue("image", acceptFile[0]);
                                                }}
                                                id="product-images-input"
                                                name="image"
                                                value={formik.values.image || ''}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                isInvalid={!!formik.errors.image}
                                            >
                                                {({ getRootProps }: any) => (
                                                    <div className="dropzone dz-clickable text-center">
                                                        <div
                                                            className="dz-message needsclick"
                                                            {...getRootProps()}
                                                        >
                                                            <div className="mb-3">
                                                                <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                                            </div>
                                                            <h4>Drop product images here or click to upload.</h4>
                                                        </div>
                                                    </div>
                                                )}
                                            </Dropzone>
                                            {formik.errors.image && formik.touched.image ? (
                                                <Form.Control.Feedback
                                                    type="invalid"
                                                    className="d-block">{formik.errors.image}
                                                </Form.Control.Feedback>
                                            ) : null}

                                            <ul className="list-unstyled mb-0" id="dropzone-preview">
                                                {editFile && <li className="mt-2 dz-image-preview">
                                                    <div className="border rounded">
                                                        <div className="d-flex flex-wrap gap-2 p-2">
                                                            <div className="flex-shrink-0 me-3">
                                                                <div
                                                                    className="avatar-sm bg-light rounded p-2">
                                                                    <img data-dz-thumbnail=""
                                                                        className="img-fluid rounded d-block"
                                                                        src={`http://localhost:9098${editFile?.url}`}
                                                                        alt={editFile.contentType} />
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <div className="pt-1">
                                                                    <h5 className="fs-md mb-1"
                                                                        data-dz-name>{editFile.contentType}</h5>
                                                                    <p className="fs-sm text-muted mb-0"
                                                                        data-dz-size="">
                                                                        <strong>{formatBytes(editFile.size)}</strong>
                                                                    </p>
                                                                    <strong className="error text-danger"
                                                                        data-dz-errormessage></strong>
                                                                </div>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-3">
                                                                <Button variant="danger" size="sm"
                                                                    onClick={() => {
                                                                        setEditFile({
                                                                            url: "",
                                                                            contentType: "",
                                                                            size: 0
                                                                        });
                                                                    }}>Delete</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>}

                                                {
                                                    (selectFile || [])?.map((file: any, index: number) => {
                                                        return (
                                                            <li className="mt-2 dz-image-preview" key={index}>
                                                                <div className="border rounded">
                                                                    <div className="d-flex flex-wrap gap-2 p-2">
                                                                        <div className="flex-shrink-0 me-3">
                                                                            <div
                                                                                className="avatar-sm bg-light rounded p-2">
                                                                                <img data-dz-thumbnail=""
                                                                                    className="img-fluid rounded d-block"
                                                                                    src={file?.priView}
                                                                                    alt={file?.name} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-grow-1">
                                                                            <div className="pt-1">
                                                                                <h5 className="fs-md mb-1"
                                                                                    data-dz-name>{file?.path}</h5>
                                                                                <p className="fs-sm text-muted mb-0"
                                                                                    data-dz-size="">
                                                                                    <strong>{file.formattedSize}</strong>
                                                                                </p>
                                                                                <strong className="error text-danger"
                                                                                    data-dz-errormessage></strong>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-shrink-0 ms-3">
                                                                            <Button variant="danger" size="sm"
                                                                                onClick={() => {
                                                                                    setSelectFile(null);
                                                                                }}>Delete</Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    })
                                                }

                                            </ul>
                                        </div>

                                    </Card.Body>
                                    <Card.Footer>
                                        <div className="hstack gap-2 justify-content-end mb-3">
                                            {edit ? "" : (
                                                <Button variant="danger">
                                                    <i className="ph-x align-middle"></i> Cancel
                                                </Button>
                                            )}
                                            <Button type={"submit"} variant="primary">
                                                {edit ? "Update News" : "Create news"}
                                            </Button>
                                        </div>
                                    </Card.Footer>
                                </Card>

                            </Col>

                        </Row>
                    </Form>

                </Container>
            </div>
            <ToastContainer />
        </React.Fragment>
    )
}

export default CreateNewsPage;