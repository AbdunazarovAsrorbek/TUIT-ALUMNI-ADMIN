import React from 'react'
import {Button, Card, Col, Row} from 'react-bootstrap';
import CountUp from 'react-countup';
import {VectorMap} from '@south-paw/react-vector-maps';
import world from './world.svg.json';

type StudentCount = {
    Bakalavr: number;
    Magistr: number;
};

interface SalesProps {
    dataRegion: Record<string, StudentCount>;
}

const Sales = ({dataRegion}: SalesProps) => {
    const totalBakalavr = Object.values(dataRegion ?? {}).reduce(
        (sum, region) => sum + (region?.Bakalavr ?? 0),
        0
    );
    const totalMagistr = Object.values(dataRegion ?? {}).reduce(
        (sum, region) => sum + (region?.Magistr ?? 0),
        0
    );

    return (
        <React.Fragment>
            <Col xl={7}>
                <Card>
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Barcha viloyatlar kesimida</h4>
                    </Card.Header>

                    <Card.Body>
                        <Row>
                            <Col lg={5}>
                                <div id="world-map-line-markers" className='custom-vector-map'
                                     style={{height: "340px"}}>
                                    <VectorMap {...world} />
                                </div>
                            </Col>
                            <Col lg={7}>
                                <div className="mb-4 d-flex align-items-center gap-4">
                                    {/*<h6 className="text-muted mb-3 fw-medium fs-xs text-uppercase">Compared to last month</h6>*/}
                                    <h3>
                                        <span className="counter-value"><CountUp start={0} end={totalBakalavr}
                                                                                 separator=" "/></span>
                                        <small className="text-muted fw-normal fs-sm"> Bakalavr</small>
                                    </h3>
                                    <h3>
                                        <span className="counter-value"><CountUp start={0} end={totalMagistr}
                                                                                 separator=" "/></span>
                                        <small className="text-muted fw-normal fs-sm"> Magistr</small>
                                    </h3>
                                </div>
                                <div className={"d-flex gap-5"}>
                                    <ul className="list-unstyled vstack"
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "auto auto",
                                            gridColumnGap: "20px"
                                        }}>

                                        {dataRegion && Object.entries(dataRegion).map(([region, values]) => (
                                            <li className="p-2 rounded" key={region}>
                                                <i className="ri-checkbox-blank-circle-fill text-primary align-bottom me-1"></i>
                                                {region} <span
                                                className="float-end">{values?.Bakalavr + values?.Bakalavr}</span>
                                            </li>
                                        ))}

                                    </ul>
                                    {/*<ul className="list-unstyled vstack gap-2">*/}
                                    {/*    <li className="p-2 rounded">*/}
                                    {/*        <i className="ri-checkbox-blank-circle-fill text-primary align-bottom me-1"></i> United*/}
                                    {/*        States <span className="float-end">15,364</span>*/}
                                    {/*    </li>*/}
                                    {/*    <li className="bg-light-subtle p-2 rounded">*/}
                                    {/*        <i className="ri-checkbox-blank-circle-fill text-secondary align-bottom me-1"></i> Greenland <span*/}
                                    {/*        className="float-end">12,387</span>*/}
                                    {/*    </li>*/}
                                    {/*    <li className="p-2 rounded">*/}
                                    {/*        <i className="ri-checkbox-blank-circle-fill text-info align-bottom me-1"></i> Serbia <span*/}
                                    {/*        className="float-end">9,123</span>*/}
                                    {/*    </li>*/}
                                    {/*    <li className="bg-light-subtle p-2 rounded">*/}
                                    {/*        <i className="ri-checkbox-blank-circle-fill text-success align-bottom me-1"></i> Russia <span*/}
                                    {/*        className="float-end">7,108</span>*/}
                                    {/*    </li>*/}
                                    {/*    <li className="p-2 rounded">*/}
                                    {/*        <i className="ri-checkbox-blank-circle-fill text-danger align-bottom me-1"></i> Brazil <span*/}
                                    {/*        className="float-end">6,731</span>*/}
                                    {/*    </li>*/}
                                    {/*    <li className="bg-light-subtle p-2 rounded">*/}
                                    {/*        <i className="ri-checkbox-blank-circle-fill text-warning align-bottom me-1"></i> Sydney <span*/}
                                    {/*        className="float-end">3,023</span>*/}
                                    {/*    </li>*/}
                                    {/*</ul>*/}
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default Sales;
