<template>
	<div class="designgraph">
		<hovermenu id="tree-hover-menu"></hovermenu>
		<span id="design-graph-headword"
			:style="{'width': String(canvasWidth-100)+'px',
				'top':'55px'}">
			<span style="color:#67C23A;font-size:35px;font-weight: 800;">
				图&nbsp;
			</span>结构设计
		</span>
		<graphcanvas class="graph-canvas-show"
			id="graph-canvas-show"
			:elementList="graphList"
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
					图&nbsp;
				</span>的数组形式表示结果
		</span>
		<el-card id="graph-result-card"
			:style="{'width': String(canvasWidth)+'px',
					'padding':'0', 'margin':'0',
					'top':String(canvasHeight+310)+'px',
					'left':'200px'}">
			<div id="card-message" v-text="holdResString" @click="sendDataCopy()"/>
		</el-card>
		<span id="graph-result-code"
			:style="{'width': String(canvasWidth)+'px',
				'top':String(canvasHeight+480)+'px'}">
				<span style="color:#67C23A;font-size:35px;font-weight: 800;">
					图&nbsp;
				</span>代码展示
		</span>
		<div id="code-view"
			:style="{'top':String(canvasHeight+550)+'px',
				'width':String(canvasWidth-30)+'px',
				'max-width':String(canvasWidth-30)+'px'
				}">
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
import graphcanvas from '../../components/graphDesign/GraphDesignCanvas.vue'
import hovermenu from '../../components/HoverMenu.vue'

import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
const durationTime=5

export default {
  name: 'graphDesignHomeView',
  components: {
	graphcanvas,
	hovermenu,
	PrismEditor
  },
  data() {
	return {
		code: '',
		holdResString: '',
		canvasHeight: 0,
		canvasWidth: 0,
		appHeight: 0,
		appWidth: 0,
		isshowCanvas: true,
		graphList: [ '1', '2', '3' ],
		codeClass: [ "code-language-active", "code-language", "code-language" ]
	}
  },
  mounted() {
	this.formCanvasSize()
  },
  methods: {
	jumpTo(focus) {
		var page = document.getElementsByClassName('main-body-show')[0];
		switch (focus) {
			case 1: page.scrollTop=0; break;
			case 2: page.scrollTop=55; break;
			case 3: page.scrollTop=this.canvasHeight+240; break;
			case 4: page.scrollTop=this.canvasHeight+480; break;
			case 5: page.scrollTop=this.canvasHeight+1000; break;
		}
	},
	highlighter(code) {
		return highlight(this.code, languages.js, "js");
	},
	formCanvasSize() {
		this.appHeight=document.documentElement.clientHeight
		this.appWidth=document.documentElement.clientWidth
		this.canvasHeight = this.appHeight-160
		this.canvasWidth = this.appWidth-450
		if (this.canvasHeight < 500) { this.canvasHeight = 500 }
		if (this.canvasWidth < 1000) { this.canvasWidth = 1000 }
	}
  }
}
</script>

<style>
.designgraph {
	width: 100%;
}
#tree-hover-menu {
	position: fixed;
	margin-top: 80px;
	margin-left: 50px;
	z-index: 10;
}
#design-graph-headword, #graph-result-word, #graph-result-code {
	position: absolute;
	font-size: 25px;
	left: 200px;
	color: #6A6A6A;
	font-family: 'Microsoft YaHei';
	user-select: none;
}
.graph-canvas-show {
	position: absolute;
	top: 150px;
	left: 200px;
	margin: 0;
	border: 2px solid #C0C4CC;
	border-radius: 15px;
}
#graph-result-card {
	position: absolute;
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
</style>