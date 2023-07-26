import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//create your first component
const Home = () => {
	const[todos,setTodos]= useState([])
	
	useEffect(()=>{
		fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/sarahlebrun2")
		.then((result)=>{
			return result.json()
		})
		.then((data)=>{
			setTodos(data)
		})
	},[]) 
	useEffect(()=>{
		fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/sarahlebrun2",{
			method:"PUT",
			body:JSON.stringify(todos),
			headers:{"Content-type":"application/json"}
		})
		.then((result)=>{
			return result.json()
		})
		.catch((error)=>{
			console.log(error)
		})
	},[todos])
	const createTodo=(e)=>{
		e.preventDefault()
		let newtodo={
			"label":e.target.todoInput.value,
			"done":false
		}
		let isNew= true
		todos.forEach(todo =>{
			if(todo.label.toLowerCase()=== newtodo.label.toLowerCase()){
				isNew=false
			}
		})
		isNew ? setTodos([...todos,newtodo]) : alert("todo already exist")
		e.target.todoInput.value=""
	}

	const removeTodo=(e,index)=>{
		e.preventDefault()
		let filterTodos=todos.filter((todo,i)=>{return i !== index})
		setTodos(filterTodos)
	}
	return (
		<div className="text-center">
			<h1>To do list</h1>
			<form onSubmit={createTodo}>
				<input type="text" placeholder="enter to do" name="todoInput"/>
			</form>
			<ul>
				{todos.map((todo,index)=>{
					return (
						<li key={index}>
							<span>{todo.label}</span>
							<button onClick={(e)=> removeTodo(e,index)}><FontAwesomeIcon icon={faTrash} /></button>
						</li>
					)
				})}
			</ul>
			
		</div>
	);
};

export default Home;
