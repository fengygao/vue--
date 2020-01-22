<template>
	<div class="home-container">
		<div class="home-header">
			<div :class="isCollapse?'logo-collapse-width':'logo-width'" @click.native="tohome()">
				<img  src="../assets/images/Logo-header.png" /> 
			</div>			
			<el-radio-group v-model="isCollapse" class="tools">
				<el-radio-button :label="false">展开</el-radio-button>
				<el-radio-button :label="true">收起</el-radio-button>
			</el-radio-group>										
			<div  class="userinfo">
				<el-dropdown trigger="hover">
					<div class="userinfo-inner">
						<span>{{sysUserName}}</span>
						<img  src="../assets/images/portrait.jpg" />
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>密码重置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div class="main">
			<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">		
				<el-submenu  :index="index+''" v-for="(item,index) in routers" :key="index" v-if="!item.hidden">
					<template slot="title" >
						<i :class="item.iconTu"></i>
						<span slot="title" v-if="!item.hidden">{{item.name}}</span>
					</template>
					<el-menu-item-group v-for="ich in item.children" :key="ich.path">			
						<el-menu-item :index="ich.path" @click="$router.push(ich.path)">{{ich.name}}</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
			<div class="menu-collapsed">
				<div style="height: 30px;">
					<el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
						<el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" :to="{ path:item.path}">
							{{ item.name }}
						</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div>
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				isCollapse: false,
				routers:[]							
		}
		},
		methods: {
			 handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect(a, b) {
			},
			//退出登录
			logout() {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse(){
				this.collapsed=!this.collapsed;
				var uiwidth = document.getElementById('lastclass');
				if(uiwidth.offsetWidth===0){
				uiwidth.style.width = "230px"
				}
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},
			tohome(){
				this.$router.push('/basicData/projectInfo');
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || 'admin';
				this.sysUserAvatar = user.avatar;
			}
			console.log(this.$router.options.routes)
			this.routers = []
			if(this.$router.options.routes){
				this.$router.options.routes.map(item=>{
					if(!item.hidden){
						this.routers.push(item)
					}else{
						return
					}
				})
			}
		},
		
	}

</script>

<style scoped lang="scss">	
	html,body,#app .home-container {		
		width: 100%;
		height:100%;
		font-size: 16px;		
		.home-header {
			display:flex;
			flex-direction: row;
			height: 6%;
			width:100%;
			line-height: 6%;
			background-color: rgb(84, 92, 100);				
			.userinfo {
				text-align: right;
				padding-right: 50px;
				flex: 1;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					span{
						line-height: 72px;
					}
					img {
						width: 50px;
						height: 50px;
						border-radius: 50%;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo-width{
				width:220px;
				text-align: center;
				background-position: center;
				cursor: pointer;
				z-index: 999;
				border-right:1px solid #fff;
				padding-top:13px;
				img{
					height:39px;
				}
			}
			.logo-collapse-width{
				width:64px;
				text-align: center;
				background: #fff;
				background-position: center;
				cursor: pointer;
				z-index: 999;
				border-right:1px solid #fff;
				padding-top: 10px;
				
			}
			.tools{
				padding:16px 0 0 20px;
				cursor: pointer;
			}			
		}
		.main {
			display:flex;
			height: 94%;
			.menu-collapsed{
				flex:1;
				margin:20px;
			}			
		}
	}
</style>
<style >
.el-table .cell{
	padding-left:0;	
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
}
</style>