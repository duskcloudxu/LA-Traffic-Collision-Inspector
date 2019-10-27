import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Icon } from 'antd';
import logo from './logo.svg';
import {load100RecordInNormal} from "./communications/firebase";
import './App.css';
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
        // render: text => (
        //     <Highlighter
        //         highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
        //         searchWords={[this.state.searchText]}
        //         autoEscape
        //         textToHighlight={text.toString()}
        //     />
        // ),
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
                title: 'Address',
                width: 200,
                dataIndex: 'Address',
                // key: 'Address',
                fixed: 'left',
                sorter: (a, b) => a.Address.length - b.Address.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('Address'),
            },
            {
                title: 'Area ID',
                width: 100,
                dataIndex: 'Area ID',
                // key: 'Area ID',
                fixed: 'left',
            },
            {
                title: 'Area Name',
                dataIndex: 'Area Name',
                // key: '1',
                width: 150,
            },
            {
                title: 'Census Tracts',
                dataIndex: 'Census Tracts',
                // key: '2',
                width: 150,
            },
            {
                title: 'Council Districts',
                dataIndex: 'Council Districts',
                // key: '3',
                width: 150,
            },
            {
                title: 'Crime Code',
                dataIndex: 'Crime Code',
                // key: '4',
                width: 150,
            },
            {
                title: 'Crime Code Description',
                dataIndex: 'Crime Code Description',
                // key: '5',
                width: 150,
            },
            {
                title: 'Cross Street',
                dataIndex: 'Cross Street',
                // key: '6',
                width: 150,
            },
            {
                title: 'Date Occurred',
                dataIndex: 'Date Occurred',
                // key: '7',
                width: 200,
            },
            {
                title: 'Date Reported',
                dataIndex: 'Date Reported',
                // key: '7',
                width: 200,
            },
            {
                title: 'LA Specific Plans',
                dataIndex: 'LA Specific Plans',
                // key: '7',
                width: 150,
            },
            {
                title: 'Neighborhood Councils (Certified)',
                dataIndex: 'Neighborhood Councils (Certified)',
                // key: '7',
                width: 150,
            },
            {
                title: 'Precinct Boundaries',
                dataIndex: 'Precinct Boundaries',
                // key: '7',
                width: 150,
            },
            {
                title: 'Premise Code',
                dataIndex: 'Premise Code',
                // key: '7',
                width: 150,
            },
            {
                title: 'Premise Description',
                dataIndex: 'Premise Description',
                // key: '7',
                width: 150,
            },
            {
                title: 'Reporting District',
                dataIndex: 'Reporting District',
                // key: '7',
                width: 150,
            },
            {
                title: 'Time Occurred',
                dataIndex: 'Time Occurred',
                // key: '7',
                width: 150,
            },
            {
                title: 'Victim Age',
                dataIndex: 'Victim Age',
                // key: '7',
                width: 150,
            },
            {
                title: 'Victim Descent',
                dataIndex: 'Victim Descent',
                // key: '7',
                width: 150,
            },
            {
                title: 'Victim Sex',
                dataIndex: 'Victim Sex',
                // key: '7',
                width: 150,
            },
            {
                title: 'Zip Codes',
                dataIndex: 'Zip Codes',
                // key: '7',
                width: 150,
                defaultSortOrder: 'descend',
                sorter: (a,b) => a['Zip Codes'] - b['Zip Codes'],
                ...this.getColumnSearchProps('Zip Codes'),
            },
            {
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
