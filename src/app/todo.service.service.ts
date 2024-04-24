import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Todo
{
  id:number;
  text:string;
  completed:boolean;
}
@Injectable({
  providedIn: 'root'
})

export class TodoServiceService {

  constructor(  ) {
    this.loadTodoFromStorage();
   }
  ngOnInit(): void {
  }
  private todos:Todo[]=[];
  private todoSubject:
  BehaviorSubject<Todo[]>= new BehaviorSubject<Todo[]>([]);

  getTodos():Observable<Todo[]>{
    return this.todoSubject.asObservable();
  }
   addTodo(text:string):void{
    const newTodo:Todo = {
      id:Date.now(),
      text,
      completed:false
    }
    this.todos.push(newTodo);
    this.saveTodoToStorage();
    this.todoSubject.next(this.todos);
   };

   markAsCompleted(todoId:number):void
   {
    const todo = this.todos.find(t=>t.id === todoId);
    if(todo){
      todo.completed=true;
      this.saveTodoToStorage();
      this.todoSubject.next(this.todos);
    }
   }

   deleteTodo(todoId:number){
    this.todos = this.todos.filter(t=>
      t.id !== todoId);
      this.saveTodoToStorage();
      this.todoSubject.next(this.todos);
   }

   private saveTodoToStorage(){
    localStorage.setItem('todos',
      JSON.stringify(this.todos)
    )
   }

   private loadTodoFromStorage(){
    const saveTodos = localStorage.getItem('todos');
    if(saveTodos){
      this.todos = JSON.parse(saveTodos);
      this.todoSubject.next(this.todos);
    }
   }
}
