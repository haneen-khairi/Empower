import React from 'react'

export default function QuestionsComponent({
    question,
    onGetMCData = (data , id) => {},
    onChangeQuestionData =(e) => {}
}) {
  return <div key={question.id} className="">
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
          // console.log("=e=", JSON.parse(e.target.value))
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
        (e) => {
          onGetMCData(e, `question_${question.id}`),
        onChange(e)}
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
}
