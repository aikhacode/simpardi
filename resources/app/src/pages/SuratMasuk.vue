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
            </div>
          </template>

          <template v-slot:end>
            <Button
              label="Print"
              icon="pi pi-print"
              class="p-button-danger"
              @click="onPrint"
            />
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
              <h5 class="m-0">Manage Surat Masuk</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column
            field="tgl_surat_masuk"
            header="Tgl Surat Masuk"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Tgl Surat Masuk</span>
              {{ slotProps.data.tgl_surat_masuk }}
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
            field="pengirim"
            header="pengirim"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Pengirim</span>
              {{ slotProps.data.pengirim }}
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

          <Column header="Upload" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
              <Button
                v-if="slotProps.data.arsips.length"
                label="Ada"
                class="p-button-success mr-2"
                @click="onUploadClickAtTable(slotProps.data)"
              />
            </template>
          </Column>

          <Column
            field="disposisi"
            header="Disposisi"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Disposisi</span>
              {{ slotProps.data.disposisi }}
            </template>
          </Column>

          <Column
            header="Status Disposisi"
            field="status_disposisi"
            :sortable="true"
            headerStyle="min-width:10rem;"
          >
            <template #body="slotProps">
              <Button
                icon="pi pi-external-link"
                :disabled="store.isNotAdmin()"
                @click="onClickDisposisi(slotProps.data)"
                type="button"
                :label="slotProps.data.status_disposisi ? 'SUDAH' : 'BELUM'"
                :class="{
                  'p-button-success': slotProps.data.status_disposisi,
                  'p-button-danger': !slotProps.data.status_disposisi,
                }"
              />
            </template>
          </Column>

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
                :disabled="store.isNotAdmin()"
              />
            </template>
          </Column>
        </DataTable>

        <Dialog
          v-model:visible="SuratDialog"
          :style="{ width: '1024px' }"
          header="Surat Masuk Details"
          :modal="true"
          class="p-fluid"
        >
          <!-- <img :src="'images/Surat/' + Surat.image" :alt="Surat.image" v-if="Surat.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" /> -->
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <label for="tipeSurat" class="mb-3">Tipe Surat</label>
              <Dropdown
                id="tipeSurat"
                v-model="Surat.tipeSurat"
                :options="tipeSurat"
                optionLabel="label"
                placeholder="Pilih Tipe Surat untuk penyesuaian kode surat"
                @change="onTipeSuratChange"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value && slotProps.value.value">
                    <span
                      :class="'Surat-badge status-' + slotProps.value.value"
                      >{{ slotProps.value.label }}</span
                    >
                  </div>
                  <div v-else-if="slotProps.value && !slotProps.value.value">
                    <span
                      :class="
                        'Surat-badge status-' + slotProps.value.toLowerCase()
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
              <label for="noSurat" class="mb-3">No Surat</label>
              <InputText
                id="noSurat"
                v-model.trim="Surat.no_surat"
                required="true"
                autofocus
                :class="{
                  'p-invalid': submitted && !Surat.no_surat,
                }"
              />
              <small class="p-invalid" v-if="submitted && !Surat.no_surat"
                >No Surat harus diisi.</small
              >
            </div>

            <div class="field col-12 md:col-6">
              <label for="dateformatmasuk">Tgl Surat Masuk</label>
              <Calendar
                :class="{
                  'p-invalid': submitted && !Surat.tgl_surat,
                }"
                id="dateformat"
                v-model="Surat.tgl_surat_masuk"
                dateFormat="dd-mm-yy"
              />
              <small
                class="p-invalid"
                v-if="submitted && !Surat.tgl_surat_masuk"
                >tgl Surat Masuk harus diisi.</small
              >
            </div>

            <div class="field col-12 md:col-6">
              <label for="dateformat">Tgl Surat</label>
              <Calendar
                :class="{
                  'p-invalid': submitted && !Surat.tgl_surat,
                }"
                id="dateformat"
                v-model="Surat.tgl_surat"
                dateFormat="dd-mm-yy"
              />
              <small class="p-invalid" v-if="submitted && !Surat.tgl_surat"
                >tgl Surat harus diisi.</small
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
              <small class="p-invalid" v-if="submitted && !Surat.no_agenda"
                >No Agenda harus diisi.</small
              >
            </div>

            <div class="field col-12 md:col-6">
              <label for="pengirim">Pengirim</label>
              <InputText
                id="pengirim"
                v-model.trim="Surat.pengirim"
                required="true"
                autofocus
                :class="{
                  'p-invalid': submitted && !Surat.pengirim,
                }"
              />
              <small class="p-invalid" v-if="submitted && !Surat.pengirim"
                >Pengirim harus diisi.</small
              >
            </div>

            <div class="field col-12 md:col-6">
              <label for="perihal">Perihal</label>

              <Textarea
                id="perihal"
                v-model="Surat.perihal"
                required="true"
                rows="2"
                cols="20"
                :class="{
                  'p-invalid': submitted && !Surat.perihal,
                }"
              />
              <small class="p-invalid" v-if="submitted && !Surat.perihal"
                >Perihal harus diisi.</small
              >
            </div>

            <div class="field col-12 md:col-6">
              <label for="disposisi1"
                >Disposisi oleh: (<b
                  >Form Disposisi aktif setelah di save/mode edit.</b
                >)</label
              >
              <div id="disposisi1" class="">
                <div class="flex">
                  <InputText
                    id="disposisi"
                    v-model.trim="Surat.disposisi"
                    autofocus
                  />

                  <Button
                    @click="doDisposisi(Surat)"
                    :disabled="!editMode || store.isNotAdmin()"
                    class="font-medium p-button-raised ml-3 w-15rem p-button-danger"
                    >Buat Disposisi
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <label for="fileterupload">File yg terupload:</label>

          <div class="mt-4 formgrid grid">
            <div v-for="arsip in Surat.arsips" class="field col-4">
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
              >Yakin akan menghapus No Surat: <b>{{ Surat.no_surat }}</b> karena
              juga akan menghapus data upload ?</span
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
              >Yakin akan menghapus karena juga akan menghapus data upload yang
              terpilih?
            </span>
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

  <Dialog
    v-model:visible="disposisiDialogs"
    :style="{ width: '1024px' }"
    header="Disposisi Details"
    :modal="true"
    class="p-fluid"
  >
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <label for="dariDisposisi" class="mb-3">Dari</label>
        <InputText
          id="dariDisposisi"
          v-model.trim="SuratDisposisi.dari"
          required="true"
          autofocus
          :class="{
            'p-invalid': submitted && !SuratDisposisi.dari,
          }"
        />
        <small class="p-invalid" v-if="submitted && !SuratDisposisi.dari"
          >No Surat harus diisi.</small
        >
      </div>

      <div class="field col-12 md:col-6">
        <label for="tglSuratDisposisi" class="mb-3">Tgl Surat</label>
        <Calendar
          :class="{
            'p-invalid': submitted && !SuratDisposisi.tgl_surat,
          }"
          id="tglSuratDisposisi"
          v-model="SuratDisposisi.tgl_surat"
          dateFormat="dd-mm-yy"
        />
        <small class="p-invalid" v-if="submitted && !SuratDisposisi.tgl_surat"
          >tgl Surat harus diisi.</small
        >
      </div>

      <div class="field col-12 md:col-6">
        <label for="noSuratDisposisi" class="mb-3">No Surat</label>
        <InputText
          id="noSuratDisposisi"
          v-model.trim="SuratDisposisi.no_surat"
          required="true"
          autofocus
          :class="{
            'p-invalid': submitted && !SuratDisposisi.no_surat,
          }"
        />
        <small class="p-invalid" v-if="submitted && !SuratDisposisi.no_surat"
          >No Surat harus diisi.</small
        >
      </div>

      <div class="field col-12 md:col-6">
        <label for="perihalDisposisi" class="mb-3">Perihal</label>
        <InputText
          id="noSuratDisposisi"
          v-model.trim="SuratDisposisi.perihal"
          required="true"
          autofocus
          :class="{
            'p-invalid': submitted && !SuratDisposisi.perihal,
          }"
        />
        <small class="p-invalid" v-if="submitted && !SuratDisposisi.perihal"
          >Perihal harus diisi.</small
        >
      </div>

      <div class="field col-12 md:col-6">
        <label for="noAgendaDisposisi" class="mb-3">No Agenda</label>
        <InputText
          id="noAgendaDisposisi"
          v-model.trim="SuratDisposisi.no_agenda"
          required="true"
          autofocus
          :class="{
            'p-invalid': submitted && !SuratDisposisi.no_agenda,
          }"
        />
        <small class="p-invalid" v-if="submitted && !SuratDisposisi.no_agenda"
          >No Agenda harus diisi.</small
        >
      </div>

      <div class="field col-12 md:col-6">
        <label for="tglTerimaDisposisi" class="mb-3">Tgl Terima Surat</label>
        <Calendar
          :class="{
            'p-invalid': submitted && !SuratDisposisi.tgl_terima,
          }"
          id="tglTerimaDisposisi"
          v-model="SuratDisposisi.tgl_terima"
          dateFormat="dd-mm-yy"
        />
        <small class="p-invalid" v-if="submitted && !SuratDisposisi.tgl_terima"
          >tgl Terima harus diisi.</small
        >
      </div>
       
    </div>
    <p>Diteruskan kepada</p>
    
      <div class="grid p-fluid ">
              <div v-for="(item,index) in 5" class="col-12 md:col-4">
                  <div class="p-inputgroup">
                      <span class="p-inputgroup-addon">
                          {{index+1}}
                      </span>
                      <InputText v-model.trim="ModelSDTeruskan[index]"  />
                  </div>
              </div>
              
      </div>

      <div class="grid p-fluid ">
        <div class="field col-12 mt-3">
          <label for="isidisposisi" class="mb-3">Isi Disposisi</label>
        <Textarea v-model="SuratDisposisi.isi" :autoResize="true" rows="5" cols="30" />
        </div>
             
              
      </div>

      <div class="formgrid grid mt-4">
        <div id="ttd" class="field col-12 md:col-6">
          <div class="flex justify-content-between align-items-center mb-3">
            <label class="ml-2 mb-3">TTD</label
            ><Button
              class="w-5"
              label="Ganti TTD"
              @click="gantiTTD"
            />
          </div>

          <img v-if="SuratDisposisi.imgsrc"
            :src="SuratDisposisi.imgsrc"
            class="w-full border-1 surface-overlay border-300 border-round"
          />

          <div
            v-if="!SuratDisposisi.imgsrc"
            class="border-300 border-1 border-round"
          >
            <VueSignaturePad  width="100%" height="200px" ref="signaturePad" />
          </div>
        </div>
      </div>

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="disposisiDialogs = false"
      />
      <Button
        label="Save & Print"
        icon="pi pi-print"
        class="p-button-text"
        @click="saveDisposisi"
      />
    </template>
  </Dialog>

  <DynamicDialog />
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import SuratService from "../service/SuratMasukService.js";
import { useStore } from "@/store.js";
import axios from "axios";
import { parseArsipUrl, dayjs } from "@/helper.js";
import Disposisi from "@/dialogs/Disposisi.vue";
import DialogPrint from "@/dialogs/DialogPrint.vue";

