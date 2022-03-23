import React,{ useState, useEffect } from "react";
import axios from "axios";
import '../style/ens.css';

const HomeEns = (props) => {

    const [dataList,setDataList] = useState([]);
    const [idEnseignement,setIdEnseignement] = useState('');
    const [cuurentEnsignement,setCuurentEnsignement] = useState([]);
    const [moduleName,setmoduleName] = useState('');



    const goModule = async(e) => {
        e.preventDefault();
        
        console.log(idEnseignement);
        const options = {
            headers: {"content-type": "application/json"}
        }
        const data = {
            id: idEnseignement
        };
        axios.post('api/ens/ensgmt/note',data,options).then(res=> {
            console.log(res.data);
            setCuurentEnsignement(res.data)
        });
        document.querySelector('.cover-all').classList.toggle('show');

    }

    const closeModule = () => {
        setCuurentEnsignement([]);
        document.querySelector('.cover-all').classList.toggle('show');
    }

    useEffect ( ()=> {
        const rCount = sessionStorage.getItem('rCount');
        if(rCount < 1) {
          sessionStorage.setItem('rCount', String(rCount + 1));
          window.location.reload();
        } else {
          sessionStorage.removeItem('rCount');
        }
    },[]);

    //obtention des infos quand le num de l'enseignant est défini seulement
    useEffect ( ()=> {
        // récupérer les enseignements
        const options = {
            headers: {"content-type": "application/json"}
        }
        const data = {
            num: props?.user?.num
        };
        axios.post('api/ens/ensgmt',data,options).then(res=> {
            setDataList(res.data)
        });
    },[props?.user?.num]);

    

    if(props.user) {  
        return (
            <React.Fragment>
            <div class="container">
                 <h4>Bonjour {props.user.prenom} {props.user.nom}</h4>
                  <div>
                    <div class= "container">
                        <h5>Vos enseignements :</h5>
                        <table class ="highlight stripped responsive-table">
                            <thead>
                                <tr class="grey lighten-2">
                                    <th>Identifiant</th>
                                    <th>TP</th>
                                    <th>CC1</th>
                                    <th>CC2</th>
                                    <th>Exam</th>
                                    <th>Module</th>
                                    <th>Nom</th>
                                    <th>Notes</th>

                                </tr>
                            </thead>

                            <tbody class="white">          
                       
                                {dataList.map((val)=> {
                           
                                    return (
                                        <tr className="ensg_tr" >
                                            <td>{val.idEnseignement}</td>
                                            <td>{val.coeffTP}</td>
                                            <td>{val.coeffCC1}</td>
                                            <td>{val.coeffCC2}</td>
                                            <td>{val.coeffExam}</td>
                                            <td>{val.nomModule}</td>
                                            <td>{val.nomEnseignement}</td>      
                                            <td>
                                            <form onSubmit={goModule}>
                                                <input id={val.idEnseignement} type="hidden" value={val.idEnseignement} />

                                                <button type="submit"  onClick={ e => {
                                                    setIdEnseignement(document.getElementById(""+val.idEnseignement).value);
                                                    setmoduleName(val.nomModule);
                                                }}>
                                                    <i class="fas fa-tv"/>
                                                </button>    
                                            </form>   
                                                                      
                                            </td>
                                        </tr>
                                        )
                                    })}
                          
                                </tbody>
                            </table>
                        </div>
                    </div>
                

                              
               
            </div>
            <div className="cover-all">
                     <div class="card white large-div">
                        <div class="card-content black-text ">
                            <i class="fas fa-times" onClick={closeModule}></i>
                            <h5>Notes des étudiant pour le module {moduleName} </h5>
                            <table className="highlight">

                            <thead>
                                <tr class="">
                                    <th>Nom et prénom </th>
                                    <th>Note TP</th>
                                    <th>Note CC1</th>
                                    <th>Note CC2</th>
                                    <th>Note Exam</th>
                                    <th>Session</th>
                                    <th>Année Univ</th>
                                </tr>
                            </thead>
                            {cuurentEnsignement.map((val)=> {
                            return (
                                <tr>
                                    <td>{val.nomEtu} {val.prenomEtu}</td>
                                    <td>{val.noteTP}</td>
                                    <td>{val.noteCC1}</td>
                                    <td>{val.noteCC2}</td>
                                    <td>{val.noteExam}</td>
                                    <td>{val.session}</td>
                                    <td>{val.AnnéeUniv}</td>
                                 </tr>

                            )})}
                            

                            </table>
                        </div> 
                     </div> 
            </div>  
            </React.Fragment>

        )
    } else {
        return(<h2> </h2>);
    }
};

export default HomeEns;