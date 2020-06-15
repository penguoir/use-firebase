import React from 'react'
/**
 * @typedef {Object} FirebaseConfig
 * @property {string} apiKey
 * @property {string} authDomain
 * @property {string} databaseURL
 * @property {string} projectId
 * @property {string} storageBucket
 * @property {string} messagingSenderId
 * @property {string} appId
 * @property {string} measurementId
 */

/**
 * Callback function for when firebase is initialized
 * @callback callback
 * @param {firebase.app.App} FirebaseApp The firebase app, no need to .initializeApp() here! Just use this if you want custom settings
 */

/**
 * useFirebase - Load firebase with a hook
 * @param {FirebaseConfig} FirebaseConfig Firebase config
 * @callback {function} callback Once firebase is initialized, do this
 * @returns {firebase.app.App|null} Firebase app OR NULL (when loading)
 *
 * @example
 *    const firebase = useFirebase({ appid: whatever })
 *
 *    // ... later, e.g. in a component ...
 *    React.useEffect(() => {
 *      if (firebase) {
 *        firebase.firestore().doc('a/doc').get().then(res => set)
 *      }
 *    }, [])
 *
 */
function useFirebase(config, callback) {
  const [app, setApp] = React.useState(null)

  // On mount
  React.useEffect(() => {
    // Import firebase modules
    Promise.all([
      import('firebase/app'),
      import('firebase/database'),
      import('firebase/auth'),
      import('firebase/analytics'),
      import('firebase/firestore'),
      import('firebase/functions'),
      import('firebase/storage'),
    ])
      // Get just firebase.app (we don't need the rest for now)
      .then((x) => x[0].default)
      .then((firebase) => {
        // If no app already
        if (!firebase.apps.length) {
          // Initialize with config
          setApp(firebase.initializeApp(config))

          if (callback) {
            callback(firebase)
          }
        } else {
          // If there is an app, set it
          setApp(firebase.app)
        }
      })
  }, [])

  return app
}

export default useFirebase
