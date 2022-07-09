<template>
	<div>
		<i class="el-icon-top"></i>
		<div class="pointer-node" v-text="pointerText"></div>
	</div>
</template>

<script>
export default {
	name: 'linearPointer',
	props: {
		pointerText: String
	}
}
</script>

<style>
.el-icon-top {
	font-size: 40px;
	color: #909399;
}
.pointer-node {
	position: inherit;
	height: 30px;
	width: 30px;
	padding: 5px;
	border-radius: 50%;
	border: 3px solid #909399;
	text-align: center;
	font-size: 18px;
	color: #535558;
}
</style>