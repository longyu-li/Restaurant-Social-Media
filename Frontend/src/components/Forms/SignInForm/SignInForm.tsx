import React, {useContext} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { SignInRequest, signInSchema } from "../../../validation/signIn";
import { yupResolver } from "@hookform/resolvers/yup";
import {AuthContext} from "../../../contexts/AuthContext";

const SignInForm: React.VFC = () => {

  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<SignInRequest>({
    resolver: yupResolver(signInSchema),
    mode: "onTouched"
  });

  const onSubmit = async (data: SignInRequest) => {
    const res = await signIn(data);
    if (res.status === 401) {

        setError("email", {message: "Invalid email or password."});
        setError("password", {message: "Invalid email or password."});

    }
  }

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
          <Button type="submit" variant="red" disabled={isSubmitting}>Sign In</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SignInForm;