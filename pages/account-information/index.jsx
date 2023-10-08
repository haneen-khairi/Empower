import AuthCard from "@/Components/UI/AuthCard";
import SiteImage from "@/Components/UI/SiteImage";
import InputField from "@/Components/fields/InputField";
import SelectMenuField from "@/Components/fields/SelectField";
import { AxiosInstance } from "@/Functions/AxiosInstance";
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


    const fd = new FormData()
    fd.append('image', data.image[0])
    fd.append('name', data.name)
    fd.append('password', data.password)
    fd.append('phone', data.phone)
    fd.append('country', data.country)
    fd.append('date', data.date)
    fd.append('gender', data.gender)
    fd.append('email', data.email)
    console.log("===submit email===", data);
    submitData(fd)
    // reset()
  }
  async function submitData(data){
    try {
      const resData = await AxiosInstance('post', `${process.env.NEXT_PUBLIC_API_KEY}/api/account-info`, {} ,{}, data)
      console.log(resData)
    } catch (error) {
      console.log('=== error ===',error)

    }
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
            <input
              name="image"
              type="file"
              id="image"
              hidden
              {...register('image', {required: 'Image is required'})}
              // register={register}
              // errors={errors}
            />
          </div>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-[24px]">
            <InputField
              register={register}
              errors={errors}
              errorMessage={{ required: "Full name is required" }}
              name="name"
              label={""}
              placeholder={"name"}
              id={"name"}
              type={"text"}
              initialValue={"Adeeb Shaban"}
              maxLength={200}
            />
            <SelectMenuField
              register={register}
              errors={errors}
              errorMessage={{ required: "Gender is required" }}
              name="gender"
              label={""}
              placeholder={"gender"}
              id={"gender"}
              type={"text"}
              items={["male", "female"]}
              initialValue={"Select gender"}
              maxLength={200}
            />
            <InputField
              register={register}
              errors={errors}
              errorMessage={{ required: "Phone is required" }}
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
              errorMessage={{ required: "Date is required" }}
              name="date"
              label={""}
              placeholder={"date"}
              id={"date"}
              type={"date"}
              initialValue={"2022-01-13"}
              maxLength={200}
            />
            <div className="form__group--links text-right">
              <InputField
                register={register}
                errors={errors}
                errorMessage={{
                  required: "Email is required",
                  pattern: {
                    value: emailRegex,
                    // Change this regex pattern as needed
                    message: "Email is invalid",
                  },
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
            <SelectMenuField
              register={register}
              errors={errors}
              errorMessage={{ required: "Country is required" }}
              items={["Jordan", "Egypt", "England", "Usa"]}
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
                errorMessage={{
                  required: "Password is required",
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
          <Button
            className="special_button manage__account--button"
            type="submit"
            disabled={!isValid ? true : false}
          >
            Save
          </Button>
        </form>
      </section>
    </MainLayout>
  );
}
