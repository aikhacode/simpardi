const parseApi = (namespace="") => {

	return (location.hostname == 'simpardi.test') ? `//simpardi.test/api${namespace}` : `../api${namespace}`;
}

const parseWeb = (namespace="") => {
	return (location.hostname == 'simpardi.test') ? `//simpardi.test${namespace}` : `..${namespace}`;
}

function console_log(x)
{
    console.log({x})
}


function parseArsipUrl(filename)
{
	return (location.hostname == 'simpardi.test') ? `/upload/arsip?arsip=${window.btoa(filename)}` : `../upload/arsip?arsip=${window.btoa(filename)}`;
    
}


export {
	parseApi, parseWeb,console_log,parseArsipUrl
}

