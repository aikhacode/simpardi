<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button
                                label="New"
                                icon="pi pi-plus"
                                class="p-button-success mr-2"
                                @click="openNew"
                            />
                            <Button
                                label="Delete"
                                icon="pi pi-trash"
                                class="p-button-danger"
                                @click="confirmDeleteSelected"
                                :disabled="
                                    !selectedSurats || !selectedSurats.length
                                "
                            />
                        </div>
                    </template>

                    <template v-slot:end>
                        <!-- <FileUpload
                            mode="basic"
                            accept="image/*"
                            :maxFileSize="1000000"
                            label="Import"
                            chooseLabel="Import"
                            class="mr-2 inline-block"
                        /> -->
                        <Button
                            label="Export"
                            icon="pi pi-upload"
                            class="p-button-help"
                            @click="exportCSV($event)"
                        />
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="Surats"
                    v-model:selection="selectedSurats"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Surats"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div
                            class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
                        >
                            <h5 class="m-0">Manage Surat Keluar</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText
                                    v-model="filters['global'].value"
                                    placeholder="Search..."
                                />
                            </span>
                        </div>
                    </template>

                    <Column
                        selectionMode="multiple"
                        headerStyle="width: 3rem"
                    ></Column>
                    <Column
                        field="tgl_surat"
                        header="Tgl Surat"
                        :sortable="true"
                        headerStyle="width:14%; min-width:10rem;"
                    >
                        <template #body="slotProps">
                            <span class="p-column-title">Tgl Surat</span>
                            {{ slotProps.data.tgl_surat }}
                        </template>
                    </Column>
                    <Column
                        field="no_surat"
                        header="NO Surat"
                        :sortable="true"
                        headerStyle="width:14%; min-width:10rem;"
                    >
                        <template #body="slotProps">
                            <span class="p-column-title">NO Surat</span>
                            {{ slotProps.data.no_surat }}
                        </template>
                    </Column>
                    <Column
                        field="no_agenda"
                        header="No Agenda"
                        :sortable="true"
                        headerStyle="width:14%; min-width:10rem;"
                    >
                        <template #body="slotProps">
                            <span class="p-column-title">NO Agenda</span>
                            {{ slotProps.data.no_agenda }}
                        </template>
                    </Column>
                    <Column
                        field="perihal"
                        header="Perihal"
                        :sortable="true"
                        headerStyle="width:14%; min-width:10rem;"
                    >
                        <template #body="slotProps">
                            <span class="p-column-title">Perihal</span>
                            {{ slotProps.data.perihal }}
                        </template>
                    </Column>
                    <Column
                        field="tujuan"
                        header="tujuan"
                        :sortable="true"
                        headerStyle="width:14%; min-width:10rem;"
                    >
                        <template #body="slotProps">
                            <span class="p-column-title">Tujuan</span>
                            {{ slotProps.data.tujuan }}
                        </template>
                    </Column>
                    <!-- <Column header="Image" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Image</span>
							<img :src="'images/Surat/' + slotProps.data.image" :alt="slotProps.data.image" class="shadow-2" width="100" />
						</template>
					</Column> -->
                    <!-- <Column field="price" header="Price" :sortable="true" headerStyle="width:14%; min-width:8rem;">
						<template #body="slotProps">
							<span class="p-column-title">Price</span>
							{{formatCurrency(slotProps.data.price)}}
						</template>
					</Column>
					<Column field="category" header="Category" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Category</span>
							{{formatCurrency(slotProps.data.category)}}
						</template>
					</Column>
					<Column field="rating" header="Reviews" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Rating</span>
							<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
						</template>
					</Column>
					<Column field="inventoryStatus" header="Status" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Status</span>
							<span :class="'Surat-badge status-' + (slotProps.data.inventoryStatus ? slotProps.data.inventoryStatus.toLowerCase() : '')">{{slotProps.data.inventoryStatus}}</span>
						</template>
					</Column> -->
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button
                                icon="pi pi-pencil"
                                class="p-button-rounded p-button-success mr-2"
                                @click="editSurat(slotProps.data)"
                            />
                            <Button
                                icon="pi pi-trash"
                                class="p-button-rounded p-button-warning mt-2"
                                @click="confirmDeleteSurat(slotProps.data)"
                            />
                        </template>
                    </Column>
                </DataTable>

                <Dialog
                    v-model:visible="SuratDialog"
                    :style="{ width: '1024px' }"
                    header="Surat Keluar Details"
                    :modal="true"
                    class="p-fluid"
                >
                    <!-- <img :src="'images/Surat/' + Surat.image" :alt="Surat.image" v-if="Surat.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" /> -->
                    <div class="formgrid grid">
                        <div class="field col-12 md:col-6">
                            <label for="tipeSurat" class="mb-3"
                                >Tipe Surat</label
                            >
                            <Dropdown
                                id="tipeSurat"
                                v-model="Surat.tipeSurat"
                                :options="tipeSurat"
                                optionLabel="label"
                                placeholder="Pilih Tipe Surat untuk penyesuaian kode surat"
                                @change="onTipeSuratChange"
                            >
                                <template #value="slotProps">
                                    <div
                                        v-if="
                                            slotProps.value &&
                                            slotProps.value.value
                                        "
                                    >
                                        <span
                                            :class="
                                                'Surat-badge status-' +
                                                slotProps.value.value
                                            "
                                            >{{ slotProps.value.label }}</span
                                        >
                                    </div>
                                    <div
                                        v-else-if="
                                            slotProps.value &&
                                            !slotProps.value.value
                                        "
                                    >
                                        <span
                                            :class="
                                                'Surat-badge status-' +
                                                slotProps.value.toLowerCase()
                                            "
                                            >{{ slotProps.value }}</span
                                        >
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                            </Dropdown>
                        </div>

                        <div class="field col-12 md:col-6">
                            <label for="dateformat" class="mb-3"
                                >Tgl Surat</label
                            >
                            <Calendar
                                :class="{
                                    'p-invalid': submitted && !Surat.tgl_surat,
                                }"
                                id="dateformat"
                                v-model="Surat.tgl_surat"
                                dateFormat="dd-mm-yy"
                            />
                            <small
                                class="p-invalid"
                                v-if="submitted && !Surat.tgl_surat"
                                >tgl Surat harus diisi.</small
                            >
                        </div>

                        <div class="field col-12 md:col-6">
                            <label for="noSurat">No Surat</label>
                            <InputText
                                id="noSurat"
                                v-model.trim="Surat.no_surat"
                                required="true"
                                autofocus
                                :class="{
                                    'p-invalid': submitted && !Surat.no_surat,
                                }"
                            />
                            <small
                                class="p-invalid"
                                v-if="submitted && !Surat.no_surat"
                                >No Surat harus diisi.</small
                            >
                        </div>

                        <div class="field col-12 md:col-6">
                            <label for="noAgenda">No Agenda</label>
                            <InputText
                                id="noAgenda"
                                v-model.trim="Surat.no_agenda"
                                required="true"
                                autofocus
                                :class="{
                                    'p-invalid': submitted && !Surat.no_agenda,
                                }"
                            />
                            <small
                                class="p-invalid"
                                v-if="submitted && !Surat.no_agenda"
                                >No Agenda harus diisi.</small
                            >
                        </div>
                    </div>

                    <div class="field">
                        <label for="perihal">Perihal</label>
                        <Textarea
                            id="description"
                            v-model="Surat.perihal"
                            required="true"
                            rows="2"
                            cols="20"
                            :class="{
                                'p-invalid': submitted && !Surat.perihal,
                            }"
                        />
                        <small
                            class="p-invalid"
                            v-if="submitted && !Surat.perihal"
                            >Perihal harus diisi.</small
                        >
                    </div>

                    <div class="field">
                        <label for="tujuan">Tujuan</label>
                        <Textarea
                            id="tujuan"
                            v-model="Surat.tujuan"
                            required="true"
                            rows="2"
                            cols="20"
                            :class="{
                                'p-invalid': submitted && !Surat.tujuan,
                            }"
                        />
                        <small
                            class="p-invalid"
                            v-if="submitted && !Surat.tujuan"
                            >Tujuan harus diisi.</small
                        >
                    </div>

                    <label for="fileterupload">File yg terupload:</label>

                    <div class="mt-4 formgrid grid">
                        <div v-for="arsip in Surat.arsips" class="field col-4">
                            <div class="grid">
                                <a
                                    class="text-900 col-8 "
                                    :href="parseArsipUrls(arsip.storagepath)"
                                    target="_blank"
                                >
                                    <div
                                        class="flex align-items-center justify-content-center bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round"
                                    >
                                        {{ arsip.filename }}
                                    </div>
                                </a>
                                <Button
                                    class="col-4 p-button-raised p-button-rounded p-button-danger"
                                    icon="pi pi-times"
                                    @click="deleteUpload(arsip.storagepath)"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label for="upload"
                            >Upload (setelah tambah file selesai jangan lupa
                            klik upload dulu)
                        </label>
                        <FileUpload
                            accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.xls,.xlsx,.tif"
                            :maxFileSize="15000000"
                            label="upload"
                            chooseLabel="Tambah"
                            class="mr-2 inline-block"
                            name="files[]"
                            :url="uploadUrl"
                            @before-send="onBeforeSendUploader"
                            @upload="onUploadSuccess"
                        />
                    </div>

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

                <Dialog
                    v-model:visible="deleteSuratDialog"
                    :style="{ width: '450px' }"
                    header="Konfirmasi"
                    :modal="true"
                >
                    <div class="flex align-items-center justify-content-center">
                        <i
                            class="pi pi-exclamation-triangle mr-3"
                            style="font-size: 2rem"
                        />
                        <span v-if="Surat"
                            >Yakin akan menghapus No Surat: <b>{{ Surat.no_surat }}</b> karena juga akan menghapus data upload ?</span
                        >
                    </div>
                    <template #footer>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="deleteSuratDialog = false"
                        />
                        <Button
                            label="Yes"
                            icon="pi pi-check"
                            class="p-button-text"
                            @click="deleteSurat"
                        />
                    </template>
                </Dialog>

                <Dialog
                    v-model:visible="deleteSuratsDialog"
                    :style="{ width: '450px' }"
                    header="Konfirmasi"
                    :modal="true"
                >
                    <div class="flex align-items-center justify-content-center">
                        <i
                            class="pi pi-exclamation-triangle mr-3"
                            style="font-size: 2rem"
                        />
                        <span v-if="Surat"
                            >Yakin akan menghapus karena juga akan menghapus data upload yang terpilih?  </span
                        >
                    </div>
                    <template #footer>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="deleteSuratsDialog = false"
                        />
                        <Button
                            label="Yes"
                            icon="pi pi-check"
                            class="p-button-text"
                            @click="deleteSelectedSurats"
                        />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import SuratService from "../service/SuratKeluarService.js";
