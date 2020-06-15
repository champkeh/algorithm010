1. 用js数组实现Java中Stack的接口
```js
class ArrayStack {
    constructor() {
        this.data = [];
    }
    
    empty() {
        return this.data.length === 0;    
    }

    peek() {
        return this.data[this.data.length - 1];
    }

    pop() {
        return this.data.pop();    
    }

    push(item) {
        return this.data.push(item);    
    }

    search(item) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] === item) {
                // 1-based position
                return i + 1;            
            }
        }
        return -1;
    }
}
```

2. 用js数组实现Java中的Queue接口
```js
class ArrayQueue {

}
```

3. 用js数组实现Java中的PriorityQueue接口
```js
class ArrayPriorityQueue {

}
```

4. 只用栈实现队列或只用队列实现栈
