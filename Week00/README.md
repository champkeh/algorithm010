## 数据结构分类

### 一维数据结构

- 基础：数组(array)、链表(linked list)、跳表
- 高级：栈(stack)、队列(queue)、双端队列(deque)、集合(set)、映射/散列表(map/hash)

### 二维数据结构

- 基础：树(tree)、图(graph)
- 高级：二叉搜索树(binary search tree)、堆(heap)、并查集(disjoint set)、字典树(trie)
(特点)

### 特殊数据结构

- 位运算(bitwise)、布隆过滤器(BloomFilter)
- LRU Cache


## 算法

- if-else, switch --> branch
- for, while loop --> iteration
- 递归 Recursion (Divide & Conquer, Backtrace)

> 所有的高级算法，最终都会归为if-else/for/递归这样的结构(不包括人工智能相关算法)，
> 所以算法的最终目的就是**找重复单元**

基于以上三点，下面这些高级算法：
- 递归
- 分治
- 回溯
- 搜索(Search)：深度优先搜索(Depth first search)、广度优先搜索(Breadth first search)、启发式搜索(A*)
- 贪心(Greedy)
- 二分查找(Binary Search)
- 动态规划(Dynamic Programming)
- 排序(Sorting)
- 字符串匹配
- 哈希
- 数学(Math)、几何(Geometry)

> 在头脑中回忆上面每种算法的思想和代码模板


## 切题四件套

- Clarification
- Possible solutions
  - compare (time/space)
  - optimal
- Coding
- Test cases

## 五遍刷题法

### 第一遍
- 5分钟(最多15分钟)：读题 + 思考
- 如果没有思路/做不出来：直接看解法 (注意：看多个解法，比较解法优劣)
- 背诵、默写这些好的解法

### 第二遍
- 马上自己写(不要看别人的解法，闭卷考试🐶) --> LeetCode 提交通过
- 多种解法比较、体会 --> 优化

### 第三遍
- 过了一天之后，再重复做题
- 不同解法的熟练程度 --> 专项练习

### 第四遍
- 过了一周之后，反复回来练习相同题目
- 不熟悉的题目进行专项练习

### 第五遍
- 面试前一周恢复性训练，把之前做过的题再做一遍


## 作业
- 绘制自己的知识脑图

---

## 时间复杂度分析

### Big O notation
(多项式量级)
- O(1): 常数阶
- O(log n): 对数阶
- O(n): 线性阶
- O(n * log n): 线性对数阶
- O(n^2): 平方阶
- O(n^3): 立方阶
- O(n^k): k次方阶

(非多项式量级，这种算法问题被称为NP问题)
- O(2^n): 指数阶
- O(n!): 阶乘阶

## 空间复杂度分析

- O(1): 常数阶
- O(n): 线性阶
- O(n^2): 平方阶
像`O(log n)`、`O(n * log n)`这样的对数阶复杂度平时都用不到。
