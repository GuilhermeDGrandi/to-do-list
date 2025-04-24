import React, {Component} from "react";

import Form from './Form'
import Tasks from './Tasks'
import './Main.css';

export default class Main extends Component{
  state={
    newTask: '',
    task:[],
    index: -1,
  }
      
  
  componentDidUpdate(prevProps, prevState){
    const {task} = this.state
    if(task === prevState.task) return
    
    localStorage.setItem('task', JSON.stringify(task))
    console.log(task)
    
  }

  componentDidMount(){
    const task = JSON.parse(localStorage.getItem('task'))
    if(!task) return

    this.setState({task})
  }


  handleSubmit = (e) =>{
    e.preventDefault()
    const {task, index} =this.state
    let {newTask } = this.state
    newTask = newTask.trim()

    if(task.indexOf(newTask) !== -1)return

    const newTasks = [...task]

    if(index === -1){
      this.setState({
        task:[...newTasks, newTask],
        newTask: '',
      })  
    } else{
      console.log('cheguei aqui', index)
      newTasks[index] = newTask

      this.setState({
        task: [...newTasks],
        newTask: '',
        index:-1,
      })
    }
  }

  handleChange =(e) =>{
    this.setState({
      newTask: e.target.value,
    })
  }

  handleEdit = (e, index) =>{
    console.log(index)
    const {task} = this.state
    this.setState({
      index,
      newTask: task[index]
    })
  }

  handleDelete = (e, index) =>{
    const {task} = this.state
    const newTasks = [...task]
    newTasks.splice(index, 1)

    this.setState({
      task: [...newTasks]
    })

  }

  render(){
    const {newTask, task} = this.state
    return (
      <div className="main">
        <h1>To-do list</h1>

        <Form
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        newTask={newTask}        
        /> 

        <Tasks 
        task ={task}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        />


      </div>


    )
  }
}
