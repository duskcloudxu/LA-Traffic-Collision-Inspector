import {createStore,applyMiddleware} from 'redux'
import axios from "axios";
import thunk from 'redux-thunk';

let initialState = {
    "list": [],
    metaData: {
        "rangeOfAreaID": {
            "start": 1,
            "end": 19
        },
    },
    isLoaded:false
}



function reducer(state = initialState, action) {
    switch (action.type) {
        case "filterList": {
            let newList = state.list;
            let rangeDataIndexs = Object.keys(action.rangeQuery);
            newList = newList.filter(item => {
                    for (let i = 0; i < rangeDataIndexs.length; i++) {
                        let dataIndex = rangeDataIndexs[i];
                        if(dataIndex==="Date Occurred"){
                            debugger;
                            let curTime=item[dataIndex];
                            let lowerBound=action.rangeQuery[dataIndex][0];
                            let upperBound=action.rangeQuery[dataIndex][1];
                            if(Date.parse(curTime)<Date.parse(lowerBound)||Date.parse(curTime)>Date.parse(upperBound))
                                return false;

                        }
                        else if (item[dataIndex] < action.rangeQuery[dataIndex][0] || item[dataIndex] > action.rangeQuery[dataIndex][1])
                            return false;
                    }
                    return true;
                }
            )
            return {...state, "list": newList};
        }
        case "updateList":{
            return {...state,"list":action.data,"isLoaded":true}
        }
        case "clearList":{
            return {...state,"list":[],"isLoaded":false};
        }

    }
    return state;
}

const store = createStore(reducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;