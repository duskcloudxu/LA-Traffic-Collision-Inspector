import React from 'react';
import {Table} from 'antd';
import Axios from 'axios'
import ReactEcharts from 'echarts-for-react'
import {connect} from "react-redux";
import {updateList} from "./action/action";
import MyEcharts from './components/MyEcharts'


class Test extends React.Component {


    constructor() {
        super();
        Axios.get("http://localhost:8081/allData", {
            headers: {
                'Access-Control-Allow-Origin': "*"
            }
        })
            .then((res) => {
                this.props.dispatch(updateList(res.data));
            })
    }

    componentDidMount() {
    }


    render() {
        return (
            <div style={{display: "flex"}}>

                <MyEcharts dataIndex={"Date Occurred"} chartType={"lineChartForDate"}/>
            </div>

        )
            ;
    }
}

function

mapStateToProps(state) {
    return {
        list: state.list
    }
}

export default connect(mapStateToProps)
(
    Test
)
;