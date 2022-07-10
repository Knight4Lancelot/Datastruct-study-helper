<template>
	<div>
		<ListInput v-if="showInputIndex"></ListInput>
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

export default {
	name: 'PopSortHomeView',
	components: {
		AlgorithmCanvas,
		HoverTips,
		ListInput
	},
	data() {
		return {
			showInputIndex: true,
			canvasWidth: 1400,
			list: [11,2,33,5,14,23]
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
.hover-tips {
	position: absolute;
	/* border: 1px solid; */
	top: 30px;
	height: 40px;
	width: 800px;
	padding-top: 20px;
}
</style>