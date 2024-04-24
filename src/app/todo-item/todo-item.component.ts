import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todo.service.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo! :Todo;
  @Output() completed:EventEmitter<number>= new EventEmitter<number>();
  @Output() deleted: EventEmitter<number>= new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  markAsCompleted(){
    this.completed.emit(this.todo.id);
  }

  deletedTodo(){
    console.log(this.todo.id)
    this.deleted.emit(this.todo.id);
  }

}
