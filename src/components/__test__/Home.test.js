import { render, screen, cleanup } from '@testing-library/react'
import Home from '../Home'
import renderer from 'react-test-renderer'

test('test', () => {
    expect(true).toBe(true)
})

afterEach(() => {
    cleanup()
})

test('render react <Home />', () => {
    render(<Home />)
    const linkElement = screen.getByText(/Home/i)
    expect(linkElement).toBeInTheDocument()
})

it('snapshot <Home />', () => {
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot()
})
