import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

function ProjectDetails(props) {
    const {id} = useParams();
    const [project, setProject] = useState(null);

    const getProject = async () => {
        try{
            const  res = await axios.get(`http://localhost:5000/project/${id}`);
            setProject(res.data);
        }catch (er){
            console.log("er get detail proj");
        }
    }

    useEffect(() => {
        getProject();
    }, [id]);

    if(!project){
        return <p>loading ...</p>
    }

    return (
        <div>
            <h3>title : {project.title}</h3>
            <p>description : {project.description}</p>
        </div>
    );
}

export default ProjectDetails;