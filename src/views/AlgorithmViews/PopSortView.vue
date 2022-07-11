<template>
	<div>
		<ListInput v-if="showInputIndex"
			ref="inputSource" />
		<HoverMenu class="linear-algorithm-hover-menu" />
		<HoverTips class="hover-tips"
			v-if="!showInputIndex"
			:style="{'left':String(canvasWidth-580)+'px'}" />
		<AlgorithmCanvas id="pop-sort-canvas"
			v-if="!showInputIndex"
			:nodelist="list"
			:style="{'width':String(canvasWidth)+'px'}" />
	</div>
</template>

<script>
import AlgorithmCanvas from '../../components/algorithmViewComps/PopSortCanvas.vue';
import HoverTips from '../../components/algorithmViewComps/HoverTips.vue';
import ListInput from '../../components/algorithmViewComps/LinearAlgorithmInput.vue';
import HoverMenu from '../../components/LinearAlgorithmHoverMenu.vue'

export default {
	name: 'PopSortHomeView',
	components: {
		AlgorithmCanvas,
		HoverTips,
		ListInput,
		HoverMenu
	},
	data() {
		return {
			showInputIndex: true,
			canvasWidth: 1400,
			list: []
		}
	},
	mounted() {
		this.formCanvasSize();
	},
	methods: {
		formCanvasSize() {
			var appWidth=document.documentElement.clientWidth;
			this.canvasWidth = appWidth-450;
			if (this.canvasWidth<1250) { this.canvasWidth=1250; }
		},
		startPopSort() {
			while(this.list.length>0) { this.list.pop(); }
			this.list = this.$refs['inputSource'].rankList.concat();
			for (var i = 0; i < this.list.length; i++) {
				this.list[i] = parseInt(this.list[i]);
			}
			this.showInputIndex = false;
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
.linear-algorithm-hover-menu {
	position: fixed;
	margin-top: 100px;
	margin-left: 50px;
	height: 300px;
	width: 50px;
}
.hover-tips {
	position: absolute;
	/* border: 1px solid; */
	top: 30px;
	height: 40px;
	width: 800px;
	padding-top: 20px;
}
</style>