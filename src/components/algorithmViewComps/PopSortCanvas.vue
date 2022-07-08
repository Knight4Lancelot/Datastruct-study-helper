<template>
	<div >
		<node class="nodes-comps"
			v-for="(n, k) in NodeList"
			:key="k"
			:pillarHeight="pillarHeights[k]"
			:index="0"
			:valElement="String(n)"
			:style="{'left':String(100+k*60)+'px'}"
		/>
	</div>
</template>

<script>
import node from './LinearSortNode.vue';

export default {
	name: 'PopSortCanvas',
	components: {
		node
	},
	data() {
		return {
			NodeList: [],
			pillarHeights: []
		}
	},
	props: {
		nodelist: Array
	},
	mounted() {
		var min = this.nodelist[0], max = this.nodelist[0];
		var di_min = 0, di_max = 0;
		for (var i = 0; i < this.nodelist.length; i++) {
			this.NodeList.push(this.nodelist[i]);
			this.pillarHeights.push(this.nodelist[i]);
			if (min>this.nodelist[i]) { min=this.nodelist[i]; }
			if (max<this.nodelist[i]) { max=this.nodelist[i]; }
		}
		// 条形图高度缩放法则：所有数据最大值和最小值数量级差一位以内用线性，差两位开根号，差三位开三次方
		if (min<0) {
			min = -min;
			max += (2*min);
			for (i = 0; i < this.pillarHeights.length; i++) {
				this.pillarHeights[i] += (2*min);
			}
		}
		di_min = String(min).length;
		di_max = String(max).length;
		switch(true) {
			case di_max-di_min<2: 
				for (i = 0; i < this.pillarHeights.length; i++) {
					this.pillarHeights[i] = 400*this.pillarHeights[i]/max;
				}
				break;
			case di_max-di_min<3:
				for (i = 0; i < this.pillarHeights.length; i++) {
					this.pillarHeights[i] = 400*Math.sqrt(this.pillarHeights[i]/max);
				}
				break;
			default:
				for (i = 0; i < this.pillarHeights.length; i++) {
					this.pillarHeights[i] = 400*Math.sqrt(this.pillarHeights[i]/max, 3);
				}
				break;
		}
	}
}
</script>

<style>
.nodes-comps {
	position: absolute;
	left: 700px;
	top: 40px;
	height: 460px;
	width: 60px;
}
</style>