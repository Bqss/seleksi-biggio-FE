import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputFileProps{
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  label : string,
  name: string,
  [key: string]: any
}

const InputFile : React.FC<InputFileProps> =  ({register,errors,label,id, value,name,...d}) => {
  const [isEditing , setIsEditing] = React.useState(false);

  if(value && !isEditing){
    return (
      <div className='flex-1'>
        <label htmlFor={id} className='mb-4 block'>{label}</label>
        <div className='flex'>
          <img src={value} alt="" className='w-32 h-32 object-cover' />
          <button onClick={() => setIsEditing(true)} className='ml-6 btn btn-primary'>Change</button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1'>
      <label htmlFor={id} className='mb-4 block'>{label}</label>
      <input type="file" {...register(name)} multiple={false} className='file-input file-input-bordered file-input-primary w-full ' id={id} {...d} />
      {errors[name] ? (
        <span className='text-xs text-error'>{String(errors?.title?.message) ?? ""}</span>
      ) : ""}
    </div>
  )
}

export default InputFile