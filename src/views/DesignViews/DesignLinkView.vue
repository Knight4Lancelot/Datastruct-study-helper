<template>
	<div class="designlink">
		<hovermenu id="link-hover-menu"></hovermenu>
		<span id="design-link-headword"
			:style="{'width': String(canvasWidth-100)+'px',
				'top':'55px'}">
			<span style="color:#67C23A;font-size:35px;font-weight: 800;">
				链表&nbsp;
			</span>结构设计
		</span>
		<linkcanvas class="link-canvas-show"
			id="link-canvas-show"
			:elementList="LinkList"
			v-if="isshowCanvas"
			ref="canvasElement"
			:style="{'overflow-y':'scroll', 'overflow-x':'scroll',
			'max-width': String(canvasWidth)+'px',
			'max-height': String(canvasHeight)+'px',
			'width': String(canvasWidth)+'px',
			'height': String(canvasHeight)+'px'}"/>
		<button class="additional-function-canvas"
			@click="adjustAim_canvas()"
			:style="{
				'top': String(canvasHeight+50)+'px',
				'left': String(canvasWidth+100)+'px'
			}">
			<i class="el-icon-aim"></i>
		</button>
		<span id="link-result-word"
			:style="{'width': String(canvasWidth)+'px',
				'top':String(canvasHeight+240)+'px'}">
				<span style="color:#67C23A;font-size:35px;font-weight: 800;">
					链表&nbsp;
				</span>的数组形式表示结果
		</span>
		<el-card id="link-result-card"
			:style="{'width': String(canvasWidth)+'px',
					'padding':'0', 'margin':'0',
					'top':String(canvasHeight+310)+'px',
					'left':'200px'}">
			<div id="card-message" v-text="holdResString" @click="sendDataCopy()"/>
		</el-card>
		<span id="link-result-code"
			:style="{'width': String(canvasWidth)+'px',
				'top':String(canvasHeight+480)+'px'}">
				<span style="color:#67C23A;font-size:35px;font-weight: 800;">
					链表&nbsp;
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
				id="code-editor"
				v-model="code"
				:highlight="highlighter"
				line-numbers
				readonly></prism-editor>
		</div>
		<button class="additional-function-code"
			@click="copy_codeEditor()"
			:style="{
				'top': String(canvasHeight+1200)+'px',
				'left': String(canvasWidth+120)+'px'
			}">
			<i class="el-icon-copy-document"></i>
		</button>
		<button class="additional-function-code"
			@click="adjustAim_codeEditor()"
			:style="{
				'top': String(canvasHeight+1260)+'px',
				'left': String(canvasWidth+120)+'px'
			}">
			<i class="el-icon-aim"></i>
		</button>
		<div id="page-bottom"
			:style="{'width': String(canvasWidth-30)+'px',
				'top':String(canvasHeight+1390)+'px'}">
			已经到页面底部了
		</div>
	</div>
</template>

<script>
import linkcanvas from '../../components/designViewComps/LinkDesignCanvas.vue';
import hovermenu from '../../components/DesignHoverMenu.vue';

import { init_linknode_code } from '../../utils/init_linknode.js';

import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

const durationTime=5;
var lc = new init_linknode_code();

