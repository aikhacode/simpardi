<template>
    <div class="card">
        <div class="flex justify-content-between mb-5">
            <h5>File yg teruploads</h5>
            <div>
                <Button
                    class="mr-3"
                    label="Download"
                    @click="download"
                    icon="pi pi-cloud-download"
                />
                <Button
                    label="Back"
                    @click="router.go(-1)"
                    icon="pi pi-arrow-left"
                />
            </div>
        </div>
        <TabMenu
            :model="items"
            @tab-change="onChange"
            v-model:activeIndex="active"
        />

        <div class="surface-overlay font-bold m-4">
            <img v-if="type == 'img'" class="w-full" :src="act" />
            <vue-pdf-embed class="w-full" v-if="type == 'pdf'" :source="act" />
            <p v-if="type == 'other'" class="pi pi-fw pi-file" />
        </div>

        <Dialog
            v-model:visible="downloadDialog"
            :style="{ width: '450px' }"
            header="Konfirmasi Program"
            :modal="true"
        >
            <div class="field flex flex-column">
                <label for="categoryDocument" class="mb-3"
                    >Silakan pilih Program untuk mendownload</label
                >
                <Dropdown
                    id="categoryDocument"
                    v-model="pickProgram"
                    :options="program"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Pilih Program (UKP, UKM, KMP, MUTU)"
                    @change="onPickProgramChange"
                >
                </Dropdown>
            </div>

            <template #footer>
                <Button
                    label="No"
                    icon="pi pi-times"
                    class="p-button-text"
                    @click="downloadDialog = false"
                />
                <Button
                    label="Yes"
                    icon="pi pi-check"
                    class="p-button-text"
                    @click="startDownload"
                />
            </template>
        </Dialog>
    </div>
</template>

<script setup >
import { ref,onMounted,computed} from "vue"
import {useStore} from "@/store"
import {parseArsipViewUrl,parseArsipDownloadUrl} from "@/helper"
import VuePdfEmbed from 'vue-pdf-embed'
import router from "@/router"
import axios from "axios"

const items=ref([])

const active=ref(0)
const act = ref()
const type=ref()
const downloadDialog = ref(false)
const pickProgram = ref('UKP')
const program = [
	{label:'UKP',value:'UKP'},
	{label:'UKM',value:'UKM'},
	{label:'KMP',value:'KMP'},
	{label:'MUTU',value:'MUTU'}
	]

const download = () => {
		// console.log(useStore().userCurrentLoginName)
		// console.log(useStore().arsipsTemp)
		// console.log(useStore().currentPickDocumentInternal)
		

		downloadDialog.value = true
		// console.log(pickProgram.value)
		
}

const parseApi = (namespace='') => {
    return `${location.protocol}//${location.hostname}/api${namespace}`
 
}
const startDownload = async () => {
	let log = {
			name: useStore().userCurrentLoginName,
			title:useStore().currentPickDocumentInternal.title,
			no_sk:useStore().currentPickDocumentInternal.no_sk,
			program:pickProgram.value,
			
		}
	 let api = parseApi();
     let headersList = {
                "Accept": "application/json",
                // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": `Bearer ${useStore().token}` 
               }
     let reqOptions = {
                url: parseApi()+'/logdl',
                method: "POST",
                headers: headersList,
                data:log
              }
    downloadDialog.value = false
    try {
         let res = await axios.request(reqOptions)
               console.log(res.data)
               
    } catch (err) {
                console.log(err);
        		return false       
    }
		
	window.open(parseArsipDownloadUrl(items.value[active.value].file_url),'_blank')
	
}

const onPickProgramChange = () =>{
	// console.log(pickProgram.value)
}

const onChange = (e) =>{
	console.log(parseArsipViewUrl(items.value[active.value].file_url));
    fetch(parseArsipViewUrl(items.value[active.value].file_url))
    .then((response) => response.blob())
  	.then((myBlob) => {
	    const objectURL = URL.createObjectURL(myBlob);
	    act.value = objectURL
	    let ext = items.value[active.value].label.split('.').pop();
	    if (ext.toUpperCase()=='PDF') type.value = 'pdf';
	    else if (ext.toUpperCase()=='JPG') type.value = 'img';
	    else if (ext.toUpperCase()=='JPEG') type.value = 'img';
	    else if (ext.toUpperCase()=='PNG') type.value = 'img';
	    else if (ext.toUpperCase()=='BMP') type.value = 'img';
	    else if (ext.toUpperCase()=='GIF') type.value = 'img';
	    else type.value = 'other'

	  });
		
	// console.log(parseArsipViewUrl(items.value[active.value].file_url))
	
}

onMounted(()=>{

	items.value = useStore().arsipsTemp.map((item)=>{
		 
		return {
			label:item.filename,
			file_url:item.storagepath
		}
	})

	onChange();
console.log('item',items)
	
})
</script>
