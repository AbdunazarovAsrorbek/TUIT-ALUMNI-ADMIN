import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import 'react-toastify/dist/ReactToastify.css';
import { DeleteModal } from "Common/DeleteModal";
import {
  getVacancyList as onGetVacancyList,
  deleteVacancyList as onDeleteVacancyList
} from "slices/vacancy/thunk";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createSelector } from "reselect";
const url = process.env.REACT_APP_API_URL;

const Vacancies = () => {

  document.title = "Vacancies list";
  const dispatch = useDispatch<any>();

  const selectVacancyList = createSelector(
    (state: any) => state.Vacancy,
    (vacancy) => ({
      vacancyList: vacancy.vacancyList
    })
  );

  const { vacancyList } = useSelector(selectVacancyList);
  console.log(vacancyList)


  const [listView, setListView] = useState<any>([]);
  const [vacancyLists, setVacancyLists] = useState<any>(null);
  const [show, setShow] = useState<boolean>(false);
  // const [pagination, setPagination] = useState({ size: 10, page: 0 });
  // const [searchData, setSearchData] = useState({
  //   title: '',
  //   shortInfo: '',
  //   url: ''
  // });


  //search

  useEffect(() => {
    setListView(vacancyList || []);
  }, [vacancyList]);

  const handleChange = (ele: any) => {
    let search = ele.target.value.toLowerCase();
    if (search) {
      setListView((vacancyList || []).filter((item: any) =>
        item.title?.toLowerCase().includes(search)
      ));
    } else {
      setListView(vacancyList || []);
    }
  };

  // delete
  const handleDeleteShow = (ele: any) => {
    setShow(true);
    setVacancyLists(ele);
  };

  const handleDeleteClose = () => {
    setShow(false);
  }

  //delete modal
  const deleteModalFunction = () => {
    const deleteData = vacancyLists.row.original.id || {};
    console.log(deleteData);
    if (deleteData) {
      dispatch(onDeleteVacancyList(deleteData));
    }
    setShow(false);
  };

  useEffect(() => {
    setListView(vacancyList);
  }, [vacancyList]);

  console.log('vacancyList:', vacancyList);

  useEffect(() => {
    dispatch(onGetVacancyList(
      // { searchData, pagination }
    ));
  }, [dispatch]);

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
        return <span>{cell.row.index + 1}</span>;
      },
    },
    {
      header: "Title",
      accessorKey: "title",
      cell: (cell: any) => {
        const text = cell.row.original.title || "";
        return (
          <div className="d-flex align-items-center">
            <div
              className="avatar-lg bg-light rounded p-1 me-2"
              style={{ width: 60, height: 60 }}
            >
              <img
                src={url + cell.row.original.imageUrl}
                alt={cell.row.original.imageUrl}
                className="img-fluid d-block product-img"
                style={{
                  minHeight: "100%",
                  maxHeight: "100%",
                  width: "100%",
                  borderRadius: 2.5,
                }}
              />
            </div>
            <div>
              <h6 className="mb-0">
                <Link
                  to={`#`}
                  className="text-reset text-capitalize product-title"
                >
                  {text.length > 20 ? `${text.slice(0, 20)}...` : text}
                </Link>
              </h6>
            </div>
          </div>
        );
      },
      enableColumnFilter: false,
      enableSorting: true,
    },
    {
      header: "Company",
      accessorKey: "company",
      cell: (cell: any) => {
        const text = cell.row.original.company || "";
        return text.length > 15 ? `${text.slice(0, 15)}...` : text;
      },
      enableColumnFilter: false,
      enableSorting: true,
    },
    {
      header: "Salary",
      accessorKey: "salary",
      cell: (cell: any) => {
        const text = cell.row.original.salary?.toString() || "";
        return text.length > 10 ? `${text.slice(0, 10)}...` : text;
      },
      enableColumnFilter: false,
      enableSorting: true,
    },
    {
      header: "Currency",
      accessorKey: "currency",
      enableColumnFilter: false,
      enableSorting: true,
    },
    {
      header: "Content",
      accessorKey: "content",
      cell: (cell: any) => {
        const text = cell.row.original.content || "";
        return text.length > 15 ? `${text.slice(0, 15)}...` : text;
      },
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
              <Link
                to={`/create-vacancies?id=${cell.row?.original.id}`}
                className="btn btn-subtle-secondary btn-icon btn-sm edit-item-btn"
              >
                <i className="ph-pencil"></i>
              </Link>
            </li>
            <li className={"mx-2"}>
              <Link
                to="#"
                className="btn btn-subtle-danger btn-icon btn-sm remove-item-btn"
                onClick={() => handleDeleteShow(cell)}
              >
                <i className="ph-trash"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ],
  []
);


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row id="newsList">
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Row className="align-items-center g-2">
                    <Col lg={3} className="me-auto">
                      <h6 className="card-title mb-0">Vacancies List</h6>
                    </Col>
                    <Col xl={2} md={3}>
                      <div className="search-box">
                        <Form.Control
                          type="text" className="search"
                          placeholder="Search vacancies..."
                          onChange={(e: any) => handleChange(e)}
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                    <Col className="col-md-auto">
                      <div className="hstack gap-2">
                        <Link to="/create-vacancies" className={"btn btn-secondary"}>
                          <i className="bi bi-plus-circle align-baseline me-1"></i> Add
                          Vacancies
                        </Link>
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

export default Vacancies;