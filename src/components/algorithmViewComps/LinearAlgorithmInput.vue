<template>
	<div>
		<span id="tip-1">
			输入待排序数组：</span>
		<textarea :class="isTextAreaActive"
			ref="inputArea"
			v-model="textarea"
			@focus="changeClass(true)"
			@blur="changeClass(false)"
			@input="updateListData()"/>
		<button class="commit-user-choice">开始排序</button>
		<button class="commit-user-choice">重新输入</button>
	</div>
</template>

<script>
export default {
	name: 'inputPopSortList',
	data() {
		return {
			rankList: [],
			textAreaClass: false,
			textarea: ''
		}
	},
	computed: {
		isTextAreaActive() {
			return this.textAreaClass?"input-list-active":"input-list"
		}
	},
	methods: {
		changeClass(status) {
			this.textAreaClass=status;
		},
		updateListData() {
			this.textarea = this.textarea.replaceAll('，', ',');
			this.rankList = this.textarea.split(',');
			console.log(this.rankList)
		}
	}
}
</script>

<style>
#tip-1 {
	position: absolute;
	left: 20%;
	top: 8%;
	font-size: 30px;
	color: #606266;
}
.input-list {
	transition: 0.5s;
	outline: none;
	resize: none;
	position: absolute;
	top: 15%;
	left: 20%;
	width: 55%;
	max-height: 200px;
	overflow-y: scroll;
	height: 200px;
	font-size: 20px;
	border-radius: 10px;
	padding: 20px;
	font-family: "Microsoft YaHei";
	border: 2px solid #C0C4CC;
}
.input-list-active {
	transition: 0.5s;
	outline: none;
	resize: none;
	position: absolute;
	top: 15%;
	left: 20%;
	width: 55%;
	max-height: 200px;
	overflow-y: scroll;
	height: 200px;
	font-size: 20px;
	border-radius: 10px;
	padding: 20px;
	font-family: "Microsoft YaHei";
	border: 2px solid #78BBFF;
}
</style>