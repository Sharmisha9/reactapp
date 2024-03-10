
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        //
        // Fetch the  post and comments data using axios
        axios.get(`http://localhost:3002/posts/byId/${id}`)
            .then((response) => {
                console.log('api 1')
                setPostObject(response.data);
            })
            .catch((error) => {
                console.error("Error fetching post:", error);
            });

        axios.get(`http://localhost:3002/comments/byPost/${id}`)
            .then((response) => {
                console.log('api 2')
                setComments(response.data);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
            });
    }, [id]);

    const addComment = () => {
        // Make a POST request to add a new comment
        axios.post("http://localhost:3002/comments", {
            commentBody: newComment,
            PostId: id
        }, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        })
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    const commentToAdd = { id: response.data.id, commentBody: newComment, username: response.data.username };
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }
            })
            .catch((error) => {
                console.error("Error adding comment:", error);
            });
    }

    return (
        <div>
            <div className="leftSide">
                <div>{postObject.title}</div>
                <div>{postObject.postText}</div>
                <div>{postObject.username}</div>
            </div>

            <div className="rightSide">
                <div>
                    <input type="text" placeholder="Comment here..." autoComplete="off" value={newComment} onChange={(event) => { setNewComment(event.target.value) }} />
                    <button onClick={addComment}>
                        Add comment
                    </button>
                </div>
                <div className="ListOfComments">
                    {Array.isArray(comments) && comments.map((comment) => (
                        <div key={comment.id}>
                            <div>{comment.commentBody}</div>
                            <label>Username: {comment.username}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Post;



