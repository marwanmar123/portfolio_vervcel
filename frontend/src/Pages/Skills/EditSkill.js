import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

function EditSkill(props) {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function getSkill(){
            try {
                const res  = await axios.get(`http://localhost:5000/skill/${id}`);
                const data = res.data;
                setName(data.name)
                setDescription(data.description)
            }catch (er){
                console.log("errr getting product");
            }
        }


        getSkill();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        if(image){
            formData.append("image", image);
        }

        try{
            await axios.put(`http://localhost:5000/skill/edit/${id}`, formData, {withCredentials:true});
            navigate("/skills")
        }catch(er){
            console.log("err edit formadata");
        }
    }

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="w-50 m-auto pt-5">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">skill</label>
                    <input type="text"
                           className="form-control"
                           name="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           placeholder="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">description</label>
                    <input type="text"
                           className="form-control"
                           name="description"
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                           placeholder="password"
                    />
                </div>

                <div>
                    <input type="file" accept="image/*" onChange={handleImage}/>
                </div>
                <button type="submit" className="btn btn-primary">edit</button>
            </form>
            <Link to="/products">retour</Link>
        </div>
    );
}

export default EditSkill;