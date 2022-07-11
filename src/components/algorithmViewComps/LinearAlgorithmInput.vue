<template>
	<div>
		<span class="head-input-tip"
			style="top: 60px;">
			输入待排序数组：
			<span style="font-size: 16px;">
				输入的单个节点字符长度不超过5个字符，且为+、-或数字</span>
		</span>
		<textarea :class="isTextAreaActive"
			ref="inputArea"
			v-model="textarea"
			:style="{'width':String(mainPartWidth)+'px'}"
			@focus="changeClass(true)"
			@blur="changeClass(false)"
			@input="updateListData()"/>
		<button class="commit-user-choice"
			@click="clearInput()"
			:style="{'background-color':'#FFF6E9',
				'left':String(mainPartWidth-120)+'px',
				'color':'#FF9B09',
				'border':'1px solid #FF9B09'}">
			重新输入
		</button>
		<button class="commit-user-choice"
			@click="showPreview()"
			:style="{'background-color':'#ECF5FF',
				'left':String(mainPartWidth+30)+'px',
				'color':'#409EFF',
				'border':'1px solid #409EFF'}">
			生成预览
		</button>
		<button class="commit-user-choice"
			:style="{'background-color':'#ECF5FF',
				'left':String(mainPartWidth+180)+'px',
				'color':'#409EFF',
				'border':'1px solid #409EFF'}">
			开始排序
		</button>
		<span class="head-input-tip"
			style="top: 460px;">
			数组结构预览
		</span>
		<div class="preview-struct-area"
			:style="{'width':String(mainPartWidth+40)+'px'}">
			<el-empty
				v-if="isPreviewEmpty"
				description="暂无结构生成预览"
				:image-size="60"></el-empty>
			<div v-if="!isPreviewEmpty">
				<structPreview class="show-nodes"
					v-for="(n, k) in rankList"
					:valElement='rankList[k]'
					:style="{'left':String(40+80*k)+'px'}"
					:key="k"/>
			</div>
		</div>
	</div>
</template>

<script>
import structPreview from './StructPreviewCanvas.vue'

export default {
	name: 'inputPopSortList',
	components: {
		structPreview
	},
	data() {
		return {
			mainPartWidth: 0,
			rankList: [],
			textAreaClass: false,
			isPreviewEmpty: true,
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
			if (this.mainPartWidth < 1000) { this.mainPartWidth=1000; }
		},
		updateListData() {
			this.textarea = this.textarea.replaceAll('，', ',');
			this.rankList = this.textarea.split(',');
		},
		clearInput() {
			this.$confirm('当前操作会清空输入，是否确定执行？', '确认信息', {
				distinguishCancelAndClose: true,
				confirmButtonText: '确定',
				cancelButtonText: '放弃'
			})
			.then(() => {
				this.textarea = '';
				this.isPreviewEmpty = true;
				this.$message({
					showClose: true,
					message: '清除成功！',
					type: 'success'
				});
			})
			.catch(action => {
				this.$message({
					showClose: true,
					message: '取消成功！',
					type: 'info'
				});
			});
		},
		showPreview() {
			this.updateListData();
			this.isPreviewEmpty = !this.isPreviewEmpty;
		},
		changeClass(status) {
			this.textAreaClass=status;
		},
	}
}
</script>

<style>
.head-input-tip {
	user-select: none;
	position: absolute;
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
.preview-struct-area {
	position: absolute;
	left: 250px;
	top: 530px;
	border-radius: 10px;
	border: 1px solid #C0C4CC;
	height: 200px; 
	overflow-x: scroll;
	overflow-y: hidden;
}
.show-nodes {
	position: absolute;
	width: 70px;
	height: 200px;
}
</style>