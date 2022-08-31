import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PetForm = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/pet", { name, type, description })
            .then((response) => {
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
                    <h3 className="purple-text">Know a pet needing a home?</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Pet Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            {errors.name ? <p>{errors.name.message}</p> : null}
                            <label htmlFor="name">Pet Type: </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setType(e.target.value)}
                                value={type}
                            />
                            {errors.type ? <p>{errors.type.message}</p> : null}
                            <label htmlFor="name">Pet Description: </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                            {errors.description ? <p>{errors.description.message}</p> : null}
                        </div>
                        <button className="btn btn-primary" type="submit">
                            Add Pet
                        </button>
                    </form>
                    <Link to="/">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default PetForm;