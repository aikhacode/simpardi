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
                :disabled="!selectedDocuments || !selectedDocuments.length"
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
              <h5 class="m-0">Manage Document Internal</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Search..." />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column
            field="category"
            header="Kategori"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Kategori</span>
              {{ slotProps.data.category }}
            </template>
          </Column>
          <Column
            field="title"
            header="Title"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Judul</span>
              {{ slotProps.data.title }}
            </template>
          </Column>
          <Column
            field="tgl_terbit"
            header="TGL Terbit"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Tgl Terbit</span>
              {{ slotProps.data.tgl_terbit }}
            </template>
          </Column>
          <Column
            field="no_sk"
            header="No SK"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">No SK</span>
              {{ slotProps.data.no_sk }}
            </template>
          </Column>
          
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="editDocument(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning mt-2"
                @click="confirmDeleteDocument(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>

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
              <label for="categoryDocument" class="mb-3">Kategori (Pilih kategori untuk bantu isi kategory dokument, bila tidak ada diisi sendiri.)</label>
              <Dropdown
                id="categoryDocument"
                v-model="Document.categoryDocument"
                :options="categoryDocument"
                optionLabel="label"
                placeholder="Pilih Kategori Document (SOP TU/GIZI dll)"
                @change="onCategoryDocumentChange"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value && slotProps.value.value">
                    <span :class="'Document-badge status-' + slotProps.value.value">{{
                      slotProps.value.label
                    }}</span>
                  </div>
                  <div v-else-if="slotProps.value && !slotProps.value.value">
                    <span
                      :class="'Document-badge status-' + slotProps.value.toLowerCase()"
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
              <label for="category" class="mb-3">Kategori Document</label>
              <InputText
                id="titleDocument"
                v-model.trim="Document.category"
                required="true"
                autofocus
                :class="{
                  'p-invalid': submitted && !Document.category,
                }"
              />
              <small class="p-invalid" v-if="submitted && !Document.category"
                >Kategori Document harus diisi.</small
              >
            </div>

            <div class="field col-12 md:col-6">
              <label for="titleDocument" class="mb-3">Judul Document</label>
              <InputText
                id="titleDocument"
                v-model.trim="Document.title"
                required="true"
                autofocus
                :class="{
                  'p-invalid': submitted && !Document.title,
                }"
              />
              <small class="p-invalid" v-if="submitted && !Document.title"
                >Judul Document harus diisi.</small
              >
            </div>

            <div class="field col-12 md:col-6">
              <label for="dateformatmasuk">Tgl Terbit Document</label>
              <Calendar
                :class="{
                  'p-invalid': submitted && !Document.tgl_terbit,
                }"
                id="dateformat"
                v-model="Document.tgl_terbit"
                dateFormat="dd-mm-yy"
              />
              <small class="p-invalid" v-if="submitted && !Document.tgl_terbit"
                >tgl terbit Document harus diisi.</small
              >
            </div>

            <div class="field col-12 md:col-6">
              <label for="noSK">No SK</label>
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
            <div v-for="arsip in Document.arsips" class="field col-4">
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
              >Upload (setelah tambah file selesai jangan lupa klik upload dulu)
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
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="Document"
              >Yakin akan menghapus No Document: <b>{{ Document.no_Document }}</b> karena juga akan
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
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="Document"
              >Yakin akan menghapus karena juga akan menghapus data upload yang terpilih?
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
import DocumentService from "../service/DocumentInternalService.js";
import { useStore } from "@/store.js";
import axios from "axios";
import { parseArsipUrl } from "@/helper.js";


export default {
  components: {
   
  },
  data() {
    return {
      Documents: null,
      DocumentDialog: false,
      deleteDocumentDialog: false,
      deleteDocumentsDialog: false,
      Document: {},
      selectedDocuments: null,
      filters: {},
      submitted: false,
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
  DocumentService: null,
  created() {
    this.DocumentService = new DocumentService();
    this.initFilters();
  },
  mounted() {
    this.DocumentService.getDocuments().then((data) => {
      this.Documents = data;
      console.log(this.Documents);
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
      this.Document = {
        no_Document: "445/   /403.103.17/2022",
        arsips: [],
      };
      this.submitted = false;
      this.editMode = false;
      this.DocumentDialog = true;
    },
    hideDialog() {
      this.DocumentDialog = false;

      this.submitted = false;
      this.Document = {};
    },
    validateInput() {
      let Document = this.Document;
      return (
        Document.tgl_terbit &&
        Document.title &&
        Document.category 
        
      );
    },
    saveDocument() {
      this.submitted = true;

      if (this.validateInput()){
        
          let url_save = useStore().parseApi("/document/internal");
          if (this.editMode) {
            url_save = useStore().parseApi("/document/internal/" + this.Document.id);
          }
          axios({
            method: "post",
            url: url_save,
            data: {
              arsips: this.Document.arsips,
              tgl_terbit: new Date(this.Document.tgl_terbit).toISOString().slice(0, 10),
              title: this.Document.title,
              type: 'internal',
              category: this.Document.category,
              no_sk: this.Document.no_sk,
              
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
        url: useStore().parseApi("/document/internal/" + this.Document.id),
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
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
        this.Document.category = this.Document.categoryDocument.value;
    },
    trimSpace(str) {
      return str.replace(" ", "");
    },
    onBeforeSendUploader(e) {
      e.xhr.setRequestHeader("Authorization", `Bearer ${useStore().token}`);
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


  },
};
</script>

<style scoped lang="scss">
@import "../assets/demo/badges.scss";
</style>
