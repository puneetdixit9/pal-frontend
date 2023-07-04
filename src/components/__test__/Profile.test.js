import { render, screen, cleanup } from '@testing-library/react'
import Profile from '../Profile'
import renderer from 'react-test-renderer'

test('test', () => {
    expect(true).toBe(true)
})

afterEach(() => {
    cleanup()
})

it('snapshot <Profile />', () => {
    const tree = renderer.create(<Profile />).toJSON()
    expect(tree).toMatchSnapshot()
})
