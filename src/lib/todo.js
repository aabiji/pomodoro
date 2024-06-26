import { writable } from "svelte/store";

export class Task {
    constructor(name, is_root) {
        this.name = name;
        this.children = [];
        this.done = false;
        this.is_root = is_root;
    }
};

export const task_tree = writable(new Task("Your tasks", true));