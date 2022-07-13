<template>
	<div>
		<div class="show-current-pointers"
			style="margin-left:10px;width: 200px;">
			<div style="font-size:16px;font-family:'Microsoft YaHei';margin-top:20px;">
				当前指针 i 指向：</div>
			<div style="color:#409EFF;"
				v-text="pointerI===-1?'指针存放处':'数组节点 '+String(pointerI)" />
			<div style="font-size:16px;font-family:'Microsoft YaHei';margin-top:10px;">
				当前指针 j 指向：</div>
			<div style="color:#409EFF;"
				v-text="pointerJ===-1?'指针存放处':'数组节点 '+String(pointerJ)" />
			<div style="font-size:16px;font-family:'Microsoft YaHei';margin-top:10px;">
				比较结果：</div>
			<div style="color:#409EFF;"
				v-text="comparePointer_I_J" />
		</div>
		<node class="nodes-comps"
			v-for="(n, k) in rankNodeList"
			ref="nodeComps"
			:key="k"
			:pillarHeight="pillarHeights[k]"
			:nodeStatus="0"
			:initStatus="0"
			:valElement="String(n)"
			:style="{'left':String(pillarLeftX[k])+'px'}"/>
		<node class="nodes-comps"
			:initStatus="3"
			:valElement="'指针i'"
			:style="{'left':String(10)+'px'}"/>
		<node class="nodes-comps"
			:initStatus="3"
			:valElement="'指针j'"
			:style="{'left':String(70)+'px'}"/>
		<pointer class="nodes-pointer"
			ref="pointer-i"
			:pointerText="'i'" />
		<pointer class="nodes-pointer"
			ref="pointer-j"
			:pointerText="'j'" />
	</div>
</template>

<script>
import node from './LinearNode.vue';
import pointer from './LinearPointer.vue';

const exchangeDuration = 0.5;

