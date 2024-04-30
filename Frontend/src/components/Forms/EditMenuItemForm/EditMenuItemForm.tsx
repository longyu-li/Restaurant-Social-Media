import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import {IMG_TYPES, mergeErrors} from "../../../validation/utils";
import {AuthContext} from "../../../contexts/AuthContext";
import {MenuItem} from "../../../responses/menuItem";
import {editMenuItemRequest, editMenuItemSchema} from "../../../validation/editMenuItem";
import styles from "../../Menu/Menu.module.css";

interface Props {
    menuItem: MenuItem
    menu: MenuItem [];
    setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}
const EditMenuItemForm: React.VFC<Props> = ({menuItem, menu, setMenu}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formMethods = useForm<editMenuItemRequest>({
        resolver: yupResolver(editMenuItemSchema),
        mode: "onTouched"
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        watch,
        setValue
    } = formMethods;

    const price = watch("price");

    useEffect(() => {
        if (price) {
            const decimals = price.split(".");

            if (decimals.length === 2 && decimals[1].length > 2) {
                setValue("price", decimals[0] + "." + decimals[1].substring(0, 2));
            }
        }
    }, [price, setValue]);

    const { header } = useContext(AuthContext);

    const onSubmit = async (data: editMenuItemRequest) => {
        const reqBody = new FormData();
        for (const field in data) {
            if (field !== "image" && data[field]) reqBody.append(field, data[field]);
        }
        if (data.image && data.image.length > 0) {
            reqBody.append("image", data.image[0]);
        }


        const res = await fetch(`/restaurants/menu/${menuItem.id}/`, {
            method: "PATCH",
            body: reqBody,
            headers: {
                ...header
            }
        });

        if (res.ok) {
            res.json().then(data => {
                setMenu(prevState => prevState.map(value => {
                    if (value.id === data.id){
                        return data;
                    }
                    return value;
                }));

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
            <Button variant="outline-info" id={menuItem.toString()} className={styles.editMenu} onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Menu Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label>Image Item</Form.Label>
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
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add Item Name"
                                {...register("name")}
                                isInvalid={!!errors.name}
                                defaultValue={menuItem.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>
                        </Form.Group >
                        <Form.Label>Price</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <FormControl
                                type="number"
                                placeholder="0.00"
                                step="0.01"
                                {...register("price")}
                                isInvalid={!!errors.price}
                                defaultValue={menuItem.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price?.message}
                            </Form.Control.Feedback>
                        </InputGroup>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Item Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Add Item Description"
                                {...register("description")}
                                isInvalid={!!errors.description}
                                defaultValue={menuItem.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="dark"  onClick={handleClose} disabled={isSubmitting}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal></>
    );
}


export default EditMenuItemForm;