import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function CreatePost() {
    let navigate = useNavigate();

    const initialValues = {
        title: "",
        postText: "",
        username: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        postText: Yup.string().required("Post text is required"),
        username: Yup.string().min(3, "Username must be at least 3 characters").max(15, "Username can't be more than 15 characters").required("Username is required"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3002/posts", data).then((response) => {
            navigate(`/`);

        });
    };



    return (
        <div className="login-container">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Title</label>
                    <ErrorMessage name="title" component="span" />
                    <Field id="inputCreatePostTitle" name="title" placeholder="Example sharmisha" />

                    <label>Post Text</label>
                    <ErrorMessage name="postText" component="span" />
                    <Field id="inputCreatePostText" name="postText" placeholder="Example sharmisha" />

                    <label>Username</label>
                    <ErrorMessage name="username" component="span" />
                    <Field id="inputCreatePostUsername" name="username" placeholder="Example sharmisha" />

                    <button type="submit">Create post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost;

