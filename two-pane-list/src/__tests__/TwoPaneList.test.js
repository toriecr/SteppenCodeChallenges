import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TwoPaneList } from '../TwoPaneList.jsx'

const testData = [
  { title: 'Title 1', content: ['Bold Content', 'Content 2'] },
  { title: 'Title 2', content: ['Another Bold Content', 'Content 3'] },
]

test('renders without crashing', () => {
  render(<TwoPaneList data={[]} />)
  expect(screen.getByText('Click on a title to view content.')).toBeInTheDocument()
})

test('initial state verification', () => {
  render(<TwoPaneList data={testData} />)
  expect(screen.getByText('Click on a title to view content.')).toBeInTheDocument()
})

test('title list rendering', () => {
  render(<TwoPaneList data={testData} />)
  expect(screen.getByText('Title 1')).toBeInTheDocument()
  expect(screen.getByText('Title 2')).toBeInTheDocument()
})

test('content display on title click', () => {
  render(<TwoPaneList data={testData} />)
  fireEvent.click(screen.getByText('Title 1'))
  expect(screen.getByText('Bold Content')).toBeInTheDocument()
  expect(screen.getByText('Bold Content')).toHaveStyle('font-weight: bold')
  expect(screen.getByText('Content 2')).toBeInTheDocument()
})
