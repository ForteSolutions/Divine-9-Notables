import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

const DisplayAll = () => {
    const [allPets, setAllPets] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pet")
            .then((response) => {
                console.log(response.data);
                setAllPets(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);    
    return (
        <div class="container">
            <div class="row">
                <div className="col-6" style={{marginLeft: "280px"}}>
                    <h3 className="purple-text">These pets are looking for a good home</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Description</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allPets.map((pet, index) => {
                                return (
                                <tr key={pet.id}>
                                    <td>{pet.name}</td>
                                    <td>{pet.type}</td>
                                    <td>{pet.description}</td>
                                    <td>
                                        <Link to={`/show/${pet._id}`}>Details |</Link>
                                        <Link to={`/edit/${pet._id}`}> Edit</Link>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Link to="/new">Add a pet to the shelter</Link>
                </div>
            </div>
        </div>
    );
};

export default DisplayAll;