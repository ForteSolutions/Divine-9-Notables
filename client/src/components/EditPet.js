import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditPet = (props) => {
    const { id } = useParams();
    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("");
    const [petDescription, setPetDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [petNotFoundError, setPetNotFoundError] = useState("");
    const navigate = useNavigate();
    console.log(id);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/pet/${id}`)
            .then((response) => {
                console.log(response.data);
                setPetName(response.data.name);
                setPetType(response.data.type);
                setPetDescription(response.data.description);
            })
            .catch((err) => {
                console.log(err.response);
                setPetNotFoundError('Pet not found using that ID');
            });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        
        axios
            .put(`http://localhost:8000/api/pet/${id}`, { name: petName, type: petType, description: petDescription })
            .then(response => {
                console.log(response);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
            });
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-6" style={{marginLeft: "280px"}}>
                    <form onSubmit={submitHandler}>
                        {petNotFoundError ? (
                            <h5>
                                {petNotFoundError} <Link to="/new">Click here to add pet</Link>
                            </h5>
                        ) : null}
                        <h3 className="purple-text">Edit {petName}</h3>
                        <div className="form-group">
                            <label htmlFor="name">Pet Name: </label>
                            <input
                                 type="text"
                                 className="form-control"
                                 onChange={(e) => setPetName(e.target.value)}
                                 value={petName}
                            />
                            {errors.name ? <p>{errors.name.message}</p> : null}
                            <label htmlFor="type">Pet Type: </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setPetType(e.target.value)}
                                value={petType}
                            />
                            {errors.type ? <p>{errors.type.message}</p> : null}
                            <label htmlFor="description">Pet Description: </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setPetDescription(e.target.value)}
                                value={petDescription}
                            />
                            {errors.description ? <p>{errors.description.message}</p> : null}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Edit Pet
                        </button>
                    </form>
                    <Link to="/">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default EditPet;