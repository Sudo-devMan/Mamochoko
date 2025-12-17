
const url = 'http://127.0.0.1:9090/api/v1/management/reviews/1'

fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        console.log("Body length: " + String(data.body.length))
    }).catch(err => {
        console.log(err)
    })
