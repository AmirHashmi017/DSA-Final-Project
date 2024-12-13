class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.next = null;
    }
}

class PriorityQueue {
    constructor() {
        this.head = null;
    }

    Enqueue(data, priority) {
        const newNode = new Node(data, priority);

        if (this.head === null || this.head.priority > priority) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null && current.next.priority <= priority) {
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
    }

    Dequeue() {
        if (this.IsEmpty()) {
            return null; // Return null for an empty queue
        }
        const dequeuedNode = this.head;
        this.head = this.head.next;
        return { data: dequeuedNode.data, priority: dequeuedNode.priority }; // Include priority if needed
    }

    Peek() {
        return this.IsEmpty() ? null : this.head.data;
    }

    IsEmpty() {
        return this.head === null;
    }
}

export { PriorityQueue };
