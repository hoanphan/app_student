export function fetchAPI(url, method = 'GET', body = null, isBlob = false) {
var request;
  if (method === 'POST') {
    request = fetch(url, {
      method,
      body: isBlob ? body : JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': isBlob ? 'multipart/form-data' : 'application/json',
      },
    });
  } else {
      console.log(url);
    request = fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return request;
  }

  return request;
}

// export function xhrAPI(url, body) {
//   return new Promise(function(resolve, reject) {
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', url);
//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         const response = JSON.parse(xhr.response);
//         if (response.success) {
//           resolve(response);
//         } else {
//           reject(response.message);
//         }
//       } else {
//         reject(`Unknown Error : ${xhr.statusText}`);
//       }
//     };
//     xhr.onerror = () => {
//       reject(`Unknown Error : ${xhr.statusText}`);
//     };
//     xhr.send(body);
//   });
// }
