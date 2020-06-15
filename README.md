# use-firebase

A React hook for importing firebase dynamically.

## The problem

[Firebase is huge.](https://medium.com/@romanonthego/firebase-js-is-so-damn-huge-f04de528094f)

Us web developers want speedy performance, so we use code-splitting to make firebase be loaded in _after_ the main part of the appliaction. Lazy-loading the firebase module is the solution, but it is a bit tricky to implement without being extremely verbose.

## The solution

The `use-firebase` package allows you to lazy-load firebase without the code being ugly.

## Example

```js
import React from 'react'
import useFirebase from 'use-firebase'

var firebaseConfig = {
  apiKey: 'AIzaSyDOCAbC123dEf456GhI789jKl01-MnO',
  // ...
}

export default () => {
  const firebase = useFirebase(firebaseConfig)
  const [data, setData] = React.useState(null)

  // Get data on mount
  React.useEffect(() => {
    if (firebase) {
      firebase
        .firestore()
        .doc('a/document')
        .get()
        .then((res) => {
          setData(res)
        })
    }
  }, [])

  return <div>{data ? JSON.stringify(data) : <p>Loading</p>}</div>
}
```

## Installation

```
npm install --save use-firebase
```

# Api

## Typedefs

<dl>
<dt><a href="#FirebaseConfig">FirebaseConfig</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#callback">callback</a> : <code>function</code></dt>
<dd><p>Callback function for when firebase is initialized</p>
</dd>
<dt><a href="#callback">callback</a> ⇒ <code>firebase.app.App</code> | <code>null</code></dt>
<dd><p>useFirebase - Load firebase with a hook</p>
</dd>
</dl>

<a name="FirebaseConfig"></a>

## FirebaseConfig : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name              | Type                |
| ----------------- | ------------------- |
| apiKey            | <code>string</code> |
| authDomain        | <code>string</code> |
| databaseURL       | <code>string</code> |
| projectId         | <code>string</code> |
| storageBucket     | <code>string</code> |
| messagingSenderId | <code>string</code> |
| appId             | <code>string</code> |
| measurementId     | <code>string</code> |

<a name="callback"></a>

## callback : <code>function</code>

Callback function for when firebase is initialized

**Kind**: global typedef

| Param       | Type                          | Description                                                                                   |
| ----------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| FirebaseApp | <code>firebase.app.App</code> | The firebase app, no need to .initializeApp() here! Just use this if you want custom settings |

<a name="callback"></a>

## callback ⇒ <code>firebase.app.App</code> \| <code>null</code>

useFirebase - Load firebase with a hook

**Kind**: global typedef  
**Returns**: <code>firebase.app.App</code> \| <code>null</code> - Firebase app OR NULL (when loading)

| Param          | Type                                           | Description     |
| -------------- | ---------------------------------------------- | --------------- |
| FirebaseConfig | [<code>FirebaseConfig</code>](#FirebaseConfig) | Firebase config |

**Example**

```js
const firebase = useFirebase({ appid: whatever })

// ... later, e.g. in a component ...
React.useEffect(() => {
  if (firebase) {
    firebase
      .firestore()
      .doc('a/doc')
      .get()
      .then((res) => set)
  }
}, [])
```
