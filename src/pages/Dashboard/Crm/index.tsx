import React, {useEffect} from 'react'
import BreadCrumb from 'Common/BreadCrumb';
import {Container, Row} from 'react-bootstrap';
import Sales from './sales';
// import OrdersStatus from './ordersStatus';
import Widgets from './widgets';
import {useDispatch, useSelector} from "react-redux";
import {getStudentList as onGetStudentList} from "../../../slices/studentsStatistics/thunk";
import OrdersStatus from "./ordersStatus";
import TrafficSource from "./trafficSource";
import PropertiesType from "./propertiesType";
import EmailSent from "./emailSent";

const Crm = () => {
    document.title = "TUIT Alumni association";
    const dispatch = useDispatch<any>();

    const selectStudentList = (state: any) => state.Student.studentList;
    const studentList = useSelector(selectStudentList).data;

    useEffect(() => {
        dispatch(onGetStudentList());
    }, [dispatch]);

    console.log(studentList);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Alumni" pageTitle="Dashboards"/>
                    <Widgets accommodation={studentList?.accommodation}/>
                    <Row>
                        <Sales dataRegion={studentList?.region}/>
                        <PropertiesType citizenship = {studentList?.citizenship}/>
                    </Row>
                    <Row>
                        <EmailSent payment={studentList?.payment}/>
                        <TrafficSource educationForm = {studentList?.education_form}/>

                        {/*<OrdersStatus accommodation={studentList?.accommodation}/>*/}
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    )
}

export default Crm;
