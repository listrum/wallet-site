
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function encode(data) {
    let res = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));
    return res.replace(/[/]/g, "_").replace(/[+]/g, "-")
}

function decode(data) {
    data = data.replace(/[_]/g, "/").replace(/[-]/g, "+")
    data = atob(data).split("");

    let buff_view = new Uint8Array(new ArrayBuffer(data.length));

    data.forEach((elem, index) => {
        buff_view[index] = elem.charCodeAt(0)
    })

    return buff_view
}
