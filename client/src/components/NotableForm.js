import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotableForm = () => {
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [biography, setBiography] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/notable", { name, organization, biography })
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
                <div className="col-6 mx-auto">
                    <h4 className="text-primary">Add Notable NPHC Member</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            {errors.name ? <p>{errors.name.message}</p> : null}
                            <label htmlFor="name">Organization: </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setOrganization(e.target.value)}
                                value={organization}
                            />
                            {errors.organization ? <p>{errors.organization.message}</p> : null}
                            <label htmlFor="name">Biography: </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setBiography(e.target.value)}
                                value={biography}
                            />
                            {errors.biography ? <p>{errors.biography.message}</p> : null}
                        </div>
                        <button className="btn btn-primary" type="submit">
                            SUBMIT
                        </button>
                    </form>
                    <Link to="/">HOME</Link>
                </div>
            </div>
        </div>
    );
};

export default NotableForm;