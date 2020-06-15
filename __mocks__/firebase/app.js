export const mockInitializeApp = jest.fn(() => ({
  firestore: () => ({
    doc: () => ({
      get: async () => 'response',
    }),
  }),
}))

export const mockAnalytics = jest.fn()

const firebase = {
  initializeApp: mockInitializeApp,
  apps: [],
  analytics: mockAnalytics,
}

export default firebase
