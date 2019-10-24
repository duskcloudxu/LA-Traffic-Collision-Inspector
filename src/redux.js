import {createStore} from 'redux'
let initialState={
    "list":[]
}
function reducer(state=initialState, action) {
    switch (action.type) {
        case "updateList": {
            return {...state,list:action.data};
        }
    }
    return state;
}
const store=createStore(reducer,initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;