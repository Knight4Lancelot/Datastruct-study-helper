<template>
	<div>
		<div :class="nodeStatus"
			v-text="valElement"
			@mouseenter="showErrorMsg(true)"
			@mouseleave="showErrorMsg(false)"></div>
		<transition name="errormsg-fade">
			<div class="error-msg"
				v-if="isShowErrorMsg"
				v-text="123">
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
			currentStatus: 0,
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
			switch(this.currentStatus) {
				case 0: return this.normalNode;
				case 1: return this.blankNode;
				case 2: return this.dangerNode;
				default: break;
			}
			return 0;
		}
	},
	methods: {
		showErrorMsg(status) {
			this.isShowErrorMsg = status;
		}
	}
}
</script>

<style>
.error-msg {
	position: inherit;
	height: 20px;
	top: 115px;
	left: 10px;
	border-radius: 5px;
	border: 1px solid #909399;
	width: 200px;
	padding: 10px;
	text-align: left;
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
.preview-node-normal span {
	font-size: 18px;
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