import React from 'react';
// import 'antd/dist/antd.css';
import {Table, Input, Button, Icon, Slider, DatePicker, Dropdown, Menu} from 'antd';
import {connect} from 'react-redux'
// import './App.css';
import data from './sampleData.json';
import {clearList, filterList, updateList} from "./action/action";
import Axios from "axios";
import Spin from "antd/es/spin";
import MyEcharts from "./components/MyEcharts";
import {Checkbox, Row, Col} from "antd";

const {RangePicker} = DatePicker;

class App extends React.Component {
    constructor() {
        super();
        Axios.get("http://localhost:8081/allData", {
            headers: {
                'Access-Control-Allow-Origin': "*"
            }
        })
            .then((res) => {
                console.log(res.data);
                this.props.dispatch(updateList(res.data));
            })
    }


    state = {
        searchText: '',
        chartDataFields: ["Date Occurred", "Area ID"],
        dataFieldType: {
            "Date Occurred": "lineChartForDate",
            "Area ID": "pieChart",
            "Census Tracts": "barChart",
            "Victim Sex":"pieChart",
            "Time Occurred":"lineChart",
            "Victim Descent":"pieChart",
        },
        rangeQuery: {
            "Census Tracts": [0, 2342],
            "Address": "",
            "Area ID": Array(21).fill(0).map((item, index) => index + 1),
            "Area Name": "",
            "DRNumber": [100000000, 200000000],
            "Time Occurred": [1, 2400],
            "Victim Descent": "",
            "Victim Sex": "",
        },
        defaultRangeQuery: {
            "Census Tracts": [0, 2342],
            "Address": "",
            "Area ID": Array(21).fill(0).map((item, index) => index + 1),
            "Area Name": "",
            "DRNumber": [100000000, 200000000],
            "Time Occurred": [1, 2400],
            "Victim Descent": "",
            "Victim Sex": "",
        }
    };

    getRangeSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Slider range max={this.state.defaultRangeQuery[dataIndex][1]}
                        min={this.state.defaultRangeQuery[dataIndex][0]}
                        value={[this.state.rangeQuery[dataIndex][0], this.state.rangeQuery[dataIndex][1]]}
                        defaultValue={[0, 2342]}
                        onChange={value => {
                            let newState = {...this.state};
                            newState.rangeQuery[dataIndex] = value;
                            this.setState(newState);
                        }}
                        onAfterChange={(value) => this.handleRangeQuery(value, dataIndex)}/>
                <Button
                    type="primary"
                    onClick={() => this.handleFilter(selectedKeys, confirm)}
                    icon="filter"
                    size="small"
                    style={{width: 90, marginRight: 8, marginBottom: 8}}
                >
                    Filter
                </Button>

                <Button onClick={() => this.handleReset(dataIndex, clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={(e) => {
                        let newState = {...this.state};
                        newState.rangeQuery[dataIndex] = [e.target.value, e.target.value];
                        this.setState(newState);
                        this.updateFilterData();
                    }}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
    });
    getDateSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <RangePicker format={"YYYY-MM-DD"} style={{display: "block"}}
                             onChange={(date) => this.handleRangeQuery(date, dataIndex)}/>
                <Button
                    type="primary"
                    onClick={() => this.handleFilter(selectedKeys, confirm)}
                    icon="filter"
                    size="small"
                    style={{width: 90, marginRight: 8, marginBottom: 8, marginTop: 8}}
                >
                    Filter
                </Button>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
    });
    getStringSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(dataIndex, clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
    });
    getTypeSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Checkbox.Group style={{width: 282, padding: 13}}
                                options={this.state.defaultRangeQuery[dataIndex].map(item => item.toString())}
                                defaultValue={this.state.defaultRangeQuery[dataIndex].map(item => item.toString())}
                                value={this.state.rangeQuery[dataIndex].map(item => item.toString())}
                                onChange={arr => {
                                    this.handleRangeQuery(arr.map(item => parseInt(item)), dataIndex)
                                }}
                />
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button
                        type="primary"
                        onClick={() => this.handleFilter(selectedKeys, confirm, dataIndex)}
                        icon="Filter"
                        size="small"
                        style={{width: 90, marginRight: 20}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(dataIndex, clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button></div>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
    });
    getMenuByHandle = handle => {
        let dataFieldList = [ "Area ID", "Census Tracts", "Date Occurred",  "Time Occurred", "Victim Descent", "Victim Sex"]
        return (
            <Menu>
                {dataFieldList.map(item => (
                    <Menu.Item onClick={() => {
                        let newChartDataFields = this.state.chartDataFields;
                        newChartDataFields[handle] = item;
                        this.setState({chartDataFields: newChartDataFields})
                    }}>
                        <a>
                            {item}
                        </a>
                    </Menu.Item>
                ))}
            </Menu>
        );
    }

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        let newQuery = this.state.rangeQuery;
        newQuery[dataIndex] = selectedKeys[0];
        this.setState({...this.state, "rangeQuery": newQuery});
        confirm();
        this.updateFilterData();
    };

    handleReset = (dataIndex, clearFilter) => {
        let newQuery = this.state.rangeQuery;
        newQuery[dataIndex] = this.state.defaultRangeQuery[dataIndex];
        this.setState({...this.state, "rangeQuery": newQuery});
        this.updateFilterData();
        clearFilter();

    };

    handleRangeQuery(value, dataIndex) {
        let newRangeQuery = this.state.rangeQuery;
        newRangeQuery[dataIndex] = value;
        if (dataIndex === "Date Occurred") {
            newRangeQuery[dataIndex] = newRangeQuery[dataIndex].map(item => item.toDate())
        }
        this.setState({...this.state, "rangeQuery": newRangeQuery});

    }

    handleFilter(_, confirm) {
        this.updateFilterData();
        confirm();
    }

    updateFilterData = () => {
        this.props.dispatch(clearList());
        Axios.get("http://localhost:8081/getDataWithFilter", {
            headers: {
                'Access-Control-Allow-Origin': "*"
            },
            params: {
                query: this.state.rangeQuery
            }
        })
            .then((res) => {
                this.props.dispatch(updateList(res.data));
            });
    }

    handleChange(pagination, filter, sorter) {


    }

