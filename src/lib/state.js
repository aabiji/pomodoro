import { writable } from "svelte/store";

export class Task {
    constructor(name, is_root, parent) {
        this.name = name;
        this.children = [];
        this.done = false;
        this.is_root = is_root;

        this.id = (Math.random() + 1).toString(36).substring(5);;
        if (parent != null) this.parent = parent.id;
    }
};

export class App {
    constructor() {
        this.work_duration = 25;
        this.short_break_duration = 5;
        this.long_break_duration = 15;
        this.break_count = 0;
        this.current_session = -1;
        this.task_tree = new Task("Your tasks", true, null);
    }

    loadFromLocalstorage(localStorage) {
        const cached_data = localStorage.getItem("data");
        if (cached_data === null) return;
        const obj = JSON.parse(cached_data);
        Object.assign(this, obj);
        this.break_count = 0;
        this.current_session = -1;
    }

    gotoNextSession() {
        // Move to the next possible state (session)
        this.current_session = (this.current_session + 1) % 3;

        if (this.current_session == 0) {
            return "Work";
        }

        if (this.current_session == 1) {
            this.break_count += 1;
            return "Short Break";
        }

        // Only enter the long break session after
        // we've entered the short break session 4 times
        if (break_count < 4) {
            this.current_session = 0;
            return "Work";
        }

        this.break_count = 0;
        return "Long Break";
    }

    getSessionDuration() {
        if (this.current_session == 0) return this.work_duration;
        if (this.current_session == 1) return this.short_break_duration;
        return this.long_break_duration;
    }
}

export const app = writable(new App());