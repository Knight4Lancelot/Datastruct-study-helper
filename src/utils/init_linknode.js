function init_linknode_code() {	
	this.cpp_init_linknode_part_1 =
		'/*\n\tC++链表程序'+
		'\n\t此程序仅供参考，并非最佳设计\n*/'+
		'\n#include<iostream>'+
		'\n#include<vector>'+
		'\n#include<windows.h> // VScode要看到输出需要加上以调用system("pause")'+
		'\nusing namespace std;'+
		'\n'+'template<class ElementType>\nstruct node {'+
		'\n\tElementType val;\n\tnode* next;\n};'+
		'\n'+'template<class ElementType>'+
		'\nclass LinkNode {'+
		'\n\tnode<ElementType>* nodes = NULL;'+
		'\n\tnode<ElementType>* reader = NULL;'+
		'\n\tint size = 0;\npublic:'+
		'\n\tLinkNode(ElementType* list, int n) {'+
		'\n\t\tthis->size = n;'+
		'\n\t\tnode<ElementType>* temp;'+
		'\n\t\tthis->nodes = new node<ElementType>;'+
		'\n\t\tthis->nodes->val = "head";'+
		'\n\t\tthis->reader = this->nodes;'+
		'\n\t\tfor (int i = 0; i < n; i++) {'+
		'\n\t\t\ttemp = new node<ElementType>;'+
		'\n\t\t\ttemp->val = list[i];'+
		'\n\t\t\ttemp->next = NULL;'+
		'\n\t\t\tthis->reader->next = temp;'+
		'\n\t\t\tthis->reader = this->reader->next;\n\t\t}'+
		'\n\t\ttemp = NULL;\n\t\tthis->reader = NULL;\n\t}'+
		'\n\tvoid show() {'+
		'\n\t\tthis->reader = this->nodes;'+
		'\n\t\twhile(this->reader != NULL) {'+
		'\n            cout << this->reader->val << endl;'+
		'\n            this->reader = this->reader->next;'+
		'\n\t\t}'+
		'\n\t\tthis->reader = NULL;'+
		'\n\t}'+
		'\n\tvoid insert(int index, ElementType val) {'+
		'\n\t\tif (this->size+1 < index) {'+
		'\n\t\t\tcout << "Index out of range!" << endl;'+
		'\n\t\t\treturn;'+
		'\n\t\t}'+
		'\n\t\tint i = -1;'+
		'\n\t\tnode<ElementType>* writer = NULL;'+
		'\n\t\tthis->reader = this->nodes;'+
		'\n\t\twhile(this->reader != NULL) {'+
		'\n\t\t\tif (i == index - 2) {'+
		'\n\t\t\t\tif (i < this->size+1) {'+
		'\n\t\t\t\t\twriter = new node<ElementType>;'+
		'\n\t\t\t\t\twriter->val = val;'+
		'\n\t\t\t\t\twriter->next = this->reader->next;'+
		'\n\t\t\t\t\tthis->reader->next = writer;'+
		'\n\t\t\t\t\tbreak;'+
		'\n\t\t\t\t} else {'+
		'\n\t\t\t\t\twriter = new node<ElementType>;'+
		'\n\t\t\t\t\twriter->val = val;'+
		'\n\t\t\t\t\twriter->next = this->reader->next;'+
		'\n\t\t\t\t\tthis->reader->next = writer;'+
		'\n\t\t\t\t}'+
		'\n\t\t\t}'+
		'\n\t\t\tthis->reader = this->reader->next;'+
		'\n\t\t\ti++;'+
		'\n\t\t}'+
		'\n\t\twriter = NULL;'+
		'\n\t\tthis->reader = NULL;'+
		'\n\t}'+
		'\n\tvoid _delete(int index) {'+
		'\n\t\tif (this->size+1 < index) {'+
		'\n\t\t\tcout << "Index out of range!" << endl;'+
		'\n\t\t\treturn;'+
		'\n\t\t}'+
		'\n\t\tint i = -1;'+
		'\n\t\tnode<ElementType>* temp = NULL;'+
		'\n\t\tthis->reader = this->nodes;'+
		'\n\t\twhile(this->reader != NULL) {'+
		'\n\t\t\tif (i == index - 2) {'+
		'\n\t\t\t\tif (i < this->size) {'+
		'\n\t\t\t\t\ttemp = this->reader->next->next;'+
		'\n\t\t\t\t\tdelete this->reader->next;'+
		'\n\t\t\t\t\tthis->reader->next = temp;'+
		'\n\t\t\t\t\tbreak;'+
		'\n\t\t\t\t} else {'+
		'\n\t\t\t\t\tdelete this->reader->next;'+
		'\n\t\t\t\t\tthis->reader->next = NULL;'+
		'\n\t\t\t\t}'+
		'\n\t\t\t}\n\t\t\tthis->reader = this->reader->next;'+
		'\n\t\t\ti++;\n\t\t}\n\t\ttemp = NULL;'+
		'\n\t\tthis->reader = NULL;\n\t}'+
		'\n\tvoid modify(int index, ElementType val) {'+
		'\n\t\tif (this->size < index) {'+
		'\n\t\t\tcout << "Index out of range!" << endl;'+
		'\n\t\t\treturn;\n\t\t}'+
		'\n\t\tint i = -1;\n\t\tthis->reader = this->nodes;'+
		'\n\t\twhile(this->reader != NULL) {'+
		'\n\t\t\tif (i == index - 1) {'+
		'\n\t\t\t\tthis->reader->val = val;'+
		'\n\t\t\t\tbreak;\n\t\t\t}'+
		'\n\t\t\tthis->reader = this->reader->next;'+
		'\n\t\t\ti++;\n\t\t}'+
		'\n\t\treader = NULL;\n\t}'+
		'\n\tElementType getByIndex(int index) {'+
		'\n\t\tif (this->size < index) {'+
		'\n\t\t\tcout << "Index out of range!" << endl;'+
		'\n\t\t\treturn "head";\n\t\t}'+
		'\n\t\tElementType res;'+
		'\n\t\tint i = -1;'+
		'\n\t\tthis->reader = this->nodes;'+
		'\n\t\twhile(i++ < index - 1) {'+
		'\n\t\t\tthis->reader = this->reader->next;\n\t\t}'+
		'\n\t\tres = this->reader->val;'+
		'\n\t\tthis->reader = NULL;\n\t\treturn res;'+
		'\n\t}\n\t~LinkNode() {'+
		'\n\t\tthis->reader = this->nodes->next;'+
		'\n\t\twhile (this->reader != NULL) {'+
		'\n\t\t\tdelete this->nodes;'+
		'\n\t\t\tthis->nodes = this->reader;'+
		'\n\t\t\tthis->reader = this->nodes->next;'+
		'\n\t\t}\n\t\tdelete this->nodes;'+
		'\n\t\tthis->nodes = NULL;'+
		'\n\t\tthis->reader = NULL;\n\t}'+
		'\n};\n/* \n\t当前定义的类型是string类型'+
		'\n\t若需要修改为其他类型请修改第26行和第121行的"head"为自己期望的头结点内容'+
		'\n\t比如int类型改为-1\n*/\nint main() {'+
		'\n\tstring list[] = { ';
	this.cpp_init_linknode_part_2 = 
		' };'+
		'\n\tLinkNode<string> linknode = LinkNode(list, sizeof(list) / sizeof(list[0]));'+
		'\n\t// linknode.insert(3, "12"); // 向第3个节点的位置前插入一个节点“12”'+
		'\n\t// linknode._delete(5); // 删除第3个节点'+
		'\n\t// linknode.modify(3, "12"); // 修改第3个节点的值为“12”'+
		'\n\t// cout << linknode.getByIndex(6) << endl; // 查询第3个节点的值\n\tlinknode.show();'+
		'\n\tsystem("pause"); // 暂停以观察输出\n\treturn 0;\n}';
	this.java_init_linknode_part_1 =
		'/*\n* Knight4Lancelot Java二叉树程序\n* 此程序仅供参考，并非最佳设计\n* */\n'+
		'import java.util.ArrayList;\n'+
		'import java.util.Arrays;\n'+
		'\n';
	this.java_init_linknode_part_2 =
		' }; // 根据结构设计得到的数组\n\t\tArrayList<String> list = new ArrayList<>(Arrays.asList(BinaryTreeNodes));\n'+
		'\t\tBinaryTree bt = new BinaryTree(list);\n'+
		'\t}\n}';
	this.python_init_linknode_part_1 = '# Knight4Lancelot Python二叉树程序\n'+
		'# 此程序仅供参考，并非最佳设计\n\n';
	this.python_init_linknode_part_2 = '';
}

export {
	init_linknode_code
}