export default {
	name: 'PopSortCanvas',
	components: {
		node,
		pointer
	},
	data() {
		return {
			pointerI: -1,
			pointerJ: -1,
			initNodeList: [],
			rankNodeList: [],
			pillarHeights: [],
			pillarLeftX: [],
			list2Comp_Map: [],
			isEnded: false,
			Timers: []
		}
	},
	props: {
		nodelist: Array
	},
	mounted() {
		var min = this.nodelist[0], max = this.nodelist[0];
		var digit_difference = 0;
		for (var i = 0; i < this.nodelist.length; i++) {
			this.list2Comp_Map.push(i);
			this.initNodeList.push(this.nodelist[i]);
			this.rankNodeList.push(this.nodelist[i]);
			this.pillarHeights.push(this.nodelist[i]);
			this.pillarLeftX.push(200+i*60);
			if (min>this.nodelist[i]) { min=this.nodelist[i]; }
			if (max<this.nodelist[i]) { max=this.nodelist[i]; }
		}
		// 条形图高度缩放法则：所有数据最大值和最小值数量级差一位以内用线性，差两位开根号，差三位开三次方
		if (min<0) {
			max -= (2*min);
			for (i = 0; i < this.pillarHeights.length; i++) {
				this.pillarHeights[i] -= (2*min);
			}
			min =- min;
		}
		digit_difference = String(max-min).length;
		switch(true) {
			case digit_difference<2:
				for (i = 0; i < this.pillarHeights.length; i++) {
					this.pillarHeights[i] = 500*this.pillarHeights[i]/max;
				}
				break;
			case digit_difference>=2:
				for (i = 0; i < this.pillarHeights.length; i++) {
					this.pillarHeights[i] = 500*Math.sqrt(this.pillarHeights[i]/max, digit_difference);
				}
				break;
			default: break;
		}
		this.movePointer('i', -1);
		this.movePointer('j', -1);
	},
	beforeDestroy() {
		this.clearAllTimer();
	},
	computed: {
		comparePointer_I_J() {
			switch(true) {
				case this.pointerI===-1&&this.pointerJ===-1:
					return '均在指针存放处'
				case this.pointerI===-1&&this.pointerJ!==-1:
				case this.pointerI!==-1&&this.pointerJ===-1:
					return '当前无法比较'
				default:
					return this.rankNodeList[this.pointerI]>this.rankNodeList[this.pointerJ]?
						'节点 i > 节点 j' : '节点 i < 节点 j';
			}
		}
	},
	methods: {
		refreshList2CompMap() {
			while (this.list2Comp_Map.length>0) { this.list2Comp_Map.pop(); }
			for (var i = 0; i < this.initNodeList.length; i++) {
				this.list2Comp_Map.push(i);
			}
		},
		exchange(index_1, index_2) {
			var nodes = this.$refs['nodeComps'];
			var temp = this.list2Comp_Map[index_1];
			this.list2Comp_Map[index_1] = this.list2Comp_Map[index_2];
			this.list2Comp_Map[index_2] = temp;
			temp = this.rankNodeList[index_1];
			this.rankNodeList[index_1] = this.rankNodeList[index_2];
			this.rankNodeList[index_2] = temp;
			nodes[this.list2Comp_Map[index_1]].$el.style.left = String(this.pillarLeftX[index_1])+'px';
			nodes[this.list2Comp_Map[index_2]].$el.style.left = String(this.pillarLeftX[index_2])+'px';
		},
		movePointer(name, aimLocation) {
			if (name==='i') {
				if (aimLocation === -1) { this.$refs['pointer-i'].$el.style.left = '15px'; }
				else { this.$refs['pointer-i'].$el.style.left = String(this.pillarLeftX[aimLocation]+5)+'px'; }
				this.pointerI = aimLocation;
			} else {
				if (aimLocation === -1) { this.$refs['pointer-j'].$el.style.left = '75px'; }
				else { this.$refs['pointer-j'].$el.style.left = String(this.pillarLeftX[aimLocation]+5)+'px'; }
				this.pointerJ = aimLocation;
			}
		},
		changeNodeStatus(index, status) {
			this.$refs['nodeComps'][this.list2Comp_Map[index]].currentStatus=status;
		},
		setMutex(status) {
			this.$parent.playerMutex = status;
		},
		showFinalList() {
			if (this.isEnded) {
				this.$message({
					showClose: true,
					message: '当前数组已处于完成排序状态，若有必要请刷新内容后重试',
					type: 'warning'});
				return;
			}
			if (this.$parent.playerMutex) {
				this.clearAllTimer();
				this.$parent.playerMutex=false;
			}
			var temp, i, j;
			var nodes = this.$refs['nodeComps'];
			this.movePointer('i', -1);
			this.movePointer('j', -1);
			for (i = 0; i < nodes.length; i++) {
				nodes[i].currentStatus = 2;
			}
			for (i = 0; i < this.rankNodeList.length-1; i++) {
				for (j = i+1; j < this.rankNodeList.length; j++) {
					if (this.rankNodeList[i]>this.rankNodeList[j]) {
						temp = this.list2Comp_Map[i];
						this.list2Comp_Map[i] = this.list2Comp_Map[j];
						this.list2Comp_Map[j] = temp;
						temp = this.rankNodeList[i];
						this.rankNodeList[i] = this.rankNodeList[j];
						this.rankNodeList[j] = temp;
					}
				}
			}
			for (i = 0; i < this.rankNodeList.length; i++) {
				nodes[this.list2Comp_Map[i]].$el.style.left = String(this.pillarLeftX[i])+'px';
			}
			this.isEnded = true;
		},
		popSortOneTime() {
			if (this.isEnded) {
				this.$message({
					showClose: true,
					message: '当前数组已处于完成排序状态，若有必要请刷新内容后重试',
					type: 'warning'});
				return;
			}
			var functions = [], i, j;
			if (this.pointerI===this.rankNodeList.length - 2) {
				this.isEnded = true;
				this.$alert('排序过程演示执行完毕！', '提示', { confirmButtonText: '确定' });
				while(this.Timers.length > 0) { this.Timers.pop(); }
				this.pointerI = -1;
				this.pointerJ = -1;
			}
			i = (this.pointerI++)+1;
			this.pointerJ = this.pointerI + 1;
			functions.push({ functionName: 'movePointer', attrs: [ 'i', i ], duration: 500 });
			functions.push({ functionName: 'changeNodeStatus', attrs: [ i, 1 ], duration: 100 });
			for (j = this.pointerJ; j < this.rankNodeList.length; j++) {
				functions.push({ functionName: 'movePointer', attrs: [ 'j', j], duration: 500 });
				functions.push({ functionName: 'changeNodeStatus', attrs: [ j, 1 ], duration: 100 });
				if (this.rankNodeList[i]>this.rankNodeList[j]) {
					functions.push({ functionName: 'exchange', attrs: [ i, j ], duration: 300 });
				} else {
					functions.push({ functionName: 'sleep', attrs: [], duration: 300 });
				}
				functions.push({ functionName: 'changeNodeStatus', attrs: [ j, 0 ], duration: 100 });
			}
			functions.push({ functionName: 'changeNodeStatus', attrs: [ i, 2 ], duration: 100 });
			
			var flag = 0, workTime = 0;
			for (i = 0; i < functions.length; i++) {
				this.Timers.push(
					setTimeout(()=>{
						this.callUnit(functions[flag++]);
					}, workTime)
				);
				workTime+=functions[i].duration;
			}
		},
		popSortAll() {
			if (this.isEnded) {
				this.$message({
					showClose: true,
					message: '当前数组已处于完成排序状态，若有必要请刷新内容后重试',
					type: 'warning'});
				return;
			}
			var functions = [], i = 0, j = 0;
			functions.push({ functionName: 'setMutex', attrs: [ true ], duration: 100 });
			for (i = 0; i < this.rankNodeList.length-1; i++) {
				functions.push({ functionName: 'movePointer', attrs: [ 'i', i ], duration: 500 });
				functions.push({ functionName: 'changeNodeStatus', attrs: [ i, 1 ], duration: 100 });
				for (j = i+1; j < this.rankNodeList.length; j++) {
					functions.push({ functionName: 'movePointer', attrs: [ 'j', j], duration: 500 });
					functions.push({ functionName: 'changeNodeStatus', attrs: [ j, 1 ], duration: 100 });
					if (this.rankNodeList[i]>this.rankNodeList[j]) {
						functions.push({ functionName: 'exchange', attrs: [ i, j ], duration: 300 });
					} else {
						functions.push({ functionName: 'sleep', attrs: [], duration: 300 });
					}
					functions.push({ functionName: 'changeNodeStatus', attrs: [ j, 0 ], duration: 100 });
				}
				functions.push({ functionName: 'changeNodeStatus', attrs: [ i, 2 ], duration: 100 });
			}
			functions.push({ functionName: 'movePointer', attrs: [ 'i', -1 ], duration: 500 });
			functions.push({ functionName: 'movePointer', attrs: [ 'j', -1 ], duration: 0 });
			functions.push({ functionName: 'changeNodeStatus', attrs: [ i, 2 ], duration: 100 });
			functions.push({ functionName: 'setMutex', attrs: [ false ], duration: 0 });
			functions.push({ functionName: 'endTip', attrs: [], duration: 0 });
			var flag = 0, workTime = 0;
			for (i = 0; i < functions.length; i++) {
				this.Timers.push(
					setTimeout(()=>{
						this.callUnit(functions[flag++]);
					}, workTime)
				);
				workTime+=functions[i].duration;
			}
		},
		callUnit(action) {
			/*
				设定函数执行事件：
				exchange函数交换时间：200ms
				movePointer函数移动指针时间间隔：500ms
				changeNodeStatus函数修改节点状态时间：100ms
				sleep延时函数：200ms
			*/
			switch(action.functionName) {
				case "movePointer":
					this.movePointer(action.attrs[0], action.attrs[1]);
					break;
				case "exchange":
					this.exchange(action.attrs[0], action.attrs[1]);
					break;
				case "changeNodeStatus":
					this.changeNodeStatus(action.attrs[0], action.attrs[1]);
					break;
				case "setMutex":
					this.setMutex(action.attrs[0]);
					break;
				case "endTip":
					this.isEnded = true;
					this.$alert('排序过程演示执行完毕！', '提示', { confirmButtonText: '确定' });
					while(this.Timers.length > 0) { this.Timers.pop(); }
					break;
				case "sleep":
				default: break;
			}
		},
		clearAllTimer() {
			while(this.Timers.length > 0) {
				clearTimeout(this.Timers[this.Timers.length-1]);
				this.Timers.pop();
			}
		}
	}
}
</script>

<style>
.nodes-comps {
	transition: 0.5s;
	position: absolute;
	top: 50px;
	height: 560px;
	width: 60px;
}
.nodes-pointer {
	transition: 0.5s;
	position: absolute;
	width: 60px;
	top: 620px;
}
</style>