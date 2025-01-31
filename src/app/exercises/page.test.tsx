import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import ExercisesPage from "./page"

test("Exercises page", () => {
  render(<ExercisesPage />)
  expect(screen.getByRole("heading", { level: 2 })).toBeDefined()
})