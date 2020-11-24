import React from 'react';
import styled from 'styled-components';

const FormInput = ({ children, name, value, onChange, type, placeholder }) => (<StyledInput name={name} value={value} onChange={onChange} type={type} placeholder={placeholder}>{children}</StyledInput>)


const StyledInput = styled.input`

width: 130px;
height: 30px;
margin-right: 10px;
border-radius: 5px;
padding: 3px 10px;
border: 1px solid gray;
margin-top: 10px;
::placeholder {
  text-align: center;
}


`


export default FormInput