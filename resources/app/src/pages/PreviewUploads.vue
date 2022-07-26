<template>
	<div class="card">
		<div class="flex justify-content-between mb-5">
			<h5>File yg teruploads</h5>
			<div >
				<Button class="mr-3" label="Download" @click="download" icon="pi pi-cloud-download"/>
				<Button label="Back" @click="router.go(-1)" icon="pi pi-arrow-left"/>
			</div>
		</div>
		<TabMenu :model="items" @tab-change="onChange" v-model:activeIndex="active"/>
		
		<div class="surface-overlay font-bold m-4 ">
			<img v-if="type=='img'" class="w-full" :src="act"/> 
			<vue-pdf-embed class="w-full" v-if="type=='pdf'" :source="act" />
			<p v-if="type=='other'" class="pi pi-fw pi-file"/> 
		</div>
			
		
	</div>


</template>

<script setup >
import { ref,onMounted,computed} from "vue"
import {useStore} from "@/store"
import {parseArsipViewUrl,parseArsipDownloadUrl} from "@/helper"
import VuePdfEmbed from 'vue-pdf-embed'
import router from "@/router"

const items=ref([])

const active=ref(0)
const act = ref()
const type=ref()

const download = () => {
		window.open(parseArsipDownloadUrl(items.value[active.value].file_url),'_blank')
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
