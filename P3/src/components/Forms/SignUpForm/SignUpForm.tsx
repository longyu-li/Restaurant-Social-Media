import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SubmitHandler, useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpRequest, signUpSchema } from "../../../validation/signup";
import Button from "react-bootstrap/Button";
import AvatarField from "../AvatarField";

interface Props {
  onSubmit: SubmitHandler<SignUpRequest>
}

const SignUpForm: React.VFC<Props> = ({
  onSubmit,
}) => {

  const formMethods = useForm<SignUpRequest>({
    resolver: yupResolver(signUpSchema)
  });

  const { register, handleSubmit, formState: { errors } } = formMethods;

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
          <Button type="submit">Sign Up</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SignUpForm;