<template>

<Dialog
        v-model:visible="visible"
        :style="{ width: '1024px' }"
        header="Surat Masuk Details"
        :modal="true"
        class="p-fluid"
    >
   <p> test dialog</p>
    <template #footer>
        <Button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
        />
        <Button
            label="Save"
            icon="pi pi-check"
            class="p-button-text"
            @click="saveSurat"
        />
    </template>
</Dialog>

</template>
<script setup>
import { ref } from 'vue'
import { useStore } from '@/store.js'

const emit = defineEmits(['save','close'])
const props = defineProps({
    visible:Boolean
})

const visible = ref(props.visible)


const hideDialog = () => {
    emit('close')
}

const saveSurat = () => {
    emit('save')
}

</script>