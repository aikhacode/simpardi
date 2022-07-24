<template>
	<Toast/>
	<div class="card">
		<div class="p-fluid formgrid grid">
			<div v-for="item in headers" class="field col-12 sm:col-6 md:col-4">
				<div v-if="item.component.type=='text'">
				<label  :for="item.id">{{ item.title }}</label>
				<InputText  :id="item.id" v-model="item.v_model[item.id]" />
				</div>
				<div v-if="item.component.type=='calendar'">
				<label  :for="item.id">{{ item.title }}</label>
				<Calendar :id="item.id" v-model="item.v_model[item.id]"  dateFormat="dd-mm-yy" />
				
				</div>

				<div v-if="item.component.type=='dropdown'">
				<label  :for="item.id">{{ item.title }}</label>
				<Dropdown v-model="item.v_model[item.id]" :options="item.component.options" :editable="true" optionLabel="label" optionValue="value"/>
				
				
				</div>

			</div>

		</div>
		<!-- <div class="p-fluid grid">
			<div class="field col-12 sm:col-6 md:col-4">
				<Image class="card" :src="getAvatar()" alt="Image" width="100" preview />
			</div>
			</div>
			<div class="p-fluid col-6">
			
			</div> -->
		<div class="flex justify-content-end">
			<Button label="Save" icon="pi pi-check" class="p-button-lg" @click="save()"/>
			</div>
	</div>
