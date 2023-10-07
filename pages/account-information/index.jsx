import AuthCard from "@/Components/UI/AuthCard";
import SiteImage from "@/Components/UI/SiteImage";
import InputField from "@/Components/fields/InputField";
import { emailRegex, passwordRegex } from "@/Functions/RegexFunction";
import MainLayout from "@/Layouts/MainLayout";
import { Button, Checkbox } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

export default function index() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  function onSubmitAccountInfo(data) {
    console.log("===submit email===", data);
    // reset()
  }
  return (
    <MainLayout>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_TITLE}Account information`}</title>
      </Head>
      <section className="manage__account">
        <h2 className="manage__account--header">Account Information</h2>
        <p className="manage__account--paragraph">
          You can update your data here
        </p>
        <form onSubmit={handleSubmit(onSubmitAccountInfo)}>
          <div className="flex gap-[16px] items-center mb-[24px]">
            <SiteImage src={"/assets/images/Profile_photo_lg.svg"} />
            <label htmlFor="image" className="manage__account--dropimage">
              <div className="content">
                <h5>Profile Picture</h5>
                <span>Click to browse or drag and drop your files</span>
              </div>
            </label>
            <input name="image" type="file" id="image" hidden
              register={register}
              errors={errors}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-[24px]">
            <InputField
              register={register}
              errors={errors}
              errorMessage={{ required: 'Full name is required'}}

              name="name"
              label={""}
              placeholder={"name"}
              id={"name"}
              type={"text"}
              initialValue={"Adeeb Shaban"}
              maxLength={200}
            />
            <InputField
              register={register}
              errors={errors}
              errorMessage={{ required: 'Gender is required'}}

              name="gender"
              label={""}
              placeholder={"gender"}
              id={"gender"}
              type={"text"}
              initialValue={"Male"}
              maxLength={200}
            />
            <InputField
              register={register}
              errors={errors}
              errorMessage={{ required: 'Phone is required'}}

              name="phone"
              label={""}
              placeholder={"phone"}
              id={"phone"}
              type={"number"}
              initialValue={"0798729909"}
              maxLength={200}
            />
            <InputField
              register={register}
              errors={errors}
              errorMessage={{ required: 'Date is required'}}

              name="date"
              label={""}
              placeholder={"date"}
              id={"date"}
              type={"date"}
              initialValue={"19 / 04 / 2000"}
              maxLength={200}
            />
            <div className="form__group--links text-right">
              <InputField
                register={register}
                errors={errors}
                errorMessage={{ required: 'Email is required', 
                pattern: {
                  value: emailRegex,
                      // Change this regex pattern as needed
                  message: "Email is invalid",
                  }
                }}

                name="email"
                label={""}
                placeholder={"email"}
                id={"email"}
                type={"email"}
                initialValue={"adeebshaban@mail.com"}
                maxLength={200}
              />
              <Link href={"/change-email"}>Change email</Link>
            </div>
            <InputField
              register={register}
              errors={errors}
              errorMessage={{ required: 'Country is required'}}

              name="country"
              label={""}
              placeholder={"country"}
              id={"country"}
              type={"text"}
              initialValue={"Jordan"}
              maxLength={200}
            />
            <div className="form__group--links text-right">
              <InputField
                register={register}
                errors={errors}
                errorMessage={{ required: 'Password is required',
                pattern: {
                  value: passwordRegex,
                      // Change this regex pattern as needed
                  message: "Password is invalid",
                  },
                }}
                name="password"
                label={""}
                placeholder={"password"}
                id={"password"}
                type={"password"}
                initialValue={"***************"}
                maxLength={200}
              />
              <Link href={"/change-password"}>Change Password</Link>
            </div>
          </div>
          <Button className="special_button manage__account--button" type="submit" disabled={!isValid ? true : false}>
            Save
          </Button>
        </form>
      </section>
    </MainLayout>
  );
}
