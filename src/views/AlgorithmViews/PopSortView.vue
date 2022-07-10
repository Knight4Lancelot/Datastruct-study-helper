<template>
	<div>
		<HoverTips class="hover-tips"
			:style="{'left':String(canvasWidth-700)+'px'}" />
		<AlgorithmCanvas id="pop-sort-canvas"
			:nodelist="list"
			:style="{'width':String(canvasWidth)+'px'}" />
	</div>
</template>

<script>
import AlgorithmCanvas from '../../components/algorithmViewComps/PopSortCanvas.vue'
import HoverTips from '../../components/algorithmViewComps/HoverTips.vue'

export default {
	name: 'PopSortHomeView',
	components: {
		AlgorithmCanvas,
		HoverTips
	},
	data() {
		return {
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
			this.canvasWidth = appWidth-400;
			if (this.canvasWidth<1400) { this.canvasWidth=1400; }
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
	left: 100px;
	height: 720px;
	
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