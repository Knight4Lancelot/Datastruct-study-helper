<template>
  <div id="app">
	<div class="main-head">head</div>
	<div class="main-part">
		<div class="aside-body-show"
			@mouseover="changeOpacity(true)"
			@mouseout="changeOpacity(false)">
			<div class="link-container" @click="openHiddenComs()">
				<div class="selector-head" style="width: 60%;">
					<i class="el-icon-edit"></i>
					<transition name="head-word-transform">
						<span class="selector-head-word" v-if="showHeadWord">设计结构</span>
					</transition>
				</div>
				<div class="hidden-components">
					
				</div>
			</div>
			<div class="link-container" @click="openHiddenComs()">
				<div class="selector-head" style="width: 60%;">
					<i class="el-icon-edit"></i>
					<transition name="head-word-transform">
						<span class="selector-head-word" v-if="showHeadWord">其他</span>
					</transition>
				</div>
				<div class="hidden-components">
					
				</div>
			</div>
		</div>
		<div class="main-body-show" :style="{'opacity':mainOpacity}">
			<router-view></router-view>
		</div>
		<div class="cover-layer" v-if="isCover"></div>
	</div>
  </div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			isCover: false,
			mainOpacity: 1,
			showHeadWord: false,
			elLinkStyle: {
				'color': 'white',
				'text-decoration': 'none'
			}
		}
	},
	methods: {
		changeOpacity(status) {
			this.isCover=status
			this.mainOpacity = status ? 0.6 : 1
			this.showHeadWord = status
		},
		openHiddenComs() {
			alert('展开')
		}
	}
}
</script>

<style lang="scss">
#app {
	padding: 0;
	margin: 0;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 99%;
	height: 100%;
	border: hidden;
}
.main-head {
	position: absolute;
	height: 10%;
	width: 101%;
	background-color: #606266;
}
.main-part {
	position: absolute;
	top: 10%;
	height: 90%;
	width: 99%;
}
.aside-body-show {
	transition: 0.3s;
	position: inherit;
	width: 5%;
	height: 100%;
	z-index: 2;
	background-color: #545c64;
}
.aside-body-show:hover {
	transition: 0.3s;
	width: 20%;
	.link-container {
		transition: 0.2s;
		left: 15%;
	}
}
.main-body-show {
	position: inherit;
	left: 5%;
	width: 96%;
	height: 99%;
	z-index: 0;
	border: 2px solid burlywood;
}
.cover-layer {
	position: inherit;
	left: 6%;
	width: 96%;
	height: 100%;
	background-color: #909399;
	z-index: 1;
	opacity: 0.35;
}
.link-container {
	transition: 0.4s;
	position: relative;
	left: 30%;
	margin-top: 30px;
	position: inherit;
	z-index: 1;
}
.link-container i {
	position: inherit;
	z-index: 1;
	transition: 0.3s;
	font-size: 28px;
	color: #DCDFE6;
}
.selector-head-word {
	position: relative;
	z-index: 2;
	user-select: none;
	transition: 0.15s;
	color:  #DCDFE6;
	padding-left: 20px;
}
.selector-head:hover {
	cursor: pointer;
	i,transition span {
		transition: 0.3s;
		color: #70B0F2;
	}
}
.head-word-transform-enter-active { 
  transition:all 0.4s;
}
.head-word-transform-enter {
  opacity:0;
  transform:translateX(-20px);
}
.head-word-transform-leave-to { 
  opacity:0;
  transform:translateX(-20px);
}
</style>
