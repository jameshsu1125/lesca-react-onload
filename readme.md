[![React](https://img.shields.io/badge/-ReactJs-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://zh-hant.reactjs.org/)
[![React](https://img.shields.io/badge/Less-1d365d?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)
[![React](https://img.shields.io/badge/Typescript-4277c0?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3schools.com/html/)
[![React](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3schools.com/css/)
[![NPM](https://img.shields.io/badge/NPM-ba443f?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![React](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![NPM](https://img.shields.io/badge/DEV-Jameshsu1125-9cf?style=for-the-badge)](https://www.npmjs.com/~jameshsu1125)

# Why use it?

Progress and timing provided for loading and animation.

#### [Live Demo](https://jameshsu1125.github.io/lesca-react-onload/)

#### [codesandbox.io](https://codesandbox.io/s/lesca-react-onload-demo-xu0b3t)

# Installation

```sh
npm install lesca-react-onload --save
```

## Usage

```javascript
import OnloadProvider from 'lesca-react-onload';
```

```JSX
export default function () {

  const onStep = (e) => {
    const {loaded, total} = e;
    const percent = loaded / total * 100;
    console.log(percent) // get loading percent
  }

  const onload = (e) => {
    // all image loaded
  }

  return (
    <OnloadProvider hideBeforeLoaded onStep={onStep} onload={onload}>
      <img src='./myImage.jpg'>
      <div style={{ backgroundImage: 'url(./myBackgroundImage.jpg)' }} />
    </OnloadProvider>
  );
};
```

### Properties

| Properties                     |         description         | default |
| :----------------------------- | :-------------------------: | ------: |
| **hideBeforeLoaded**:_boolean_ |   hide DOM before loaded    |    true |
| **onStep**:_function_          | call when each image loaded |         |
| **onload**:_function_          | call when all image loaded  |         |

### args

| args                |        description         |
| :------------------ | :------------------------: |
| **loaded**:_number_ | target image loaded number |
| **total**:_number_  | target image total number  |
| **index**:_number_  |  target image load index   |
| **url**:_string_    |         target url         |

### Features

- maintain if necessary
