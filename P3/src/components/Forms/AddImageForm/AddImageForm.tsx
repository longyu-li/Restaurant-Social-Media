import React, {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Form, Modal} from "react-bootstrap";
import {IMG_TYPES, mergeErrors} from "../../../validation/utils";
import {AuthContext} from "../../../contexts/AuthContext";
import {Image} from "../../../responses/image";
import {addImageRequest, addImageSchema} from "../../../validation/addImage";

interface Props {
    image: Image [];
    setImage: React.Dispatch<React.SetStateAction<Image[]>>;
}
const AddImageForm: React.VFC<Props> = ({image, setImage}) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const formMethods = useForm<addImageRequest>({
        resolver: yupResolver(addImageSchema),
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
            description: "",
            image: "" // clear submitted file
        });
    };

    const { header } = useContext(AuthContext);

    const onSubmit = async (data: addImageRequest) => {
        const reqBody = new FormData();
        for (const field in data) {
            if (field !== "image") reqBody.append(field, data[field]);
        }
        reqBody.append("image", data.image[0]);

        const res = await fetch("/restaurants/images/", {
            method: "POST",
            body: reqBody,
            headers: {
                ...header
            }
        });

        if (res.ok) {
            res.json().then(data => {
                setImage([data, ...image]);
                handleClose();
            });


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
                Add Image
            </Button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                size="sm"
                                accept={IMG_TYPES}
                                {...register("image")}
                                isInvalid={!!errors.image}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.image?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add Image Title"
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
                            <Form.Label>Image Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Add Image Description"
                                {...register("description")}
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="dark" disabled={isSubmitting}>
                            Add Image
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal></>
    );
}


export default AddImageForm;