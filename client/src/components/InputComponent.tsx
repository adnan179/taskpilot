import React from 'react'

interface InputComponentProps{
    name:string,
    type:string,
    placeholder:string,
    onChange:(value:ChangeEvent<HTMLInputElement>) => void,
    className:string,
    value:string,
}
const InputComponent = ({name, type, placeholder,onChange, className,value}: InputComponentProps) => {
  return (
    <input 
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
        value={value}
    />
  )
}

export default InputComponent
