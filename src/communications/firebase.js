import * as firebase from 'firebase'
import store from '../redux'
import {updateList} from "../action/action";
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBDmvaqTqo-gUDRm-z7ckEweK_fv2WCVw4",
    authDomain: "los-angeles-traffic-collisions.firebaseapp.com",
    databaseURL: "https://los-angeles-traffic-collisions.firebaseio.com",
    projectId: "los-angeles-traffic-collisions",
    storageBucket: "los-angeles-traffic-collisions.appspot.com",
    messagingSenderId: "982331521988",
    appId: "1:982331521988:web:13faf55f2f2b760c644291",
    measurementId: "G-8ZLG7RN53L"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let db = firebase.firestore();
let dataRef = db.collection("/data");

async function load100RecordInNormal(pages = 0, sortingBy = "Cross Street",) {
    dataRef.orderBy(sortingBy)
        .startAt("LOS FELIZ BL")
        .limit(100)
        .get()
        .then(res => {
            let data = [];
            res.forEach(doc => data.push(doc.data()));
            store.dispatch(updateList(data));
        })
}


export {load100RecordInNormal}
