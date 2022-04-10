import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { UseFormReturn } from "react-hook-form";
import { SignUpRequest } from "../../../validation/signUp";
import styles from "./AvatarField.module.css";
import { ReactComponent as AvatarSvg } from "bootstrap-icons/icons/person-circle.svg"; // import SVG itself for color flexibility

interface Props {
  formMethods: UseFormReturn<SignUpRequest>
}

const AvatarField: React.VFC<Props> = ({
  formMethods: { register, formState: { errors }, watch },
}) => {

  const avatar = watch("avatar") as FileList | null;

  const [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const url = URL.createObjectURL(avatar[0]);
      setAvatarUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [avatar]);

  return (
    <>
      <Form.Label className="btn border rounded" htmlFor="avatar">
        {avatarUrl ? <img src={avatarUrl} alt="Avatar" className={`${styles.avatar} m-2`} /> :
          <AvatarSvg className={`${styles.avatar} m-2`} />}
        <span className="d-block">Select Avatar</span>
      </Form.Label>
      <Form.Control
        type="file"
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