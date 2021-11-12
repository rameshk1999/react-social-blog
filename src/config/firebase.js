import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAdtszVHbVsV2w5iWo9aEutJn6shHJsfqA",
  authDomain: "ourtodo-276b0.firebaseapp.com",
  projectId: "ourtodo-276b0",
  storageBucket: "ourtodo-276b0.appspot.com",
  messagingSenderId: "62309218533",
  appId: "1:62309218533:web:6023920b09da22a05bbc0c",
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

export default storage;
