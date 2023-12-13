import React from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

const TextFieldWithValidator = (props) => {
    const { rules, name, value, errors, validate, innerRef, invalid, label } = props

    return (
      <>
        <FormGroup>
          <Label for={name}>{label}</Label>
          <Input
              id={name}
              name={name}
              defaultvalues={value}
              innerRef={innerRef}
              invalid={invalid}
          />
          {errors && <FormFeedback>{errors.message}</FormFeedback>}
        </FormGroup>
      </>
    )
}

export default TextFieldWithValidator
