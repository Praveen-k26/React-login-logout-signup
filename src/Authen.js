import React, { Component } from 'react';

var firebase = require('firebase');


var config = {
    apiKey: "AIzaSyCGfXSqCH83XnAFCWu6GdAZLYEcvkhzwf8",
    authDomain: "fir-login-4ed67.firebaseapp.com",
    databaseURL: "https://fir-login-4ed67.firebaseio.com",
    projectId: "fir-login-4ed67",
    storageBucket: "fir-login-4ed67.appspot.com",
    messagingSenderId: "666183919074"
  };
  firebase.initializeApp(config);



class Authen extends Component {

    login=(event) =>{
      const email = this.refs.email.value;
      const password = this.refs.password.value;
      console.log(email, password);

      const auth = firebase.auth();

     const promise = auth.signInWithEmailAndPassword(email, password);
     

     promise.then(user => {
         var lout = document.getElementById('logout');

         //write welcome message for user
         lout.classList.remove('hide')
     });

     promise.catch(err=>{
         var error = err.message;
         console.log(error);
         this.setState({error: error});
     });

    }

    signup=() => {

        const email= this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email, password);

        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, password);

        promise
        .then(user =>{
            var error = "Welcome " + user.email;
            firebase.database().ref('./user' + user.uid).set({
                email: user.email
            });
            console.log(user);
            this.setState({error: error});
        });
        promise.catch(err=>{
            var error = err.message;
            console.log(error);
            this.setState({error:error});
        });
    }

    logout= () => {
        firebase.auth().signOut();
        var lout = document.getElementById('logout');

        lout.classList.add('hide');
    }


    constructor(props){
        super(props);

        this.state = {
            error: ''
        };

        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.logout = this.logout.bind(this);
    }
    render(){
        return(
            <div>
              <input id="email" ref="email" type="email" placeholder="Enter your email"/><br/>
              <input id="pass" ref="password" type="password" placeholder="Enter your password"/><br/>
               <p>{this.state.error}</p>
              <button onClick={this.login}>Login</button>
              <button onClick={this.signup}>Sign up</button>
              <button onClick={this.logout} id="logout" className="hide">Log Out</button>
            </div>
        );
    }
}


export default Authen;