const request = ({ method, url, data, download, upload } = {}) => (
  start,
  sink
) => {
  if (start !== 0) return;

  const xhr = new XMLHttpRequest();
  const handler = () => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      sink(1, { response: xhr.responseText });
      sink(2);
      return;
    }

    sink(2, new Error(xhr.responseText || xhr.statusText || xhr.status));
  };
  const downloadHandler = e =>
    sink(1, { download: { total: e.total, loaded: e.loaded } });

  const uploadHandler = e =>
    sink(1, { upload: { total: e.total, loaded: e.loaded } });

  upload && xhr.upload.addEventListener("progress", uploadHandler);
  download && xhr.addEventListener("progress", downloadHandler);
  xhr.addEventListener("readystatechange", handler);
  xhr.open(method, url, true);

  sink(0, t => {
    if (t === 2) {
      upload && xhr.upload.removeEventListener("progress", uploadHandler);
      download && xhr.removeEventListener("progress", downloadHandler);
      xhr.removeEventListener("readystatechange", handler);
      xhr.abort();
    }
  });

  xhr.send(data);
};

export default request
