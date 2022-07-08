<template>
	<div class='graph-canvas-component'>
		<div class="canvas-graph-node">
			<graphnode
				ref="graphnodeElement"
				v-for="(stn, k) in nodeArray"
				:key="k"
				:index="stn.mapIndex"
				class="graph-node-list"
				:valElement="stn.val">
			</graphnode>
		</div>
		<canvas id="canvas-graph-edge"/>
		<canvas id="canvas-x-y-axios"/>
	</div>
</template>

<script>
import graphnode from './GraphDesignNode.vue'

export default {
  name: 'graphCanvas',
  components: {
	graphnode
  },
  data() {
	return {
		canvasEdge: null,
		canvasAxios: null,
		canvasHeight: 0,
		canvasWidth: 0,
		nodecount: 0,
		nodeArray: [  ]
	}
  },
  mounted() {
	this.formCanvasSize();
	setTimeout(()=>{ this.drawAxios(); }, 100);
  },
  methods: {
	formCanvasSize() {
		if (this.canvasWidth<1050) this.canvasWidth=1050;
		if (this.canvasHeight<600) this.canvasHeight=600;
	},
	drawAxios() {
		this.canvasAxios = document.getElementById("canvas-x-y-axios");
		var ctx = this.canvasAxios.getContext("2d");
		
		this.canvasAxios.height = this.canvasHeight;
		this.canvasAxios.width = this.canvasWidth;
		
		ctx.lineWidth=1;
		ctx.setLineDash([4]); // 设置虚线
		ctx.strokeStyle = "#ccc";
		var girdSize = 50; // 网格宽度
		var xLineTotals = Math.ceil(this.canvasAxios.height / girdSize)+1;
		for (var i = 0; i < xLineTotals; i++) {
			// ctx.beginPath();
			ctx.moveTo(0, girdSize * i - 0.5);
			ctx.lineTo(this.canvasAxios.width, girdSize * i - 0.5);
			ctx.stroke();
		}
		var yLineTotals = Math.ceil(this.canvasAxios.width / girdSize)+1;
		for (var j = 0; j < yLineTotals; j++) {
			// ctx.beginPath();
			ctx.moveTo(girdSize * j, 0);
			ctx.lineTo(girdSize * j, this.canvasAxios.height);
			ctx.stroke();
		}
	},
  }
}
</script>

<style>
.graph-canvas-component {
	margin: 5%;
	width: 90%;
	height: 100%;
	overflow: hidden;
}
</style>