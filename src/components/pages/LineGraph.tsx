import { ResponsiveLine } from '@nivo/line'
import * as React from "react";
import data from './data.json';
import { HubConnectionBuilder } from '@microsoft/signalr';
import {useEffect, useState} from "react";
import {Line} from "../../models/Line";
import {Point} from "../../models/Point";

export function LineGraph(){
    let d: Point[] = [];
    d.push(new Point("plane", 134));
    d.push(new Point("helicopter", 47));
    d.push(new Point("boat", 159));
    d.push(new Point("train", 25));
    d.push(new Point("subway", 150));
    d.push(new Point("bus", 125));
    d.push(new Point("car", 21));
    d.push(new Point("moto", 10));
    d.push(new Point("bicycle", 34));
    d.push(new Point("horse", 151));
    d.push(new Point("skateboard", 207));
    d.push(new Point("others", 140));
    let line = new Line();
    line.data = d;
    let q: Line[] = [];
    q.push(line)
    const [lines, setLines] = useState<Line[]>(q)
    /*const [data, setData] = useState<[{
        id: string,
        color: string,
        data: any[]
    }]>([{
        id: 'graph',
        color: 'hsl(30, 70%, 50%)',
        data: new Array()
    }]);*/

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44396/chat')
            .withAutomaticReconnect()
            .build();
        newConnection.start()
            .then((result: any) => {
            console.log('Connected!');
            newConnection.on('Send', (message: any) => {
                console.log(message);
            })
        })
            .catch((ex: any) => {
                console.log(ex)
            })
    }, []);


    return(
        <ResponsiveLine
            data={lines}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            lineWidth={1}
            enablePoints={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableArea={true}
            useMesh={true}
            theme={{
                "background": "#03011e",
                "textColor": "#ffffff",
                "fontSize": 9,
                "axis": {
                    "domain": {
                        "line": {
                            "stroke": "#1f1f1f",
                            "strokeWidth": 1
                        }
                    },
                    "ticks": {
                        "line": {
                            "stroke": "#1f1f1f",
                            "strokeWidth": 1
                        }
                    }
                },
                "grid": {
                    "line": {
                        "stroke": "#1f1f1f",
                        "strokeWidth": 1
                    }
                }
            }}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )
}
