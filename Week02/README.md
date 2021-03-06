## 哈希表/散列表(Hash Table)

> 散列思想：<br/>
> 散列表利用的是数组支持以 O(1) 复杂度通过下标随机访问数据的特性，所以散列表其实就是数组的一种扩展，由数组演化而来。<br/>
> 可以说，如果没有数组，就没有散列表。<br/>
> 散列表支持插入、删除、查找<br/>

![hash table](assets/hash-table.jpg)

我们通过散列函数把元素的键值(key)映射为数组的下标，然后将该数据存储在数组的对应下标的位置。
当我们按照键值查询元素的时候，我们用同样的散列函数，将键值转化为数组下标，然后从数组中对应的下标位置取数据。
因此，时间复杂度为 O(1)。

### 散列函数
> 散列值 = hash(key)

散列函数设计的基本要求：
1. 散列函数计算得到的散列值是一个非负整数；(因为散列值要作为数组下标)
2. 如果 key1 == key2，那 hash(key1) == hash(key2)；
3. 如果 key1 != key2, 那 hash(key1) != hash(key2)。(散列冲突无法完全避免)

### 散列冲突
解决散列冲突的方法有2类：开放寻址法(open addressing)和链表法(chaining)。

1.开放寻址法

如果出现了散列冲突，我们就重新探测一个空闲位置，将数据插入。

![open address](assets/open-address.jpg)

- 优点
  - 数据全部存储在数组中，可以利用 CPU 缓存加快查询速度
  - 容易序列化
- 缺点
  - 删除数据时需要特殊标记，比较麻烦
  - 冲突的代价比较大，只适合数据量小、装载因子小的情况

#### 探测策略有以下几种
- 线性探测
  - 每次探测的步长是1，探测的下标序列为 hash(key)+0, hash(key)+1, hash(key)+2, hash(key)+3, ...
- 二次探测
  - 探测的下标序列为 hash(key)+0, hash(key)+1^2, hash(key)+2^2, hash(key)+3^2, ...
- 双重散列
  - 使用一组散列函数 hash1(key), hash2(key), hash3(key)
  - 先使用第一个散列函数，如果计算得到的下标位置已经被占用，再用第二个散列函数，以此类推，直到找到空闲位置。

> 不管采用哪种探测方法，当散列表中空闲位置不多的时候，散列冲突的概率就会大大提高。<br/>
> 为了尽可能保证散列表的操作效率，一般情况下，我们会尽可能保证散列表中有一定比例的空闲槽位。<br/>
> 我们称之为**装载因子**(load factor)，用来表示空位的多少。<br/>
> 计算公式：<br/>
> 散列表的装载因子 = 填入表中的元素个数 / 散列表的长度<br/>
> 装载因子越大，说明空闲位置越少，冲突越多，散列表的性能会下降。


2.链表法

![linked list hash table](assets/linkedList.jpg)

链表法相对开放寻址法简单很多。在散列表中，每个“桶(bucket)”或“槽(slot)”会对应一条链表，所有散列值相同的元素，
我们都放在相同槽位对应的链表中。

时间复杂度分析：
对于插入来说，查找散列槽位为 O(1)，插入槽位对应链表为 O(1)，所以总的时间复杂度为 O(1)<br/>
对于查找和删除，查询散列槽位为 O(1)，遍历链表查找或删除为 O(k)，所以总的时间复杂度为 O(k)<br/>

> k为链表长度<br/>
> 对于散列比较均匀的散列函数来说，理论上 k = n / m，n表示散列中数据总数，m表示散列表中“槽”的个数。


### 总结：
虽然散列表存在散列冲突，但如果散列函数设计的好的话，冲突的概率会很小。正常情况下，我们认为散列表的查询、插入和删除的时间复杂度都为 O(1)。

### 应用
大多数语言中的 Map 和 Set 数据结构都是基于散列表进行的抽象。特点如下：
- map
  - key-value 对，key 不重复
  - new HashMap() / new TreeMap()
- set
  - 不重复元素的集合
  - new HashSet() / new TreeSet()

### Java 语言中的 HashTable 源码分析
看文档可知，`HashTable`的性能会受2个参数的影响：`initial capacity`和`load factor`。
`initial capacity`越大，占用空间越多，可能会浪费大量内存，但是会降低对`rehash`的需求，避免这个耗时操作。
`load factor`越大，对空间的利用率越高，但会提高散列冲突的概率，导致查询性能退化。(查询性能会影响散列表的其他操作，比如`put`和`get`)

`HashTable`内部会维护一个`table`数组，`get`操作如下：
```java
public synchronized V get(Object key) {
    Entry<?,?> tab[] = table;
    int hash = key.hashCode();
    int index = (hash & 0x7FFFFFFF) % tab.length;
    for (Entry<?,?> e = tab[index] ; e != null ; e = e.next) {
        if ((e.hash == hash) && e.key.equals(key)) {
            return (V)e.value;
        }
    }
    return null;
}
```
可以看出，散列函数为`(key.hashCode() & 0x7FFFFFFF) % tab.length`，是对底层数组的长度取模来把`key`映射到数组的`index`上，
然后在通过遍历链表来查找。

--- 

## 树
![tree](assets/tree.jpg)

### 概念
父节点
子节点
兄弟节点
根节点
叶子节点

高度(height)
深度(depth)
层(level)

节点的高度 = 该节点到叶子节点的最长路径(边数) <br/>
节点的深度 = 根节点到该节点所经历的边的个数 <br/>
节点的层数 = 节点的深度 + 1 <br/>
树的高度 = 根节点的高度 <br/>
![height depth level](assets/height-depth-level.jpg)

