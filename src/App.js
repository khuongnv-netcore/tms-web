import i18next from 'i18next'
import React from 'react'
import { I18nextProvider } from 'react-i18next'

// ** Router Import
import Router from './router/Router'

const App = props => {

    return (
        <I18nextProvider i18n={i18next} >
            <Router />
        </I18nextProvider>
    )

}

export default App
