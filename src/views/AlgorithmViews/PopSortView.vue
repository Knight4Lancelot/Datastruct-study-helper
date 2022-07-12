<template>
	<div>
		<ListInput v-if="showInputIndex"
			ref="inputSource" />
		<div class="show-helper-cover-layer"
			v-if="showHelper"/>
		<HoverMenu class="linear-algorithm-hover-menu"
			v-if="!showInputIndex"/>
		<HoverTips class="top-tips"
			v-if="!showInputIndex"
			:style="{'left':String(canvasWidth-580)+'px'}" />
		<AlgorithmCanvas id="pop-sort-canvas"
			ref="showPlayer"
			v-if="!showInputIndex"
			:nodelist="list"
			:style="{'width':String(canvasWidth)+'px'}" />
		<transition name="introduction-fade">
			<FunctionHelper class="function-introduction"
				v-if="showHelper"
				:style="{'left':String((appWidth-1000)/2-40)+'px',
					'top':String((appHeight-500)/2-50)+'px'}"/>
		</transition>
	</div>
</template>

<script>
import AlgorithmCanvas from '../../components/algorithmViewComps/PopSortCanvas.vue';
import HoverTips from '../../components/algorithmViewComps/HoverTips.vue';
import ListInput from '../../components/algorithmViewComps/LinearAlgorithmInput.vue';
import HoverMenu from '../../components/LinearAlgorithmHoverMenu.vue';
import FunctionHelper from '../../components/FunctionHelper.vue';

export default {
	name: 'PopSortHomeView',
	components: {
		AlgorithmCanvas,
		HoverTips,
		ListInput,
		HoverMenu,
		FunctionHelper
	},
	data() {
		return {
			appHeight: 0,
			appWidth: 0,
			showInputIndex: true,
			showHelper: false,
			canvasWidth: 1400,
			list: []
		}
	},
	mounted() {
		this.formCanvasSize();
	},
	methods: {
		formCanvasSize() {
			this.appWidth=document.documentElement.clientWidth;
			this.appHeight=document.documentElement.clientHeight;
			this.canvasWidth = this.appWidth-450;
			if (this.canvasWidth<1250) { this.canvasWidth=1250; }
		},
		openPopSort() {
			while(this.list.length>0) { this.list.pop(); }
			this.list = this.$refs['inputSource'].rankList.concat();
			for (var i = 0; i < this.list.length; i++) {
				this.list[i] = parseInt(this.list[i]);
			}
			this.showInputIndex = false;
		},
		playPopSortAll() {
			this.$refs['showPlayer'].popSortAll();
		},
		changeHelperStatus(status) {
			this.showHelper = status;
			this.$parent.isHideScrollY(!status);
		}
	}
}
</script>

<style>
#pop-sort-canvas {
	position: absolute;
	border: 1px solid #C0C4CC;
	border-radius: 10px;
	top: 100px;
	left: 200px;
	height: 750px;
}
.show-helper-cover-layer {
	position: absolute;
	z-index: 2;
	width: 100%;
	height: 110%;
	background-color: #909399;
	opacity: 0.35;
}
.function-introduction {
	position: absolute;
	z-index: 5;
}
.linear-algorithm-hover-menu {
	position: fixed;
	z-index: 10;
	margin-top: 100px;
	margin-left: 50px;
	height: 300px;
	width: 50px;
}
.top-tips {
	position: absolute;
	/* border: 1px solid; */
	top: 30px;
	height: 40px;
	width: 800px;
	padding-top: 20px;
}
.introduction-fade-enter-active, .introduction-fade-leave-active { 
  transition:all 1s;
}
.introduction-fade-enter {
  opacity:0;
  transform:translateY(-700px);
}
.introduction-fade-leave-to { 
  opacity:0;
  transform:translateY(-700px);
}
</style>