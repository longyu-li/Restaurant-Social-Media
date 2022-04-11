import React, {useContext} from "react";
import {Form, Row, Col} from "react-bootstrap";
import AvatarField from "../AvatarField";
import {useForm} from "react-hook-form";
import {EditProfileRequest, editProfileSchema} from "../../../validation/editProfile";
import {yupResolver} from "@hookform/resolvers/yup";
import {User} from "../../../responses/user";

interface Props {
  user: User;
}

const EditProfileForm: React.VFC<Props> = ({
  user
}) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<EditProfileRequest>({
    resolver: yupResolver(editProfileSchema)
  })

  return (
    <Form noValidate>
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

      </Row>
    </Form>
  );
}

export default EditProfileForm;
