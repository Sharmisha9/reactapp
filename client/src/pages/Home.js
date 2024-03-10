import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);

    console.log({ errorMsg })
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3002/posts", { headers: { accessToken: sessionStorage.getItem('accessToken') } }).then((response) => {
            if (response.data.error) {
                setErrorMsg(response.data.error)
                return
            }
            if (response.data) setListOfPosts(response.data);
        });
    }, []);

    return (
        <div>
            {
                errorMsg ? <h1>{errorMsg}</h1> :
                    listOfPosts.map((value, key) => {
                        return (
                            <div className="post" onClick={() => navigate(`/post/${value.id}`)}>
                                <div className="title">{value.title}</div>
                                <div className="body">{value.postText}</div>
                                <div className="footer">{value.username}</div>
                            </div>
                        );
                    })
            }
        </div>
    );
}

export default Home;
