import React from 'react';
// import 'antd/dist/antd.css';
import {Table, Input, Button, Icon, Slider, DatePicker} from 'antd';
import {connect} from 'react-redux'
// import './App.css';
import data from './sampleData.json';
import {clearList, filterList, updateList} from "./action/action";
import Axios from "axios";
import Spin from "antd/es/spin";

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
        rangeQuery: {
            "Census Tracts": [0, 2342],
            "Address": ""
        },
        defaultRangeQuery: {
            "Census Tracts": [0, 2342],
            "Address": ""
        }
    };

    getRangeSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Slider range max={2342} min={0}
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
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm,dataIndex)}
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
        let metaData = this.props.metaData;
        const columns = [
            {
                // string
                title: 'Address',
                width: 200,
                dataIndex: 'Address',
                // key: 'Address',
                sorter: (a, b) => {
                    return a.Address.localeCompare(b.Address)
                },
                sortDirections: ['descend', 'ascend'],
                ...this.getStringSearchProps("Address")
            },
            {
                // int
                title: 'Area ID',
                width: 100,
                dataIndex: 'Area ID',
                // key: 'Area ID',
                sorter: (a, b) => a["Area ID"] - b["Area ID"],
                filters: (Array(metaData.rangeOfAreaID.end - metaData.rangeOfAreaID.start + 1).fill(0)
                    .map((item, index) => {
                        return {
                            "text": index + metaData.rangeOfAreaID.start,
                            "value": index + metaData.rangeOfAreaID.start
                        }
                    })),
                onFilter: (value, record) => record["Area ID"] === value
            },

            {
                // int
                title: 'Census Tracts',
                dataIndex: 'Census Tracts',
                // key: '2',
                width: 200,
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
                width: 200,
                sorter: (a, b) => {
                    return a["Date Occurred"].localeCompare(b["Date Occurred"])
                },
                ...this.getDateSearchProps('Date Occurred'),
            },


        ];
        if(this.props.isLoaded)return (
            <div className={"app"}>
                <Table className={"antdTable"}
                    columns={columns}
                    rowKey={record => record.DRNumber}
                    dataSource={this.props.list}
                    onChange={this.handleChange}
                    pagination={{pageSize: 13}}
                        scroll={{ y: 450}}
                        size={"middle"}

                />
            </div>
        );
        else return(
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
        isLoaded:state.isLoaded
    }
}

export default connect(mapStateToProps)(App);
