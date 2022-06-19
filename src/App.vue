<template>
  <div id="app">
	<div class="main-head">head</div>
	<div class="main-part">
		<div class="aside-body-show"
			@mouseenter="changeOpacity(true)"
			@mouseout="changeOpacity(false)">
			<div ></div>
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
	position: relative;
	left: 30%;
	margin-top: 30px;
}
</style>
