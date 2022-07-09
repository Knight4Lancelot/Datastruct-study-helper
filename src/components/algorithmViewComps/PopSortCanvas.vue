<template>
	<div >
		<node class="nodes-comps"
			v-for="(n, k) in rankNodeList"
			ref="nodeComps"
			:key="k"
			:pillarHeight="pillarHeights[k]"
			:index="0"
			:valElement="String(n)"
			:style="{'left':String(pillarLeftX[k])+'px'}"
		/>
		<button @click="popSort()">开始冒泡排序</button>
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
			rawNodeList: [],
			rankNodeList: [],
			pillarHeights: [],
			pillarLeftX: []
		}
	},
	props: {
		nodelist: Array
	},
	mounted() {
		var min = this.nodelist[0], max = this.nodelist[0];
		var di_min = 0, di_max = 0;
		for (var i = 0; i < this.nodelist.length; i++) {
			this.rawNodeList.push(this.nodelist[i]);
			this.rankNodeList.push(this.nodelist[i]);
			this.pillarHeights.push(this.nodelist[i]);
			this.pillarLeftX.push(100+i*60);
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
	},
	methods: {
		exchange(index_1, index_2) {
			console.log(index_1, index_2);
			var nodes = this.$refs['nodeComps']
			var temp = this.pillarLeftX[index_1]
			this.pillarLeftX[index_1] = this.pillarLeftX[index_2]
			this.pillarLeftX[index_2] = temp
			temp = this.rankNodeList[index_1]
			this.rankNodeList[index_1] = this.rankNodeList[index_2]
			this.rankNodeList[index_2] = temp
			nodes[index_1].$el.style.left = String(this.pillarLeftX[index_1])+'px'
			nodes[index_2].$el.style.left = String(this.pillarLeftX[index_2])+'px'
		},
		popSort() {
			for (var i = 0; i < this.rankNodeList.length; i++) {
				for (var j = i+1; j < this.rankNodeList.length; j++) {
					if (this.rankNodeList[i]>this.rankNodeList[j]) {
						// alert('1--', i, j)
						this.exchange(i, j)
					}
				}
				console.log(this.rankNodeList)
				setTimeout(()=>{}, 10000);
			}
		}
	}
}
</script>

<style>
.nodes-comps {
	transition: 0.2s;
	position: absolute;
	left: 700px;
	top: 40px;
	height: 460px;
	width: 60px;
}
</style>