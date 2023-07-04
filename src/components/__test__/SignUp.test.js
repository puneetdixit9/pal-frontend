import { screen, cleanup } from '@testing-library/react'
import SignUp from '../SignUp'
import render from './test-utils'

test('test', () => {
    expect(true).toBe(true)
})

afterEach(() => {
    cleanup()
})

test('render react <SignUp />', () => {
    render(<SignUp />)
    const linkElement = screen.queryAllByText(/Sign Up/i)
    expect(linkElement[0]).toBeInTheDocument()
})
