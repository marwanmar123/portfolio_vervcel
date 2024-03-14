import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreateSkill(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [selectImage, setSelectImage] = useState(null);

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", selectImage);
        try {
            await axios.post("http://localhost:5000/skill/create", formData, {withCredentials:true});

            navigate("/skills");

        }catch(er){
            console.log("err formdata");
        }
        setName("");
        setDescription("");
    }

    const handleImage = (e) => {
        if(e.target.files && e.target.files[0]){
            setImage(URL.createObjectURL(e.target.files[0]))
            setSelectImage(e.target.files[0])
        }
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
                    <img src={image} alt="" width={50}/>
                </div>
                <button type="submit" className="btn btn-primary">create</button>
            </form>
        </div>
    );
}

export default CreateSkill;