import React, { Component } from "react";
import axios from "axios";
import { Chart as GChart } from "react-google-charts";

function Value(props) {
    const date = new Date(props.timestamp * 1000);
    return <li>{`${date.toDateString()}: ${props.value}`}</li>;
}

class Chart extends Component {
    render() {
        let data = [["Date", "Trend Score"]];
        this.props.data?.forEach((element) => {
            data.push([new Date(element.timestamp * 1000), element.value]);
        });

        console.log(data);

        return (
            <GChart
                width={this.props.width}
                height={this.props.height}
                chartType="Line"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    legend: "none",
                }}
            />
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        axios
            .get(`http://127.0.0.1:5000/trends/AMD`)
            .then((res) => {
                this.setState({ data: res.data });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <div className="App">
                <Chart width={"100%"} height={600} data={this.state.data} />
                {this.state.data &&
                    this.state.data.map((current) => (
                        <Value key={current.timestamp} {...current} />
                    ))}
            </div>
        );
    }
}

export default App;
