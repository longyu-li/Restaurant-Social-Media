import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {UseFormReturn} from "react-hook-form";
import { SignUpRequest } from "../../../validation/signUp";
import styles from "./AvatarField.module.css";
// import SVG itself for color flexibility
import { ReactComponent as AvatarSvg } from "bootstrap-icons/icons/person-circle.svg";
import {EditProfileRequest} from "../../../validation/editProfile";
import {IMG_TYPES} from "../../../validation/utils";

interface Props {
  formMethods: UseFormReturn<SignUpRequest> | UseFormReturn<EditProfileRequest>;
  currAvatar?: string;
}

const AvatarField: React.VFC<Props> = ({
  formMethods: {
    register,
    formState: { errors },
    watch
  },
  currAvatar
}) => {

  const { avatar } = watch();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const url = URL.createObjectURL(avatar[0]);
      setAvatarUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setAvatarUrl(currAvatar);
    }
  }, [avatar, currAvatar]);

  return (
    <>
      <Form.Label className={`btn border rounded ${!!errors.avatar ? 'border-danger' : ''}`} htmlFor="avatar">
        {avatarUrl ? <img src={avatarUrl} alt="Avatar" className={`${styles.avatar} m-2`} /> :
          <AvatarSvg className={`${styles.avatar} m-2`} />}
        <span className="d-block">Select Avatar</span>
      </Form.Label>
      <Form.Control
        type="file"
        accept={IMG_TYPES}
        {...register("avatar")}
        className="visually-hidden"
        isInvalid={!!errors.avatar}
        id="avatar"
      />
      <Form.Control.Feedback type="invalid">
        {errors.avatar?.message}
      </Form.Control.Feedback>
    </>
  );
}

export default AvatarField;