//filter function
    render() {

        const columns = [
            {
                // string
                title: 'Address',
                width: 100,
                dataIndex: 'Address',
                // key: 'Address',
                sorter: (a, b) => {
                    return a.Address.localeCompare(b.Address)
                },
                sortDirections: ['descend', 'ascend'],
                ...this.getStringSearchProps("Address")
            },
            {
                // string
                title: 'Area Name',
                width: 70,
                dataIndex: 'Area Name',
                sorter: (a, b) => {
                    return a["Area Name"].localeCompare(b["Area Name"])
                },
                sortDirections: ['descend', 'ascend'],
                ...this.getStringSearchProps("Area Name")
            },
            {
                // int
                title: 'Area ID',
                width: 70,
                dataIndex: 'Area ID',
                // key: 'Area ID',
                sorter: (a, b) => a["Area ID"] - b["Area ID"],
                ...this.getTypeSearchProps("Area ID")
            },
            {
                // int
                title: 'Census Tracts',
                dataIndex: 'Census Tracts',
                // key: '2',
                width: 50,
                sorter: (a, b) => {

                    if (a["Census Tracts"] === "") a["Census Tracts"] = "0";
                    if (b["Census Tracts"] === "") b["Census Tracts"] = "0";
                    return a["Census Tracts"] - b["Census Tracts"]
                },
                ...this.getRangeSearchProps('Census Tracts'),
            },
            {
                // string
                title: 'Date Occurred',
                dataIndex: 'Date Occurred',
                // key: '7',
                width: 100,
                sorter: (a, b) => {
                    return a["Date Occurred"].localeCompare(b["Date Occurred"])
                },
                ...this.getDateSearchProps('Date Occurred'),
            },
            {
                // int
                title: 'DRNumber',
                dataIndex: 'DRNumber',
                // key: '2',
                width: 60,
                sorter: (a, b) => {

                    if (a["DRNumber"] === "") a["DRNumber"] = "0";
                    if (b["DRNumber"] === "") b["DRNumber"] = "0";
                    return a["DRNumber"] - b["DRNumber"]
                },
                ...this.getRangeSearchProps('DRNumber'),
            },
            {
                // int
                title: 'Time Occurred',
                dataIndex: 'Time Occurred',
                // key: '2',
                width: 70,
                sorter: (a, b) => {

                    if (a["Time Occurred"] === "") a["Time Occurred"] = "0";
                    if (b["Time Occurred"] === "") b["Time Occurred"] = "0";
                    return a["Time Occurred"] - b["Time Occurred"]
                },
                ...this.getRangeSearchProps('Time Occurred'),
            },
            {
                // string
                title: 'Victim Descent',
                width: 70,
                dataIndex: 'Victim Descent',
                sorter: (a, b) => {
                    return a["Victim Descent"].localeCompare(b["Victim Descent"])
                },
                sortDirections: ['descend', 'ascend'],
                ...this.getStringSearchProps("Victim Descent")
            },
            {
                // string
                title: 'Victim Sex',
                width: 70,
                dataIndex: 'Victim Sex',
                sorter: (a, b) => {
                    return a["Victim Sex"].localeCompare(b["Victim Sex"])
                },
                sortDirections: ['descend', 'ascend'],
                ...this.getStringSearchProps("Victim Sex")
            },

        ];
        if (this.props.isLoaded) return (
            <div className={"app"}>
                <Table className={"antdTable"}
                       columns={columns}
                       bordered={false}
                       rowKey={record => record.DRNumber}
                       dataSource={this.props.list}
                       onChange={this.handleChange}
                       pagination={{pageSize: 10}}
                       scroll={{y: 500, x: 1500}}
                       size={"middle"}

                />
                <div className={"chartBar"}>
                    <Dropdown overlay={this.getMenuByHandle(0)}
                              className={"dropdownBtn"}

                              placement="bottomLeft">
                        <Button>{this.state.chartDataFields[0]}</Button>
                    </Dropdown>
                    <MyEcharts dataIndex={this.state.chartDataFields[0]}
                               chartType={this.state.dataFieldType[this.state.chartDataFields[0]]}/>
                    <Dropdown overlay={this.getMenuByHandle(1)}
                              className={"dropdownBtn"}

                              placement="bottomLeft">
                        <Button>{this.state.chartDataFields[1]}</Button>
                    </Dropdown>
                    <MyEcharts dataIndex={this.state.chartDataFields[1]}
                               chartType={this.state.dataFieldType[this.state.chartDataFields[1]]}/>
                </div>
            </div>
        );
        else return (
            <div className={"app"}>
                <Spin size={"large"} className={"spin"}/>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        list: state.list,
        metaData: state.metaData,
        isLoaded: state.isLoaded
    }
}

export default connect(mapStateToProps)(App);
