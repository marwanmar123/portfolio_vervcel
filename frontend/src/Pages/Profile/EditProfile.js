import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function EditProfile(props) {
    const {id} = useParams();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [about, setAbout] = useState("");
    const [status, setStatus] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [website, setWebsite] = useState("");
    const [phone, setPhone] = useState(0);
    const [image, setImage] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        async function getProfile(){
            try{
                const res = await axios.get(`http://localhost:5000/profile/${id}`);
                const profData = res.data;
                setUsername(profData.username);
                setFirstname(profData.firstname);
                setLastname(profData.lastname);
                setAbout(profData.about);
                setStatus(profData.status);
                setGithub(profData.github);
                setLinkedin(profData.linkedin);
                setEmail(profData.email);
                setPhone(profData.phone);
                setWebsite(profData.website);
            }catch (er){
                console.log("get profile errr");
            }
        }
        getProfile()
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("about", about);
        formData.append("linkedin", linkedin);
        formData.append("github", github);
        formData.append("email", email);
        formData.append("status", status);
        formData.append("phone", phone);
        formData.append("website", website);
        if(image){
            formData.append("image", image);
        }
        try{
            await axios.put(`http://localhost:5000/profile/edit/${id}`, formData, {withCredentials:true})
            navigate('/profiles')
        }catch(er){
            console.log("err req formdata");
        }
    }

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }


    return (
        <div>

            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="">username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">firstname</label>
                    <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">lastname</label>
                    <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">status</label>
                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">about</label>
                    <input type="text" value={about} onChange={(e) => setAbout(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">github</label>
                    <input type="text" value={github} onChange={(e) => setGithub(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">linkedin</label>
                    <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">website</label>
                    <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">phone</label>
                    <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">image</label>
                    <input type="file" accept="image/*" onChange={handleImage}/>
                </div>
                <button type="submit">edit</button>
            </form>
        </div>
    );
}

export default EditProfile;