//import React from "react"
import React, { Fragment } from 'react'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form } from 'reactstrap'
import { ValidationForm, TextFieldWithValidator, SelectWithValidator } from "../../modules/validatorComponent";
import { useTranslation } from "react-i18next";
import { useAuth0 } from '../../auth0';
import { toast } from 'react-toastify'

const GeneralTabs = ({ currentUser, handleUpdateUser }) => {
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm({shouldUnregister: false})
  const { t, i18n } = useTranslation();

  const { requestChangePasswordEmail } = useAuth0();
  //const [avatar, setAvatar] = useState(currentUser.avatar ? currentUser.avatar : '')

  const defaultValues = React.useMemo(
    () => ({
      id: currentUser?.id || "",
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      emailAddress: currentUser?.emailAddress || "",
      emailVerified: currentUser?.emailVerified || "",
    }), [currentUser]
  );

  const profileForm = useForm({defaultValues, shouldUnregister: false})

  React.useEffect(() => {
    profileForm.reset(defaultValues);
  }, [defaultValues]);

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    // reader.onload = function () {
    //   setAvatar(reader.result)
    // }
    reader.readAsDataURL(files[0])
  }

  const onSubmit = currentUser => {
    handleUpdateUser(currentUser);
  }

  return (
    <Fragment>
      {/* <Media>
        <Media className='mr-25' left>
          <Media object className='rounded mr-50' src={avatar} alt='Generic placeholder image' height='80' width='80' />
        </Media>
        <Media className='mt-75 ml-1' body>
          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
            Upload
            <Input type='file' onChange={onChange} hidden accept='image/*' />
          </Button.Ripple>
          <Button.Ripple color='secondary' size='sm' outline>
            Reset
          </Button.Ripple>
          <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
        </Media>
      </Media> */}
      <ValidationForm 
        className='mt-2' 
        onSubmit={onSubmit} 
        formContext={profileForm}
        primaryButtonText={t('Save changes')}
        >
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label for='name'>First Name</Label>
              <TextFieldWithValidator
                defaultValue={currentUser.firstName}
                control={control}
                as={Input}
                id='firstName'
                name='firstName'
                placeholder='First Name'
                innerRef={profileForm.register({ required: true })}
                value={profileForm.watch("firstName")}
                onChange={e => setValue('firstName', e.target.value)}
                className={classnames({
                  'is-invalid': errors.firstName
                })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='name'>Last Name</Label>
              <TextFieldWithValidator
                defaultValue={currentUser.lastName}
                control={control}
                as={Input}
                id='lastName'
                name='lastName'
                placeholder='Last Name'
                innerRef={profileForm.register({ required: true })}
                value={profileForm.watch("lastName")}
                onChange={e => setValue('lastName', e.target.value)}
                className={classnames({
                  'is-invalid': errors.lastName
                })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='emailAddress'>E-mail</Label>
              <TextFieldWithValidator
                defaultValue={currentUser.emailAddress}
                control={control}
                as={Input}
                type='emailAddress'
                id='emailAddress'
                name='emailAddress'
                placeholder='Email'
                innerRef={profileForm.register({ required: true })}
                value={profileForm.watch("emailAddress")}
                onChange={e => setValue('emailAddress', e.target.value)}
                className={classnames({
                  'is-invalid': errors.emailAddress
                })}
              />
            </FormGroup>
          </Col>
          <Col className='mt-2' sm='12'>
            {
            <Button.Ripple color='secondary' onClick={() => {
                      if (currentUser.emailAddress) {
                        requestChangePasswordEmail({
                          email: currentUser.emailAddress,
                          connection: "Username-Password-Authentication",
                        }).then(result => {
                          const { isSuccess, message } = result
                          if (!isSuccess) {
                            toast.failure(message) // failure
                          } else {
                            toast.success("We've sent you a password reset message", {
                              position: toast.POSITION.BOTTOM_RIGHT,
                            });
                          }
                        })
                      }
                    }} 
                    outline>
              Change Password
            </Button.Ripple> 
            }
          </Col>
        </Row>
      </ValidationForm>
    </Fragment>
  )
}

export default GeneralTabs
