import React from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

const SelectWithValidator = (props) => {
    const { name, label, innerRef, invalid, value, onChange, options, hasEmptySelect, errors, ...otherProps } = props;

    return (
      <>
        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input
                type='select'
                id={name}
                name={name}
                innerRef={innerRef}
                invalid={invalid}
                value={value}
                onChange={e => onChange(e)}
                {...otherProps}
            >
              {
                hasEmptySelect ? (
                  <option value=""></option>
                ) : null
              }
              {
                options ? (
                  options.map((itemOption, index) => {
                    return <option key={index} value={itemOption.id}>{itemOption.name}</option>
                  })
                ) : null
              }
            </Input>
            {errors && <FormFeedback>{errors.message}</FormFeedback>}
        </FormGroup>
      </>
    )
}

export default SelectWithValidator
