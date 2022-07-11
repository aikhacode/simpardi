function parseApi(namespace='')
{
    return `${location.protocol}//${location.hostname}/api${namespace}`
}

function console_log(x)
{
    console.log({x})
}

function parseArsipUrl(filename)
{

    return `//${location.hostname}/upload/arsip?arsip=${window.btoa(filename)}`
}

export { parseApi,console_log,parseArsipUrl}