export default {
  components: {
    Disposisi,
  },
  data() {
    return {
      store: useStore(),
      Surats: null,
      SuratDialog: false,
      deleteSuratDialog: false,
      deleteSuratsDialog: false,
      Surat: {},
      SuratDisposisi: {},
      ModelSDTeruskan:[],
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
      disposisiDialogs: false,
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

    this.SuratService.getTipeSurats().then((data) => {
      this.tipeSurat = data.map((item) => {
        return {
          label: item.tipe,
          value: item.template,
        };
      });
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
      this.SuratService.getAgenda().then((res) => {
        console.log(res);
        this.Surat.no_agenda = res[0].max + 1;
      });
      this.Surat = {
        no_surat: "",
        arsips: [],
      };
      this.submitted = false;
      this.editMode = false;
      this.SuratDialog = true;
    },
    hideDialog() {
      this.SuratDialog = false;

      this.submitted = false;
      this.Surat = {};
    },
    validateInput() {
      let Surat = this.Surat;
     

      return (
        Surat.tgl_surat &&
        Surat.tgl_surat_masuk &&
        Surat.no_surat &&
        Surat.no_agenda &&
        Surat.perihal &&
        Surat.pengirim
      );
    },
    saveSurat() {
      this.submitted = true;

      if (this.validateInput())
        if (this.Surat.no_surat.trim()) {
          let url_save = useStore().parseApi("/suratmasuk");
          if (this.editMode) {
            url_save = useStore().parseApi("/suratmasuk/" + this.Surat.id);
          }

          let tgl_save = {
            tgl_surat: null,
            tgl_surat_masuk: null,
          };

          if (this.Surat.tgl_surat instanceof Date) {
            tgl_save.tgl_surat = dayjs(this.Surat.tgl_surat).format(
              "YYYY-MM-DD"
            );
          } else {
            tgl_save.tgl_surat = dayjs(
              this.Surat.tgl_surat,
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD");
          }

          if (this.Surat.tgl_surat_masuk instanceof Date) {
            tgl_save.tgl_surat_masuk = dayjs(this.Surat.tgl_surat_masuk).format(
              "YYYY-MM-DD"
            );
          } else {
            tgl_save.tgl_surat_masuk = dayjs(
              this.Surat.tgl_surat_masuk,
              "DD-MM-YYYY"
            ).format("YYYY-MM-DD");
          }

          axios({
            method: "post",
            url: url_save,
            data: {
              arsips: this.Surat.arsips,
              tgl_surat: tgl_save.tgl_surat,
              tgl_surat_masuk: tgl_save.tgl_surat_masuk,
              no_agenda: this.Surat.no_agenda,
              perihal: this.Surat.perihal,
              pengirim: this.Surat.pengirim,
              disposisi: this.Surat.disposisi,
              no_surat: this.Surat.no_surat,
            },
            headers: {
              Authorization: `Bearer ${useStore().token}`,
            },
          }).then((res) => {
            console.log("save", res.data);
            this.SuratDialog = false;
            // this.editMode = true;

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
        url: useStore().parseApi("/suratmasuk/" + this.Surat.id),
        headers: {
          Authorization: `Bearer ${useStore().token}`,
        },
      }).then((res) => {
        console.log("deleted", res.data);
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
      });
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
          url: useStore().parseApi("/suratmasuk/" + item.id),
          headers: {
            Authorization: `Bearer ${useStore().token}`,
          },
        });
        res = await res.data;

        console.log("deleting", res.data);
      });

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
      // let idx = this.Surat.no_surat.indexOf("/");
      // let tmp = this.Surat.no_surat.slice(idx, this.Surat.no_surat.length);

      this.Surat.no_surat = this.Surat.tipeSurat.value;
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
    async doDisposisi(Surat) {
      let png = null;

      console.log("trying...",Surat);

      try {
        png = await this.SuratService.getTTD(Surat.disposisis.id);
        console.log(png);
      } catch (err) {
        console.log(err);
      }
      this.Surat = Surat;
      this.SuratDisposisi = {
        dari: this.Surat.pengirim,
        tgl_surat: this.Surat.tgl_surat,
        no_surat: this.Surat.no_surat,
        perihal: this.Surat.perihal,
        no_agenda: this.Surat.no_agenda,
        tgl_terima: this.Surat.tgl_surat_masuk,
        isi:(Surat.disposisis) ? Surat.disposisis.isi : null,
        teruskan: (Surat.disposisis) ? JSON.parse(Surat.disposisis.teruskan) : null,
        ttd: (Surat.disposisis) ? Surat.disposisis.ttd : null,
        imgsrc: png,
      };

      this.disposisiDialogs = true;

      console.log('do disp dd',this.SuratDisposisi)
      
    },
    async saveDisposisi() {
      if (true) {
        let url_save = useStore().parseApi(
          "/suratmasuk/disposisi/" + this.Surat.id
        );

        let tgl_save = {
          tgl_surat: null,
          tgl_terima: null,
        };

console.log('modelteruskan:model',this.ModelSDTeruskan)
         
        this.SuratDisposisi.teruskan = this.ModelSDTeruskan  
        
        console.log('modelteruskan:dterus',this.SuratDisposisi.teruskan)
       

        
        if (this.$refs.signaturePad) { 
            const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
            console.log('isempty',isEmpty);
            console.log('data',data);
            if (!isEmpty) {
             
              this.SuratDisposisi.ttd_data = data;
              console.log('data',data)
            } else {
                this.SuratDisposisi.ttd_data = this.SuratDisposisi.imgsrc;
                console.log('ttd data',this.SuratDisposisi.ttd_data)
            }

        } else {
          this.SuratDisposisi.ttd_data = this.SuratDisposisi.imgsrc;
                console.log('ttd data',this.SuratDisposisi.ttd_data)
        }

       
      

        if (this.SuratDisposisi.tgl_surat instanceof Date) {
          tgl_save.tgl_surat = dayjs(this.SuratDisposisi.tgl_surat).format(
            "YYYY-MM-DD"
          );
        } else {
          tgl_save.tgl_surat = dayjs(
            this.SuratDisposisi.tgl_surat,
            "DD-MM-YYYY"
          ).format("YYYY-MM-DD");
        }

        if (this.SuratDisposisi.tgl_terima instanceof Date) {
          tgl_save.tgl_terima = dayjs(this.SuratDisposisi.tgl_terima).format(
            "YYYY-MM-DD"
          );
        } else {
          tgl_save.tgl_terima = dayjs(
            this.SuratDisposisi.tgl_terima,
            "DD-MM-YYYY"
          ).format("YYYY-MM-DD");
        }

        console.log(this.SuratDisposisi, tgl_save);
        

        axios({
          method: "post",
          url: url_save,
          data: {
            tgl_surat: tgl_save.tgl_surat,
            tgl_terima: tgl_save.tgl_terima,
            no_agenda: this.SuratDisposisi.no_agenda,
            perihal: this.SuratDisposisi.perihal,
            dari: this.SuratDisposisi.dari,
            no_surat: this.SuratDisposisi.no_surat,
            ttd_data: this.SuratDisposisi.ttd_data,
            isi:this.SuratDisposisi.isi,
            teruskan:JSON.stringify(this.SuratDisposisi.teruskan),
          },
          headers: {
            Authorization: `Bearer ${useStore().token}`,
          },
        }).then((res) => {
          console.log("after save disposii", res.data);
          this.SuratService.getSurats().then((data) => {
            this.Surats = data;

            console.log(this.Surats);
          });
          this.disposisiDialogs = false;
          console.log("save", res.data);
          window.open(
            `${location.protocol}//${location.hostname}/print/disposisi/${this.Surat.id}`,
            "_blank"
          );
          // this.disposisiDialogs = false;
        });
      }
    },
    onUploadClickAtTable(data) {
      useStore().arsipsTemp = data.arsips;
      console.log(useStore().arsipsTemp);
      this.$router.push({ path: "/view-upload" });
    },
    onClickDisposisi(dt) {
      console.log("dt", dt);

      this.doDisposisi(dt);
    },
    onPrint() {
      const dialogRef = this.$dialog.open(DialogPrint, {
        props: {
          header: "Print Stok Masuk",
          style: {
            width: "80vw",
          },
          breakpoints: {
            "960px": "80vw",
            "640px": "90vw",
          },
          modal: true,
        },
        data: {
          type: "print-surat-masuk",
        },
        templates: {
          // footer: () => {
          //     return [
          //         h('div',{class:'p-3'}),
          //         h(Button, { label: "Close", icon: "pi pi-check", onClick: () => dialogRef.close({ buttonType: 'Yes' }), autofocus: true })
          //     ]
          // }
        },
        onClose: (options) => {
          const data = options.data;
          if (data) {
            // this.refreshCategory()
            // this.$toast.add({ severity:'info', 'ok', life: 3000 });
          }
        },
      });
      // window.open(`${location.protocol}//${location.hostname}/print/suratmasuk`, "_blank")
    },

    gantiTTD(){
      
      this.SuratDisposisi.imgsrc = null
      console.log('ganti ttd',this.SuratDisposisi)
      console.log('ganti ttd',this.$refs.signaturePad)
      if (this.$refs.signaturePad) this.$refs.signaturePad.clearSignature()

    }
  },
};
</script>

<style scoped lang="scss">
@import "../assets/demo/badges.scss";
</style>
