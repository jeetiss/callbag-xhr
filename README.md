# callbag-xhr

Callbag source which wrap xhr request with first class cancel and progress support.

## install

```
npm i @jeetiss/callbag-xhr
```

## example

```js
import pipe from "callbag-pipe";
import subscribe from "callbag-subscribe";
import request from "@jeetiss/callbag-xhr";

const data = new FormData();

data.append("UPLOADCARE_PUB_KEY", "demopublickey");
data.append("UPLOADCARE_STORE", "auto");
data.append("file", file);

pipe(
  request({
    method: "POST",
    url: "https://upload.uploadcare.com/base/",
    data,
    upload: true
  }),
  subscribe({
    next: val => console.log("next:", val),
    complete: () => console.log("done!"),
    error: err => console.log("error:", err)
  })
)
```
