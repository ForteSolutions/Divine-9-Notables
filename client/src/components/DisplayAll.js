import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

const DisplayAll = () => {
    const [allNotables, setAllNotables] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/notable")
            .then((response) => {
                console.log(response.data);
                setAllNotables(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);
    const sortNotables = (sortBy) => {
        console.log('sorting..')
        const sorted = [...allNotables]
        sorted.sort((a, b) => {
                let nameA = a.name.toUpperCase(); // ignore upper and lowercase
                let nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (sortBy ==="organization") {
                nameA = a.organization.toUpperCase(); // ignore upper and lowercase
                nameB = b.organization.toUpperCase(); // ignore upper and lowercase
            }
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
        setAllNotables(sorted)
    }
        return (
        <div class="container">
            <div class="row">
                <div className="col-8 mx-auto">
                    <h4 className="text-primary">"National Pan-Hellenic Council Contributors to the Culture"</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th onClick={() => sortNotables("name")} scope="col">Name</th>
                                <th onClick={() => sortNotables("organization")} scope="col">Organization</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allNotables.map((notable, index) => {
                                return (
                                <tr key={notable.id}>
                                    <td><a href={notable.biography} rel="noreferrer" target ="_blank">{notable.name}</a></td>
                                    <td>{notable.organization}</td>
                                    <td>
                                        <Link to={`/show/${notable._id}`}>Details |</Link>
                                        <Link to={`/edit/${notable._id}`}> Edit</Link>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Link to="/new">CREATE</Link>
                </div>
            </div>
        </div>
    );
};

export default DisplayAll;