import { render, screen, cleanup } from '@testing-library/react'
import About from '../About'
import renderer from 'react-test-renderer'

afterEach(() => {
    cleanup()
})

test('test', () => {
    expect(true).toBe(true)
})

test('render react <About />', () => {
    render(<About />)
    const linkElement = screen.getByText(/About/i)
    expect(linkElement).toBeInTheDocument()
})

it('snapshot <About />', () => {
    const tree = renderer.create(<About />).toJSON()
    expect(tree).toMatchSnapshot()
})
