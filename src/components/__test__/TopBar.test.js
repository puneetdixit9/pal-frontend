import { render as rtlRender, screen, cleanup } from '@testing-library/react'
import TopBar from '../TopBar'
import render from './test-utils'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

afterEach(() => {
    cleanup()
})

test('test', () => {
    expect(true).toBe(true)
})

test('render react <TopBar />', () => {
    render(<TopBar />)
    const linkElement = screen.getByText(/RIL/i)
    expect(linkElement).toBeInTheDocument()
})

jest.mock('../../hooks/redux-hooks')
describe(TopBar, () => {
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

    test('render react <TopBar />', () => {
        const { getByText } = render(<TopBar />)
        const linkElement = screen.getAllByText(/RIL/i)
        expect(linkElement[0]).toBeInTheDocument()
    })
})
