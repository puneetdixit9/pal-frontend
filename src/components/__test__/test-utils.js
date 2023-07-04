import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../redux/store'
import { render as rtlRender } from '@testing-library/react'

const render = component => {
    return rtlRender(
        <BrowserRouter>
            <Provider store={store}>{component}</Provider>
        </BrowserRouter>,
    )
}

export * from '@testing-library/react'
export default render
