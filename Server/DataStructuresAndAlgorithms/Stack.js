class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.head = null;
    }

    Push(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    Pop() {
        if (this.IsEmpty()) {
            return "No elements to pop";
        }
        const toDelete = this.head.value;
        this.head = this.head.next;
        return toDelete;
    }

    Peek() {
        if (this.IsEmpty()) {
            return "Stack is empty";
        }
        return this.head.value;
    }

    IsEmpty() {
        return this.head === null;
    }
    DeleteSpecific(location) {
        if (this.head == null) {
            return false;
        }

        if (this.head.value.UserID === location.UserID &&
            this.head.value.SourceLocation === location.SourceLocation &&
            this.head.value.DestinationLocation === location.DestinationLocation) 
        {
            const locationToDelete = this.head;
            this.head = this.head.next; 
            return locationToDelete.value;
        }

        let current = this.head;
        while (current.next != null) 
            {
            if (current.next.value.UserID === location.UserID &&
                current.next.value.SourceLocation === location.SourceLocation &&
                current.next.value.DestinationLocation === location.DestinationLocation)
                {
                const locationToDelete = current.next;
                if (current.next.next != null) 
                {
                    current.next = current.next.next; 
                } 
                else 
                {
                    current.next = null; 
                }
                return locationToDelete.value;
            }
            current = current.next;
        }
    
        return false; 
    }
}

module.exports = Stack;

