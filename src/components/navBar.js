import React, { Component } from 'react';
import axios from 'axios';

export default class NavBar extends Component {
    
    handleLogout= () => {
        axios.delete('/logoutEtu');
        axios.delete('/logoutEns');
        axios.delete('/logoutAdmin');
        localStorage.clear();
    }
    

    render() {

        if(this.props.user) {         
            if(localStorage.getItem('role') === "etudiant") { 
                return (
                    <nav>
                        <div class="nav-wrapper teal lighten-2">
                            <a href="http://localhost:3000/homeetu" class="brand-logo">Accueil</a>
                            <a href="http://localhost:3000/" onClick={this.handleLogout} class="right"> Se déconnecter</a>
                            <ul id="nav-mobile" class="left hide-on-med-and-down">
                            </ul>
                        </div>
                    </nav> 
                    );
            }
            else if(localStorage.getItem('role') === "enseignant"){// 
                return (
                    <nav>
                        <div class="nav-wrapper teal lighten-2">
                            <a href="http://localhost:3000/homeEns" class="brand-logo">Accueil</a>
                            <a href="http://localhost:3000/" onClick={this.handleLogout} class="right"> Se déconnecter</a>
                            <ul id="nav-mobile" class="left hide-on-med-and-down">
                            </ul>

                        </div>
                    </nav> 
                    );
            }
            else if(localStorage.getItem('role') === "admin")  { 
                return (
                    <nav>
                        <div class="nav-wrapper teal lighten-2">
                            <a href="http://localhost:3000/homeAdmin" class="brand-logo">Accueil</a>
                            <a href="http://localhost:3000/admin" onClick={this.handleLogout} class="right"> Se déconnecter</a>
                            <ul id="nav-mobile" class="left hide-on-med-and-down">
                            </ul>
                        </div>
                    </nav> 
                    );
            }
            return (
            <nav>
                <div class="nav-wrapper teal lighten-2">
                    <a href="http://localhost:3000/homeetu" class="brand-logo">Accueil</a>
                    <a href="http://localhost:3000/" onClick={this.handleLogout} class="right"> Se déconnecter</a>
                    <ul id="nav-mobile" class="left hide-on-med-and-down">
                    </ul>
                </div>
            </nav> 
            );
        } else {
            return (
                <nav>
                    <div class="nav-wrapper teal lighten-2">
                        <a href="http://localhost:3000/" class="brand-logo">Accueil</a>
                        <ul id="nav-mobile" class="left hide-on-med-and-down">
                        </ul>
                    </div>
                </nav> 
                );
        }
    }
}