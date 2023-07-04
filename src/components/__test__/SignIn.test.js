import { render as rtlRender, screen, fireEvent } from '@testing-library/react'
import SignIn from '../SignIn'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import render from './test-utils'

test('test', () => {
    expect(true).toBe(true)
})

jest.mock('../../hooks/redux-hooks')
describe(SignIn, () => {
    const dispatch = jest.fn()
    beforeEach(() => {
        useAppSelector.mockImplementation(fun =>
            fun({
                authReducer: {
                    isLoading: true,
                    user: null,
                },
            }),
        )
        useAppDispatch.mockImplementation(() => dispatch)
    })

    afterEach(() => {})
    jest.clearAllMocks()

    test('render react <SignIn />', () => {
        const { getByText } = render(<SignIn />)
        const linkElement = screen.queryAllByText(/Sign In/i)
        expect(linkElement[0]).toBeInTheDocument()
        const btn = getByText('SignIn')
        fireEvent.click(btn)
        expect(dispatch).toHaveBeenCalled()
    })
})
