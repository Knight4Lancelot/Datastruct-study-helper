<template>
	<div>
		<i class="el-icon-top"></i>
		<div class="pointer-node" v-text="pointerText" />
		<div class="pointer-carry-value" v-text="String(carryValue)"
			v-if="isShowCarryValue"
			:style="{'width':String(String(carryValue).length*10+10)+'px'}" />
	</div>
</template>

<script>
export default {
	name: 'linearPointer',
	data() {
		return {
			isShowCarryValue: false,
			carryValue: 0,
		}
	},
	props: {
		pointerText: String
	}
}
</script>

<style>
.el-icon-top {
	font-size: 40px;
	color: #EEB155;
}
.pointer-node {
	user-select: none;
	position: inherit;
	z-index: 2;
	height: 30px;
	width: 30px;
	padding: 5px;
	border-radius: 50%;
	border: 3px solid #EEB155;
	background-color: #FEECD2;
	text-align: center;
	font-size: 20px;
	color: #535558;
}
.pointer-carry-value {
	transition: 0.5s;
	user-select: none;
	position: inherit;
	z-index: 1;
	height: 28px;
	width: 80px;
	padding: 5px;
	border-radius: 25px;
	border: 3px solid #EEB155;
	padding-top: 8px;
	padding-left: 50px;
	font-size: 16px;
	color: #535558;
}
</style>