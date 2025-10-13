import React from 'react'
import { Card, Col, Dropdown } from 'react-bootstrap';
import { TrafficSourceChart } from './charts';
import { TrafficSourceSeries } from 'Common/data';

type GenderCount = {
    Erkak: number;
    Ayol: number;
};

type EducationFormType = {
    Bakalavr: Record<string, GenderCount>;
};

const TrafficSource = ({ educationForm }: { educationForm: EducationFormType }) => {
    if (!educationForm || !educationForm.Bakalavr) {
        return <div>Maʼlumotlar mavjud emas</div>; // yoki loader
    }

    const periodData = [
        {
            name: "Erkak",
            data: Object.values(educationForm.Bakalavr).map(item => item.Erkak),
        },
        {
            name: "Ayol",
            data: Object.values(educationForm.Bakalavr).map(item => item.Ayol),
        },
    ];

    console.log(educationForm)
    return (
        <React.Fragment>
            <Col xl={8} lg={6}>
                <Card className="card-height-100">
                    <Card.Header className="d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Yo'nalishlar bo'yicha</h4>
                        <Dropdown className="card-header-dropdown float-end cursor-pointer">
                            <Dropdown.Toggle as='a' className="text-reset arrow-none mb-0">
                                <i className="ph-dots-three-outline-vertical"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-end">
                                <li><Dropdown.Item href="#">Bakalavr</Dropdown.Item></li>
                                <li><Dropdown.Item href="#">Magistr</Dropdown.Item></li>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Card.Header>
                    <Card.Body>
                        <TrafficSourceChart periodData={periodData} dataColors='["--tb-primary", "--tb-light"]' />
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default TrafficSource;
