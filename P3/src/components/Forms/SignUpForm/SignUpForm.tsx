import React, {useContext, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpRequest, signUpSchema } from "../../../validation/signUp";
import Button from "react-bootstrap/Button";
import AvatarField from "../AvatarField";
import { mergeErrors } from "../../../validation/utils";
import {AuthContext} from "../../../contexts/AuthContext";

const SignUpForm: React.VFC = () => {

  const formMethods = useForm<SignUpRequest>({
    resolver: yupResolver(signUpSchema),
    mode: "onTouched"
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    setError,
    watch,
    trigger
  } = formMethods;

  const password1 = watch("password1");

  useEffect(() => {
    if (touchedFields.password1) {
      trigger("password2");
    }
  }, [password1, trigger, touchedFields.password1]);

  const { signIn } = useContext(AuthContext);

  const onSubmit = async (data: SignUpRequest) => {
    const reqBody = new FormData();
    for (const field in data) {
      if (field !== "avatar") reqBody.append(field, data[field]);
    }
    reqBody.append("avatar", data.avatar[0]);

    const res = await fetch("/users/signup/", {
      method: "POST",
      body: reqBody
    });

    if (res.ok) {

      await signIn({
        email: data.email,
        password: data.password1
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
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Row className="g-3">
        <Col xs={12} className="text-center">
          <h1>Sign Up For Restify</h1>
        </Col>
        <Form.Group as={Col} xs={12} className="text-center">
          <AvatarField formMethods={formMethods} />
        </Form.Group>
        <Form.Group as={Col} xs={6}>
          <Form.Control
            type="text"
            placeholder="First Name"
            {...register("first_name")}
            isInvalid={!!errors.first_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.first_name?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={6}>
          <Form.Control
            type="text"
            placeholder="Last Name"
            {...register("last_name")}
            isInvalid={!!errors.last_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.last_name?.message}
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
          <Form.Control
            type="email"
            placeholder="Email"
            {...register("email")}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password1")}
            isInvalid={!!errors.password1}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password1?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register("password2")}
            isInvalid={!!errors.password2}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password2?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Col xs={12} className="text-center">
          <Button type="submit" disabled={isSubmitting}>Sign Up</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SignUpForm;