> 链表是特殊的树，树是特殊的图

### 二叉树

> 每个节点最多有两个“叉”，分别被称为左子节点和右子节点

![binary tree](assets/binary-tree.jpg)

#### 满二叉树
1. 叶子节点全都在最底层
2. 除了叶子节点外，每个节点都有左右两个子节点

#### 完全二叉树
1. 除了最后一层外，其他层的节点个数都是满的
2. 最后一层的叶子节点都靠左排列

#### 二叉树的存储
1. 链式存储
![binary tree linked save](assets/binary-tree-linked-save.jpg)
基于指针或引用的二叉链式存储法，每个节点都有 left 和 right 两个指针分别指向左右子节点，通过根节点就可以访问整棵树。

2. 顺序存储
![binary tree array save](assets/binary-tree-array-save.jpg)
基于数组的顺序存储法，根节点存储在下标 `i=1` 的位置，那么左子节点存储在下标 `2*i=2` 的位置，右子节点存储在 `2*i+1=3` 的位置。
以此类推，如上图所示。
这样通过下标计算，我们也可以访问整棵树。

> 如果一棵树是完全二叉树，那么用数组存储无疑是最节省内存的方式。<br/>
> 因为数组的存储方式并不需要存储额外的指针。<br/>
> 上面的存储方式会浪费一个内存空间，我们也可以把根节点存储在 `i=0` 的位置，那么他的左子节点就存储在 `2*i+1` 位置，
> 他的右子节点存储在 `2*i+2` 位置，数组下标为 `i` 的父节点的下标为 `Math.floor((i-1)/2)`

#### 二叉树的遍历
前序遍历、中序遍历、后序遍历
![tree travse](assets/tree-travse.jpg)

```
前序遍历的递推公式：
preOrder(root) = print root -> preOrder(root.left) -> preOrder(root.right)
根 -> 左 -> 右

中序遍历的递推公式：
inOrder(root) = inOrder(root.left) -> print root -> inOrder(root.right)
左 -> 根 -> 右

后序遍历的递推公式：
postOrder(root) = postOrder(root.left) -> postOrder(root.right) -> print root
左 -> 右 -> 根

层序遍历：
借助队列辅助
根节点入队，然后从队列取出一个节点处理，将该节点的左右子节点依次入队，然后处理下一个节点，直到队列为空。  
```

### 二叉搜索树(Binary Search Tree, BST)

#### 特点
- 左子树上所有节点的值均小于它的根节点的值
- 右子树上所有节点的值均大于它的根节点的值
- 以此类推，左右子树也分别为二叉搜索树

> 也就是说，这棵树是有序的，类似于跳表

> 对二叉搜索树的中序遍历，是一个升序遍历<br/>
> 因为中序遍历的顺序为：左 -> 根 -> 右


二叉搜索树的查找：
```js
function find(Node tree, int data) {
    Node p = tree;
    while (p !== null) {
        if (p.data === data) {
            return p;
        } else if (p.data < data) {
            p = p.right;
        } else {
            p = p.left;
        }
    }
    return null;
}
```


二叉搜索树的插入：
```js
function insert(Node tree, int data) {
    if (tree === null) {
        tree = new Node(data);
        return;
    }

    Node p = tree;
    while (p !== null) {
        if (data > p.data) {
            if (p.right === null) {
                p.right = new Node(data);
                return;
            }
            p = p.right;
        } else if (data < p.data) {
            if (p.left === null) {
                p.left = new Node(data);
                return;
            }
            p = p.left;
        }
    }
}
```

二叉搜索树的删除：
```js
function delete(Node tree, int data) {
    Node p = tree; // p 指向要删除的节点
    Node pp = null; // pp 记录 p 的父节点

    while (p !== null && p.data !== data) {
        pp = p;
        if (data > p.data) p = p.right;
        else p = p.left;
    }
    if (p === null) return; // 没有找到要删除的节点

    // p 有两个子节点
    if (p.left !== null && p.right !== null) {
        Node minP = p.right;
        Node minPP = p; // minPP 表示 minP 的父节点
        
        while (minP.left !== null) {
            minPP = minP;
            minP = minP.left;
        }
        p.data = minP.data; // 将 minP 的数据替换到 p 中
        p = minP; // 下面要删除这个 minP
        pp = minPP;
    }

    // p 是叶子节点或只有一个子节点
    Node child; // p 的子节点
    if (p.left !== null) child = p.left;
    else if (p.right !== null) child = p.right;
    else child = null;

    if (pp === null) tree = child; // 删除的是根节点
    else if (pp.left === p) pp.left = child;
    else pp.right = child;
}
```

---

## 堆

### 特性
1. 堆是一个完全二叉树
2. 堆中每一个节点的值都必须大于等于其子树中的每个节点的值(大顶堆)，或小于等于其子树中每个节点的值(小顶堆)。

堆是一个完全二叉树，所以可以使用数组进行存储。
如果根节点存储在下标为 0 的位置，那么下标的计算公式为：
```
下标为 i 的节点的左子节点的下标为 2 * i + 1
下标为 i 的节点的右子节点的下标为 2 * i + 2
下标为 i 的节点的父节点的下标为 Math.floor((i - 1) / 2)
```

### 堆的核心操作

#### 1. 往堆中插入一个元素
插入元素之后，我们需要继续满足堆的两个特性
让其重新满足堆的特性的这个过程，我们称之为 **堆化(heapify)**。

#### 2. 删除堆顶元素 (取最大值/最小值)


### 堆的应用
- top K 问题，比如，从几十亿条订单日志中筛选出金额靠前的1000条数据，构建一个容量为 K 的小顶堆
- 实现优先队列
- 流里面的中位数
