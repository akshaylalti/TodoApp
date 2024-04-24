import { Component, OnInit } from '@angular/core';
import { Todo, TodoServiceService } from '../todo.service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos:Todo[]=[];
  newTodoString:string = '';
  constructor(private todoService:TodoServiceService) {  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(
      res=>{
        this.todos = res;
      }
    )
  }

  addTodo():void{
    if(this.newTodoString.trim()){
      this.todoService.addTodo(this.newTodoString.trim());
      this.newTodoString = '';
    }
  }
  markAsCompleted(todoId:number){
    this.todoService.markAsCompleted(todoId);
  }

  deleteTodo(todoId:number){
    console.log(todoId)
    this.todoService.deleteTodo(todoId);
  }


}
