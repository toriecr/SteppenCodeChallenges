import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Item } from '../Item'

test('renders Item component', () => {
  const { getByText } = render(
    <Item text="Test Item" index={0} listItems={[]} setListItems={() => {}} />
  )
  const itemElement = getByText(/Test Item/i)
  expect(itemElement).toBeInTheDocument()
})

test('shows Edit and Delete buttons on hover', async () => {
  const { getByText, findByText } = render(
    <Item text="Test Item" index={0} listItems={[]} setListItems={() => {}} />
  )

  const itemElement = getByText(/Test Item/i)
  fireEvent.mouseEnter(itemElement)

  // Ensure Edit and Delete buttons appear
  expect(await findByText(/Edit/i)).toBeInTheDocument()
  expect(await findByText(/Delete/i)).toBeInTheDocument()
})

test('calls handleDeleteItem when delete button is clicked after confirmation', async () => {
  const handleDeleteItem = jest.fn()
  window.confirm = jest.fn(() => true)

  const { getByText, findByText } = render(
    <Item text="Test Item" index={0} listItems={[]} setListItems={handleDeleteItem} />
  )

  const itemElement = getByText(/Test Item/i)
  fireEvent.mouseEnter(itemElement)

  // Click the Delete button
  const deleteButton = await findByText(/Delete/i)
  fireEvent.click(deleteButton)

  expect(window.confirm).toHaveBeenCalled()
  expect(handleDeleteItem).toHaveBeenCalled()
})

test('updates item text after editing and clicking elsewhere', async () => {
  const { getByText, getByPlaceholderText } = render(
    <Item text="Test Item" index={0} listItems={[]} setListItems={() => {}} />
  )

  const itemElement = getByText(/Test Item/i)
  fireEvent.mouseEnter(itemElement)

  // Click the Edit button
  const editButton = await getByText(/Edit/i)
  fireEvent.click(editButton)

  // Change the input value
  const inputElement = getByPlaceholderText(/Test Item/i)
  fireEvent.change(inputElement, { target: { value: 'Updated Item' } })

  // Simulate onBlur
  fireEvent.blur(inputElement)

  // Ensure item text is updated
  await waitFor(() => {
    expect(getByText('Updated Item')).toBeInTheDocument()
  })
})

test('updates item text after editing and hitting Enter key', async () => {
  const { getByText, getByPlaceholderText } = render(
    <Item text="Test Item" index={0} listItems={[]} setListItems={() => {}} />
  )

  const itemElement = getByText(/Test Item/i)
  fireEvent.mouseEnter(itemElement)

  const editButton = await getByText(/Edit/i)
  fireEvent.click(editButton)

  const inputElement = getByPlaceholderText(/Test Item/i)
  fireEvent.change(inputElement, { target: { value: 'Updated Item' } })

  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

  await waitFor(() => {
    expect(getByText('Updated Item')).toBeInTheDocument()
  })
})
