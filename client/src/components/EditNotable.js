import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditNotable = (props) => {
    const { id } = useParams();
    const [notableName, setNotableName] = useState("");
    const [notableOrganization, setNotableOrganization] = useState("");
    const [notableBiography, setNotableBiography] = useState("");
    const [errors, setErrors] = useState({});
    const [notableNotFoundError, setNotableNotFoundError] = useState("");
    const navigate = useNavigate();
    console.log(id);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/notable/${id}`)
            .then((response) => {
                console.log(response.data);
                setNotableName(response.data.name);
                setNotableOrganization(response.data.organization);
                setNotableBiography(response.data.biography);
            })
            .catch((err) => {
                console.log(err.response);
                setNotableNotFoundError('Notable not found using that ID');
            });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        
        axios
            .put(`http://localhost:8000/api/notable/${id}`, { name: notableName, organization: notableOrganization, biography: notableBiography })
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
                        {notableNotFoundError ? (
                            <h5>
                                {notableNotFoundError} <Link to="/new">Click here to add notable</Link>
                            </h5>
                        ) : null}
                        <h4 className="text-primary">Edit {notableName}</h4>
                        <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <input
                                 type="text"
                                 className="form-control"
                                 onChange={(e) => setNotableName(e.target.value)}
                                 value={notableName}
                            />
                            {errors.name ? <p>{errors.name.message}</p> : null}
                            <label htmlFor="type">Organization: </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setNotableOrganization(e.target.value)}
                                value={notableOrganization}
                            />
                            {errors.organization ? <p>{errors.organization.message}</p> : null}
                            <label htmlFor="description">Biography: </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setNotableBiography(e.target.value)}
                                value={notableBiography}
                            />
                            {errors.biography ? <p>{errors.biography.message}</p> : null}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            EDIT
                        </button>
                    </form>
                    <Link to="/">HOME</Link>
                </div>
            </div>
        </div>
    );
};

export default EditNotable;