import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'


test('the form calls the event handler it received as props with the right details when a new blog is created.', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={addBlog} />)

  const input_title = container.querySelector('#input-title')
  const input_author = container.querySelector('#input-author')
  const input_url = container.querySelector('#input-url')
  const sendButton = screen.getByText('submit')

  await user.type(input_title, 'Attack on Titan')
  await user.type(input_author, 'Hajime Isayama')
  await user.type(input_url, 'www.crunchyroll.com')

  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Attack on Titan')
  expect(addBlog.mock.calls[0][0].author).toBe('Hajime Isayama')
  expect(addBlog.mock.calls[0][0].url).toBe('www.crunchyroll.com')
})