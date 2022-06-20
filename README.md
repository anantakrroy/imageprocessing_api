## API documentation

Image processing API handles different image processing tasks using the methods provided by the [Sharp library](https://sharp.pixelplumbing.com/)

The following methods are implemented in the API in v1.0.0

## License

- [GNU General Purpose License v3.0](https://github.com/anantakrroy/imageprocessing_api/blob/master/LICENSE.md)

## Run API endpoints via Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2cbd79f8495f3fa99527?action=collection%2Fimport)

## Methods

- <a name="resize">Resize image in .jpg format to specified width and height
  </a>

`resize(width, height, filename)` ⇒ <code>Promise.&lt;Object&gt;</code>

**Kind**: global function

| Param    | Type                |
| -------- | ------------------- |
| width    | <code>number</code> |
| height   | <code>number</code> |
| filename | <code>string</code> |

- <a name="metadata">Return image information of input image</a>

`metadata(filename)` ⇒ <code>Object</code>
**Kind**: global function

| Param | Type |
| --- | --- |
| filename | <code>string</code> |


- <a name="blur">Blur image using sigma value between 0.3 to 1000
  </a>

`blur(filename, sigma)` ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global variable

| Param | Type |
| --- | --- |
| filename | <code>string</code> |
| sigma | <code>number</code> |


- <a name="flip">Flip image along vertical Y axis
  </a>

`flip(filename)` ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global variable

| Param | Type |
| --- | --- |
| filename | <code>string</code> |


- <a name="rotate">Rotate the image by provided angle</a>

`rotate(filename, angle)` ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global variable


| Param | Type |
| --- | --- |
| filename | <code>string</code> |
| angle | <code>number</code> |

- <a name="grayscale">Change color composition of colored image to grayscale</a>

`grayscale(filename, sigma)` ⇒ <code>Promise.&lt;Object&gt;</code>
**Kind**: global variable


| Param | Type |
| --- | --- |
| filename | <code>string</code> |
| sigma | <code>number between 0.3 and 1000</code> |

