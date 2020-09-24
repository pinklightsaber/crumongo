import React, { Component } from 'react';

class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this)
        this.addTask = this.addTask.bind(this)
    }

    addTask(e){
        
        if(this.state._id){

            fetch('/api/tasks/' + this.state._id, {
                method: 'PUT', 
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea actualizada'});
                this.setState({title: '', description: '', _id: ''})
                this.fetchTasks();
            });
        }else{
            fetch('/api/tasks',{
                method: 'POST',
                body:JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: "tarea guardada"});
                    this.setState({title: '', description: ''});
                    this.fetchTasks();
    
                })
                .catch(err => console.log(err));
            
        }
        e.preventDefault();
    }

    fetchTasks() {
        fetch('/api/tasks')
            .then(res=> res.json())
            .then(data => {
                this.setState({tasks: data});
                
            });

    }

    componentDidMount() {
        this.fetchTasks();
    }

    deleteTask(id) {
        if (confirm('Quieres eliminar esta tarea?')){
            fetch('/api/tasks/'+ id, {
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
    
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea eliminada'});
                this.fetchTasks();
            });
        }
    }

    editTask(id){
        fetch('/api/tasks/'+id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
        })
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        return (
            <div>
                {/*  NAVIGATION  */}
                <nav>
                    <div className="container">
                       CRUD + REACTJS + MATERIALIZE + NODEJS/EXPRESS + MONGODB CLOUD

                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col-s12">
                                                <input onChange={this.handleChange} name = "title"type="text" placeholder="Agrega título" value={this.state.title}/>
                                            </div>
                                            <div className="input-field col-s12">
                                                <textarea onChange={this.handleChange} name ="description" placeholder="Agrega descripción" className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                            <button type="submit" className="btn waves-effect red lighten-2">Guardar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td> 
                                                    <td>{task.description}</td> 
                                                    <td>
                                                        
                                                        <button className="btn waves-effect red lighten-2" onClick={()=> this.editTask(task._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn waves-effect red lighten-2" style={{margin: '4px'}} onClick={()=>this.deleteTask(task._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;