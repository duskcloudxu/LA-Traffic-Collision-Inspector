import React from 'react';
// import 'antd/dist/antd.css';
import { Table, Input, Button, Icon } from 'antd';
import {load100RecordInNormal} from "./communications/firebase";
// import './App.css';
import data from './sampleData.json';

class App extends React.Component {
    constructor() {
        super();
        console.log(load100RecordInNormal(1))

    }

    state = {
        searchText: '',
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
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
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

//filter function
    render() {
        const columns = [
            {
                // string
                title: 'Address',
                width: 200,
                dataIndex: 'Address',
                // key: 'Address',
                fixed: 'left',
                sorter: (a, b) => a["Address"].length - b["Address"].length,
                // sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('Address'),
            },
            {
                // int
                title: 'Area ID',
                width: 100,
                dataIndex: 'Area ID',
                // key: 'Area ID',
                fixed: 'left',
                sorter: (a,b) => a['Area ID'] - b['Area ID'],
                ...this.getColumnSearchProps('Area ID'),
            },
            {
                // string
                title: 'Area Name',
                dataIndex: 'Area Name',
                // key: '1',
                width: 150,
                sorter: (a,b) => a['Area Name'].length - b['Area Name'].length,
                ...this.getColumnSearchProps('Area Name'),
            },
            {
                // int
                title: 'Census Tracts',
                dataIndex: 'Census Tracts',
                // key: '2',
                width: 150,
                sorter: (a,b) => a['Census Tracts'] - b['Census Tracts'],
                ...this.getColumnSearchProps('Census Tracts'),
            },
            {
                // int
                title: 'Council Districts',
                dataIndex: 'Council Districts',
                // key: '3',
                width: 150,
                sorter: (a,b) => a['Census Tracts'] - b['Census Tracts'],
                ...this.getColumnSearchProps('Census Tracts'),
            },
            {
                // int
                title: 'Crime Code',
                dataIndex: 'Crime Code',
                // key: '4',
                width: 150,
                sorter: (a,b) => a['Crime Code'] - b['Crime Code'],
                ...this.getColumnSearchProps('Crime Code'),
            },
            {
                // string
                title: 'Crime Code Description',
                dataIndex: 'Crime Code Description',
                // key: '5',
                width: 150,
                sorter: (a,b) => a['Crime Code Description'].length - b['Crime Code Description'].length,
                ...this.getColumnSearchProps('Crime Code Description'),
            },
            {
                // string
                title: 'Cross Street',
                dataIndex: 'Cross Street',
                // key: '6',
                width: 150,
                sorter: (a,b) => a['Cross Street'].length - b['Cross Street'].length,
                ...this.getColumnSearchProps('Cross Street'),
            },
            {
                // string
                title: 'Date Occurred',
                dataIndex: 'Date Occurred',
                // key: '7',
                width: 200,
                sorter: (a, b) => { return a['Date Occurred'].localeCompare(b['Date Occurred'])},
                ...this.getColumnSearchProps('Date Occurred'),
            },
            {
                // string
                title: 'Date Reported',
                dataIndex: 'Date Reported',
                // key: '7',
                width: 200,
                sorter: (a, b) => { return a['Date Reported'].localeCompare(b['Date Occurred'])},
                ...this.getColumnSearchProps('Date Reported'),
            },
            {
                // This column should be int because it includes numbers only
                title: 'LA Specific Plans',
                dataIndex: 'LA Specific Plans',
                // key: '7',
                width: 150,
                sorter: (a,b) => a['LA Specific Plans'] - b['LA Specific Plans'],
                ...this.getColumnSearchProps('LA Specific Plans'),
            },
            {
                // int
                title: 'Neighborhood Councils (Certified)',
                dataIndex: 'Neighborhood Councils (Certified)',
                // key: '7',
                width: 150,
                sorter: (a,b) => a['Neighborhood Councils (Certified)'] - b['Neighborhood Councils (Certified)'],
                ...this.getColumnSearchProps('Neighborhood Councils (Certified)'),
            },
            {
                // int
                title: 'Precinct Boundaries',
                dataIndex: 'Precinct Boundaries',
                // key: '7',
                width: 150,
                sorter: (a,b) => a['Precinct Boundaries'] - b['Precinct Boundaries'],
                ...this.getColumnSearchProps('Precinct Boundaries'),
            },
            {
                // int
                title: 'Premise Code',
                dataIndex: 'Premise Code',
                // key: '7',
                width: 150,
                sorter: (a,b) => a['Premise Code'] - b['Premise Code'],
                ...this.getColumnSearchProps('Premise Code'),
            },
            {
                // string
                title: 'Premise Description',
                dataIndex: 'Premise Description',
                // key: '7',
                width: 150,
                sorter: (a,b) => a['Premise Description'].length - b['Premise Description'].length,
                ...this.getColumnSearchProps('Premise Description'),
            },
            {
                // int
                title: 'Reporting District',
                dataIndex: 'Reporting District',
                // key: '7',
                width: 150,
                sorter: (a,b) => a['Reporting District'] - b['Reporting District'],
                ...this.getColumnSearchProps('Reporting District'),
            },
            {
                // int
                title: 'Time Occurred',
                dataIndex: 'Time Occurred',
                // key: '7',
                width: 150,
                sorter: (a,b) => a['Time Occurred'] - b['Time Occurred'],
                ...this.getColumnSearchProps('Time Occurred'),
            },
            {
                // int
                title: 'Victim Age',
                dataIndex: 'Victim Age',
                // key: '7',
                width: 150,
                sorter: (a,b) => a['Victim Age'] - b['Victim Age'],
                ...this.getColumnSearchProps('Victim Age'),
            },
            {
                // string
                title: 'Victim Descent',
                dataIndex: 'Victim Descent',
                // key: '7',
                width: 150,
                sorter: (a, b) => { return a['Victim Descent'].localeCompare(b['Victim Descent'])},
                ...this.getColumnSearchProps('Victim Descent'),
            },
            {
                // string
                title: 'Victim Sex',
                dataIndex: 'Victim Sex',
                // key: '7',
                width: 150,
                // JavaScript String#localeCompare function
                sorter: (a, b) => { return a['Victim Sex'].localeCompare(b['Victim Sex'])},
                ...this.getColumnSearchProps('Victim Sex'),
            },
            {
                // int
                title: 'Zip Codes',
                dataIndex: 'Zip Codes',
                // key: '7',
                width: 150,
                defaultSortOrder: 'descend',
                sorter: (a,b) => a['Zip Codes'] - b['Zip Codes'],
                ...this.getColumnSearchProps('Zip Codes'),
            },
            {
                // int
                title: 'index',
                dataIndex: 'index',
                // key: '7',
                width: 110,
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.index - b.index,
                fixed: 'right',
                ...this.getColumnSearchProps('index'),
            },
        ];
        return <Table columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: 10 }} scroll={{ x: 1500, y: 480 }} />;
    }
}

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
}

export default App;
