// pages/multiStepForm.js
import AuthCard from "@/Components/UI/AuthCard";
import SiteImage from "@/Components/UI/SiteImage";
import InputField from "@/Components/fields/InputField";
import SelectMenuField from "@/Components/fields/SelectField";
import { AxiosHeadersInstance } from "@/Functions/AxiosHeadersInstance";
import { AxiosInstance } from "@/Functions/AxiosInstance";
import { emailRegex, passwordRegex } from "@/Functions/RegexFunction";
import MainLayout from "@/Layouts/MainLayout";
import { useSnackbar } from "@/custom-hooks/useSnackbar";
import { Button, Checkbox, CheckboxGroup , Input } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function index() {
  const showSnackbar = useSnackbar()
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const selectedUniversity = watch('university_id');
  const otherInput = watch('other');
  const [questions, setQuestions] = useState([])
  const route = useRouter();
  const userEmail = useRef("");
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [educationConcerns, setEducationConcerns] = useState([]);
  const [step, setStep] = useState(1);
  const [token, setToken] = useState({
    access_token: "",
  });
  const [validations, setValidations] = useState([]);
  const [otherQuestion, setOtherQuestion] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const password = watch("password", "");
  const [mc, setMc] = useState({})


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  async function getQuesions() {
    try {
      const { data } = await AxiosHeadersInstance(
        `get`,
        `${process.env.NEXT_PUBLIC_API_KEY}/tests/questions/`
      );
        console.log("=== questions ===", data)
        setQuestions(data)
    } catch (error) {
      console.log("=== error questions ===", error);
    }
  }


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
        message: "Minimum 6 characters, at least one number, and special character",
      },
    },
    confirmPassword: {
      required: "Confirm password is required",
      pattern: {
        value: passwordRegex,
        // Change this regex pattern as needed
        message: "Minimum 6 characters, at least one number, and special character",
      },
      validate: (value) => value === password || "Passwords do not match",
    },
    // Add more validation rules for other input fields as needed
  };
  function submitSteps(data) {
    console.log("=== originals ====", data)
    // Create an empty array to store selected IDs
    const selectedIds = [];

    // Iterate through the questions and check if the question type is "MC"
    questions.forEach((question) => {
      if (question.question_type === "MC") {
        // Get the selected value for this question from the form data
        const selectedValue = data[`question_${question.id}`];

        // If a value is selected, add its ID to the selectedIds array
        if (selectedValue) {
          selectedIds.push(selectedValue);
        }
      }
    });
    const outputArray = [];
    const keyToQuestionId = {};

    // Dynamically create the keyToQuestionId mapping
    Object.keys(data).forEach((key) => {
        keyToQuestionId[key] = parseInt(key.split('question_')[1]);
    });
    // Iterate through the keys of the inputObject and convert it to the desired format
    Object.keys(data).forEach(key => {
      if (key in keyToQuestionId) {
          const questionId = keyToQuestionId[key];
          const text = data[key];
          outputArray.push({ "question_id": questionId, "text": text });
      }
    });
    console.log("=== selectedIds ====", mc)

    console.log("=== questions ====", outputArray)
    // Object.keys(data).map(())
  
// Iterate through each key in updatedObject
    Object.keys(mc).forEach(key => {
      // Extract the question ID from the key
      let questionId = parseInt(key.split('_')[1]);

      // Find the corresponding question in the array
      let questionToUpdate = outputArray.find(q => q.question_id === questionId);

      console.log("===== questionToUpdate ======",questionToUpdate, questionId)
      // Update the text field if the question is found
      if (questionToUpdate) {
        questionToUpdate.selected_answers = mc[key];
      }
    });
    const transformedArray = outputArray.map(item => {
      let newItem = { question_id: item.question_id };
    
      // Check if text is a JSON string
      if (typeof item.text === 'string' && item.text.startsWith('{') && item.text.endsWith('}')) {
        try {
          const parsedText = JSON.parse(item.text);
          newItem.value = parsedText.id;
          newItem.text = parsedText.text;
        } catch (error) {
          console.error('Error parsing text JSON', error);
        }
      } else {
        newItem.text = item.text;
      }
    
      // Check for selected_answers and modify structure accordingly
      if (Array.isArray(item.selected_answers) && item.selected_answers.length > 0) {
        newItem.selected_answers = item.selected_answers;

        delete newItem.text;
      }
    
      return newItem;
    });
    const mergedArray = Object.values(transformedArray.reduce((acc, item) => {
      const existingItem = acc[item.question_id];

      if (!existingItem) {
        acc[item.question_id] = { ...item };
      } else {
        // Handle text and custom_entry
        if (item.text && item.text.trim() !== '') {
          if (!existingItem.custom_entry) {
            existingItem.custom_entry = item.text;
          }
        }
    
        // Merge selected_answers if they exist
        if (item.selected_answers) {
          existingItem.selected_answers = item.selected_answers;
        }
      }
      return acc;
    }, {}));
    console.log("==== final one array ====" ,transformedArray);
    console.log("==== final one array mergedArray ====" ,mergedArray);
    submitQuestions(mergedArray)
    // Object.keys(data).map(())
  }
  function onChangeQuestionData(event) {
    const { value } = event.target;
    console.log('=== value ===', value)
    // if (value == 4) {
    //   setOtherQuestion(true);
    //   console.log('=== true ===')

    // } else {
    //   setOtherQuestion(false);
    // }
  }
  function onGetMCData(data, id){
    setMc(prevState => ({
      ...prevState,
      [id]: data
    }))
  }
  async function submitQuestions(data){
    
    try {
      const questionResponse = await AxiosHeadersInstance(
        `post`,
        `${process.env.NEXT_PUBLIC_API_KEY}/tests/user-answers/`,
        {},
        {},
        data
      );
      if (questionResponse.status) {
        route.push('/')
        reset()
        showSnackbar('Questions submitted successfully', 'success')
      }else{
        showSnackbar(questionResponse.error, 'success')
      }
      console.log("=== qauestions response ===", questionResponse);
    } catch (error) {
      console.log("=== error in verifying ===", error);
    }
    console.log('=== submitQuestions ===', data)
  }


  function renderSteps(questions) {
    switch (step) {
      case 1:
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
              name="year_or_grade"
              register={register}
              errors={errors}
              validations={validations}
              errorMessage={{ required: "You need to answer this" }}
              placeholder="Your answer... (Required)"
              onChange={handleChange}
            />
            <Button
              disabled={!isValid ? true : false}
              className="special_button w-full"
              type="submit"
            >
              Next
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <h4 className="signup__content--header mb-[24px]">
              Q2. What is your main educational concern
            </h4>
            {/* <Controller
            control={control}
            name="educational_concerns_ids"
            {...register('educational_concerns_ids', {
              required: 'Educational concern required'
            })}
              render={
              ()=> {
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
              }
            }>

            </Controller> */}
            <Controller
              control={control}
              name="educational_concerns_ids"
              defaultValue={educationConcerns[0].id}
              render={({ field: { onChange } }) => (
                <div className="grid grid-cols-3 gap-[24px]">
                  {educationConcerns.map((concern) => <p key={concern.id} className="text-left">
                    <input
                      type="radio"
                      id={`educational_concerns_${concern.id}`}
                      value={concern.id}
                      required
                      // checked={value === 'Studying-Habits'}
                      onChange={(e) => {
                        onChange(e);
                        onChange(e.target.value);
                      }}
                      className="form__group--input"
                      name="radio-group"
                      // defaultChecked
                    />
                    <label htmlFor={`educational_concerns_${concern.id}`}>{concern.concern}</label>
                  </p>)}
                </div>
              )}
            />
            {otherQuestion && (
              <div className="mt-[16px]">
                <InputField
                  register={register}
                  errors={errors}
                  name="custom_concern"
                  label={""}
                  placeholder={"Other concerns..."}
                  id={"custom_concern"}
                  type={"text"}
                  maxLength={200}
                />
                <p className="text-left">If your answer is not listed above</p>
              </div>
            )}

            <Button
              disabled={!isValid ? true : false}
              className="special_button w-full mt-[24px]"
              type="submit"
            >
              Next
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <h4 className="signup__content--header mb-[24px]">
              Q3. Your School or University’s Name
            </h4>

            <SelectMenuField
              register={register}
              errors={errors}
              // errorMessage={{ required: "Gender is required" }}
              name="university_id"
              id={"university_id"}
              items={universities}
            />
            <h6 className="or">Or</h6>
            <InputField
              register={register}
              errors={errors}
              name="other"
              id={"other"}
            />
            <Button disabled={!isValid ? true : false} className="special_button w-full mt-[24px]" type="submit">
              Done
            </Button>
          </>
        );
      default:
        return null;
    }
  }
  useEffect(() => {
    if (!route.isReady) {
      return;
    }
    
    getQuesions()
    return () => {};
  }, [route]);

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
              style={{ width: "100%" }}
            ></div>
            <div
              className={`circle icon-active`}>
              <div className="caption">Personal Info</div>
            </div>
            <div
              className={`circle icon-active`}
            >
              <div className="caption">Verification</div>
            </div>
            <div
              className={`circle icon-active`}
            >
              <div className="caption">Additional Info</div>
            </div>
            <div className={`circle current`}>
              <div className="caption">Get Started</div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(submitSteps)}>
            {/* {renderSteps(questions)} */}
            {questions.map((question) => <div key={question.id} className="">
              <h4 className="signup__content--header text-left mb-[24px]">
                {question.text}
              </h4>
              {question.question_type === "MC" ? <Controller
                control={control}
                name={`question_${question.id}`}
                defaultValue={""}
                render={({ field: { onChange } }) => (
                  <select
                    type="text"
                    id={`question_${question.id}`}
                    // value={concern.id}
                    required
                    // checked={value === 'Studying-Habits'}
                    onChange={(e) => {
                      console.log("=e=", JSON.parse(e.target.value))
                      onGetMCData(JSON.parse(e.target.value), `question_${question.id}`)
                      onChange(e);
                    }}
                    className="form__group--input w-full"
                    placeholder="Answer the question"
                    // name="radio-group"
                    // defaultChecked
                  >
                    <option value="">Select option</option>
                    {question.answers.length > 0 && question.answers.map((answer) => <option key={answer.id} value={JSON.stringify(answer)}>{answer.text}</option>)}
                  </select>
                )}
                />: question.question_type === "SM" ?  <Controller
                control={control}
                name={`question_${question.id}`}
                defaultValue={[]}

                render={({ field: { onChange } }) => (
                  <CheckboxGroup
                  onChange={
                    (e)=> onGetMCData(e, `question_${question.id}`)
                  }
                  // label="Select cities"
                >
                  <div className="grid grid-cols-3 gap-[24px]">

                  {question.answers.map((answer) => <Checkbox key={answer.id} value={answer.id}>{answer.text}</Checkbox>)}

                  </div>
                </CheckboxGroup>
                )}
                /> : <Controller
                  control={control}
                  name={`question_${question.id}`}
                  defaultValue={""}
                  render={({ field: { onChange } }) => (
                    <input
                      type="text"
                      id={`question_${question.id}`}
                      // value={concern.id}
                      required
                      // checked={value === 'Studying-Habits'}
                      onChange={(e) => {
                        onChangeQuestionData(e);
                        onChange(e.target.value);
                      }}
                      className="form__group--input w-full"
                      placeholder="Answer the question"
                      // name="radio-group"
                      // defaultChecked
                    />
                  )}
                />
              }
              {question.allow_custom_entry && <Controller
                  control={control}
                  name={`other_question_${question.id}`}
                  defaultValue={""}
                  render={({ field: { onChange } }) => (
                    <input
                      type="text"
                      id={`custom_entry_${question.id}`}
                      name={`other_question_${question.id}`}
                      // value={concern.id}
                      // checked={value === 'Studying-Habits'}
                      onChange={(e) => {
                        onChangeQuestionData(e);
                        onChange(e.target.value);
                      }}
                      className="form__group--input w-full mt-[8px]"
                      placeholder="Other if you want to add custom answer"
                      // name="radio-group"
                      // defaultChecked
                    />
                  )}
                />}
            </div>
            
            
            )}
            <Button
              // disabled={Object.keys(errors).length > 0}
              disabled={!isValid}
              className="special_button signup__button"
              // onClick={nextStep}
              type="submit"
            >
              Submit
            </Button>
        </form>
      </section>
    </MainLayout>
  );
}
