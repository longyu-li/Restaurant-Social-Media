import React, {useContext, useEffect} from "react";
import {useForm} from "react-hook-form";
import {EditRestaurantRequest, editRestaurantSchema} from "../../../validation/editRestaurant";
import {yupResolver} from "@hookform/resolvers/yup";
import {Form, Modal} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {IMG_TYPES, mergeErrors} from "../../../validation/utils";
import {Restaurant} from "../../../responses/restaurant";
import Button from "react-bootstrap/Button";
import {AuthContext} from "../../../contexts/AuthContext";

interface Props {
  editOpen: boolean;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  restaurant: Restaurant;
  setRestaurant: React.Dispatch<React.SetStateAction<Restaurant | undefined>>;
}

const EditRestaurantForm: React.VFC<Props> = ({
  editOpen,
  setEditOpen,
  restaurant,
  setRestaurant,
}) => {

  const { header } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<EditRestaurantRequest>({
    resolver: yupResolver(editRestaurantSchema),
    mode: "onTouched"
  });

  useEffect(() => {
    if (editOpen) {
      reset({
        name: restaurant.name,
        address: restaurant.address,
        logo: "",
        phone_num: restaurant.phone_num,
        banner: "",
        description: restaurant.description
      });
    }
  }, [editOpen, reset, restaurant]);

  const onSubmit = async (data: EditRestaurantRequest) => {
    const reqBody = new FormData();
    for (const field in data) {
      if (field === "logo" || field === "banner") {
        if (data[field] && data[field].length > 0)
          reqBody.append(field, data[field][0]);
      } else {
        if (data[field]) reqBody.append(field, data[field]);
      }
    }

    const res = await fetch("/restaurants/", {
      method: "PATCH",
      body: reqBody,
      headers: { ...header }
    });

    if (res.ok) {

      setRestaurant(await res.json());
      setEditOpen(false);

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
    <Modal show={editOpen} onHide={() => setEditOpen(false)}>
      <Modal.Header closeButton>
        Edit Restaurant
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Row className="g-3">
            <Form.Group as={Col} xs={12}>
              <Form.Control
                type="text"
                placeholder="Name"
                {...register("name")}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs={12}>
              <Form.Control
                type="text"
                placeholder="Address"
                {...register("address")}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs={12}>
              <Form.Control
                type="tel"
                placeholder="Phone Number"
                {...register("phone_num")}
                isInvalid={!!errors.phone_num}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone_num?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs={12}>
              <Form.Label>Logo</Form.Label>
              <Form.Control
                type="file"
                accept={IMG_TYPES}
                {...register("logo")}
                isInvalid={!!errors.logo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.logo?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs={12}>
              <Form.Label>Banner</Form.Label>
              <Form.Control
                type="file"
                accept={IMG_TYPES}
                {...register("banner")}
                isInvalid={!!errors.banner}
              />
              <Form.Control.Feedback type="invalid">
                {errors.banner?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} xs={12}>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Description"
                {...register("description")}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          disabled={isSubmitting}
          onClick={() => handleSubmit(onSubmit)()}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditRestaurantForm;