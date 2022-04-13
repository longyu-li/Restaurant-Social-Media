import React, {useContext, useEffect, useRef} from "react";
import {Form, Row, Col, InputGroup} from "react-bootstrap";
import AvatarField from "../AvatarField";
import {useForm} from "react-hook-form";
import {EditProfileRequest, editProfileSchema} from "../../../validation/editProfile";
import {yupResolver} from "@hookform/resolvers/yup";
import Button from "react-bootstrap/Button";
import {AuthContext} from "../../../contexts/AuthContext";
import {mergeErrors} from "../../../validation/utils";

const EditProfileForm: React.VFC = () => {

  const authContext = useContext(AuthContext);
  const user = authContext.user!;
  const { access } = authContext.tokens!;

  const formMethods = useForm<EditProfileRequest>({
    resolver: yupResolver(editProfileSchema),
    mode: "onTouched"
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    watch,
    trigger,
  } = formMethods;

  const avatarRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    reset({
      first_name: user.first_name,
      last_name: user.last_name,
      phone_num: user.phone_num,
      password1: "",
      password2: "",
      password: ""
    });
    avatarRef.current.value = ""; // clear submitted file
  }, [user, reset]);

  const password1 = watch("password1");

  useEffect(() => {
    trigger("password2");
  }, [password1, trigger]);

  const onSubmit = async (data: EditProfileRequest) => {

    const reqBody = new FormData();
    for (const field in data) {
      if (field !== "avatar" && data[field]) reqBody.append(field, data[field]);
    }

    if (data.avatar && data.avatar.length > 0) {
      reqBody.append("avatar", data.avatar[0]);
    }

    const res = await fetch("/users/", {
      method: "PATCH",
      body: reqBody,
      headers: {
        'Authorization': `Bearer ${access}`
      }
    });

    if (res.ok) {

      authContext.setUser(await res.json());

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
          <h1>Edit Profile</h1>
        </Col>
        <Form.Group as={Col} xs={12} className="text-center">
          <AvatarField
            formMethods={formMethods}
            currAvatar={user.avatar}
            avatarRef={avatarRef}
          />
        </Form.Group>
        <Form.Group as={Col} xs={6}>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
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
        <InputGroup as={Col} xs={12} hasValidation>
          <Form.Control
            type="password"
            placeholder="Current Password"
            {...register("password")}
            isInvalid={!!errors.password}
          />
          <Button type="submit" disabled={isSubmitting}>Save Changes</Button>
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Row>
    </Form>
  );
}

export default EditProfileForm;
