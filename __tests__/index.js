import React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import useFirebase from '../'
import * as firebase from 'firebase/app'

beforeEach(() => {
  jest.clearAllMocks()
})

test('returns the initialized app', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useFirebase({ a: 'config' })
  )

  await waitForNextUpdate()

  expect(result.current).toBeDefined()
  expect(firebase.mockInitializeApp).toHaveBeenCalledTimes(1)
})

test('does nothing when apps exist', async () => {
  firebase.default.apps = ['something here']
  const { result, waitForNextUpdate } = renderHook(() => useFirebase())

  await waitForNextUpdate()

  expect(firebase.mockInitializeApp).not.toHaveBeenCalled()
  expect(result).toBeDefined()

  // Cleanup
  firebase.default.apps = []
})

test('runs the callback', async () => {
  const callback = jest.fn()
  const { waitForNextUpdate } = renderHook(() =>
    useFirebase({ a: 'config' }, callback)
  )

  await waitForNextUpdate()

  expect(callback).toHaveBeenCalledTimes(1)
})
