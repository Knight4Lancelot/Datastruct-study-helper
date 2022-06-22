// 栈模块
function Stack(){
	this.elementList=[]
	this.maxsize=2000
	this.size=0
	
	Stack.prototype.pop = function() {
		if (this.size===0) {
			console.log("this size down overflow")
			return -1
		}
		var res=this.elementList[this.size-1]
		this.elementList.pop()
		this.size-=1
		return res
	}
	Stack.prototype.push = function(e) {
		if (this.maxsize>this.maxsize) {
			console.log("this size up overflow")
			return
		}
		this.elementList.push(e)
		this.size+=1
	}
	Stack.prototype.clear = function() {
		while (this.size>0) { this.pop() }
	}
	Stack.prototype.show = function() {
		console.log(this.elementList)
	}
}

// 队列模块
function Queue(){
	this.elementList=[]
	this.maxsize=2000
	this.size=0
	
	Queue.prototype.pop = function() {
		if (this.size===0) {
			console.log("the length of Queue is 0")
			return -1
		}
		var res=this.elementList.splice(0,1)[0]
		this.size-=1
		return res
	}
	Queue.prototype.push = function(e) {
		if (this.size>this.maxsize) {
			console.log("the length of queue is max size")
			return
		}
		this.elementList.push(e)
		this.size+=1
	}
	Queue.prototype.clear = function() {
		while (this.size>0) { this.pop() }
	}
	Queue.prototype.show = function() {
		console.log(this.elementList)
	}
}

// 二叉树模块
function BinaryTreeNode(v, l, r) {
	this.val=v
	this.left=l
	this.right=r
}

function BinaryTree(list) {
	this.binarytreelist=[] // 存的是上面BinaryTreeNode节点
	// 默认执行函数
	{
		var index = 0
		var mapping=list.concat()
		for (var i = 0; i < list.length; i++) {
			if (list[i]==='nil') { 
				mapping[i]={val:list[i], mapindex:-1}
				continue
			}
			mapping[i]={val:list[i], mapindex:index}
			this.binarytreelist.push(new BinaryTreeNode(list[i], -1, -1))
			if (i!==0) {
				if (i%2===0) {
					this.binarytreelist[mapping[(i-2)/2].mapindex].right=index
				} else {
					this.binarytreelist[mapping[(i-1)/2].mapindex].left=index
				}
			}
			index+=1
		}
	}
	
	BinaryTree.prototype.show=function() { // 在控制台打印结果
		console.log(this.binarytreelist)
	}
	BinaryTree.prototype.treelist = function() { // 返回树的节点数组
		return this.binarytreelist
	}
	BinaryTree.prototype.PreOrderIndexList = function() { // 返回先序遍历的index列表
		var res = []
		return res
	}
	BinaryTree.prototype.PreOrderList = function() { // 返回先序遍历的元素列表
		var res = [], index = this.PreOrderIndexList()
		for (var i = 0; i < index.length; i++) {
			res.push(this.binarytreelist[index[i]].val)
		}
		return res
	}
	BinaryTree.prototype.PostOrderIndexList = function() { // 返回后续遍历的index列表
		var res = []
		return res
	}
	BinaryTree.prototype.PostOrderList = function() { // 返回后续遍历的元素列表
		var res = [], index = this.PostOrderIndexList()
		for (var i = 0; i < index.length; i++) {
			res.push(this.binarytreelist[index[i]].val)
		}
		return res
	}
	BinaryTree.prototype.InOrderIndexList = function() { // 返回中序遍历的index列表
		var res = []
		return res
	}
	BinaryTree.prototype.InOrderList = function() { // 返回中序遍历的元素列表
		var res = [], index = this.InOrderIndexList()
		for (var i = 0; i < index.length; i++) {
			res.push(this.binarytreelist[index[i]].val)
		}
		return res
	}
}

export {
	Stack, Queue, BinaryTreeNode, BinaryTree
}