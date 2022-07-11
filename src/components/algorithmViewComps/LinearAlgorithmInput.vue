<template>
	<div>
		<span id="tip-1">
			输入待排序数组：</span>
		<textarea :class="isTextAreaActive"
			ref="inputArea"
			v-model="textarea"
			:style="{'width':String(mainPartWidth)+'px'}"
			@focus="changeClass(true)"
			@blur="changeClass(false)"
			@input="updateListData()"/>
		<button class="commit-user-choice"
			:style="{'background-color':'#ECF5FF',
				'left':'300px',
				'color':'#409EFF',
				'border':'1px solid #409EFF'}">
			生成预览
		</button>
		<button class="commit-user-choice"
			:style="{'background-color':'#ECF5FF',
				'left':'500px',
				'color':'#409EFF',
				'border':'1px solid #409EFF'}">
			开始排序
		</button>
		<button class="commit-user-choice"
			:style="{'background-color':'#FFF6E9',
				'left':'700px',
				'color':'#FF9B09',
				'border':'1px solid #FF9B09'}">
			重新输入
		</button>
	</div>
</template>

<script>
export default {
	name: 'inputPopSortList',
	data() {
		return {
			mainPartWidth: 0,
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
	mounted() {
		this.formSize();
	},
	methods: {
		formSize() {
			this.mainPartWidth = document.documentElement.clientWidth-600;
			
		},
		changeClass(status) {
			this.textAreaClass=status;
		},
		updateListData() {
			this.textarea = this.textarea.replaceAll('，', ',');
			this.rankList = this.textarea.split(',');
		}
	}
}
</script>

<style>
#tip-1 {
	user-select: none;
	position: absolute;
	top: 60px;
	left: 250px;
	font-size: 30px;
	color: #606266;
}
.commit-user-choice {
	user-select: none;
	cursor: pointer;
	position: absolute;
	font-size: 16px;
	height: 40px;
	width: 120px;
	top: 390px;
	border-radius: 20px;
	font-family: "Microsoft YaHei";
}
.input-list {
	transition: 0.5s;
	outline: none;
	resize: none;
	position: absolute;
	top: 120px;
	left: 250px;
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
	top: 120px;
	left: 250px;
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