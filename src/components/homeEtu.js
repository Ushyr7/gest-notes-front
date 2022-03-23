import { Component } from "react";
import React from 'react';

export default class homeEtu extends Component {
    componentDidMount() { 
        document.title = "Accueil étudiant"; 
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
                <h2>Bonjour {this.props.user.prenom} {this.props.user.nom}</h2>
            )
        } else {
            return(<h2> </h2>);
        }
    };
}



