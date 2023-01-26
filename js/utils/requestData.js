export const requestData = ({
    url,
    params = {},
    callback = () => { }
}) => {
    // ####### 1. Create the request #######
    const xhr = new XMLHttpRequest();

    // ####### 2. Configure the request #######
    // 2.1. Set the response type
    xhr.responseType = 'json';

    // 2.2. Set the query parameters (if any)
    const paramsString = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&'); // convert the params object to a string like 'key=value&key=value'
    if (paramsString)
        url += `?${paramsString}`; // add the query parameters to the url

    // ####### 3. Send the request #######
    // 3.1 Open the request
    xhr.open('GET', url, true);

    // 3.2. Set the request headers    
    const CORS = `Access-Control-Allow-Origin`
    xhr.setRequestHeader(CORS, '*'); // allow CORS

    // 3.3. Send the request
    xhr.send();

    // ####### 4. Handle the response #######
    // 4.1. Handle the load event
    xhr.addEventListener('load', (e) => {
        onLoadResponse(xhr);
        callback(e.target.response);
    });


    // 4.2. Handle the error event
    xhr.addEventListener('error', () => onError(xhr));

}; // end of request()

function onLoadResponse(xhr) {
    if (xhr.status >= 200 && xhr.status < 300) {
        console.log('Success');
    } else { onError(xhr); }
}

function onError(xhr) {
    console.log('Error', xhr.status, xhr.statusText);
}