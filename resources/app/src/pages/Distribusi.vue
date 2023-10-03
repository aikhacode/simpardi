<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button
                                label="Print"
                                icon="pi pi-print"
                                class="p-button-success mr-2"
                                @click="onPrint"
                            />
                            <!--  <Button
                label="Delete"
                icon="pi pi-trash"
                class="p-button-danger"
                @click="confirmDeleteSelected"
                :disabled="!selectedDocuments || !selectedDocuments.length"
              /> -->
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
                        <!-- <Button
              label="Export"
              icon="pi pi-upload"
              class="p-button-help"
              @click="exportCSV($event)"
            /> -->
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="Documents"
                    v-model:selection="selectedDocuments"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Documents"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div
                            class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
                        >
                            <h5 class="m-0">Distribusi Document</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText
                                    v-model="filters['global'].value"
                                    placeholder="Search..."
                                />
                            </span>
                        </div>
                    </template>

                    <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
                    <Column
                        field="created_at"
                        header="Tgl"
                        :sortable="true"
                        headerStyle="width:14%; min-width:10rem;"
                    >
                        <template #body="slotProps">
                            <span class="p-column-title">Tanggal</span>
                            {{ formatDate(slotProps.data.created_at) }}
                        </template>
                    </Column>
                    <Column
                        field="title"
                        header="Judul"
                        :sortable="true"
                        headerStyle="width:14%; min-width:10rem;"
                    />

                    <Column
                        field="no_sk"
                        header="No SK"
                        :sortable="true"
                        headerStyle="width:14%; min-width:10rem;"
                    >
                        <template #body="slotProps">
                            <span class="p-column-title">No</span>
                            {{ slotProps.data.no_sk }}
                        </template>
                    </Column>

                    <Column
                        field="program"
                        header="Program"
                        :sortable="true"
                        headerStyle="width:14%; min-width:10rem;"
                    />

                    <Column
                        field="downloader"
                        header="Downloader"
                        :sortable="true"
                        headerStyle="width:14%; min-width:10rem;"
                    />
                </DataTable>

                <Dialog
                    v-model:visible="PrintDistribusiDialog"
                    :style="{ width: '450px' }"
                    header="Print Distribusi"
                    :modal="true"
                    class="p-fluid"
                >
                    <h5>Pilih Periode</h5>
                    <div class="p-fluid grid formgrid">
                        <div class="field col-12 md:col-6">
                            <label for="date1">Awal</label>
                            <Calendar
                                id="date1"
                                v-model="date1"
                                dateFormat="dd-mm-yy"
                                :class="{
                                    'p-invalid':
                                        submitted && !date2 && !valid_date,
                                }"
                            />
                            <small
                                class="p-invalid"
                                v-if="submitted && !date1 && !valid_date"
                                >Harus diisi.</small
                            >
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="date2">Akhir</label>
                            <Calendar
                                id="date2"
                                v-model="date2"
                                dateFormat="dd-mm-yy"
                                :class="{
                                    'p-invalid':
                                        submitted && !date2 && !valid_date,
                                }"
                            />
                            <small
                                class="p-invalid"
                                v-if="submitted && !date2 && !valid_date"
                                >Harus diisi.</small
                            >
                        </div>
                    </div>
                    <div class="p-dialog-footer mr-0">
                        <Button
                            label="Print"
                            icon="pi pi-print"
                            class="p-button-success"
                            @click="print()"
                        />
                    </div>
                </Dialog>

                <Dialog
                    v-model:visible="DocumentDialog"
                    :style="{ width: '1024px' }"
                    header="Document Internal Details"
                    :modal="true"
                    class="p-fluid"
                >
                    <!-- <img :src="'images/Document/' + Document.image" :alt="Document.image" v-if="Document.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" /> -->
                    <div class="formgrid grid">
                        <div class="field col-12 md:col-6">
                            <label for="tahun" class="mb-3">Tahun</label>
                            <!-- <Dropdown
                id="tahun"

                v-model="editPickExtra.tahun"
                :options="optionsTahun"
                optionLabel="label"
                optionValur='value'
                placeholder="Pilih Tahun"
                @change="onTahunChange"
              >
                
              </Dropdown> -->
                            <Calendar
                                id="tahun"
                                v-model="Document.tahun"
                                view="year"
                                dateFormat="yy"
                            />
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="categoryDocument" class="mb-3"
                                >Kategori (Pilih kategori untuk bantu isi
                                kategory dokument, bila tidak ada diisi
                                sendiri.)</label
                            >
                            <Dropdown
                                id="categoryDocument"
                                v-model="editPickExtra.categoryDocument"
                                :options="categoryDocument"
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Pilih Kategori Document (SOP TU/GIZI dll)"
                                @change="onCategoryDocumentChange"
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
                                                'Document-badge status-' +
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
                                                'Document-badge status-' +
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
                    </div>

                    <div class="formgrid grid">
                        <div class="field col-12 md:col-6">
                            <label for="category" class="mb-3"
                                >Kategori Document</label
                            >
                            <InputText
                                id="titleDocument"
                                v-model.trim="Document.category"
                                required="true"
                                autofocus
                                :class="{
                                    'p-invalid':
                                        submitted && !Document.category,
                                }"
                            />
                            <small
                                class="p-invalid"
                                v-if="submitted && !Document.category"
                                >Kategori Document harus diisi.</small
                            >
                        </div>

                        <div class="field col-12 md:col-6">
                            <label for="titleDocument" class="mb-3"
                                >Judul Document</label
                            >
                            <InputText
                                id="titleDocument"
                                v-model.trim="Document.title"
                                required="true"
                                autofocus
                                :class="{
                                    'p-invalid': submitted && !Document.title,
                                }"
                            />
                            <small
                                class="p-invalid"
                                v-if="submitted && !Document.title"
                                >Judul Document harus diisi.</small
                            >
                        </div>

                        <div class="field col-12 md:col-6">
                            <label for="dateformatmasuk"
                                >Tgl Terbit Document</label
                            >
                            <Calendar
                                :class="{
                                    'p-invalid':
                                        submitted && !Document.tgl_terbit,
                                }"
                                id="dateformat"
                                v-model="Document.tgl_terbit"
                                dateFormat="dd-mm-yy"
                            />
                            <small
                                class="p-invalid"
                                v-if="submitted && !Document.tgl_terbit"
                                >tgl terbit Document harus diisi.</small
                            >
                        </div>

                        <div class="field col-12 md:col-6">
                            <label for="noSK">No</label>
                            <InputText
                                id="noSK"
                                v-model.trim="Document.no_sk"
                                required="true"
                                autofocus
                            />
                        </div>
                    </div>

                    <label for="fileterupload">File yg terupload:</label>

                    <div class="mt-4 formgrid grid">
                        <div
                            v-for="arsip in Document.arsips"
                            class="field col-4"
                        >
                            <div class="grid">
                                <a
                                    class="text-900 col-8"
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
                            @click="saveDocument"
                        />
                    </template>
                </Dialog>

                <Dialog
                    v-model:visible="deleteDocumentDialog"
                    :style="{ width: '450px' }"
                    header="Konfirmasi"
                    :modal="true"
                >
                    <div class="flex align-items-center justify-content-center">
                        <i
                            class="pi pi-exclamation-triangle mr-3"
                            style="font-size: 2rem"
                        />
                        <span v-if="Document"
                            >Yakin akan menghapus No Document:
                            <b>{{ Document.no_Document }}</b> karena juga akan
                            menghapus data upload ?</span
                        >
                    </div>
                    <template #footer>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="deleteDocumentDialog = false"
                        />
                        <Button
                            label="Yes"
                            icon="pi pi-check"
                            class="p-button-text"
                            @click="deleteDocument"
                        />
                    </template>
                </Dialog>

                <Dialog
                    v-model:visible="deleteDocumentsDialog"
                    :style="{ width: '450px' }"
                    header="Konfirmasi"
                    :modal="true"
                >
                    <div class="flex align-items-center justify-content-center">
                        <i
                            class="pi pi-exclamation-triangle mr-3"
                            style="font-size: 2rem"
                        />
                        <span v-if="Document"
                            >Yakin akan menghapus karena juga akan menghapus
                            data upload yang terpilih?
                        </span>
                    </div>
                    <template #footer>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="deleteDocumentsDialog = false"
                        />
                        <Button
                            label="Yes"
                            icon="pi pi-check"
                            class="p-button-text"
                            @click="deleteSelectedDocuments"
                        />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import DownloadsService from "../service/DownloadlogService.js";
