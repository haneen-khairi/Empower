// pages/multiStepForm.js
import AuthCard from "@/Components/UI/AuthCard";
import SiteImage from "@/Components/UI/SiteImage";
import InputField from "@/Components/fields/InputField";
import SelectMenuField from "@/Components/fields/SelectField";
import { AxiosHeadersInstance } from "@/Functions/AxiosHeadersInstance";
import { AxiosInstance } from "@/Functions/AxiosInstance";
import { emailRegex, passwordRegex } from "@/Functions/RegexFunction";
import MainLayout from "@/Layouts/MainLayout";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { steps } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function index() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const route = useRouter()
  const userEmail = useRef('');
  const [countries, setCountries] = useState([])
  const [step, setStep] = useState(1);
  const [token, setToken] = useState({
    access_token: "",
    refresh_token: ""
  });
  const [validations, setValidations] = useState([]);
  const [otherQuestion, setOtherQuestion] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [cumulativeData, setCumulativeData] = useState({});
  const password = watch("password", "");
  // const nextStep = () => {
  //   switch (step) {
  //     case 1:
  //       // if (!validateEmail(formData.email)) {
  //       //   alert("Please enter a valid email address");
  //       //   return;
  //       // }
  //       break;
  //     case 2:
  //       // if (formData.password.length < 6) {
  //       //   alert("Password should be at least 6 characters long");
  //       //   return;
  //       // }
  //       break;
  //     case 3:
  //       break;
  //     case 4:
  //       break;
  //     default:
  //       break;
  //   }
  //   setStep(step + 1);
  // };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  async function getCountries(){
    try {
      const {data} =  await AxiosHeadersInstance(`get`, `${process.env.NEXT_PUBLIC_API_KEY}/account/countries`) 
      let countries =  data.map((country) =>{
        country.value = country.id
        return country
      })

      setCountries(countries)
    } catch (error) {
      console.log('=== error tests ===', error)

    }
  }
  function resendCode() {
    console.log("===code===");
  }
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const validationStep1 = {
    full_name: { required: "Full name is required" },
    phone: { required: "Phone is required" },
    email: {
      required: "Email is required",
      pattern: {
        value: emailRegex,
        // Change this regex pattern as needed
        message: "Email is invalid",
      },
    },
    password: {
      required: "Password is required",
      pattern: {
        value: passwordRegex,
        // Change this regex pattern as needed
        message: "Password is invalid",
      },
    },
    confirmPassword: {
      required: "Confirm password is required",
      pattern: {
        value: passwordRegex,
        // Change this regex pattern as needed
        message: "Confirm password is invalid",
      },
      validate: (value) => value === password || "Passwords do not match",
    },
    // Add more validation rules for other input fields as needed
  };
  function submitSteps(data) {
    console.log("=== data steps ===", data);
    // Merging previous cumulative data with new data
    // const updatedData = { ...cumulativeData, ...data };
    // setCumulativeData(updatedData);
    // console.log("=== cumulativeData ===", updatedData, cumulativeData);
    // if (step === 6) {
    //   createAccount(cumulativeData);
    // } else if (step > 6) {
      // }
      if(step === 1){
        console.log('=== step1 ===', data)
        data.country_code = "+964"
        userEmail.current = data.email
        createAccount(data)
      }else if(step === 2){
        const verification_code = Object.keys(data)
        .filter(key => key.startsWith('number')) // Filter keys that start with 'number'
        .sort() // Optional: Sort the keys if they might not be in order
        .map(key => data[key]) // Map to their corresponding values
        .join(''); // Join the values into a string

        console.log('=== number ===',+verification_code); 
        // const verification_code = parseInt(Object.values(data).join(''));
        console.log('=== step2 ===', data)

        verifyAccount(verification_code)
      }else if(step ===3) {
        console.log('=== step3 ===', data)
        const fd = new FormData()
        fd.append('profile_picture', data.image[0])
        fd.append('gender', data.gender)
        fd.append('date_of_birth', data.date_of_birth)
        fd.append('country', data.country)
        additionalInfoAccount(fd)
      }
  }
  async function createAccount(data) {
    try {
      const accountRes = await AxiosInstance(
        `post`,
        `${process.env.NEXT_PUBLIC_API_KEY}/account/sign-up/`,
        {},
        {},
        data
      );
      console.log("=== createAccount response ===", accountRes);
      setStep(step + 1);

    } catch (error) {
      console.log("=== error in creating ===", error);
    }
  }
  async function verifyAccount(data) {
    try {
      const accountRes = await AxiosInstance(
        `post`,
        `${process.env.NEXT_PUBLIC_API_KEY}/account/verify-sign-up/`,
        {},
        {},
        {
          email: userEmail.current ,
          verification_code:data
        }
      );
      if(accountRes.status){
        const tokenData =  {...token}
        tokenData.access_token = accountRes.data.access
        tokenData.refresh_token = accountRes.data.refresh
        setToken(tokenData)
        setStep(step + 1);
      }
      console.log("=== verifyAccount response ===", accountRes);

      

    } catch (error) {
      console.log("=== error in verifying ===", error);
    }
  }
  async function additionalInfoAccount(data) {
    try {
      const accountRes = await AxiosInstance(
        `put`,
        `${process.env.NEXT_PUBLIC_API_KEY}/account/info/update/`,
        {Authorization :`Bearer ${token.access_token}`},
        {},
        data
      );
      console.log("=== additionalInfoAccount response ===", accountRes);
      if(accountRes.status){
        localStorage.setItem('token', token.access_token)
        localStorage.setItem('refresh_token', token.refresh_token)
        route.push('/')
        setStep(step + 1);
      }

      

    } catch (error) {
      console.log("=== error in verifying ===", error);
    }
  }
  function onChangeOther(e) {
    console.log("====value====", e);
    if (e.target.defaultValue === "other") {
      setOtherQuestion(true);
    } else {
      setOtherQuestion(false);
    }
  }
  function renderSteps() {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="signup__header">Create an Account</h2>
            <p className="signup__paragraph">
              To create an account, you have to follow the required steps and
              fill the required fields
            </p>
            <InputField
              register={register}
              errors={errors}
              errorMessage={validationStep1.full_name}
              type="text"
              name="name"
              id={"name"}
              validations={validations}
              placeholder="Full Name (Required)"
              onChange={handleChange}
            />
            <InputField
              register={register}
              errors={errors}
              errorMessage={validationStep1.phone}
              type="number"
              name="phone_number"
              id={"phone_number"}
              validations={validations}
              placeholder="Phone Number (Required)"
              onChange={handleChange}
            />

            <InputField
              register={register}
              errors={errors}
              errorMessage={validationStep1.email}
              type="email"
              name="email"
              validations={validations}
              placeholder="Email Address (Required)"
              onChange={handleChange}
            />
            <InputField
              register={register}
              errors={errors}
              errorMessage={validationStep1.password}
              type="password"
              name="password"
              id={"password"}
              validations={validations}
              placeholder="Password (Required)"
              onChange={handleChange}
            />
            <InputField
              register={register}
              errors={errors}
              errorMessage={validationStep1.confirmPassword}
              type="password"
              name="confirm_password"
              id={"confirm_password"}
              validations={validations}
              placeholder="Confirm Password (Required)"
              onChange={handleChange}
            />
            <Button
              // disabled={Object.keys(errors).length > 0}
              disabled={!isValid}
              className="special_button signup__button"
              // onClick={nextStep}
              type="submit"
            >
              Next
            </Button>
          </div>
        );
      case 2:
        return (
          <>
            <AuthCard
              title="Verify your email"
              text="To proceed with resetting your password, please check your email and enter the code sent"
              logo={false}
            >
              {/* <form onSubmit={(e) => e.preventDefault()}> */}
              <div className="grid grid-cols-6 gap-x-[24px]">
                <InputField
                  register={register}
                  errors={errors}
                  errorMessage={{ required: true }}
                  className="verify"
                  name="number1"
                  label={""}
                  placeholder={``}
                  id={"number1"}
                  type={"number"}
                  maxLength={1}
                />
                <InputField
                  register={register}
                  errors={errors}
                  errorMessage={{ required: true }}
                  className="verify"
                  name="number2"
                  label={""}
                  placeholder={``}
                  id={"number2"}
                  type={"number"}
                  maxLength={1}
                />
                <InputField
                  register={register}
                  errors={errors}
                  errorMessage={{ required: true }}
                  className="verify"
                  name="number3"
                  label={""}
                  placeholder={``}
                  id={"number3"}
                  type={"number"}
                  maxLength={1}
                />
                <InputField
                  register={register}
                  errors={errors}
                  errorMessage={{ required: true }}
                  className="verify"
                  name="number4"
                  label={""}
                  placeholder={``}
                  id={"number4"}
                  type={"number"}
                  maxLength={1}
                />
                <InputField
                  register={register}
                  errors={errors}
                  errorMessage={{ required: true }}
                  className="verify"
                  name="number5"
                  label={""}
                  placeholder={``}
                  id={"number5"}
                  type={"number"}
                  maxLength={1}
                />
                <InputField
                  register={register}
                  errors={errors}
                  errorMessage={{ required: true }}
                  className="verify"
                  name="number6"
                  label={""}
                  placeholder={``}
                  id={"number6"}
                  type={"number"}
                  maxLength={1}
                />
              </div>
              <div className="dont_have_acoount flex justify-center">
                <p>Haven’t received a code?</p>
                <Button onClick={resendCode}>
                  Resend Code{" "}
                  <SiteImage src={"/assets/images/chevron_right.svg"} />
                </Button>
              </div>
              <Button disabled={!isValid ? true : false} className="special_button w-full" type="submit">
                Next
              </Button>
              {/* </form> */}
            </AuthCard>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="signup__header">Additional Information</h2>
            <p className="signup__paragraph">
              We need some additional information to help customize your needs
            </p>
            <div className="flex gap-[16px] items-center mb-[24px]">
              <SiteImage
                className={"w-2/12"}
                src={"/assets/images/Profile_photo_lg.svg"}
              />
              <label
                style={{ width: "80%" }}
                htmlFor="image"
                className="manage__account--dropimage"
              >
                <div className="content">
                  <h5>Profile Picture</h5>
                  <span>Click to browse or drag and drop your files</span>
                </div>
              </label>
              <div className="field relative">
                {errors.image && (
                  <div className="flex items-center justify-start gap-x-[8px] error_message">
                    <SiteImage
                      alt="exclamation mark"
                      width={16}
                      height={16}
                      src="/assets/images/error_icon.svg"
                    />

                    <p className="text-error">{errors["image"].message}</p>
                  </div>
                )}
              </div>
              <input
                // register={register}
                // errors={errors}
                {...register("image", { required: "Image is required" })}
                name="image"
                type="file"
                id="image"
                hidden
              />
            </div>
            <SelectMenuField
              register={register}
              errors={errors}
              type="text"
              name="gender"
              id={"gender"}
              items={[{
                value: "M",
                name: 'Male'
              }, {
                value:"F",
                name: 'Female'
              }]}
              validations={validations}
              placeholder="Gender (Required)"
              onChange={handleChange}
            />
            <InputField
              register={register}
              errors={errors}
              type="date"
              name="date_of_birth"
              id={"date_of_birth"}
              validations={validations}
              placeholder="Date of Birth (Required)"
              onChange={handleChange}
            />
            <SelectMenuField
              register={register}
              errors={errors}
              type="text"
              name="country"
              id={"country"}
              validations={validations}
              errorMessage={{ required: "Country is required" }}
              items={countries}
              placeholder="Country or Residence (Required)"
              onChange={handleChange}
            />
            <Button disabled={!isValid ? true : false} className="special_button w-full" type="submit">
              Next
            </Button>
          </>
        );
      case 4:
        return (
          <>
            <h4 className="signup__header">Get Started!</h4>
            <p className="signup__paragraph">
              To help assist you better, we want to ask you a few questions
            </p>

            <h4 className="signup__content--header">
              Q1. What is your current year/grade?
            </h4>
            <InputField
              type="text"
              name="question_1"
              register={register}
              errors={errors}
              initialValue=""
              validations={validations}
              errorMessage={{ required: "You need to answer this" }}
              placeholder="Your answer... (Required)"
              onChange={handleChange}
            />
            <Button className="special_button w-full" type="submit">
              Next
            </Button>
          </>
        );
      case 5:
        return (
          <>
            <h4 className="signup__content--header mb-[24px]">
              Q2. What is your main educational concern
            </h4>
            <RadioGroup
              className="mb-[24px]"
              classNames={{
                wrapper: "justify-center",
              }}
              orientation="horizontal"
              onChange={onChangeOther}
            >
              <Radio value="Studying Habits" defaultChecked>
                Studying Habits
              </Radio>
              <Radio value="Career Choices">Career Choices</Radio>
              <Radio value="Social/Emotional">Social/Emotional</Radio>
              <Radio value="other">Other</Radio>
            </RadioGroup>
            {otherQuestion && (
              <>
                <InputField
                  register={register}
                  errors={errors}
                  name="other"
                  label={""}
                  placeholder={"Other concerns..."}
                  id={"other"}
                  type={"text"}
                  maxLength={200}
                />
                <p className="text-left">If your answer is not listed above</p>
              </>
            )}

            <Button className="special_button w-full mt-[24px]" type="submit">
              Next
            </Button>
          </>
        );
      case 6:
        return (
          <>
            <h4 className="signup__content--header mb-[24px]">
              Q3. Your School or University’s Name
            </h4>
            <InputField
              register={register}
              errors={errors}
              name="other"
              label={""}
              placeholder={"Other concerns..."}
              id={"other"}
              type={"text"}
              maxLength={200}
            />
            <Button className="special_button w-full mt-[24px]" type="submit">
              Done
            </Button>
          </>
        );
      default:
        return null;
    }
  }
  useEffect(() => {
    if(!route.isReady){
      return
    }
    getCountries()
    return () => {
      
    }
  }, [route])
  
  return (
    <MainLayout hideNavbar={true}>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_TITLE}Create Account`}</title>
      </Head>
      <section className="signup">
        <div className="steps">
          <div className="progress-container">
            <div
              className="progress"
              id="progress"
              style={
                step === 2
                  ? { width: "33.3333%" }
                  : step === 3
                  ? { width: "66.6667%" }
                  : step > 3
                  ? { width: "100%" }
                  : { width: "0" }
              }
            ></div>
            <div
              className={`circle ${step >= 1 ? "icon-active" : ""} ${
                step <= 1 ? "icon-last" : ""
              } ${step === 1 ? "current" : ""}`}
            >
              <div className="caption">Personal Info</div>
            </div>
            <div
              className={`circle ${step >= 2 ? "icon-active" : ""} ${
                step <= 2 ? "icon-last" : ""
              } ${step === 2 ? "current" : ""}`}
            >
              <div className="caption">Verification</div>
            </div>
            <div
              className={`circle ${step >= 3 ? "icon-active" : ""} ${
                step <= 3 ? "icon-last" : ""
              } ${step === 3 ? "current" : ""}`}
            >
              <div className="caption">Additional Info</div>
            </div>
            <div className={`circle ${step >= 4 ? "current" : ""}`}>
              <div className="caption">Get Started</div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(submitSteps)}>{renderSteps()}</form>
      </section>
    </MainLayout>
  );
}
