import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';



const UnivCRUD =() => {
    const[dataList, setDataList] = useState([]);
    const[idUniversite, setidUniversite] = useState("");
    const[nomUniversite, setnomUniversite] = useState("");
    const[method,setMethod] = useState("");

    const openExitAddFac = () => {
         document.querySelector('.cover-all').classList.toggle('show');
         //état par défaut des forms
         document.querySelector("#editForm").style.display = "none";
         document.querySelector("#addForm").style.display = "block";
         //state par défaut
         setidUniversite("");
         setnomUniversite("");
         setMethod("Ajouter");
    }

    const handleSubmitAddUniv =  type => async(e) => {
        e.preventDefault();
        console.log(type);

        const data = {
             id: idUniversite,
             nom: nomUniversite,
        }
        console.log(data);
        const options = {
            headers: {"content-type": "application/json"}
        }

        if(type === "add") {
            axios.post('api/univ',data,options)
            .then(res=> {
                console.log('succes');  
                alert("université ajoutée avec succés");
                document.location.reload();
    
            });
        } else {
            axios.put('api/univ',data,options)
            .then(res=> {
                console.log('succes');  
                alert("université modifiée avec succés");
                document.location.reload();
    
            });
        }
       
    };

    //supprimer une université 
    const deleteUniv =  async(e) => {
        e.preventDefault();

        const data = {
                id: idUniversite,
        }
        const options = {
            headers: {"content-type": "application/json"}
        }
        axios.post('api/univ/del',data,options)
        .then(res=> {
            console.log('succes');  
            alert("université supprimer avec succés");
            document.location.reload();

        });
    };

    const openEditUniv = (e) => {
        e.preventDefault();

        axios.get('api/univ/all').then(res=> {
            const result = res.data.filter(v => v.idUniversite  === idUniversite);
            
            //obtenir les information de l'université 
            setidUniversite(result[0].idUniversite);
            setnomUniversite(result[0].nomUniversite);
            setMethod("Modifier");

        });

        //afficher le formulaire de la modification
        document.querySelector('.cover-all').classList.toggle('show');
        document.querySelector("#addForm").style.display = "none";
        document.querySelector("#editForm").style.display = "block";

    }

    useEffect(() => {
        document.title="Universités - Admin";
        axios.get('api/univ/all').then(res=> {
            setDataList(res.data)
        });
    },[]);

    if(localStorage.getItem('token')) {
        return(
            <>
                <div class="container">
                    <h4>Liste des Universités dans la base de donées :</h4>
                    <table class ="highlight stripped">
                        <thead>
                            <tr class="grey lighten-2">
                                <th>N°</th>
                                <th>Nom</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="grey lighten-3">          
                            {dataList.map((val)=> {
                                return (
                                        <tr>
                                            <td>{val.idUniversite}</td>
                                            <td>{val.nomUniversite}</td>
                                            <td className="iconsTd">
                                                <form onSubmit={deleteUniv}>
                                                    <input id={val.idUniversite} type="hidden" value={val.idUniversite} />
                                                    <button type="submit"  onClick={e => setidUniversite(document.getElementById(""+val.idUniversite).value)}><i class="fas fa-trash-alt"/></button>    
                                                </form> 

                                                 <form onSubmit={openEditUniv}>
                                                    <input id={val.idUniversite} type="hidden" value={val.idUniversite} />
                                                    <button type="submit"  onClick={e => setidUniversite(document.getElementById(""+val.idUniversite).value)}><i class="fa-solid fa-pen-to-square"></i></button>    
                                                </form>                                                  
                                             </td>
                                        </tr>
                                )
                             })}
                        </tbody>
                    </table>
                    <div className="add-admin-icon">
                        
                        <i className="fa-solid fa-circle-plus" onClick={openExitAddFac}></i>
                             <span>Ajouter une université</span>
                    
                    </div>
                    <div className="cover-all">
                        <div class="col s12 m6">
                                <div class="card white">
                                    <div class="card-content black-text">
                                        <span class="card-title center crufFormSpan">{method} une université</span>
                                        <form onSubmit={handleSubmitAddUniv("add")} id="addForm">
                                                <i class="fas fa-times" onClick={openExitAddFac}></i>
                                                <div class="group"> 
                                                    <label>N° Université</label>
                                                    <input type="text"  required autoFocus onChange={e => setidUniversite(e.target.value)}/>      
                                                </div> 
                                                <div class="group"> 
                                                    <label>Nom</label>
                                                    <input type="text" required autoFocus onChange={e => setnomUniversite(e.target.value)}/>      
                                                </div>   
                                               
                                                <div class="left-align">
                                                    <button class="btn">Ajouter</button>
                                                </div>
                                        </form>
                                        <form onSubmit={handleSubmitAddUniv("edit")} id="editForm">
                                                <i class="fas fa-times" onClick={openExitAddFac}></i>
                                                <div class="group"> 
                                                    <label>N° Université</label>
                                                    <input type="text" value={idUniversite} required autoFocus disabled onChange={e => setidUniversite(e.target.value)}/>      
                                                </div> 
                                                <div class="group"> 
                                                    <label>Nom</label>
                                                    <input type="text" value={nomUniversite} required autoFocus onChange={e => setnomUniversite(e.target.value)}/>      
                                                </div>   
                                               
                                                <div class="left-align">
                                                    <button class="btn">Modifier</button>
                                                </div>
                                        </form>
                                    </div>
                                </div>
                        </div>

                    </div>
                 </div>
        </>
    );
    } else {
        return(<Navigate to="/admin"></Navigate>);
    }
};

export default UnivCRUD;