import { useStore } from "@/store.js";
import axios from "axios";
import { parseWeb,parseArsipUrl, dayjs } from "@/helper.js";
import DialogPrint from "@/dialogs/DialogPrint.vue";


export default {
    components: {},
    data() {
        return {
             date1: null,
            date2: null,
            submitted:false,
            valid_date:false,
            PrintDistribusiDialog: false,
            store: useStore(),
            Documents: null,
            DocumentDialog: false,
            deleteDocumentDialog: false,
            deleteDocumentsDialog: false,
            Document: {},
            selectedDocuments: null,
            filters: {},
            submitted: false,
            editPickExtra: {
                tahun: { label: "2022", value: "2022" },
                categoryDocument: { label: "SK", value: "SK" },
            },
            optionsTahun: [
                { label: "2020", value: "2020" },
                { label: "2021", value: "2021" },
                { label: "2022", value: "2022" },
                { label: "2023", value: "2023" },
                { label: "2024", value: "2024" },
                { label: "2025", value: "2025" },
            ],
            categoryDocument: [
                { label: "SOP TU", value: "SOP TU" },
                { label: "SOP GIGI", value: "SOP GIGI" },
                { label: "SOP KIA", value: "SOP KIA" },
                { label: "SK TU", value: "SK TU" },
                { label: "SK GIGI", value: "SK GIGI" },
                { label: "SK MUTU", value: "SK MUTU" },
            ],
            uploadUrl: `${location.protocol}//${location.hostname}/api/upload`,
            editMode: false,
        };
    },
    DownloadsService: null,
    created() {
        this.DownloadsService = new DownloadsService();
        this.initFilters();
    },
    mounted() {
        this.DownloadsService.getDownloads().then((data) => {
            this.Documents = data;
            console.log(this.Documents);
        });

        this.submitted = false
    },

    methods: {
          validate(){
            this.valid_date =  (this.date1<=this.date2)
            return this.date1 && this.date2 && this.valid_date
        },
        formatCurrency(value) {
            if (value)
                return value.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                });
            return;
        },
        formatDate(value) {
            return dayjs(value).format("YYYY-MM-DD");
        },
        openNew() {
            this.Document = {
                // no_Document: "445/   /403.103.17/2022",
                arsips: [],
                tahun: "2022",
            };

            this.submitted = false;
            this.editMode = false;
            this.DocumentService.getCategory().then((res) => {
                console.log("cat", res);
                this.categoryDocument = res.map((item) => {
                    return {
                        label: item.category,
                        value: item.category,
                    };
                });
            });
            this.DocumentDialog = true;
        },
        hideDialog() {
            this.DocumentDialog = false;

            this.submitted = false;
            this.Document = {};
        },
        validateInput() {
            let Document = this.Document;

            return Document.tgl_terbit && Document.title && Document.category;
        },
        saveDocument() {
            this.submitted = true;

            if (this.validateInput()) {
                let url_save = useStore().parseApi("/document/internal");
                let tgl_terbit_save;

                console.log("before", this.Document.tgl_terbit);
                if (this.Document.tgl_terbit instanceof Date) {
                    tgl_terbit_save = dayjs(this.Document.tgl_terbit).format(
                        "YYYY-MM-DD"
                    );
                } else {
                    tgl_terbit_save = dayjs(
                        this.Document.tgl_terbit,
                        "DD-MM-YYYY"
                    ).format("YYYY-MM-DD");
                }

                console.log("validate", tgl_terbit_save);

                if (this.editMode) {
                    // console.log('edit',tgl_terbit_save)
                    url_save = useStore().parseApi(
                        "/document/internal/" + this.Document.id
                    );
                } else {
                    // console.log('new',tgl_terbit_save)
                }
                axios({
                    method: "post",
                    url: url_save,
                    data: {
                        arsips: this.Document.arsips,
                        tgl_terbit: tgl_terbit_save,
                        title: this.Document.title,
                        type: "INTERNAL",
                        category: this.Document.category,
                        no_sk: this.Document.no_sk,
                        tahun: dayjs(this.Document.tahun).format("YYYY"),
                    },
                    headers: {
                        Authorization: `Bearer ${useStore().token}`,
                    },
                }).then((res) => {
                    console.log("save", res.data);
                    this.DocumentDialog = false;
                    // this.editMode = true;

                    this.DocumentService.getDocuments().then((data) => {
                        this.Documents = data;
                        console.log(this.Documents);
                    });

                    this.$toast.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Document Saved ",
                        life: 3000,
                    });
                });
            }
        },
        editDocument(Document) {
            this.Document = { ...Document };
            console.log("editDoc", this.Document);
            this.editPickExtra.tahun = {
                label: this.Document.tahun,
                value: this.Document.tahun,
            };
            this.editPickExtra.categoryDocument = {
                label: this.Document.category,
                value: this.Document.category,
            };
            this.editMode = true;
            this.DocumentDialog = true;
        },
        confirmDeleteDocument(Document) {
            this.Document = Document;
            this.deleteDocumentDialog = true;
        },
        deleteDocument() {
            axios({
                method: "delete",
                url: useStore().parseApi(
                    "/document/internal/" + this.Document.id
                ),
                headers: {
                    Authorization: `Bearer ${useStore().token}`,
                },
            }).then((res) => {
                console.log("deleted", res.data);
                this.deleteDocumentDialog = false;
                this.Document = {};
                this.$toast.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "Document Deleted",
                    life: 3000,
                });

                this.DocumentService.getDocuments().then((data) => {
                    this.Documents = data;
                    console.log(this.Documents);
                });
            });
            // this.Documents = this.Documents.filter((val) => val.id !== this.Document.id);
        },
        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.Documents.length; i++) {
                if (this.Documents[i].id === id) {
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
            this.deleteDocumentsDialog = true;
        },
        deleteSelectedDocuments() {
            console.log(this.selectedDocuments);
            // this.Documents = this.Documents.filter(
            //     (val) => !this.selectedDocuments.includes(val)
            // );
            this.selectedDocuments.forEach(async (item) => {
                let res = await axios({
                    method: "delete",
                    url: useStore().parseApi("/document/internal/" + item.id),
                    headers: {
                        Authorization: `Bearer ${useStore().token}`,
                    },
                });
                res = await res.data;

                console.log("deleting", res.data);
            });

            this.DocumentService.getDocuments().then((data) => {
                this.Documents = data;
                console.log(this.Documents);
            });

            this.deleteDocumentsDialog = false;
            this.selectedDocuments = null;
            this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Documents Deleted",
                life: 3000,
            });
        },
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            };
        },
        onCategoryDocumentChange() {
            console.log(this.Document.categoryDocument);
            console.log(this.Document.category);
            this.Document.category = this.editPickExtra.categoryDocument.value;
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
                this.Document.arsips = [...this.Document.arsips, item];
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
                this.Document.arsips = this.Document.arsips.filter((item) => {
                    return item.storagepath != pathDelete;
                });

                this.DocumentService.getDocuments().then((data) => {
                    this.Documents = data;
                    console.log(this.Documents);
                });
            });
        },
        parseArsipUrls(filename_storagepath) {
            return parseArsipUrl(filename_storagepath);
        },
        onTahunChange(e) {
            console.log("tahun", this.Document.tahun);
        },
        onUploadClickAtTable(data) {
            useStore().arsipsTemp = data.arsips;
            useStore().currentPickDocumentInternal = data;
            // console.log(useStore().currentPickDocumentInternal)
            this.$router.push({ path: "/view-upload" });
        },
        onPrint() {
            console.log("print");
            this.PrintDistribusiDialog = true;
        },
        print(){
           this.submitted = true
            
            if (this.validate()){
                let arg = {
                    date1: dayjs(this.date1).format('YYYY-MM-DD'),
                    date2: dayjs(this.date2).format('YYYY-MM-DD'),
                   
                }
                  
                    window.open(
                      parseWeb(`/print/distribusi?start=${arg.date1}&end=${arg.date2}`),
                      '_blank' 
                    );   
              
                 
            } else alert('date tidak sesuai')
            this.valid_date = false
        }
    },
};
</script>

<style scoped lang="scss">
@import "../assets/demo/badges.scss";
</style>
