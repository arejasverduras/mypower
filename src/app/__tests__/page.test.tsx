import {expect, test} from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../page'

test('Home page', () => {
  render(<Home />)
  expect(screen.getByRole('heading', { level: 2 })).toBeDefined()

})