import { Fragment } from 'react'
import { Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const DatePicker = (props) => {
    const { label, value, maxDate, minDate, onChange } = props

    return (
        <Fragment>
            <Label for='default-picker'>{label}</Label>
            <Flatpickr 
                className='form-control' 
                value={value} onChange={(date) => onChange(date[0])} 
                options={{maxDate: maxDate || null, minDate: minDate || null}}
            />
        </Fragment>
    )
}

export default DatePicker
