class Task {
    constructor(name, priority, deadline) {
        this.name = name;
        this.priority = priority;
        this.deadline = new Date(deadline);
    }
}



class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(task) {
        this.heap.push(task);
        this.heapifyUp();
    }

    remove() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const minTask = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return minTask;
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].priority <= this.heap[index].priority) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    heapifyDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            let leftChild = 2 * index + 1;
            let rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < length && this.heap[leftChild].priority < this.heap[smallest].priority) {
                smallest = leftChild;
            }

            if (rightChild < length && this.heap[rightChild].priority < this.heap[smallest].priority) {
                smallest = rightChild;
            }

            if (smallest === index) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    getTasks() {
        return [...this.heap].sort((a, b) => a.priority - b.priority);
    }
}

const taskQueue = new MinHeap();

function addTask() {
    const taskInput = document.getElementById("taskInput").value.trim();
    const priorityInput = parseInt(document.getElementById("priorityInput").value);
    const deadlineInput = document.getElementById("deadlineInput").value;

    if (!taskInput || isNaN(priorityInput) || !deadlineInput) {
        alert("Please enter a valid task name, priority, and deadline!");
        return;
    }

    if (priorityInput <= 0) {
        alert("Priority must be a positive number greater than zero!");
        return;
    }

    const task = new Task(taskInput, priorityInput, deadlineInput);
    taskQueue.insert(task);
    displayTasks();
}


function executeTask() {
    const executedTask = taskQueue.remove();
    if (executedTask) {
        alert(`✅ Executed Task: ${executedTask.name} (Priority: ${executedTask.priority})`);
        displayTasks();
    } else {
        alert("📌 No tasks left to execute!");
    }
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    
    taskQueue.getTasks().forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `${task.name} (Priority: ${task.priority}, Deadline: ${task.deadline.toDateString()})`;
        taskList.appendChild(li);
    });
}