</template>
<script>
import { useStore } from "@/store.js";
import PegawaiService from "@/service/PegawaiService.js"
export default {
	props: {
		id: [String, Number],
	},
	data() {
		return {
			pegawai: {},
			headers: [],
			store: useStore(),
			optionSex: [
					{ label:'Laki-laki', value:'L' },
					{ label:'Perempuan', value:'P' },
				],
			optionStatus: [
					{label:'PNS', value:'PNS'},
					{label:'CPNS', value:'CPNS'},
					{label:'PPPK', value:'PPPK'},
					{label:'PTT', value:'PTT'},
					{label:'PEGAWAI KONTRAK', value:'PEGAWAI KONTRAK'},
					{label:'SUKWAN', value:'SUKWAN'}
			],
			optionPangkat:[
					{label:'Penata Muda Tingkat I', value:'Penata Muda Tingkat I'},
					{label:'Pembina', value:'Pembina'},
					{label:'Penata Tingkat I', value:'Penata Tingkat I'},
					{label:'Penata', value:'Penata'},
					{label:'Penata Muda', value:'Penata Muda'},
					{label:'Pengatur Tingkat I', value:'Pengatur Tingkat I'},
					{label:'Pengatur', value:'Pengatur'}

			],
			optionGolongan:[
					{label:'II C', value:'II C'},
					{label:'II D', value:'II D'},
					{label:'III A', value:'III A'},
					{label:'III B', value:'III B'},
					{label:'III C', value:'III C'},
					{label:'III D', value:'III D'},
					{label:'IV A', value:'IV A'},
					{label:'VII', value:'VII'}
			],
			optionJabatan:[
					{label:'Ka. UPTD Puskesmas', value:'Ka. UPTD Puskesmas'},{label:'Dokter Gigi', value:'Dokter Gigi'},{label:'Bidan Penyelia', value:'Bidan Penyelia'},{label:'Nutrisionis Peny.', value:'Nutrisionis Peny.'},{label:'Perawat Penyelia', value:'Perawat Penyelia'},{label:'Perawat pelks.Lanj.', value:'Perawat pelks.Lanj.'},{label:'Lab.Kes.Pelks.Lanj.', value:'Lab.Kes.Pelks.Lanj.'},{label:'Dokter Ahli Pert.', value:'Dokter Ahli Pert.'},{label:'Registrar', value:'Registrar'},{label:'Pemb.Bend.Pengl.', value:'Pemb.Bend.Pengl.'},{label:'Apoteker Pertama', value:'Apoteker Pertama'},{label:'Pengadm.Umum', value:'Pengadm.Umum'},{label:'Perawat Pelaks Lanj.', value:'Perawat Pelaks Lanj.'},{label:'Bidan Pelaks.Lanj.', value:'Bidan Pelaks.Lanj.'},{label:'Bidan Mahir', value:'Bidan Mahir'},{label:'Perawat Gigi', value:'Perawat Gigi'},{label:'Perawat Pelaks.', value:'Perawat Pelaks.'},{label:'Bidan.Pelaks.', value:'Bidan.Pelaks.'},{label:'Penyuluh kesehatan masyarakat ahli pertama', value:'Penyuluh kesehatan masyarakat ahli pertama'},{label:'Bidan Terampil', value:'Bidan Terampil'},{label:'Perwt.Pelks.Pemula', value:'Perwt.Pelks.Pemula'},{label:'Perawat Terampil', value:'Perawat Terampil'},{label:'Perekam Medis Ter', value:'Perekam Medis Ter'},{label:'Sanitarian', value:'Sanitarian'},{label:'Pengelola Keuangan ', value:'Pengelola Keuangan '},{label:'Perawat', value:'Perawat'},{label:'Tenaga Pengemudi', value:'Tenaga Pengemudi'},{label:'Tenaga Kebersihan', value:'Tenaga Kebersihan'},{label:'Tenaga Keamanan', value:'Tenaga Keamanan'}

			],
			optionPendidikan:[
						{label:'Akper', value:'Akper'},{label:'Apoteker', value:'Apoteker'},{label:'D  III. Keperawatan', value:'D  III. Keperawatan'},{label:'D  III. Keperawatan Gigi', value:'D  III. Keperawatan Gigi'},{label:'D III  Gizi', value:'D III  Gizi'},{label:'D III Kebidanan', value:'D III Kebidanan'},{label:'D III Keperawatan', value:'D III Keperawatan'},{label:'D.III KEBIDANAN', value:'D.III KEBIDANAN'},{label:'D3 keperawatan', value:'D3 keperawatan'},{label:'DIII Kebidanan', value:'DIII Kebidanan'},{label:'DIII Keperawatan', value:'DIII Keperawatan'},{label:'DIII KOMPUTERISASI AKUNTANSI ', value:'DIII KOMPUTERISASI AKUNTANSI '},{label:'DIII. Analis', value:'DIII. Analis'},{label:'DIII.Kesling', value:'DIII.Kesling'},{label:'DIIIPerekam Medis', value:'DIIIPerekam Medis'},{label:'DIV Kebidanan', value:'DIV Kebidanan'},{label:'Dokter Gigi', value:'Dokter Gigi'},{label:'S.I. Kedokteran', value:'S.I. Kedokteran'},{label:'S1 Kesehatan Masyarakat', value:'S1 Kesehatan Masyarakat'},{label:'SI.Keperwt', value:'SI.Keperwt'},{label:'SMA', value:'SMA'},{label:'SMK', value:'SMK'},{label:'SPPH', value:'SPPH'}

			],

			
		};
	},
	PegawaiService:null,
	created(){
		this.PegawaiService = new PegawaiService()
	},
	async mounted() {
		
		// await this.store.getPegawai()
		
		this.initHeader();
	},
	methods: {
		getTextOrCalendarType(txt){
			let type='text'
			let options=null

			if (txt=='sex') { type='dropdown'; options=this.optionSex} 
			if (txt=='status') { type='dropdown'; options=this.optionStatus}
			if (txt=='pangkat') { type='dropdown'; options=this.optionPangkat}
			if (txt=='gol') { type='dropdown' ;options=this.optionGolongan}
			if (txt=='pangkat') { type='dropdown' ;options=this.optionPangkat}			 	
			if (txt=='jabatan_anjab') { type='dropdown' ;options=this.optionJabatan}
			if (txt=='pangkat') { type='dropdown' ;options=this.optionPangkat}	
			if (txt=='pendidikan') { type='dropdown' ;options=this.optionPangkat}		
			if (txt=='tmt_skcpns') { type='calendar' ;options=null}
			if (txt=='tmt_pensiun') { type='calendar' ;options=null}			
			if (txt=='tmt_skcpns') { type='calendar' ;options=null}	
			if (txt=='tgl_sip_sipb') { type='calendar' ;options=null}
			if (txt=='tgl_sip_sipb_berlaku') { type='calendar' ;options=null}					
			if (txt=='tgl_str') { type='calendar' ;options=null}	
			if (txt=='tgl_str_berlaku') { type='calendar' ;options=null}					

			return {
				type:type,
				options:options
			}
		},
		getAvatar(){
			
			return (!this.pegawai.avatar) ? '/images/noname.jpg' : this.pegawai.avatar
		},
		save(){
			console.log(this.PegawaiService)
			this.PegawaiService.savePegawai(this.pegawai).then((res)=>{
				this.$toast.add({
		              severity: "success",
		              summary: "Successful",
		              detail: "Pegawai Saved ",
		              life: 3000,
		            });
				this.store.getPegawai();
				this.$router.go(-1);
			})
		},
		initHeader() {
			console.log(this.store.pegawai.data);
			this.pegawai = this.store.pegawai.data.filter((item) => {
				
				return item.id == this.$props.id;
			})[0];
			console.log("peg", this.pegawai);
			this.headers = Object.keys(this.store.pegawai.data[0])
				.filter((item) => {
					return (
						item != "id" &&
						item != "avatar" &&
						item != "created_at" &&
						item != "updated_at"
					);
				})
				.map((item) => {
					return {
						id: item,
						title: item.replace(/_/g, " ").toUpperCase(),
						v_model: this.pegawai,
						component: this.getTextOrCalendarType(item),
					};
				});

			console.log(this.headers);
		},
	},
};
</script>
