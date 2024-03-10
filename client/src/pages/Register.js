import React from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Register() {
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(3, "Password must be at least 3 characters").max(15, "Password can't be more than 15 characters").required("Password is required"),
        username: Yup.string().min(3, "Username must be at least 3 characters").max(15, "Username can't be more than 15 characters").required("Username is required"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3002/auth", data).then(() => {
            console.log(data);
        });
    };

    return (
        <div>
            <div className="login-container">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <label htmlFor="username">Username</label>

                        <Field id="username" name="username" placeholder="Enter username" />

                        <label htmlFor="password">Password</label>

                        <Field type="password" id="password" name="password" placeholder="Enter password" />

                        <button type="submit">Register</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Register;


