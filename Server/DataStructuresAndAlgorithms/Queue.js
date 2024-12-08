const fs = require("fs");
class Node 
{
    constructor(value) 
    {
        this.value = value;
        this.next = null;
    }
}

class Queue 
{
    constructor() 
    {
        this.head = null;
        this.tail = null;
    }

    Enqueue(value) 
    {
        const newNode = new Node(value);
        if (this.head === null) 
        {
            this.head = newNode;
            this.tail = newNode;
        } 
        else 
        {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    Dequeue() 
    {
        if (this.IsEmpty()) 
        {
            return "No elements to dequeue";
        }
        const dequeuedValue = this.head.value;
        this.head = this.head.next;
        if (this.head === null) 
        {
            this.tail = null;
        }
        return dequeuedValue;
    }

    Peek() 
    {
        if (this.IsEmpty()) 
        {
            return "Queue is empty";
        }
        return this.head.value;
    }

    IsEmpty() 
    {
        if(this.head === null)
        {
            return true
        }
        return false;
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
            if (this.head == null) 
            {
                this.tail = null; 
            }
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
                    this.tail = current;
                }
                return locationToDelete.value;
            }
            current = current.next;
        }
    
        return false; 
    }
}
    

module.exports = Queue;