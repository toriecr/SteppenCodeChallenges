import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ItemList } from '../ItemList.jsx'

test('renders ItemList component', () => {
  const { getByText } = render(<ItemList />)
  const headerElement = getByText(/List/i)
  expect(headerElement).toBeInTheDocument()
})
