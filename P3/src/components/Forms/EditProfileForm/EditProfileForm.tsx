import React, {useContext} from "react";
import {Form, Row, Col, InputGroup, FormControl} from "react-bootstrap";
import AvatarField from "../AvatarField";
import {useForm} from "react-hook-form";
import {EditProfileRequest, editProfileSchema} from "../../../validation/editProfile";
import {yupResolver} from "@hookform/resolvers/yup";
import Button from "react-bootstrap/Button";
import {AuthContext} from "../../../contexts/AuthContext";

const EditProfileForm: React.VFC = () => {

  const authContext = useContext(AuthContext);
  const user = authContext.user!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<EditProfileRequest>({
    resolver: yupResolver(editProfileSchema)
  })

  return (
    <Form onSubmit={handleSubmit(data => console.log(data))} noValidate>
      <Row className="g-3">
        <Col xs={12} className="text-center">
          <h1>Edit Profile</h1>
        </Col>
        {/* todo: avatar field */}
        <Form.Group as={Col} xs={6}>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={user.first_name}
            {...register("first_name")}
            isInvalid={!!errors.first_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.first_name?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={6}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={user.last_name}
            {...register("last_name")}
            isInvalid={!!errors.last_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.last_name?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={12}>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder={user.phone_num}
            {...register("phone_num")}
            isInvalid={!!errors.phone_num}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone_num?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={12}>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password1")}
            isInvalid={!!errors.password1}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password1?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={12}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password2")}
            isInvalid={!!errors.password2}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password2?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Col xs={12}><hr /></Col>
        <InputGroup as={Col} xs={12}>
          <FormControl
            type="password"
            placeholder="Current Password"
          />
          <Button>Save Changes</Button>
        </InputGroup>
      </Row>
    </Form>
  );
}

export default EditProfileForm;
