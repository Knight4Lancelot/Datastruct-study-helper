function init_tree_code() {
	
	this.cpp_init_tree_part1 =
		'/*\n\tC++二叉树程序\n\t此程序仅供参考，并非最佳设计\n*/\n'+
		'#include<iostream>\n'+
		'#include<vector>\n'+
		'#include<windows.h> // VScode要看到输出需要加上以调用system("pause")\n'+
		'using namespace std;\n\n'+
		'template<class ElementType>\n'+
		'struct node {\n'+
		'\tElementType val;\n'+
		'\tint leftChild = -1;\n'+
		'\tint rightChild = -1;\n'+
		'};\n\n'+
		'template<class ElementType>\n'+
		'class BinaryTree {\n'+
		'\tvector<node<ElementType>> treeNodes;\n'+
		'\tint nodeCount = 0;\n'+
		'public:\n'+
		'\tBinaryTree() { }\n'+
		'\tBinaryTree(vector<ElementType> list) {\n'+
		'\t\tnode<ElementType> t;\n'+
		'\t\tvector<int> indexMap(list.size(), -1);\n'+
		'\t\tint index = 0;\n'+
		'\t\tfor (int i = 0; i < list.size(); i++) {\n'+
		'\t\t\tif (list[i].compare("null")) {\n'+
		'\t\t\t\tindexMap[i] = index++;\n'+
		'\t\t\t}\n'+
		'\t\t}\n'+
		'\t\tfor (int i = 0; i < list.size(); i++) {\n'+
		'\t\t\tif (list[i].compare("null")) {\n'+
		'\t\t\t\tt.val = list[i];\n'+
		'\t\t\t\tif (2*i+1<list.size() && list[2*i+1].compare("null")) t.leftChild=indexMap[2*i+1];\n'+
		'\t\t\t\telse t.leftChild=-1;\n'+
		'\t\t\t\tif (2*i+2<list.size() && list[2*i+2].compare("null")) t.rightChild=indexMap[2*i+2];\n'+
		'\t\t\t\telse t.rightChild=-1;\n'+
		'\t\t\t\tthis->treeNodes.push_back(t);\n'+
		'\t\t\t}\n'+
		'\t\t}\n'+
		'\t\tthis->nodeCount = this->treeNodes.size();\n'+
		'\t\tthis->show();\n'+
		'\t}\n'+
		'\t/* 遍历展示二叉树的节点内容 */\n'+
		'\tvoid show() {\n'+
		'\t\tfor (int i = 0; i < this->nodeCount; i++) {\n'+
		'\t\t\tcout << "节点元素: " << this->treeNodes[i].val\n'+
		'\t\t\t\t<< ",\\t左节点元素: " << this->treeNodes[i].leftChild\n'+
		'\t\t\t\t<< ",\\t右节点元素: " << this->treeNodes[i].rightChild\n'+
		'\t\t\t\t<< endl;\n'+
		'\t\t}\n'+
		'\t}\n'+
		'};\n'+
		'\n'+
		'int main() {\n'+
		'\tstring TreeNodeList[] = {'
		// '"0","2","-4","null","22","1","10","null","null","null","null","null","9","6"'+
		this.cpp_init_tree_part2 = 
		'}; // 根据结构设计得到的数组\n'+
		'\tvector<string> v(TreeNodeList, TreeNodeList+sizeof(TreeNodeList)/sizeof(TreeNodeList[0]));\n'+
		'\tBinaryTree bt = BinaryTree(v);\n'+
		'\tsystem("pause"); // 暂停以观察输出\n'+
		'\treturn 0;\n'+
		'}'
}

export {
	init_tree_code
}