export default {
  name: 'LinkDesignHomeView',
  components: {
	linkcanvas,
	hovermenu,
	PrismEditor
  },
  data() {
	return {
		language: 1,
		code: '',
		holdResString: '（对应数组共计节点数：1个）："head"',
		LinkListString: '',
		canvasHeight: 0,
		canvasWidth: 0,
		appHeight: 0,
		appWidth: 0,
		isshowCanvas: true,
		LinkList: [ 'head' ],
		codeClass: [ "code-language-active", "code-language", "code-language" ],
	}
  },
  mounted() {
	this.formCanvasSize()
	if (this.LinkList.length > 10) { this.LinkListString = '\n\t\t\t'; }
	else { this.LinkListString = ''; }
	for (var i = 0; i < this.LinkList.length; i++) {
		this.LinkListString += ('"'+((String(this.LinkList[i])==='nil')?'null':String(this.LinkList[i]))+'"');
		if (i!==this.LinkList.length-1) this.LinkListString+=',';
		else this.LinkListString+='';
		if ((i+1)%10===0) this.LinkListString+='\n\t\t\t';
	}
	this.loadCode(1);
  },
  methods: {
	adjustAim_canvas() {
		var focus = document.getElementById('link-canvas-show');
		if (focus.scrollTop===0&&focus.scrollLeft===0) {
			this.$message({
				duration: durationTime*1000,
				showClose: true,
				message: '已达到链表头节点位置',
				type: 'warning'});
			return;
		}
		focus.scrollTop = 0;
		focus.scrollLeft = 0;
	},
	adjustAim_codeEditor() {
		var focus = document.getElementById('code-editor');
		if (focus.scrollTop===0&&focus.scrollLeft===0) {
			this.$message({
				duration: durationTime*1000,
				showClose: true,
				message: '已到达代码版块的最头部位置',
				type: 'warning'});
			return;
		}
		focus.scrollTop = 0;
		focus.scrollLeft = 0;
	},
	sendDataCopy() { // 将card内容复制到粘贴板
		var that = this
		document.oncopy = function (e) {
			e.clipboardData.setData('text', that.LinkListString);
			e.preventDefault();
			document.oncopy = null;
		}
		document.execCommand('Copy');
		this.$message({
			duration: durationTime*1000,
			showClose: true,
			message: '成功复制内容  [ 链表数组形式 ]  到粘贴板',
			type: 'success'});
	},
	copy_codeEditor() {
		var that = this;
		document.oncopy = function (e) {
			e.clipboardData.setData('text', that.code);
			e.preventDefault();
			document.oncopy = null;
		}
		document.execCommand('Copy')
		this.$message({
			duration: durationTime*1000,
			showClose: true,
			message: '成功复制内容  [ 链表实现代码 ]  到粘贴板',
			type: 'success'});
	},
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
		this.appHeight=document.documentElement.clientHeight;
		this.appWidth=document.documentElement.clientWidth;
		this.canvasHeight = this.appHeight-160;
		this.canvasWidth = this.appWidth-450;
		if (this.canvasHeight < 500) { this.canvasHeight = 500; }
		if (this.canvasWidth < 1000) { this.canvasWidth = 1000; }
		this.$refs['canvasElement'].formCanvasSize();
		this.$refs['canvasElement'].setAxiosSize(this.canvasWidth, this.canvasHeight);
		this.$refs['canvasElement'].drawAxios();
	},
	changeList() {
		// 修改卡片显示字符串
		var res = this.LinkList.concat();
		if (res.length > 51) {
			while (res.length > 51) {
				res.splice(40,1);
			}
			res[40]=' ... ';
		}
		this.holdResString = '（对应数组共计节点数：'+String(this.LinkList.length)+'个）："'+
				String(res).replaceAll('nil', 'null').replaceAll(',', '", "')+'"';
		// 修改结果数组
		if (this.LinkList.length > 10)
			this.LinkListString = '\n\t\t\t';
		else
			this.LinkListString = '';
		for (var i = 0; i < this.LinkList.length; i++) {
			this.LinkListString += (
				'"'+((String(this.LinkList[i])==='nil') ? 
				'null' : String(this.LinkList[i]))+'"'
			);
			if (i!==this.LinkList.length-1) this.LinkListString+=',';
			if ((i+1)%10===0&&i!==this.LinkList.length-1) this.LinkListString+='\n\t\t\t';
		}
		if (this.LinkList.length > 10)
			this.LinkListString += '\n\t';
		// 修改代码区
		this.loadCode(this.language);
	},
	changeLanguage(index) {
		this.language = index;
		this.loadCode(index);
		switch(index) {
			default:
			case 1:
				this.codeClass = [ "code-language-active", "code-language", "code-language" ];
				break;
			case 2:
				this.codeClass = [ "code-language", "code-language-active", "code-language" ];
				break;
			case 3:
				this.codeClass = [ "code-language", "code-language", "code-language-active" ];
				break;
		}
	},
	loadCode(index) {
		switch(index) {
			default:
			case 1:
				this.code = lc.cpp_init_linknode_part_1+this.LinkListString+lc.cpp_init_linknode_part_2;
				break;
			case 2:
				this.code = lc.java_init_linknode_part_1+this.LinkListString+lc.java_init_linknode_part_2;
				break;
			case 3:
				this.code = lc.python_init_linknode_part_1+this.LinkListString+lc.python_init_linknode_part_2;
				break;
		}
	},
  }
}
</script>

<style>
.designlink {
	width: 100%;
}
#link-hover-menu {
	position: fixed;
	margin-top: 80px;
	margin-left: 50px;
	z-index: 10;
}
#design-link-headword, #link-result-word, #link-result-code {
	position: absolute;
	font-size: 25px;
	left: 200px;
	color: #6A6A6A;
	font-family: 'Microsoft YaHei';
	user-select: none;
}
.link-canvas-show {
	position: absolute;
	top: 150px;
	left: 200px;
	margin: 0;
	border: 2px solid #C0C4CC;
	border-radius: 15px;
}
#link-result-card {
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