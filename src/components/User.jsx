import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const User = () => {
    const loadedUser = useLoaderData()
    const [ user, setUser]  = useState(loadedUser)
    const handleDelete = _id => {
        console.log('Delete', _id)
        fetch(`http://localhost:5000/user/${_id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('deleted successfully')
                    const remaining = user.filter(user => user._id !== _id);
                    setUser(remaining)
                }
            });
    };
    return (
        <div>
            <h2>{user.length}</h2>
            <div>
                {user.map(user => (
                    <p key={user._id}>
                        {user.name} : {user.email} {user._id}
                        <Link to={`/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default User;