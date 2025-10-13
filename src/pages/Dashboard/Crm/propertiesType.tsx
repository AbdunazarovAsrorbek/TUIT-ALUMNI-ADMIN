import React, {useEffect} from 'react';
import {Card, Col} from 'react-bootstrap';
import ReactEcharts from "echarts-for-react";

import getChartColorsArray from 'Common/ChartsDynamicColor';
import {useSelector} from 'react-redux';
import {createSelector} from 'reselect';

type PieChartDataItem = {
    name?: string;
    value: number;
    itemStyle?: {
        color?: string;
        decal?: {
            symbol: string;
        };
    };
    label?: {
        show: boolean;
    };
};

const PropertiesType = ({citizenship}: any) => {
    const dataColors = '["--tb-primary", "--tb-secondary", "--tb-light","--tb-danger", "--tb-success"]';
    // chart re-render
    const selectLayoutThemeType = createSelector(
        (state: any) => state.Layout,
        (layoutThemeType) => layoutThemeType.layoutThemeType
    );

    const layoutThemeType = useSelector(selectLayoutThemeType);

    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
        document.getElementsByClassName('apex-charts');
    }, [layoutThemeType]);

    const propertyTypeColors = getChartColorsArray(dataColors);

    const pieData: PieChartDataItem[] = Object.entries(citizenship || {}).map(
        ([name, values]) => {
            const v = values as { Bakalavr: number; Magistr: number };
            return {
                name,
                value: v.Bakalavr + v.Magistr
            };
        }
    );

    const total = pieData.reduce((sum, item) => sum + item.value, 0);

    pieData.push({
        value: total,
        itemStyle: {
            color: 'none',
            decal: {symbol: 'none'}
        },
        label: {show: false}
    });


    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '0%',
            left: 'center',
            // doesn't perfectly work with our tricks, disable it
            selectedMode: false,
            textStyle: {
                color: "#87888a"
            }
        },
        series: [
            {
                type: 'pie',
                radius: ['70%', '100%'],
                center: ['50%', '70%'],
                // adjust the start angle
                startAngle: 180,
                label: {
                    color: "#87888a",
                    formatter(param: any) {
                        // correct the percentage
                        return param.name + ' (' + param.percent * 2 + '%)';
                    }
                },
                itemStyle: {
                    // borderColor: 'transparent',
                    borderWidth: 4
                },
                data: pieData
            }
        ],
        color: propertyTypeColors
    };

    return (
        <React.Fragment>
            <Col xxl={5} className="order-last overflow-hidden">
                <Card>
                    <Card.Header className="d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Fuqaroligi bo'yicha</h4>

                    </Card.Header>
                    <Card.Body>
                        <ReactEcharts
                            option={option}
                            className="mx-auto"
                            style={{
                                height: "336px",
                                margin: "auto",
                                boxSizing: "border-box",
                                width: "600px",
                            }}
                        />
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default PropertiesType;
