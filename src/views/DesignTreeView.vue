<template>
<div class="designtree">
	<div class="design-hover-menu-control">
		<button class="design-hover-menu-button"
			@mouseover="()=>{ this.isToTop = true; }"
			@mouseleave="()=>{ this.isToTop = false; }">
			<i class="el-icon-caret-top"></i>
			<span class="hover-menu-description"
				v-if="isToTop">前往页面顶部</span>
		</button>
		<button class="design-hover-menu-button">
			<i class="el-icon-s-promotion"></i>
			<span class="hover-menu-description"
				v-if="isToDesign">前往结构设计</span>
		</button>
		<button class="design-hover-menu-button">
			<i class="el-icon-s-claim"></i>
			<span class="hover-menu-description"
				v-if="isToResult">前往数组结果显示</span>
		</button>
		<button class="design-hover-menu-button">
			<i class="el-icon-s-management"></i>
			<span class="hover-menu-description"
				v-if="isToCode">前往结构代码</span>
		</button>
		<button class="design-hover-menu-button">
			<i class="el-icon-caret-bottom"></i>
			<span class="hover-menu-description"
				v-if="isToBottom">前往页面底部</span>
		</button>
	</div>
	<span id="design-tree-headword"
		:style="{'width': String(canvasWidth-100)+'px',
				'top':'55px'}">
		<span style="color:#67C23A;font-size:35px;font-weight: 800;">
			二叉树&nbsp;
		</span>结构设计
	</span>
	<treecanvas class="tree-canvas-show"
		id="tree-canvas-show"
		v-if="isshowCanvas"
		ref="canvasElement"
		:style="{'overflow-y':'scroll', 'overflow-x':'scroll',
				'max-width': String(canvasWidth)+'px',
				'max-height': String(canvasHeight)+'px',
				'width': String(canvasWidth)+'px',
				'height': String(canvasHeight)+'px'}"/>
	<span id="tree-result-word"
		:style="{'width': String(canvasWidth)+'px',
			'top':String(canvasHeight+240)+'px'}">
			<span style="color:#67C23A;font-size:35px;font-weight: 800;">
				二叉树&nbsp;
			</span>的数组形式表示结果
	</span>
	<el-card id="tree-result-card"
		:style="{'width': String(canvasWidth)+'px',
				'padding':'0', 'margin':'0',
				'top':String(canvasHeight+310)+'px'}">
		<div id="card-message" v-text="holdResString" @click="sendDataCopy()"/>
	</el-card>
	<span id="tree-result-code"
		:style="{'width': String(canvasWidth)+'px',
			'top':String(canvasHeight+480)+'px'}">
			<span style="color:#67C23A;font-size:35px;font-weight: 800;">
				二叉树&nbsp;
			</span>代码展示
	</span>
	<div id="code-view"
		:style="{'top':String(canvasHeight+550)+'px',
			'width':String(canvasWidth-30)+'px',
			'max-width':String(canvasWidth-30)+'px'}">
		<button :class="codeClass[0]" @click="changeLanguage(1)">C++</button>
		<button :class="codeClass[1]" @click="changeLanguage(2)">Java</button>
		<button :class="codeClass[2]" @click="changeLanguage(3)">Python</button>
		<prism-editor
			class="my-editor height-200"
			v-model="code"
			:highlight="highlighter"
			line-numbers
			readonly></prism-editor>
	</div>
	<div id="page-bottom"
		:style="{'width': String(canvasWidth-30)+'px',
			'top':String(canvasHeight+1390)+'px'}">
		已经到页面底部了
	</div>
</div>
</template>

<script>
import treecanvas from '../components/treeDesign/TreeDesignCanvas.vue'
import { Queue } from '../utils/DatastructUtils.js'
import { init_tree_code } from '../utils/init_binarytree.js'

import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

const durationTime=5
var tc = new init_tree_code()

