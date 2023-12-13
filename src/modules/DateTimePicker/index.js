import { Fragment } from 'react'
import { Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const DateTimePicker = (props) => {
    const { label, value, maxDate, minDate, onChange, name } = props

    return (
        <Fragment>
            {
                label ? (
                    <Label for={name}>{label}</Label>
                ): null
            }
            <Flatpickr 
                id={name}
                className='form-control'
                data-enable-time
                value={value} 
                onChange={(date) => onChange(date[0])} 
                options={{maxDate: maxDate || null, minDate: minDate || null}}
            />
        </Fragment>
    )
}

export default DateTimePicker