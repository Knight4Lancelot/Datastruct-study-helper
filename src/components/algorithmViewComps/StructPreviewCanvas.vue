<template>
	<div>
		<div :class="nodeStatus"
			id="el"
			v-text="valElement"
			@mouseenter="showErrorMsg(true)"
			@mouseleave="showErrorMsg(false)"
			/>
		<transition name="errormsg-fade">
			<div class="error-msg"
				v-if="isShowErrorMsg"
				v-text="errorMsg">
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'structPreview',
	props: {
		valElement: String
	},
	data() {
		return {
			element: '',
			RegPattern: new RegExp('^\\+?-?\\d+$'),
			errorMsg: '',
			isError: false,
			isShowErrorMsg: false,
			normalNode: 'preview-node-normal',
			blankNode: 'preview-node-blank',
			dangerNode: 'preview-node-danger'
		}
	},
	computed: {
		nodeStatus() {
			switch(true) {
				case this.valElement.length===0: // 内容为空
					return this.blankNode;
				case this.valElement.length>5: // 长度过长
				case this.valElement.match(this.RegPattern)===null: // 不符合数字的表达
					return this.dangerNode;
				default: break;
			}
			return this.normalNode;
		}
	},
	mounted() {
		this.element = this.valElement;
	},
	methods: {
		showErrorMsg(status) {
			if (this.valElement.length===0) {
				this.errorMsg = '当前节点内容为空',
				this.isShowErrorMsg = status;
			} else if (this.valElement.length>5) {
				this.errorMsg = '当前节点内容大于5个字符',
				this.isShowErrorMsg = status;
			} else if (this.valElement.match(this.RegPattern)===null) {
				this.errorMsg = '当前节点内容不合法',
				this.isShowErrorMsg = status;
			} else {
				this.errorMsg = '';			
			}
		}
	}
}
</script>

<style>
.error-msg {
	position: absolute;
	height: 20px;
	left: -65px;
	top: 115px;
	border-radius: 5px;
	border: 1px solid #909399;
	width: 200px;
	padding: 10px;
	text-align: center;
}
.preview-node-normal {
	position: absolute;
	padding-top: 17px;
	top: 40px;
	height: 43px;
	width: 60px;
	border-radius: 50%;
	border: 3px solid #909399;
	text-align: center;
}
.preview-node-blank {
	position: absolute;
	padding-top: 17px;
	top: 40px;
	height: 43px;
	width: 60px;
	border-radius: 50%;
	border: 4px solid #E6A23C;
	text-align: center;
}
.preview-node-danger {
	position: absolute;
	padding-top: 17px;
	top: 40px;
	height: 43px;
	width: 60px;
	border-radius: 50%;
	border: 4px solid #FF7373;
	text-align: center;
}
.errormsg-fade-enter-active, .errormsg-fade-leave-active { 
  transition:all 0.5s;
}
.errormsg-fade-enter {
  opacity:0;
  transform:translateY(-10px);
}
.errormsg-fade-leave-to { 
  opacity:0;
  transform:translateY(-10px);
}
</style>