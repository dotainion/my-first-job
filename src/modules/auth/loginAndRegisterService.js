import config from '../config/firebaseServiceAccount';
import firebase from 'firebase';

firebase.initializeApp(config);

export class FirebaseAuth{
    async login(email,password){
        try{
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            window.localStorage.setItem("login",JSON.stringify(true));
            return {state:true,message:"",data:response};
        }catch(error){
            window.localStorage.setItem("login",JSON.stringify(false));
            if (error.code === "auth/user-not-found"){
                return {state:null,message:"User dose not exist or may have been deactivated",data:null};
            }else if (error.code === "auth/network-request-failed"){
                return {state:"no-connection",message:"Unable to connect to server, try again later",data:null};
            }else{
                return {state:false,message:"Email or password is incorrect",data:null};
            }
        }
    }

    async register(email,password){
        try{
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            window.localStorage.setItem("login",JSON.stringify(true));
            return {state:true,message:"",data:response};
        }catch(error){
            window.localStorage.setItem("login",JSON.stringify(false));
            return {state:false,message:error.message,data:null};
        }
    }
}