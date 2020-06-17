## 1. 分析 Java 中的 HashMap

## 2. 实战题目
### 1. 有效的字母异位词
```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    // 1. 暴力 (排序 + 比较)
    // if (s === null && t === null) return true;
    // if (s === null || t === null) return false;

    // let sortedS = s.split('').sort().join();
    // let sortedT = t.split('').sort().join();

    // return sortedS === sortedT;

    // 2. hash table 记录每个字母出现的频次
    if (s === null && t === null) return true;
    if (s === null || t === null) return false;
    if (s.length !== t.length) return false;

    let arr = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        arr[s.codePointAt(i) - 97]++;
        arr[t.codePointAt(i) - 97]--;
    }

    // 判断 hash 是否全为0
    return arr.every(n => n === 0);
};
```

### 2. 字母异位词分组
```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    if (strs.length <= 0) return [];

    let hash = new Map();
    for (let i = 0; i < strs.length; i++) {
        // 1. 字母排序求 key O(n * logn)
        // let key = strs[i].split('').sort().join();

        // 2. 统计频次 O(n)
        let counter = new Array(26).fill(0);
        for (let j = 0; i < strs[i].length; j++) {
            counter[strs[i].codePointAt(j) - 97]++;
        }
        let key = temp.join('#');

        if (hash.has(key)) {
            hash.get(k).push(strs[i]);
        } else {
            hash.set(key, [strs[i]]);
        }
    }

    return [...hash.values()];
};
```


### 3. 两数之和


### 二叉树的前序遍历
```js
// 1. 递归版本
function preorderTraversal1(root) {
  if (root === null) return [];

  function helper(root, res) {
    if (root === null) return;
    res.push(root.val);
    helper(root.left, res);
    helper(root.right, res);
  }
  
  let res = [];
  helper(root, res);
  return res;
}

// 2. 迭代版本 借助辅助栈
function preorderTraversal2(root) {
  if (root === null) return [];
  
  let res = [];
  let stack = [];

  stack.push(root);
  while (stack.length > 0) {
    // 1. 节点出栈，访问节点
    let node = stack.pop();
    res.push(node.val);
    
    // 2. 右子树入栈
    if (node.right !== null) stack.push(node.right);

    // 3. 左子树入栈
    if (node.left !== null) stack.push(node.left);
  }
  return res;
}
```

### 二叉树的中序遍历
```js
// 1. 递归版本
function inorderTraversal1(root) {
  if (root === null) return [];

  function helper(root, res) {
    if (root === null) return;
    helper(root.left, res);
    res.push(root.val);
    helper(root.right, res);
  }
  let res = [];
  helper(root, res);
  return res;
}

// 2. 迭代版本
function inorderTraversal2(root) {
  if (root === null) return [];

  let res = [];
  let stack = [];

  while (root !== null || stack.length > 0) {
    // 1. 先将自己入栈，然后左孩子节点循环入栈
    while (root !== null) {
      stack.push(root);
      root = root.left;
    }

    // 2. 节点出栈，访问节点
    let node = stack.pop();
    res.push(node.val);

    // 3. 右孩子节点作为下一个待遍历的根节点
    root = node.right;
  }
}
```

### 二叉树的后序遍历
```js
// 1. 递归版本
function postOrderTraversal1(root) {
  if (root === null) return [];

  function helper(root, res) {
    if (root === null) return;
    helper(root.left, res);
    helper(root.right, res);
    res.push(root.val);
  }
  let res = [];
  helper(root, res);
  return res;
}

// 2. 迭代版本
function postOrderTraversal2(root) {
  if (root === null) return [];

  let res = [];
  let stack = [];

  stack.push(root);
  while (stack.length > 0) {
    // 1. 节点出栈，保存节点值
    let node = stack.pop();
    res.push(node.val);
    
    // 2. 左子树入栈
    if (node.left !== null) stack.push(node.left);

    // 3. 右子树入栈
    if (node.right !== null) stack.push(node.right);
  }
    
  // 倒序访问节点
  return res.reverse();
}
```
