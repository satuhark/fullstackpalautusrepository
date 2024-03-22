import React from 'react'
import { render, screen } from '@testing-library/react'
import BlogComponent from './LikeAndDelete'
import { test, expect } from 'vitest'

test('renders something', () => {
  render(<BlogComponent />)

  expect(document.body.children.length).toBeGreaterThan(0)
})