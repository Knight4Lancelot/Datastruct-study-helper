<template>
  <div class="home-view">
	<img src="../assets/home_logo.png" id="home-logo">
	<img src="../assets/home_webname.png" id="home-webname">
	<!-- <div id="divider"></div> -->
	
  </div>
</template>

<script>
export default {
	name: 'HomeView'
}
</script>

<style>
.home-view {
	position: inherit;
	width: 100%;
	height: 100%;
}
#home-logo {
	position: inherit;
	top: 10%;
	left: 25%;
	width: 18%;
	height: 28%;
	user-select: none;
	/* border: 10px solid black; */
}
#home-webname {
	position: inherit;
	width: 24%;
	height: 6%;
	top: 40%;
	left: 22%;
	user-select: none;
}
#divider {
	position: inherit;
	left: 50%;
	top: 8%;
	width: 3px;
	height: 40%;
	background-color: #C0C4CC;
}
</style>