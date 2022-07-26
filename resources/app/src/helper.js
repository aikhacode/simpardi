import  dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)


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
	return (location.hostname == 'simpardi.test') ? `//simpardi.test/upload/arsip?arsip=${window.btoa(filename)}` : `../upload/arsip?arsip=${window.btoa(filename)}`;
    
}

function parseArsipDownloadUrl(filename)
{
	return (location.hostname == 'simpardi.test') ? `//simpardi.test/upload/arsip/download?arsip=${window.btoa(filename)}` : `../upload/arsip/download?arsip=${window.btoa(filename)}`;
    
}

function parseArsipViewUrl(filename)
{
	return (location.hostname == 'simpardi.test') ? `//simpardi.test/api/upload/arsip?arsip=${window.btoa(filename)}` : `../api/upload/arsip?arsip=${window.btoa(filename)}`;
    
}



export {
	parseApi, parseWeb,console_log,parseArsipUrl,dayjs,parseArsipViewUrl,parseArsipDownloadUrl
}

