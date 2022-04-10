import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import { SignInRequest, signInSchema } from "../../../validation/signIn";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  onSubmit: SubmitHandler<SignInRequest>;
}

const SignInForm: React.VFC<Props> = ({ onSubmit }) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInRequest>({
    resolver: yupResolver(signInSchema)
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Row className="g-3">
        <Col xs={12} className="text-center">
          <h1>Sign In To Restify</h1>
        </Col>
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
        <Form.Group as={Col} xs={12}>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Col xs={12} className="text-center">
          <Button type="submit" disabled={isSubmitting}>Sign In</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SignInForm;