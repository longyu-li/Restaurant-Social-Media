import React, {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Form, Modal} from "react-bootstrap";
import {mergeErrors} from "../../../validation/utils";
import {AuthContext} from "../../../contexts/AuthContext";
import {addBlogPostRequest, addBlogPostSchema} from "../../../validation/addBlogPost";
import {BlogPost} from "../../../responses/blogPost";

interface Props {
    blog: BlogPost [];
    setBlog: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}
const AddBlogPostForm: React.VFC<Props> = ({blog, setBlog}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const formMethods = useForm<addBlogPostRequest>({
        resolver: yupResolver(addBlogPostSchema),
        mode: "onTouched"
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset
    } = formMethods;

    const handleClose = () => {
        setShow(false);
        reset({
            title: "",
            content: "" // clear submitted file
        });
    };


    const { header } = useContext(AuthContext);

    const onSubmit = async (data: addBlogPostRequest) => {
        const reqBody = new FormData();
        for (const field in data) {
            reqBody.append(field, data[field]);
        }

        const res = await fetch("/restaurants/blog/", {
            method: "POST",
            body: reqBody,
            headers: {
                ...header
            }
        });

        if (res.ok) {
            res.json().then(data => {
                setBlog([data, ...blog]);
            });
            handleClose();

        } else if (res.status === 400) {

            const errors = await res.json();
            for (const field in errors) {
                setError(field, { message: mergeErrors(errors[field]) });
            }

        } else {
            console.log(await res.json());
        }
    }

    return (
        <>
            <Button variant="dark" size="lg" onClick={handleShow} >
                Add Blog Post
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Blog Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Blog Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add Blog Title"
                                {...register("title")}
                                isInvalid={!!errors.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title?.message}
                            </Form.Control.Feedback>
                        </Form.Group >
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Blog Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Add Blog Content"
                                {...register("content")}
                                isInvalid={!!errors.content}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.content?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="dark" disabled={isSubmitting}>
                            Post
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal></>
    );
}


export default AddBlogPostForm;