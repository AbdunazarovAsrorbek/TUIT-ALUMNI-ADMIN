import React from 'react'
import {Card, Col, Dropdown} from 'react-bootstrap';
import {EmailSendChart} from './charts';

type PaymentItem = {
    Bakalavr: number;
    Magistr: number;
};

type PaymentData = {
    [key: string]: PaymentItem;
};

const EmailSent = ({payment}: { payment?: PaymentData }) => {
    const periodData = payment
        ? [
            payment["Davlat granti"]?.Bakalavr || 0,
            payment["Davlat granti"]?.Magistr || 0,
            payment["To‘lov-shartnoma"]?.Bakalavr || 0,
            payment["To‘lov-shartnoma"]?.Magistr || 0
        ]
        : [0, 0, 0, 0];

    const total = payment
        ? Object.values(payment).reduce((sum, item) => {
            return sum + (item.Bakalavr || 0) + (item.Magistr || 0);
        }, 0)
        : 0;
    return (
        <React.Fragment>
            <Col xl={4} lg={6}>
                <Card className="card-height-100">
                    <Card.Header className="align-items-center d-flex">
                        <h6 className="card-title mb-0 flex-grow-1">O'qish turi</h6>
                    </Card.Header>
                    <Card.Body>
                        <EmailSendChart periodData={periodData} total={total}
                                        dataColors='["--tb-primary", "--tb-success", "--tb-secondary", "--tb-primary"]'/>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default EmailSent;
