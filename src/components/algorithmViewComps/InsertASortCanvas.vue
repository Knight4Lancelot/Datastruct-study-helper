<template>
	<div>
		<div class="show-current-pointers"
			style="margin-left:10px;width: 200px;">
			<div style="font-size:25px;font-family:'Microsoft YaHei';margin-top:20px;"
				>直接插入排序</div>
			<div style="font-size:16px;font-family:'Microsoft YaHei';margin-top:20px;">
				当前指针 i 指向：</div>
			<div style="color:#409EFF;"
				v-text="pointerI===-1?'指针存放处':'数组节点 '+String(pointerI)" />
			<div style="font-size:16px;font-family:'Microsoft YaHei';margin-top:20px;">
				当前指针 i 携带值：</div>
			<div style="color:#409EFF;"
				v-text="pointerI===-1?'指针存放处':String(rankNodeList[pointerI])" />
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
		<pointer class="nodes-pointer"
			ref="pointer-i"
			:pointerText="'i'" />
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
			times: 0, // 因为实现逻辑的问题，这里需要用一个单独的变量来存取趟次
			initNodeList: [], // 存储原始的数组
			rankNodeList: [], // 存储用于排序的数组
			finalNodeList: [], // 存储最终结果的数组
			list2Comp_Map: [], // 存储演示过程中映射组件的数组
			finalList_Map: [], // 存储最终结果对应映射组件的数组
			pillarHeights: [],
			pillarLeftX: [],
			isEnded: false,
			playerCollection: {
				playAll: [],
				playOneTime: [],
				currentTime: 0
			},
			executeCollection: [] // 执行栈
		}
	},
	props: {
		nodelist: Array
	},
	mounted() {
		// 整体预填充所有数组
		var min = this.nodelist[0], max = this.nodelist[0];
		var digit_difference = 0;
		this.initNodeList = this.nodelist.concat();
		this.rankNodeList = this.nodelist.concat();
		this.finalNodeList = this.nodelist.concat();
		this.pillarHeights = this.nodelist.concat();
		for (var i = 0; i < this.nodelist.length; i++) {
			this.list2Comp_Map.push(i);
			this.finalList_Map.push(i);
			this.pillarLeftX.push(200+i*60);
			if (min>this.nodelist[i]) { min=this.nodelist[i]; }
			if (max<this.nodelist[i]) { max=this.nodelist[i]; }
		}
		// 预加载一些数据
		this.preloadFinalList();
		this.preloadPlayerCollection();
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
		this.movePointer(-1);
	},
	beforeDestroy() {
		this.clearAllTimer();
	},
	methods: {
		// 页面加载的同时，预加载得到最终排序结果与映射关系
		preloadFinalList() {
			var temp;
			for (var i = 0; i < this.finalNodeList.length-1; i++) {
				for (var j = i+1; j < this.finalNodeList.length; j++) {
					if (this.finalNodeList[i]>this.finalNodeList[j]) {
						temp = this.finalList_Map[i];
						this.finalList_Map[i] = this.finalList_Map[j];
						this.finalList_Map[j] = temp;
						temp = this.finalNodeList[i];
						this.finalNodeList[i] = this.finalNodeList[j];
						this.finalNodeList[j] = temp;
					}
				}
			}
		},
		// 页面加载的同时，预加载得到全部的演示的执行栈
		preloadPlayerCollection() {
			var i = 0, j = 0, temp, ischange = false;
			var tempList = this.rankNodeList.concat();
			var playerOneTime = [];
			this.playerCollection.playAll.push({ functionName: 'setMutex', attrs: [ true ], duration: 100 });
			for (i = this.times; i < tempList.length; i++) {
				ischange = false;
				// 添加演示所有的运行函数栈 - 外层
				this.playerCollection.playAll.push({ functionName: 'movePointer', attrs: [ i, true ], duration: 500 });
				this.playerCollection.playAll.push({ functionName: 'changeMapNodeStatus', attrs: [ i, 1 ], duration: 100 });
				// 添加演示一趟的运行函数栈 - 外层
				playerOneTime.push({ functionName: 'setMutex', attrs: [ true ], duration: 100 });
				playerOneTime.push({ functionName: 'movePointer', attrs: [ 'i', i ], duration: 500 });
				playerOneTime.push({ functionName: 'changeNodeStatus', attrs: [ i, 1 ], duration: 100 });
				for (j = i - 1; j >= 0; j--) {
					// 添加演示所有的运行函数栈 - 内层
					this.playerCollection.playAll.push({ functionName: 'movePointer', attrs: [ j, false ], duration: 500 });
					// 添加演示一趟的运行函数栈 - 内层
					playerOneTime.push({ functionName: 'movePointer', attrs: [ 'j', j], duration: 500 });
					playerOneTime.push({ functionName: 'changeNodeStatus', attrs: [ j, 1 ], duration: 100 });
					if (tempList[j+1]<tempList[j]) {
						temp = tempList[i];
						tempList[i] = tempList[j];
						tempList[j] = temp;
						// 添加演示所有的运行函数栈 - 内层if为true
						this.playerCollection.playAll.push({ functionName: 'exchange', attrs: [ j, j + 1 ], duration: 300 });
						// 添加演示一趟的运行函数栈 - 内层if为true
						playerOneTime.push({ functionName: 'exchange', attrs: [ i, j ], duration: 300 });
					} else { break; }
				}
				// 添加演示所有的运行函数栈 - 内层循环后
				this.playerCollection.playAll.push({ functionName: 'changeRawNodeStatus', attrs: [ i, 2 ], duration: 100 });
				// 添加演示一趟的运行函数栈 - 内层循环后
				playerOneTime.push({ functionName: 'changeNodeStatus', attrs: [ i, 2 ], duration: 100 });
				playerOneTime.push({ functionName: 'setMutex', attrs: [ false ], duration: 0 });
				playerOneTime.push({ functionName: 'endOnceTip', attrs: [], duration: 0 });
				this.playerCollection.playOneTime.push(playerOneTime.concat());
				while(playerOneTime.length>0) { playerOneTime.pop(); }
			}
			this.playerCollection.playOneTime.push({ functionName: 'movePointer', attrs: [ -1, true ], duration: 500 });
			this.playerCollection.playOneTime.push({ functionName: 'setMutex', attrs: [ false ], duration: 0 });
			this.playerCollection.playOneTime.push({ functionName: 'endAllTip', attrs: [], duration: 0 });
		},
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
			nodes[this.list2Comp_Map[index_1]].$el.style.left = String(this.pillarLeftX[index_1])+'px';
			nodes[this.list2Comp_Map[index_2]].$el.style.left = String(this.pillarLeftX[index_2])+'px';
		},
		movePointer(aimLocation, isChange) {
			var pI = this.$refs['pointer-i']
			if (aimLocation === -1) {
				pI.$el.style.left = '15px';
				pI.isShowCarryValue = false;
			} else {
				pI.$el.style.left = String(this.pillarLeftX[aimLocation]+5)+'px';
				pI.isShowCarryValue = true;
				if (isChange) {
					pI.carryValue = this.$refs['nodeComps'][aimLocation].showElement;
				}
			}
			this.pointerI = aimLocation;
		},
		changeMapNodeStatus(index, status) {
			this.$refs['nodeComps'][this.list2Comp_Map[index]].currentStatus=status;
		},
		changeRawNodeStatus(index, status) {
			this.$refs['nodeComps'][index].currentStatus=status;
		},
		setMutex(status) {
			this.$parent.playerMutex = status;
		},
		refreshAll() {
			this.clearAllTimer();
			while (this.rankNodeList.length>0) { this.rankNodeList.pop(); }
			this.rankNodeList = this.initNodeList.concat();
			this.$parent.playerMutex = false;
			this.isEnded = false;
			this.times = 0;
			this.pointerI = -1;
			this.movePointer(-1);
			this.refreshList2CompMap();
			for (var i = 0; i < this.rankNodeList.length; i++) {
				this.changeMapNodeStatus(i, 0);
				this.$refs['nodeComps'][this.list2Comp_Map[i]].$el.style.left = String(this.pillarLeftX[i])+'px';
			}
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
			this.movePointer(-1, false);
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
		InsertASortOneTime() {
			if (this.isEnded) {
				this.$message({
					showClose: true,
					message: '当前数组已处于完成排序状态，若有必要请刷新内容后重试',
					type: 'warning'});
				return;
			}
			if (this.times===this.rankNodeList.length) {
				this.isEnded = true;
				this.$alert('排序过程演示执行完毕！', '提示', { confirmButtonText: '确定' });
				var nodes = this.$refs['nodeComps'];
				for (i = 0; i < nodes.length; i++) {
					nodes[i].currentStatus = 2;
				}
				while(this.executeCollection.length > 0) { this.executeCollection.pop(); }
				this.pointerI = -1;
				this.movePointer(-1);
				return;
			}
			var functions = [], i, j, temp;
			i = (this.times++);
			functions.push({ functionName: 'setMutex', attrs: [ true ], duration: 100 });
			functions.push({ functionName: 'movePointer', attrs: [ i, true ], duration: 500 });
			functions.push({ functionName: 'changeMapNodeStatus', attrs: [ i, 1 ], duration: 100 });
			for (j = i - 1; j >= 0; j--) {
				functions.push({ functionName: 'movePointer', attrs: [ j, false ], duration: 500 });
				if (this.rankNodeList[j+1]<this.rankNodeList[j]) {
					temp = this.rankNodeList[j];
					this.rankNodeList[j] = this.rankNodeList[j+1];
					this.rankNodeList[j+1] = temp;
					functions.push({ functionName: 'exchange', attrs: [ j, j + 1 ], duration: 300 });
				} else { break; }
			}
			functions.push({ functionName: 'changeRawNodeStatus', attrs: [ i, 2 ], duration: 100 });
			functions.push({ functionName: 'setMutex', attrs: [ false ], duration: 0 });
			functions.push({ functionName: 'endOnceTip', attrs: [], duration: 0 });
			var flag = 0, workTime = 0;
			for (i = 0; i < functions.length; i++) {
				this.executeCollection.push(
					setTimeout(()=>{
						this.callUnit(functions[flag++]);
					}, workTime)
				);
				workTime+=functions[i].duration;
			}
		},
		InsertASortAll() {
			if (this.isEnded) {
				this.$message({
					showClose: true,
					message: '当前数组已处于完成排序状态，若有必要请刷新内容后重试',
					type: 'warning'});
				return;
			}
			if (this.times===this.rankNodeList.length) {
				this.isEnded = true;
				var nodes = this.$refs['nodeComps'];
				this.$alert('排序过程演示执行完毕！', '提示', { confirmButtonText: '确定' });
				for (i = 0; i < nodes.length; i++) {
					nodes[i].currentStatus = 2;
				}
				while(this.executeCollection.length > 0) { this.executeCollection.pop(); }
				this.pointerI = -1;
				this.movePointer(-1);
				return;
			}
			// var functions = [], i = 0, j = 0, temp;
			// functions.push({ functionName: 'setMutex', attrs: [ true ], duration: 100 });
			// for (i = this.times; i < this.rankNodeList.length; i++) {
			// 	functions.push({ functionName: 'movePointer', attrs: [ i, true ], duration: 500 });
			// 	functions.push({ functionName: 'changeMapNodeStatus', attrs: [ i, 1 ], duration: 100 });
			// 	for (j = i - 1; j >= 0; j--) {
			// 		functions.push({ functionName: 'movePointer', attrs: [ j, false ], duration: 500 });
			// 		if (this.rankNodeList[j+1]<this.rankNodeList[j]) {
			// 			temp = this.rankNodeList[j];
			// 			this.rankNodeList[j] = this.rankNodeList[j+1];
			// 			this.rankNodeList[j+1] = temp;
			// 			functions.push({ functionName: 'exchange', attrs: [ j, j + 1 ], duration: 300 });
			// 		} else { break; }
			// 	}
			// 	functions.push({ functionName: 'changeRawNodeStatus', attrs: [ i, 2 ], duration: 100 });
			// }
			// functions.push({ functionName: 'movePointer', attrs: [ -1, true ], duration: 500 });
			// functions.push({ functionName: 'setMutex', attrs: [ false ], duration: 0 });
			// functions.push({ functionName: 'endAllTip', attrs: [], duration: 0 });
			var flag = 0, workTime = 0;
			for (var i = 0; i < this.playerCollection.playAll.length; i++) {
				this.executeCollection.push(
					setTimeout(()=>{
						this.callUnit(this.playerCollection.playAll[flag++]);
					}, workTime)
				);
				workTime+=this.playerCollection.playAll[i].duration;
			}
		},
		callUnit(action) {
			/*
				设定函数执行事件：
				exchange函数交换时间：200ms
				movePointer函数移动指针时间间隔：500ms
				changeRawNodeStatus函数修改节点状态时间：100ms
				changeMapNodeStatus函数修改节点状态时间：100ms
				sleep延时函数：200ms
			*/
			switch(action.functionName) { 
				case "movePointer":
					this.movePointer(action.attrs[0], action.attrs[1]);
					break;
				case "exchange":
					this.exchange(action.attrs[0], action.attrs[1]);
					break;
				case "changeRawNodeStatus":
					this.changeRawNodeStatus(action.attrs[0], action.attrs[1]);
					break;
				case "changeMapNodeStatus":
					this.changeMapNodeStatus(action.attrs[0], action.attrs[1]);
					break;
				case "setMutex":
					this.setMutex(action.attrs[0]);
					break;
				case "endAllTip":
					this.isEnded = true;
					this.$alert('排序过程演示执行完毕！', '提示', { confirmButtonText: '确定' });
					while(this.executeCollection.length > 0) { this.executeCollection.pop(); }
					break;
				case "endOnceTip":
					this.$alert('该趟次排序过程演示执行完毕！', '提示', { confirmButtonText: '确定' });
					while(this.executeCollection.length > 0) { this.executeCollection.pop(); }
					break;
				case "sleep":
				default: break;
			}
		},
		clearAllTimer() {
			while(this.executeCollection.length > 0) {
				clearTimeout(this.executeCollection[this.executeCollection.length-1]);
				this.executeCollection.pop();
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