import { useStore } from "@/store.js";
import axios from "axios";
import { parseArsipUrl } from "@/helper.js";

export default {
    data() {
        return {
            Surats: null,
            SuratDialog: false,
            deleteSuratDialog: false,
            deleteSuratsDialog: false,
            Surat: {},
            selectedSurats: null,
            filters: {},
            submitted: false,
            tipeSurat: [
                { label: "445", value: "445" },
                { label: "094", value: "094" },
                { label: "005 - UNDANGAN", value: "005" },
                { label: "090", value: "090" },
                { label: "800", value: "800" },
            ],
            uploadUrl: `${location.protocol}//${location.hostname}/api/upload`,
            editMode: false,
        };
    },
    SuratService: null,
    created() {
        this.SuratService = new SuratService();
        this.initFilters();
    },
    mounted() {
        this.SuratService.getSurats().then((data) => {
            this.Surats = data;
            console.log(this.Surats);
        });
    },
    methods: {
        formatCurrency(value) {
            if (value)
                return value.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                });
            return;
        },
        openNew() {
            this.Surat = {
                no_surat: "445/   /403.103.17/2022",
                arsips: [],
            };
            this.submitted = false;
            this.editMode = false;
            this.SuratDialog = true;
        },
        hideDialog() {
            this.SuratDialog = false;
            this.submitted = false;
        },
        validateInput() {
            let Surat = this.Surat;
            return (
                Surat.tgl_surat &&
                Surat.no_surat &&
                Surat.no_agenda &&
                Surat.perihal &&
                Surat.tujuan
            );
        },
        saveSurat() {
            this.submitted = true;
            console.log(
                "tgl",
                new Date(this.Surat.tgl_surat).toISOString().slice(0, 10)
            );

            if (this.validateInput())
                if (this.Surat.no_surat.trim()) {
                    let url_save = useStore().parseApi("/suratkeluar");
                    if (this.editMode) {
                        url_save = useStore().parseApi(
                            "/suratkeluar/" + this.Surat.id
                        );
                    }
                    axios({
                        method: "post",
                        url: url_save,
                        data: {
                            arsips: this.Surat.arsips,
                            tgl_surat: new Date(this.Surat.tgl_surat)
                                .toISOString()
                                .slice(0, 10),
                            no_agenda: this.Surat.no_agenda,
                            perihal: this.Surat.perihal,
                            tujuan: this.Surat.tujuan,
                            no_surat: this.Surat.no_surat,
                        },
                        headers: {
                            Authorization: `Bearer ${useStore().token}`,
                        },
                    }).then((res) => {
                        console.log("save", res.data);
                        this.SuratDialog = false;
                        this.Surat = {};
                        this.SuratService.getSurats().then((data) => {
                            this.Surats = data;
                            console.log(this.Surats);
                        });

                        this.$toast.add({
                            severity: "success",
                            summary: "Successful",
                            detail: "Surat Saved ",
                            life: 3000,
                        });
                    });
                }
        },
        editSurat(Surat) {
            this.Surat = { ...Surat };
            this.editMode = true;
            this.SuratDialog = true;
        },
        confirmDeleteSurat(Surat) {
            this.Surat = Surat;
            this.deleteSuratDialog = true;
        },
       deleteSurat() {
            axios({
                    method: "delete",
                    url: useStore().parseApi("/suratkeluar/"+this.Surat.id),
                    headers: {
                        Authorization: `Bearer ${useStore().token}`,
                    },
            }).then((res)=>{
                console.log('deleted',res.data)
                this.deleteSuratDialog = false;
                this.Surat = {};
                this.$toast.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "Surat Deleted",
                    life: 3000,
                });

                this.SuratService.getSurats().then((data) => {
                        this.Surats = data;
                        console.log(this.Surats);
                    });

            })
            // this.Surats = this.Surats.filter((val) => val.id !== this.Surat.id);
            
        },
        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.Surats.length; i++) {
                if (this.Surats[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        createId() {
            let id = "";
            var chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 5; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        confirmDeleteSelected() {
            this.deleteSuratsDialog = true;
        },
        deleteSelectedSurats() {
            console.log(this.selectedSurats);
            // this.Surats = this.Surats.filter(
            //     (val) => !this.selectedSurats.includes(val)
            // );
            this.selectedSurats.forEach(async (item) => {
            	
            	 let res = await axios({
                    method: "delete",
                    url: useStore().parseApi("/suratkeluar/"+item.id),
                    headers: {
                        Authorization: `Bearer ${useStore().token}`,
                    },
		            })
            	 res = await res.data
            	 
		         console.log('deleting',res.data);
		         
		                
		                
            })
            
            this.SuratService.getSurats().then((data) => {
                        this.Surats = data;
                        console.log(this.Surats);
                    });

            this.deleteSuratsDialog = false;
            this.selectedSurats = null;
            this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Surats Deleted",
                life: 3000,
            });
        },
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            };
        },
        onTipeSuratChange() {
            let idx = this.Surat.no_surat.indexOf("/");
            let tmp = this.Surat.no_surat.slice(
                idx,
                this.Surat.no_surat.length
            );

            this.Surat.no_surat = this.Surat.tipeSurat.value + tmp;
        },
        trimSpace(str) {
            return str.replace(" ", "");
        },
        onBeforeSendUploader(e) {
            e.xhr.setRequestHeader(
                "Authorization",
                `Bearer ${useStore().token}`
            );
        },
        onUploadSuccess(e) {
            console.log("sukses", JSON.parse(e.xhr.responseText));
            let tmp = JSON.parse(e.xhr.responseText);
            tmp.forEach((item) => {
                this.Surat.arsips = [...this.Surat.arsips, item];
            });
        },
        deleteUpload(pathDelete) {
            axios({
                method: "delete",
                url: useStore().parseApi("/upload"),
                data: {
                    storagepath: pathDelete,
                },
                headers: {
                    Authorization: `Bearer ${useStore().token}`,
                },
            }).then((res) => {
                console.log("del", res.data);
                this.Surat.arsips = this.Surat.arsips.filter((item) => {
                    return item.storagepath != pathDelete;
                });

                this.SuratService.getSurats().then((data) => {
                    this.Surats = data;
                    console.log(this.Surats);
                });
            });
        },
        parseArsipUrls(filename_storagepath) {
            return parseArsipUrl(filename_storagepath);
        },
    },
};
</script>

<style scoped lang="scss">
@import "../assets/demo/badges.scss";
</style>
