import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AddItem } from '../AddItem.jsx'

test('renders AddItem component', () => {
  const { getByPlaceholderText } = render(<AddItem setListItems={() => {}} />)
  const inputElement = getByPlaceholderText(/Enter new item/i)
  expect(inputElement).toBeInTheDocument()
})

test('calls handleAddItem when add button is clicked with non-whitespace input', () => {
  const handleAddItem = jest.fn()
  const { getByText, getByPlaceholderText } = render(<AddItem setListItems={handleAddItem} />)
  const addButton = getByText(/Add/i)
  const inputElement = getByPlaceholderText(/Enter new item/i)

  fireEvent.change(inputElement, { target: { value: 'Non-whitespace content' } })
  fireEvent.click(addButton)

  expect(handleAddItem).toHaveBeenCalled()
})

