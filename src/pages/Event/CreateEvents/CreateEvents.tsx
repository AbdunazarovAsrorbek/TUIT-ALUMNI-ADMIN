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
    addEventList as createNewEvent,
    updateEventList as updateNewEvent,
    getEventById as onGetEventById
} from "../../../slices/event/thunk";
import moment from "moment/moment";
import { createSelector } from "reselect";

const baseUrl = process.env.REACT_APP_API_URL

interface FileEdit {
    url: string;
    size?: number;
    imageName?: string,
}

const CreateEvents = () => {
    const dispatch = useDispatch<any>();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const navigate = useNavigate();
    const eventById = useSelector((state: any) => state.Event.eventListById);
    console.log(eventById);

    const [selectFile, setSelectFile] = useState<any>([]);
    const [edit, setEdit] = useState<boolean>(false);
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [editFile, setEditFile] = useState<FileEdit | null>(null);
    const [editContent, setEditContent] = useState(
        {
            title: "",
            eventImage: '',
            location: '',
            description: '',
            eventDate: '',
            shortInfo: '',
            published: ''
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
            eventImage: editContent.eventImage || '',
            location: editContent.location || '',
            eventDate: editContent.eventDate || '',
            shortInfo: editContent.shortInfo || '',
            published: editContent.published || '',
        },

        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter Your Title"),
            eventImage: edit
                ? Yup.mixed().nullable()
                : Yup.mixed().required("Please Enter Your Image"),
            location: Yup.string().required("Please Enter Your Location"),
            eventDate: Yup.string().required("Please Enter Your Date"),
            shortInfo: Yup.string().required("Please Enter Your Product Name"),
        }),

        onSubmit: async (values) => {
            const editorContent = editorRef.current ? editorRef.current.getContent() : "";

            const data = {
                id: id,
                title: values.title,
                eventImage: editFile,
                location: values.location,
                description: editorContent,
                eventDate: moment(values.eventDate).format("DD/MM/YYYY HH:mm:ss"),
                shortInfo: values.shortInfo,
                published: values.published,
            }
            console.log(data)

            const formData = new FormData();



            formData.append(
                "eventDto",
                new Blob([JSON.stringify(data)], { type: "application/json" }),
                "eventDto.json"
            );


            formData.append("eventImage", values.eventImage);

            if (edit) {
                const response = await dispatch(updateNewEvent({ formData: formData, id: id }));
                // navigate(`/events-details?id=${response.payload.id || id}`);
            } else {
                formData.append("eventImage", values.eventImage);
                let resData = await dispatch(createNewEvent(formData));
                if (resData.payload.id) {
                    navigate(`/events`);
                }
            }
        }
    });


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
            dispatch(onGetEventById(id));
        } else {
            setEdit(false);
            setEditContent({
                title: "",
                eventImage: "",
                location: "",
                description: "",
                eventDate: "",
                shortInfo: "",
                published: "",
            });
            setEditFile(null);
        }
    }, [dispatch, id]);



    useEffect(() => {
        if (id && eventById && Object.keys(eventById).length > 0) {
            setEditContent({
                title: eventById.title || "",
                eventImage: eventById.eventImage || "",
                location: eventById.location || "",
                description: eventById.description || "",
                eventDate: eventById.eventDate
                    ? moment(eventById.eventDate, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DDTHH:mm")
                    : "",
                shortInfo: eventById.shortInfo || "",
                published: eventById.published || "",
            });

            setEditFile({
                url: `${baseUrl}${eventById.imageUrl}`,
                imageName: eventById.imageName,
                size: eventById.imageSize
            });

            setEdit(true);

            if (isEditorReady && editorRef.current) {
                editorRef.current.setContent(eventById.description || "<p></p>");
            }
        }
    }, [eventById, id, isEditorReady]);



    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    <Form autoComplete="off" onSubmit={formik.handleSubmit} className={"container-fluid m-auto"}>
                        <Row>
                            <Col xxl={8}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5" className="mb-3">Create Events:</Card.Title>
                                        {/* <p className="text-muted">
                                            Product Information refers to any information held byan
                                            organisation about the products it produces, buys, sells or distributes.
                                        </p> */}
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
                                                placeholder="Title"
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
                                                id="location"
                                                name="location"
                                                placeholder="Location"
                                                value={formik.values.location}
                                                onChange={(e) => {
                                                    formik.setFieldValue("location", e.target.value);
                                                }}
                                                onBlur={formik.handleBlur}
                                                isInvalid={!!formik.errors.location}
                                            />
                                            {formik.errors.location && formik.touched.location ? (
                                                <Form.Control.Feedback
                                                    type="invalid">{formik.errors.location}</Form.Control.Feedback>
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
                                            apiKey="al9ig6955nahjappojktglfuwby2sttv30hlpu3a44ucgtl5"
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
                                        {/* <p className="text-muted">
                                            Product Information refers to any information held.
                                        </p> */}
                                        <hr />
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="publishedAt">Date<span
                                                className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="datetime-local"
                                                id="eventDate"
                                                name="eventDate"
                                                placeholder="EventDate"
                                                value={formik.values.eventDate}
                                                onChange={(e) => {
                                                    const rawValue = e.target.value;
                                                    formik.setFieldValue("eventDate", rawValue);
                                                }}
                                                onBlur={formik.handleBlur}
                                                isInvalid={!!formik.errors.eventDate} />
                                            {formik.errors.eventDate && formik.touched.eventDate ? (
                                                <Form.Control.Feedback
                                                    type="invalid">{formik.errors.eventDate}</Form.Control.Feedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Form.Label
                                                htmlFor="published">Status</Form.Label>
                                            <Form.Select
                                                id="published"
                                                name="published"
                                                value={formik.values.published}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                isInvalid={!!formik.errors.published}>
                                                <option value="false">No Active</option>
                                                <option value="true">Active</option>
                                            </Form.Select>
                                            {formik.errors.published && formik.touched.published ? (
                                                <Form.Control.Feedback
                                                    type="invalid"> {formik.errors.published} </Form.Control.Feedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Form.Label htmlFor="product-images-input">Events img</Form.Label>
                                            <Dropzone
                                                onDrop={(acceptFile: any) => {
                                                    handleAcceptFile(acceptFile);
                                                    formik.setFieldValue("eventImage", acceptFile[0]);
                                                }}
                                                accept="image/*"
                                                multiple={false}
                                            >
                                                {(dropzoneProps: any) => (
                                                    <div>
                                                        <div
                                                            className="dropzone dz-clickable text-center"
                                                            {...dropzoneProps.getRootProps()}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <input
                                                                {...dropzoneProps.getInputProps()}
                                                                name="eventImage"
                                                                id="product-images-input"
                                                                onBlur={formik.handleBlur}
                                                            />
                                                            <div className="dz-message needsclick">
                                                                <div className="mb-3">
                                                                    <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                                                </div>
                                                                <h4>Drop events images here <br />
                                                                    or click to upload.</h4>
                                                            </div>
                                                        </div>

                                                        <div className="mt-3 d-flex flex-wrap gap-2" >

                                                            {selectFile.map((file: any, index: number) => (
                                                                <div
                                                                    key={index}
                                                                    style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "left",
                                                                        gap: 10,
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={file.priView}
                                                                        alt={`preview-${index}`}
                                                                        style={{
                                                                            minWidth: "100px",
                                                                            maxWidth: "100px",
                                                                            height: "60px",
                                                                            borderRadius: "2.5px"
                                                                        }}

                                                                    />
                                                                    <div
                                                                        style={{
                                                                            fontSize: "12px",
                                                                            wordBreak: "break-word",
                                                                        }}
                                                                    >
                                                                        <strong>{file.name}</strong>
                                                                        <br />
                                                                        <span>{file.formattedSize}</span>
                                                                    </div>
                                                                </div>
                                                            ))}


                                                            {edit && !selectFile.length && editFile?.url && (
                                                                <div style={{ minWidth: "100%", display: "flex", alignItems: "start", justifyContent: "space-between" }}>
                                                                    <div style={{ display: "flex", alignItems: "start", justifyContent: "left", gap: 10, paddingBottom: 15 }}>
                                                                        <img
                                                                            src={editFile.url}
                                                                            alt="edit-preview"
                                                                            style={{
                                                                                minWidth: "60px",
                                                                                maxWidth: "60px",
                                                                                height: "60px",
                                                                                objectFit: "cover",
                                                                                borderRadius: "6px",
                                                                            }}
                                                                        />
                                                                        <div style={{ fontSize: "12px", wordBreak: "break-word" }}>
                                                                            <strong>Old image</strong>
                                                                            <br />
                                                                            <span>{editFile?.imageName}</span>
                                                                            <br />
                                                                            <span>{editFile?.size ? formatBytes(editFile.size) : "?"}</span>
                                                                        </div>
                                                                    </div>
                                                                    <Button
                                                                        variant="danger"
                                                                        size="sm"
                                                                        onClick={() => {
                                                                            setEditFile(null);
                                                                            formik.setFieldValue("eventImage", "");
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </div>

                                                            )}

                                                        </div>
                                                    </div>
                                                )}
                                            </Dropzone>

                                            {formik.errors.eventImage && formik.touched.eventImage ? (
                                                <Form.Control.Feedback type="invalid" className="d-block">
                                                    {formik.errors.eventImage}
                                                </Form.Control.Feedback>
                                            ) : null}

                                        </div>

                                    </Card.Body>
                                    <Card.Footer>
                                        <div className="hstack gap-2 justify-content-end mb-3">
                                            {edit ? "" : (
                                                <Button variant="danger" onClick={() => navigate("/events")}>
                                                    <i className="ph-x align-middle"></i> Cancel
                                                </Button>
                                            )}
                                            <Button type="submit" variant="primary">
                                                {edit ? "Update Events" : "Create Events"}
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

export default CreateEvents;