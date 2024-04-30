import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import {CreateRestaurantRequest, createRestaurantSchema} from "../../../validation/createRestaurant";
import {yupResolver} from "@hookform/resolvers/yup";
import {Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {IMG_TYPES, mergeErrors} from "../../../validation/utils";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../../contexts/AuthContext";

const CreateRestaurantForm: React.VFC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<CreateRestaurantRequest>({
    resolver: yupResolver(createRestaurantSchema),
    mode: "onTouched"
  });

  const { header } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (data: CreateRestaurantRequest) => {
    const reqBody = new FormData();

    for (const field in data) {

      if (field === "logo" || field === "banner") {
        reqBody.append(field, data[field][0]);
      } else {
        reqBody.append(field, data[field]);
      }

    }

    const res = await fetch("/restaurants/", {
      method: "POST",
      body: reqBody,
      headers: {
        ...header
      }
    });

    if (res.ok) {

      const restaurantId = (await res.json()).id;
      navigate(`/restaurant/${restaurantId}`);

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
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>

      <Row className="g-3">
        <Col xs={12} className="text-center">
          <h1>Create Restaurant</h1>
        </Col>
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
        <Col xs={12} className="text-center">
          <Button type="submit" variant="red" disabled={isSubmitting}>
            Create
          </Button>
        </Col>
      </Row>
    </Form>
  );

}

export default CreateRestaurantForm;