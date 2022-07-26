<template>
<div>
    <Toast/>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                    
                </template>

                <template #end>
                   <!--  <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                    <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  /> -->
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Manage Kategori Dokumen</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>

              
                <Column field="type" header="Tipe" :sortable="true" style="min-width:10rem"></Column>
                <Column field="category" header="Category" :sortable="true" style="min-width:10rem"></Column>
               
                <Column :exportable="false" style="min-width:8rem" header="Aksi">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" :disabled="store.isNotAdmin()" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Kategori Details" :modal="true" class="p-fluid">
            <div class="field">
                <label for="tipe" class="mb-3">Tipe Dokumen</label>
                <Dropdown id="tipe" v-model="modelType" :options="options" optionLabel="label" placeholder="Pilih Tipe Dokumen" @change="onChange">
                    
                </Dropdown>
            </div>
            <div class="field">
                <label for="name">Kategori</label>
                <InputText id="name" v-model.trim="product.category" required="true" autofocus :class="{'p-invalid': submitted && !product.category}" />
                <small class="p-error" v-if="submitted && !product.category">Kategori harus diisi.</small>
            </div>
          
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Anda yakin untuk menghapus <b>{{product.type}} - {{product.category}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
            </template>
        </Dialog>

        
	</div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import ProductService from '@/service/CategoryService';
import {useStore} from "@/store.js"
import {parseApi,parseWeb} from "@/helper"
import axios from "axios"

export default {
    data() {
        return {
            products: null,
            productDialog: false,
            deleteProductDialog: false,
           
            product: {  },
            modelType:{
                label:'INTERNAL', value: 'INTERNAL'
            },
            selectedProducts: null,
            filters: {},
            submitted: false,
            options: [
				{label: 'INTERNAL', value: 'INTERNAL'},
				{label: 'EKSTERNAL', value: 'EKSTERNAL'},
            ],
            newMode: false,
            store:useStore(),
        }
    },
    productService: null,
    created() {
        this.productService = new ProductService();
        this.initFilters();
    },
    mounted() {
        // this.productService.getProducts().then(data => this.products = data);
        this.productService.getCategories().then((res) => {
             this.products = res
        });
    },
    methods: {
       
        openNew() {
            this.newMode = true
            this.product = {};
            this.product.type = this.modelType.value
            this.submitted = false;
            this.productDialog = true;
        },
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        },
        validateInput(){
            return this.product.type && this.product.category
        },
        saveProduct() {
            this.submitted = true;

			if (this.validateInput()) {
                this.productService.save(this.product,this.newMode).then((res)=>{

                     this.productDialog = false;
                    this.product = {};   


                    this.$toast.add({
                      severity: "success",
                      summary: "Successful",
                      detail: "Document Saved",
                      life: 3000,
                    }); 

                     this.productService.getCategories().then((res) => {
                         this.products = res
                    });
                   

                })

                
            } else {
                console.log(this.product,'oops')
            }
        },
        editProduct(product) {
            this.newMode = false
            this.product = {...product};
            this.productDialog = true;
        },
        confirmDeleteProduct(product) {
            this.product = product;
            this.deleteProductDialog = true;
        },
        deleteProduct() {
           this.productService.delete(this.product).then((res)=>{
             this.deleteProductDialog = false;
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Kategori Deleted', life: 3000});
             this.productService.getCategories().then((res) => {
                     this.products = res
                });
           
            })
        },
      
        confirmDeleteSelected() {
            this.deleteProductsDialog = true;
        },

        
        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        },
        onChange(){
            this.product.type = this.modelType.value
        }
    }
}
</script>

<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
            margin-bottom: 0.25rem;
        }
	}
}
</style>
