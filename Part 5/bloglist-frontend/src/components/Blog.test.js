import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('component renders title & auther but does not render its URL or number of likes by default', () => {
  const blog = {
    id: 0,
    title: 'Component testing is done with react-testing-library',
    author: 'Arto Hellas',
    url: 'www.fullstackopen.com/en',
    likes: 0
  }

  render(<Blog
    key={blog.id}
    blog={blog}
  />)

  const element = screen.getByText('Component testing is done with react-testing-library - Arto Hellas')
  expect(element).toBeDefined()
  expect(screen.queryByText(/www.fullstackopen.com/i)).toBeNull()
  expect(screen.queryByText(/0/i)).toBeNull()
})

test('component renders details when signaled to', async () => {
  const blog = {
    id: 0,
    title: 'Component testing is done with react-testing-library',
    author: 'Arto Hellas',
    url: 'www.fullstackopen.com/en',
    likes: 0
  }

  render(<Blog
    key={blog.id}
    blog={blog}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('show details')
  await user.click(button)

  const url = screen.getByText(/URL: www.fullstackopen.com/i)
  const likes = screen.getByText(/0/i)
  expect(url).toBeDefined()
  expect(likes).toBeDefined()

})

test('event handler for like functionality is called twice upon two clicks', async () => {
  const blog = {
    id: 0,
    title: 'Component testing is done with react-testing-library',
    author: 'Arto Hellas',
    url: 'www.fullstackopen.com/en',
    likes: 0
  }

  const mockHandler = jest.fn()

  render(<Blog
    key={blog.id}
    blog={blog}
    likeBlog={mockHandler}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  screen.debug()
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})