import React from 'react'
import {Card, Col, Row} from 'react-bootstrap';
import CountUp from 'react-countup';

import {WidgetsData} from 'Common/data'

type StudentCount = {
    Bakalavr: number;
    Magistr: number;
};

interface SalesProps {
    accommodation: Record<string, StudentCount>;
}

const Widgets = ({accommodation}: SalesProps) => {
    if (!accommodation) {
        return <div>Yuklanmoqda...</div>;
    }
    let totalBakalavr = 0;
    let totalMagistr = 0;

    Object.values(accommodation).forEach(({Bakalavr, Magistr}) => {
        totalBakalavr += Bakalavr;
        totalMagistr += Magistr;
    });

    const sum = totalBakalavr + totalMagistr;

    const generatePercent = (value:number)=> {
        const a = (value/sum)*100;
        return a.toFixed(2)+"%";
    }

    return (
        <React.Fragment>
            <Row>
                {accommodation && Object.entries(accommodation).map(([place, values], index) => (
                    <Col xxl sm={6} key={index}>
                        <Card className="overflow-hidden">
                            <Card.Body>
                                <div className="avatar-sm float-end">
                                    <div
                                        className={"avatar-title " + WidgetsData[index].bgcolor + " " + WidgetsData[index].textcolor + " fs-3xl rounded"}>
                                        <i className={WidgetsData[index].icon}></i>

                                    </div>
                                </div>
                                <h5>{place}:</h5>
                                <h4 className={"mb-4"}>
                                    <span className="counter-value" data-target={values?.Bakalavr + values?.Magistr}>
                                        <CountUp
                                            start={0}
                                            end={values?.Bakalavr + values?.Magistr}
                                            separator=" "
                                        /> ta
                                    </span>
                                </h4>
                                <p className="text-muted mb-0">
                                    Barcha talabalarning  <span className={"badge bg-success-subtle text-success mx-2"}>
                                        {generatePercent(values?.Bakalavr + values?.Magistr)}
                                    </span>
                                </p>
                            </Card.Body>
                            <div className="progress progress-sm rounded-0" role="progressbar">
                                <div className={WidgetsData[index].progressbar}
                                     style={{width: generatePercent(values?.Bakalavr + values?.Magistr)}}></div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
};

export default Widgets;
