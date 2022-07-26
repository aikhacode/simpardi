<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <!-- <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2"> -->
                            <!-- <Button
                                label="New"
                                icon="pi pi-plus"
                                class="p-button-success mr-2"
                                @click="openNew"
                            /> -->
                            <!-- <Button
                                label="Delete"
                                icon="pi pi-trash"
                                class="p-button-danger"
                                @click="confirmDeleteSelected"
                                :disabled="
                                    !selectedProducts ||
                                    !selectedProducts.length
                                "
                            /> -->
                      <!--   </div>
                    </template>

                    <template v-slot:end> -->
                        <!-- <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" /> -->
                       <!--  <Button
                            label="Export"
                            icon="pi pi-upload"
                            class="p-button-help"
                            @click="exportCSV($event)"
                        /> -->
                   <!--  </template>
                </Toolbar> -->

                <DataTable
                    ref="dt"
                    :value="store.pegawai.data"
                    v-model:selection="selectedProducts"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} pegawai"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div
                            class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
                        >
                            <h5 class="m-0">Data Pegawai</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText
                                    v-model="filters['global'].value"
                                    placeholder="Search..."
                                />
                            </span>
                        </div>
                    </template>

                    <!-- <Column
                        selectionMode="multiple"
                        headerStyle="width: 3rem"
                    ></Column> -->

					

                    <Column
                        field="nama"
                        header="Nama"
                        :sortable="true"
                        headerStyle="width:14%; min-width:10rem;"
                    >
                        <template #body="slotProps">
                            <span class="p-column-title">Nama</span>
                            <span class="flex align-items-center">
                                <img v-if="!slotProps.data.avatar"
                                    alt=""
                                    :src="'images/avatar/doctor.png'"
                                    width="32"
                                    style="vertical-align: middle"
                                />
								 <img v-else
                                    alt=""
                                    :src="slotProps.data.avatar"
                                    width="32"
                                    style="vertical-align: middle"
                                />
                                <span
                                    style="
                                        margin-left: 0.5em;
                                        vertical-align: middle;
                                    "
                                    class="image-text"
                                    >{{ slotProps.data.nama }}</span
                                >
                            </span>
                        </template>
                    </Column>

					<Column v-for="keyName in columnKeyDisplay"
                        :field="keyName.field"
                        :header="keyName.title"
                        :sortable="true"
                        headerStyle="width:14%; min-width:10rem;"
                    >
                        <template #body="slotProps">
                            <span class="p-column-title">{{keyName.title}}</span>
                            <span class="flex align-items-center">
                               
                                <span
                                    style="
                                        margin-left: 0.5em;
                                        vertical-align: middle;
                                    "
                                    class="image-text"
                                    >{{ keyName.formatData(keyName.type,slotProps.data[keyName.field]) }}</span
                                >
                            </span>
                        </template>
                    </Column>

					 <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button
                                icon="pi pi-pencil"
                                class="p-button-rounded p-button-success mr-2"
                                @click="$router.push({path:'/pegawai/'+slotProps.data.id})"
                                
                            />
                            <Button
                                icon="pi pi-trash"
                                class="p-button-rounded p-button-warning mt-2"
                                @click="confirmDeleteProduct(slotProps.data)"
                                :disabled="store.isNotAdmin()"
                            />
                        </template>
                    </Column>

                   
                </DataTable>


                <Dialog
                    v-model:visible="deleteProductDialog"
                    :style="{ width: '450px' }"
                    header="Confirm"
                    :modal="true"
                >
                    <div class="flex align-items-center justify-content-center">
                        <i
                            class="pi pi-exclamation-triangle mr-3"
                            style="font-size: 2rem"
                        />
                        <span v-if="product"
                            >Are you sure you want to delete
                            <b>{{ product.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="deleteProductDialog = false"
                        />
                        <Button
                            label="Yes"
                            icon="pi pi-check"
                            class="p-button-text"
                            @click="deleteProduct"
                        />
                    </template>
                </Dialog>

                <Dialog
                    v-model:visible="deleteProductsDialog"
                    :style="{ width: '450px' }"
                    header="Confirm"
                    :modal="true"
                >
                    <div class="flex align-items-center justify-content-center">
                        <i
                            class="pi pi-exclamation-triangle mr-3"
                            style="font-size: 2rem"
                        />
                        <span v-if="product"
                            >Are you sure you want to delete the selected
                            products?</span
                        >
                    </div>
                    <template #footer>
                        <Button
                            label="No"
                            icon="pi pi-times"
                            class="p-button-text"
                            @click="deleteProductsDialog = false"
                        />
                        <Button
                            label="Yes"
                            icon="pi pi-check"
                            class="p-button-text"
                            @click="deleteSelectedProducts"
                        />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import ProductService from "../service/PegawaiService.js";
import { useStore } from "@/store.js";

export default {
    data() {
        return {
            columnKeyDisplay: null,
            products: null,
            columnData: null,
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            product: {},
            selectedProducts: null,
            filters: {},
            submitted: false,
            statuses: [
                { label: "INSTOCK", value: "instock" },
                { label: "LOWSTOCK", value: "lowstock" },
                { label: "OUTOFSTOCK", value: "outofstock" },
            ],
            store: useStore(),
        };
    },
    productService: null,
    created() {
        this.productService = new ProductService();
        this.initFilters();
    },
    mounted() {
        // this.productService.getProducts().then(data => this.products = data);
        Promise.all([this.store.getPegawai()])
        this.products = this.store.pegawai.data;
		
		if (this.products.length>0) {
			this.columnKeyDisplay = Object.keys(this.products[0])
			console.log('before',this.columnKeyDisplay);

			this.columnKeyDisplay = this.columnKeyDisplay.filter((valKey) => {
                return valKey!='nama' && valKey!='id' && valKey!='created_at' && valKey!='updated_at' && valKey!='avatar' 
			}).map(valCKD => {
				
				return {
					title: valCKD.charAt(0).toUpperCase() + valCKD.slice(1),
					field: valCKD,
					type: (valCKD == 'tmt_skcpns') || (valCKD == 'tmt_pensiun') || (valCKD == 'tgl_sip_sipb') || (valCKD == 'tgl_sip_sipb_berlaku') || (valCKD == 'tgl_str') || (valCKD == 'tgl_str_berlaku') ? 'dateTime' : 'default',
					formatData: this.formatDataValue
				}

			})
			console.log('after',this.columnKeyDisplay);

		}
		
        
                
        
    },
    methods: {
		formatDataValue(dType,dValue){
			switch(dType){
				case 'dateTime':
					  return new Date(dValue).toLocaleDateString("id-ID")	
				break;
				case 'currency':
					return this.formatCurrency(dValue)
				break;
				default:
					return dValue
			}
		},
        formatCurrency(value) {
            if (value)
                return value.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                });
            return;
        },
        openNew() {
            this.product = {};
            this.submitted = false;
            // this.$router.push(path:'/pegawai/new')
        },
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        },
        saveProduct() {
            this.submitted = true;
            if (this.product.name.trim()) {
                if (this.product.id) {
                    this.product.inventoryStatus = this.product.inventoryStatus
                        .value
                        ? this.product.inventoryStatus.value
                        : this.product.inventoryStatus;
                    this.products[this.findIndexById(this.product.id)] =
                        this.product;
                    this.$toast.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Product Updated",
                        life: 3000,
                    });
                } else {
                    this.product.id = this.createId();
                    this.product.code = this.createId();
                    this.product.image = "product-placeholder.svg";
                    this.product.inventoryStatus = this.product.inventoryStatus
                        ? this.product.inventoryStatus.value
                        : "INSTOCK";
                    this.products.push(this.product);
                    this.$toast.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Product Created",
                        life: 3000,
                    });
                }
                this.productDialog = false;
                this.product = {};
            }
        },
        editProduct(product) {
            this.product = { ...product };
            this.productDialog = true;
        },
        confirmDeleteProduct(product) {
            this.product = product;
            this.deleteProductDialog = true;
        },
        deleteProduct() {

            // this.products = this.products.filter(
            //     (val) => val.id !== this.product.id
            // );
            this.productService.deletePegawai(this.product).then((res)=>{
               this.deleteProductDialog = false;
                this.product = {};
                this.$toast.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "Product Deleted",
                    life: 3000,
                });
                useStore().getPegawai()
            })
            
        },
        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].id === id) {
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
            this.deleteProductsDialog = true;
        },
        deleteSelectedProducts() {
            // this.products = this.products.filter(
            //     (val) => !this.selectedProducts.includes(val)
            // );

            
        },
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            };
        },
    },
};
</script>

<style scoped lang="scss">
@import "../assets/demo/badges.scss";
</style>
