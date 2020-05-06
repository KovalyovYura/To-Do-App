import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Todo from "../Todo";
import About from "../About";
import Navbar from "../Navbar"
import {AlertState} from "../../Context/Alert/AlertState";
import {Alert} from "../Alert/Alert";
import {FirebaseState} from "../../Context/firebase/FirebaseState";




export const App = () => {

    return (
        <FirebaseState>
            <AlertState>
                <BrowserRouter>
                    <Navbar/>
                    <div className="container pt-4">
                        <Alert/>
                        <Switch>
                            <Route path={'/'} exact component={Todo}/>
                            <Route path={'/about'}  component={About}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </AlertState>
        </FirebaseState>
    );
};