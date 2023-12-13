import React from 'react'
import { CustomInput, FormFeedback, FormGroup, Input, Label } from 'reactstrap'

const SelectMultipleWithValidator = (props) => {
    const { name, label, innerRef, invalid, value, onChange, options, hasEmptySelect, errors, ...otherProps } = props;

    const getItemHeight = () => {
        if (otherProps.size) {
            if (otherProps.size >= options.length) {
                return "100%";
            }
            return `${otherProps.size * 34}px`;
        } else {
            return "100%";
        }
    }

    const handleChange = (item) => {
        let selectedValues = [...value];
        if (item) {
            const indexOfItemTarget = value.indexOf(item.target.id)
            // add new item in array when checkbox is checked
            if (indexOfItemTarget < 0 && item.target.isCheked) {
                selectedValues = [...selectedValues, item.target.id]
            }

            // remove item in array when checkbox is unchecked
            if (indexOfItemTarget >= 0 && !item.target.isCheked) {
                selectedValues.splice(indexOfItemTarget, 1);
            }
        }
        onChange(selectedValues)
    }

    const getIsCheck = (id) => {
        const itemTarget = value.find(x => x === id)
        if (itemTarget) {
            return true;
        } else {
            return false;
        }
    }

    return (
      <>
        <FormGroup>
            <Label for={name}>{label}</Label>
                <div style={{height: getItemHeight() }} className={"form-control overflow-auto"}>
                    {
                        options ? (
                            options.map((itemOption, index) => {
                                return (
                                    <CustomInput
                                        className={"pb-1"}
                                        type='checkbox' 
                                        key={index} 
                                        id={itemOption.id} 
                                        label={itemOption.name}
                                        defaultChecked={getIsCheck(itemOption.id)}
                                        onChange={
                                            e => handleChange(
                                                {target: {
                                                    id: itemOption.id,
                                                    isCheked: e.target.checked,
                                                }}
                                            )
                                        }
                                    />
                                ) 
                            })
                        ) : null
                    }
                </div>
            {errors && <FormFeedback>{errors.message}</FormFeedback>}
        </FormGroup>
      </>
    )
}

export default SelectMultipleWithValidator
