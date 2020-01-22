<template>
	<section>
		<div class="mypage" v-if="isshow">
		</div>
		<Loading class="loading" v-if="isLoading"></Loading>
	</section>
</template>
<script>
import Loading from '../../components/loading.vue'
import { apiAddress } from '../../api/api' // 导入我们的api接口
export default {
	data(){
		return{
			isLoading:true,
			isshow:false,
		}
	},
	methods:{
		 // 调用api接口
		// getdata(){
		// 	apiAddress({     
		// 	//参数  
		// 	}).then(res => {
		// 	// 获取数据成功后的其他操作   
		// 	}) 
		// }
	},
	beforeCreate(){
		this.isLoading=true
	},
	mounted(){
		var _this=this;
		setTimeout(() => {
			_this.isLoading=false
			_this.isshow=true
		},3000);
	},
	components:{
		Loading
	}
}
</script>
<style scoped>
.mypage{
	position: absolute;
	left:45%;
	top:40%;
	height:200px;
	width:360px;
	background: url(../../assets/images/newpage.png) no-repeat;
	background-size: 340px 200px;
}
</style>