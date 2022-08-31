import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OnePet = (props)=>{

    const {id} = useParams();

    const [onePet, setOnePet] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pet/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setOnePet(res.data);
            })
            .catch((err)=> {
                console.log(err.response);
            });
    },[id]);

    const handleDeletePet = (idFromBelow) => {
        axios
            .delete(`http://localhost:8000/api/pet/${idFromBelow}`)
            .then((response) => {
                console.log("success deleting pet");
                console.log(response);
                navigate("/");
                const filteredPets = onePet.filter((pet) => {
                    return pet._id !== idFromBelow;
                });
                setOnePet(filteredPets);
            })
            .catch((err) => {
                console.log("error deleting pet", err.response);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-6" style={{marginLeft: "280px"}}>
                    <div className="onePet-component">
                        <h3 className="purple-text">Details about: {onePet.name}</h3>
                        <p>Pet Type: {onePet.type}</p>
                        <p>Description: {onePet.description}</p>
                        <button
                        onClick={() => handleDeletePet(onePet._id)}
                        className="btn btn-danger"
                        >
                        Adopt {onePet.name}
                        </button>
                    </div>
                    <Link to="/">Back to Home</Link>
                </div>
            </div>
        </div>
    )
}

export default OnePet;