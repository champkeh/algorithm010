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
    // 1. 暴力 排序 比较
    // if (s === null && t === null) return true;
    // if (s === null || t === null) return false;

    // let sortedS = s.split('').sort().join();
    // let sortedT = t.split('').sort().join();

    // return sortedS === sortedT;

    // 2. hash table 记录每个字母出现的频次
    if (s === null && t === null) return true;
    if (s === null || t === null) return false;

    let hash = {};
    for (let i = 0; i < s.length; i++) {
        if (hash[s[i]] === undefined) {
            hash[s[i]] = 1;
        } else {
            hash[s[i]]++;
        }
    }

    for (let i = 0; i < t.length; i++) {
        if (hash[t[i]] === undefined) {
            return false;
        } else {
            hash[t[i]]--;
        }
    }

    // 判断 hash 是否为空
    return Object.values(hash).every(n => n === 0);
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

    let hash = {};
    for (let s of strs) {
        let sortedS = s.split('').sort().join();
        if (hash[sortedS]) {
            hash[sortedS].push(s);
        } else {
            hash[sortedS] = [s];
        }
    }

    return Object.values(hash);
};
```


### 3. 两数之和

