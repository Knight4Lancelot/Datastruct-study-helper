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
		<el-button class="commit-user-choice"
			type="primary"
			style="left: 60%;"
			round
			plain>开始排序</el-button>
		<el-button class="commit-user-choice"
			type="warning"
			style="left: 70%;"
			round
			plain>重新输入</el-button>
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
.commit-user-choice {
	position: absolute;
	top: 390px;
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