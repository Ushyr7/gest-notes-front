import { Component } from "react";
import React from 'react';


export default class homeAdmin extends Component {
    componentDidMount() {  
        document.title = "Accueil administrateur"; 
        const rCount = sessionStorage.getItem('rCount');
        if(rCount < 1) {
          sessionStorage.setItem('rCount', String(rCount + 1));
          window.location.reload();
        } else {
          sessionStorage.removeItem('rCount');
        }
    }

    render() {
        if(this.props.user) {  
            return (
                <>
                <div class="container">
                    <h5>Bonjour {this.props.user.id}</h5>
                    <div class="container">
                        <table class="highlight teal lighten-4">
                        <tbody>
                            <tr>
                                <div class ="row valign-wrapper center">
                                        <div class="col s4 m4">
                                            <div class="card">
                                                <div class="card-action blue-text">
                                                    <a href="/homeadmin/univ">Universités</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col s4 m4">
                                            <div class="card">
                                                <div class="card-action">
                                                    <a href="/homeadmin/fac">Facultés</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col s4 m4">
                                            <div class="card">
                                                <div class="card-action">
                                                    <a href="/homeadmin/dep">Départements</a>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </tr>
                            <tr>
                                <div class = "row valign-wrapper center">
                                <div class="col s4 m4">
                                            <div class="card">
                                                <div class="card-action">
                                                    <a href="/homeadmin/forma">Formations</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col s4 m4">
                                            <div class="card">
                                                <div class="card-action">
                                                    <a href="/homeadmin/mod">Modules</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col s4 m4">
                                            <div class="card">
                                                <div class="card-action">
                                                    <a href="/homeadmin/enseigmt">Enseignements</a>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </tr>
                            <tr>
                                <div class = "row valign-wrapper center">
                                <div class="col s6 m6">
                                            <div class="card">
                                                <div class="card-action">
                                                    <a href="/homeadmin/etu">Etudiants</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col s6 m6">
                                            <div class="card">
                                                <div class="card-action">
                                                    <a href="/homeadmin/ens">Enseignants</a>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </tr>
                            <tr>
                                <div class = "row valign-wrapper center">
                                <div class="col s12 m12">
                                            <div class="card">
                                                <div class="card-action">
                                                    <a href="/homeadmin/archive">Archive</a>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </tr>
                        </tbody>
                        </table>
                    </div> 
                </div>
                </>
            );
        } else {
            return(<h2> </h2>);
        }
    };
}