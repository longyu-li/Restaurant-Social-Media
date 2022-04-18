import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addMenuItemRequest, addMenuItemSchema} from "../../../validation/addMenuItem";
import {Button, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import {IMG_TYPES, mergeErrors} from "../../../validation/utils";
import {AuthContext} from "../../../contexts/AuthContext";
import {MenuItem} from "../../../responses/menuItem";

interface Props {
    menu: MenuItem [];
    setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}
const AddMenuItemForm: React.VFC<Props> = ({menu, setMenu}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formMethods = useForm<addMenuItemRequest>({
        resolver: yupResolver(addMenuItemSchema),
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

    const onSubmit = async (data: addMenuItemRequest) => {
        const reqBody = new FormData();
        for (const field in data) {
            if (field !== "image") reqBody.append(field, data[field]);
        }
        reqBody.append("image", data.image[0]);

        const res = await fetch("/restaurants/menu/", {
            method: "POST",
            body: reqBody,
            headers: {
                ...header
            }
        });

        if (res.ok) {
            res.json().then(data => {
                console.log(data.results);
                // const newMenu = new Array<MenuItem>();
                // newMenu.push(data.results);
                setMenu([...menu, data]);

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
            Add Menu Item
        </Button>

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Modal.Header closeButton>
                <Modal.Title>Add Menu Item</Modal.Title>
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
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" variant="dark"  onClick={handleClose} disabled={isSubmitting}>
                    Add to Menu
                </Button>
            </Modal.Footer>
        </Form>
        </Modal></>
    );
}


export default AddMenuItemForm;