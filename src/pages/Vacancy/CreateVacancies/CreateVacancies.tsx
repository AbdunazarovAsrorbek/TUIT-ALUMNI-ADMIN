import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import Dropzone from "react-dropzone";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import * as Yup from "yup";
import {
  getVacancyById as onGetVacancyById,
  addVacancyList as onAddVacancyList,
  updateVacancyList as onUpdateVacancyList
} from "slices/vacancy/thunk";


const baseUrl = process.env.REACT_APP_API_URL


interface FileEdit {
  url: string;
  size?: number;
  imageName?: string;
}


const CreateVacancies = () => {
  const dispatch = useDispatch<any>();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const vacancyById = useSelector((state: any) => state.Vacancy.vacancyListById);
  const [selectFile, setSelectFile] = useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [editFile, setEditFile] = useState<FileEdit | null>(null);
  const [editContent, setEditContent] = useState(
    {
      title: "",
      content: "",
      company: "",
      salary: "",
      currency: "",
      img: '',
    }
  );
  console.log(vacancyById);


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
      company: editContent.company || '',
      salary: editContent.salary || '',
      currency: editContent.currency || '',
      image: editContent.img || '',
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Title"),
      company: Yup.string().required("Please Enter Your company"),
      salary: Yup.string().required("Please Enter Your Salary"),
      currency: Yup.string().required("Please Enter Your Currency"),
      image: edit ? Yup.mixed().nullable() : Yup.mixed().required("Please Enter Your Vacancies Image"),
    }),

    onSubmit: async (values) => {
      const editorContent = editorRef.current ? editorRef.current.getContent() : "";

      const data = {
        id: id,
        title: values.title,
        content: editorContent,
        company: values.company,
        salary: values.salary,
        currency: values.currency,
        // image: editFile,
      };

      console.log(data);

      const formData = new FormData();
      formData.append(
        "vacancyDto",
        new Blob([JSON.stringify(data)], { type: "application/json" }),
        "vacancyDto.json"
      );
      formData.append("image", values.image);

      if (edit) {
        const response = await dispatch(onUpdateVacancyList({ formData: formData, id: id }));
        // navigate(`/vacancy-details?id=${response.payload.id || id}`);
        navigate(`/vacancies`);
      } else {
        formData.append("image", values.image);
        let resData = await dispatch(onAddVacancyList(formData));
        console.log(resData);
        if (resData.payload) {
          navigate(`/vacancies`);
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
      dispatch(onGetVacancyById(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (id && vacancyById) {
      setEditContent({
        title: vacancyById.title || "",
        content: vacancyById.content || "",
        company: vacancyById.company || "",
        salary: vacancyById.salary || "",
        currency: vacancyById.currency || "",
        img: vacancyById.imageUrl || "",
      });
      setEditFile({
        url: `${baseUrl}${vacancyById.imageUrl}`,
        imageName: vacancyById.imageName,
        size: vacancyById.imageSize,
      });
      setEdit(true);
      if (isEditorReady) {
        editorRef.current?.setContent(vacancyById.content || "<p></p>");
      }
    }

  }, [id, isEditorReady, vacancyById]);




  return (
    <React.Fragment>

      <div className="page-content">
        <Container fluid>
          <Form autoComplete="off" onSubmit={formik.handleSubmit} className={"container-fluid m-auto"}>
            <Row>
              <Col xxl={8}>
                <Card>
                  <Card.Header>
                    <Card.Title as="h5" className="mb-3">Create Vacancies:</Card.Title>
                    <hr />
                  </Card.Header>
                  <Card.Body>

                    <div className="row">

                      <div className="mb-3 col-md-6">
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
                          isInvalid={!!(formik.errors.title && formik.touched.title)}
                        />
                        {formik.errors.title && formik.touched.title ? (
                          <Form.Control.Feedback
                            type="invalid">{formik.errors.title}</Form.Control.Feedback>
                        ) : null}
                      </div>

                      <div className="mb-3 col-md-6">
                        <Form.Label htmlFor="title">Company <span
                          className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          id="company"
                          name="company"
                          placeholder="Company"
                          value={formik.values.company}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={!!(formik.errors.company && formik.touched.company)}
                        />
                        {formik.errors.company && formik.touched.company ? (
                          <Form.Control.Feedback
                            type="invalid">{formik.errors.company}</Form.Control.Feedback>
                        ) : null}
                      </div>

                      <div className="mb-3 col-md-6">
                        <Form.Label htmlFor="currency">Currency <span className="text-danger">*</span></Form.Label>
                        <Form.Select
                          id="currency"
                          name="currency"
                          value={formik.values.currency}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={!!(formik.errors.currency && formik.touched.currency)}
                        >
                          <option value="">Tanlang</option>
                          <option value="UZS">UZS</option>
                          <option value="USD">USD</option>

                        </Form.Select>
                        {formik.errors.currency && formik.touched.currency ? (
                          <Form.Control.Feedback type="invalid">{formik.errors.currency}</Form.Control.Feedback>
                        ) : null}
                      </div>


                      <div className="mb-3 col-md-6">
                        <Form.Label htmlFor="title">Salary <span
                          className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          id="salary"
                          name="salary"
                          placeholder="Salary"
                          value={formik.values.salary}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={!!(formik.errors.salary && formik.touched.salary)}
                        />
                        {formik.errors.salary && formik.touched.salary ? (
                          <Form.Control.Feedback
                            type="invalid">{formik.errors.salary}</Form.Control.Feedback>
                        ) : null}
                      </div>

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
                    <hr />
                  </Card.Header>
                  <Card.Body>

                    <div className="mb-3">
                      <Form.Label htmlFor="product-images-input">Vacancies img</Form.Label>
                      <Dropzone
                        onDrop={(acceptFile: any) => {
                          handleAcceptFile(acceptFile);
                          formik.setFieldValue("image", acceptFile[0]);
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
                                      formik.setFieldValue("image", "");
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

                      {formik.errors.image && formik.touched.image ? (
                        <Form.Control.Feedback type="invalid" className="d-block">
                          {formik.errors.image}
                        </Form.Control.Feedback>
                      ) : null}
                    </div>

                  </Card.Body>
                  <Card.Footer>
                    <div className="hstack gap-2 justify-content-end mb-3">
                      {edit ? "" : (
                        <Button variant="danger" onClick={() => navigate("/vacancies")}>
                          <i className="ph-x align-middle"></i> Cancel
                        </Button>
                      )}
                      {/* <Link to="/vacancies">
                        <Button variant="danger">
                          <i className="ph-x align-middle"></i> Cancel
                        </Button>
                      </Link> */}
                      <Button type={"submit"} variant="primary">
                        {edit ? "Update Vacancies" : "Create Vacancies"}
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

export default CreateVacancies;