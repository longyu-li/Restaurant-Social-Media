import React, {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Form, Modal} from "react-bootstrap";
import {mergeErrors} from "../../../validation/utils";
import {AuthContext} from "../../../contexts/AuthContext";
import {Comment} from "../../../responses/comment";
import {addCommentRequest, addCommentSchema} from "../../../validation/addComment";

interface Props {
    id: Number;
    comment: Comment [];
    setComment: React.Dispatch<React.SetStateAction<Comment[]>>;
}
const AddCommentForm: React.VFC<Props> = ({id, comment, setComment}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formMethods = useForm<addCommentRequest>({
        resolver: yupResolver(addCommentSchema),
        mode: "onTouched"
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = formMethods;


    const { header } = useContext(AuthContext);

    const onSubmit = async (data: addCommentRequest) => {
        const reqBody = new FormData();
        for (const field in data) {
            reqBody.append(field, data[field]);
        }

        const res = await fetch(`/restaurants/${id}/comments/`, {
            method: "POST",
            body: reqBody,
            headers: {
                ...header
            }
        });

        if (res.ok) {
            res.json().then(data => {
                setComment([...comment, data]);
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
                Add Comment
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Add Content"
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

export default AddCommentForm;