export default {
  name: 'TreeDesignHomeView',
  components: {
	treecanvas,
	PrismEditor
  },
  data() {
	return {
		codeClass: [ "code-language-active", "code-language", "code-language" ],
		code: '',
		blankNode: 'null',
		canvasleft: 0,
		canvastop: 0,
		appHeight: 0,
		appWidth: 0,
		canvasHeight: 0,
		canvasWidth: 0,
		holdResString: '（对应数组共计节点数：1个）："S"', // 被展现在结果卡片上的字符串
		TreeListString: '', // 实际处理得到的结果字符串
		TreeList: [], // 结果数组
		isshowCanvas: true,
		isToTop: false,
		isToDesign: false,
		isToResult: false,
		isToCode: false,
		isToBottom: false
	}
  },
  mounted() {
	if (this.TreeList.length > 10)
		this.TreeListString = '\n\t\t\t'
	else
		this.TreeListString = ''
	for (var i = 0; i < this.TreeList.length; i++) {
		this.TreeListString += ('"'+((String(this.TreeList[i])==='nil')?'null':String(this.TreeList[i]))+'"')
		if (i!==this.TreeList.length-1) this.TreeListString+=','
		else this.TreeListString+=''
		if ((i+1)%10===0) this.TreeListString+='\n\t\t\t'
	}
	this.loadCode(1)
	this.formCanvasSize()
  },
  computed: {
  },
  methods: {
	loadCode(index) {
		switch(index) {
			default:
			case 1:
				this.code = tc.cpp_init_tree_part1+this.TreeListString+tc.cpp_init_tree_part2
				break
			case 2:
				this.code = tc.java_init_tree_part_1+this.TreeListString+tc.java_init_tree_part_2
				break
			case 3:
				this.code = tc.python_init_tree_part_1+this.TreeListString+tc.python_init_tree_part_2
				break
		}
	},
	changeLanguage(index) {
		this.loadCode(index)
		switch(index) {
			default:
			case 1:
				this.codeClass = [ "code-language-active", "code-language", "code-language" ]
				break
			case 2:
				this.codeClass = [ "code-language", "code-language-active", "code-language" ]
				break
			case 3:
				this.codeClass = [ "code-language", "code-language", "code-language-active" ]
				break
		}
	},
	read_init_binarytree() {
		var reader = new FileReader();
		reader.readAsText('../codefiles/init_binarytree.txt', "UTF-8");
		reader.onload = function (e) {
			const val = e.target.result;
			console.log(val)
		}
	},
	highlighter(code) {
		return highlight(this.code, languages.js, "js");
	},
	sendDataCopy() { // 将card内容复制到粘贴板
		var that = this
		document.oncopy = function (e) {
			e.clipboardData.setData('text', String(that.TreeListString))
			e.preventDefault()
			document.oncopy = null
		}
		document.execCommand('Copy')
		this.$message({
			duration: durationTime*1000,
			showClose: true,
			message: '成功复制内容  [ 二叉树数组形式 ]  到粘贴板',
			type: 'success'})
	},
	formCanvasSize() {
		this.appHeight=document.documentElement.clientHeight
		this.appWidth=document.documentElement.clientWidth
		this.canvasHeight = this.appHeight-160
		this.canvasWidth = this.appWidth-450
		if (this.canvasHeight < 500) { this.canvasHeight = 500 }
		if (this.canvasWidth < 1000) { this.canvasWidth = 1000 }
		this.$refs['canvasElement'].drawEdge()
	},
	changeList() {
		// 修改卡片显示字符串
		var res = this.TreeList.concat()
		if (res.length > 51) {
			while (res.length > 51) {
				res.splice(40,1)
			}
			res[40]=' ... '
		}
		this.holdResString = '（对应数组共计节点数：'+String(this.TreeList.length)+'个）："'+
				String(res).replaceAll('nil', 'null').replaceAll(',', '", "')+'"'
		// 修改结果数组
		this.TreeListString = ''
		for (var i = 0; i < this.TreeList.length; i++) {
			this.TreeListString += (
				'"'+((String(this.TreeList[i])==='nil') ? 
				'null' : String(this.TreeList[i]))+'"'
			);
			if (i!==this.TreeList.length-1) this.TreeListString+=','
			if ((i+1)%10===0) this.TreeListString+='\n\t\t\t';
		}
		// 修改代码区
		this.loadCode(1);
		this.isShowCode=false;
		this.$nextTick(() => {
			this.isShowCode=true;
		})
	}
  }
}
</script>

<style>
.designtree {
	width: 100%;
}
.design-hover-menu-control {
	position: fixed;
	top: 150px;
	left: 120px;
	width: 30px;
	user-select: none;
}
.design-hover-menu-button {
	transition: 0.3s;
	position: relative;
	cursor: pointer;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 2px solid #C0C4CC;
	/* border: 2px solid #ffffff; */
	background-color: #ffffff;
	margin: 5px;
}
.design-hover-menu-button:hover {
	transition: 0.3s;
	width: 80px;
	height: 80px;
	/* border: 2px solid #C0C4CC; */
	border-bottom-left-radius:50px;
	border-top-left-radius:50px;
	border-bottom-right-radius:50px;
    border-top-right-radius:50px;
	width: 300px;
}
.design-hover-menu-button i {
	transition: 0.4s;
	font-size: 20px;
	color: #6A6A6A;
}
.design-hover-menu-button:hover i {
	transition: 0.4s;
	font-size: 30px;
	color: #62AFFF;
}
#design-tree-headword, #tree-result-word, #tree-result-code {
	position: absolute;
	left: 200px;
	font-size: 25px;
	color: #6A6A6A;
	font-family: 'Microsoft YaHei';
	user-select: none;
}
#tree-result-card {
	position: absolute;
	left: 200px;
	background-color: #F2F6FC;
	font-family: 'Microsoft YaHei';
}
#card-message {
	transition: 0.5s;
	cursor: pointer;
	position: relative;
	font-size: 18px;
	padding: 20px;
	width: 95%;
	height: 100%;
}
#card-message:hover {
	transition: 0.3s;
	font-size: 19px;
}
#code-view {
	position: absolute;
	left: 200px;
	height: 720px;
}
#page-bottom {
	text-align: center;
	position: absolute;
	left: 8%;
	height: 50px;
	font-size: 20px;
	font-family: 'Microsoft YaHei';
	background-color: #FDD18F;
}
.code-language {
	transition: 0.3s;
	cursor: pointer;
	border: 0;
	/* background: #2d2d2d; */
	color: black;
	font-size: 16px;
	border-radius: 10px;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	padding-top: 8px;
	padding-bottom: 4px;
	padding-left: 15px;
	padding-right: 15px;
	margin-right: 3px;
}
.code-language-active {
	transition: 0.3s;
	cursor: pointer;
	border: 0;
	background: #2d2d2d;
	color: white;
	font-size: 16px;
	border-radius: 10px;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	padding-top: 8px;
	padding-bottom: 4px;
	padding-left: 15px;
	padding-right: 15px;
	margin-right: 3px;
}
.my-editor {
	background: #2d2d2d;
	color: #ccc;
	font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
	font-size: 18px;
	line-height: 1.5;
	padding: 15px;
	border-radius: 10px;
	border-top-left-radius: 0;
}
.designtree {
	width: 100%;
	height: 100%;
	position: absolute;
}
.tree-canvas-show {
	position: absolute;
	top: 150px;
	left: 200px;
	margin: 0;
	border: 2px solid #C0C4CC;
	border-radius: 15px;
}
</style>
