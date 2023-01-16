import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../styles/AuthorizationPage.module.scss";
import { useAppDispatch } from "../store/store";
import { IData, signIn } from "../store/adminSlice";

const schema = yup.object().shape({
  username: yup.string().required("Поле не может быть пустым"),
  password: yup.string().required("Поле не может быть пустым"),
});

const AuthorizationPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IData> = (data: IData) => {
    dispatch(signIn(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <h1>Sign in</h1>
        <div className={styles.inputs}>
          <input
            {...register("username", { required: true })}
            type="username"
            placeholder="Username"
          />
          <p>{errors.username?.message as string}</p>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
          <p>{errors.password?.message as string}</p>
        </div>
        <button>Sign in</button>
      </div>
    </form>
  );
};

export default AuthorizationPage;
