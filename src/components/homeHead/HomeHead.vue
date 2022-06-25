<template>
	<div class="home-head">
		<div class="logo-info" @click="toHome()">
			<img src="../../assets/head_logo.png" id="head-logo">
			<div id="head-webname">Data Struct<br>Helper</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeHead',
	methods: {
		toHome() {
			var home = document.location.origin
			document.location = home
		}
	}
}
</script>

<style>
.home-head {
	position: inherit;
	width: 100%;
	height: 100%;
	background-color: #606266;
}
.logo-info {
	position: inherit;
	left: 20px;
	width: 180px;
	height: 100%;
}
.logo-info:hover {
	cursor: pointer;
}
#head-logo {
	user-select: none;
	position: inherit;
	width: 50px;
	height: 50px;
	left: 10px;
	top: 15px;
}
#head-webname {
	user-select: none;
	font-family: STHupo;
	position: inherit;
	left: 70px;
	top: 22px;
	font-size: 20px;
	color: antiquewhite;
}
</style>