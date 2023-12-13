import React from 'react'
import { Button, Card, CardBody, CardFooter, Form, FormGroup } from 'reactstrap'


const ValidationForm = (props) => {
    const { children, formContext, onSubmit, primaryButtonText } = props

    return(
        <>
            <Form onSubmit={formContext.handleSubmit(onSubmit)}>
                <Card>
                    <CardBody>
                        {children}
                    </CardBody>
                    <CardFooter>
                        <FormGroup className='mb-0'>
                            <Button.Ripple className='mr-1 float-right' color='primary' type='submit'>
                                {primaryButtonText}
                            </Button.Ripple>
                        </FormGroup>
                    </CardFooter>
                </Card>
            </Form>
        </>
    )
}

export default ValidationForm
