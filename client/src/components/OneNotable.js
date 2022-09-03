import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OneNotable = (props)=>{

    const {id} = useParams();

    const [oneNotable, setOneNotable] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/notable/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setOneNotable(res.data);
            })
            .catch((err)=> {
                console.log(err.response);
            });
    },[id]);

    const handleDeleteNotable = (idFromBelow) => {
        axios
            .delete(`http://localhost:8000/api/notable/${idFromBelow}`)
            .then((response) => {
                console.log("success deleting notable");
                console.log(response);
                navigate("/");
                const filteredNotables = oneNotable.filter((notable) => {
                    return notable._id !== idFromBelow;
                });
                setOneNotable(filteredNotables);
            })
            .catch((err) => {
                console.log("error deleting notable", err.response);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-6 mx-auto">
                    <div className="oneNotable-component">
                        <a href={oneNotable.biography} rel="noreferrer" target ="_blank"><h4 className="text-primary">The Legacy of {oneNotable.name}</h4></a>
                        <p>Organization: {oneNotable.organization}</p>
                        <button
                        onClick={() => handleDeleteNotable(oneNotable._id)}
                        className="btn btn-danger"
                        >
                        Delete {oneNotable.name}
                        </button>
                    </div>
                    <Link to="/">HOME</Link>
                </div>
            </div>
        </div>
    )
}

export default OneNotable;