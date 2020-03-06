import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import './EditProjects.css';
import projectData from './../../services/projectData';
import axios from 'axios';


class EditProjects extends Component {

    state = {
        projects: [],
        icon: '',
        title: '',
        info: '',
        isShow: 0,
        currentProject: [],
        isFormShow: false
    }

    componentDidMount() {
        projectData.getAllProjects().then(projects => {
            this.setState({projects})
        })
    }

    onEdit =  (projectId)=>{
        this.setState({isShow: projectId})
    };

    onChangeValue = (event,type)=>{
        let input = event.target.value;

        if(type == 'icon'){
            this.setState({icon:input})
        }
        else if(type == 'title'){
            this.setState({title:input})
        }
        else if(type == 'info'){
            this.setState({info:input})
        }

    };

    onSave = async (projectId,index)=>{

        await projectData.getCurrentProject(projectId).then(project => {
            this.setState({currentProject:project});
        });

        var self = this;
        await axios.patch(`http://localhost:3001/projects/${projectId}/`, {
            icon: this.state.icon !== '' ? this.state.icon : this.state.currentProject.icon,
            title: this.state.title !== '' ? this.state.title : this.state.currentProject.title,
            info: this.state.info !== '' ? this.state.info : this.state.currentProject.info
        }).then(resp => {
            let projects = [...this.state.projects];
            projects[index] = resp.data;
            self.setState({isShow:0,icon:'',title:'',info:'',projects:projects});
        }).catch(error => {
            console.log(error);
        });
    };


    onDelete = async (projectId,index)=>{
        var self = this;
        await axios.delete(`http://localhost:3001/projects/${projectId}`)
            .then(resp => {
                let projects = [...this.state.projects];
                projects.splice(index, 1);
                self.setState({projects:projects});
            }).catch(error => {
                console.log(error);
            });
    };


    onAddProject = async()=>{
        var self = this;

        let maxId = Math.max(...this.state.projects.map(item => item.id));
        let maxIndex = Math.max(...this.state.projects.map((elem,index) => index))


        await axios.post(`http://localhost:3001/projects/`,{
            id:`${maxId+1}`,
            icon: this.state.icon,
            title: this.state.title,
            info: this.state.info
        })
            .then(resp => {
                console.log(resp.data);
                let projects = [...this.state.projects];
                projects[maxIndex + 1] = resp.data;
                console.log(projects);
                self.setState({isFormShow: !this.state.isFormShow,isShow:0,icon:'',title:'',info:'',projects:projects});
            }).catch(error => {
                console.log(error);
            });
    };

    formShow = ()=>{
        this.setState({isFormShow: !this.state.isFormShow})
    }

    render() {

        let project = this.state.projects.map((project,index)=>{
            return(
                <tr key={index}>
                    <td>
                        {project.id}
                    </td>
                    <td>
                        {this.state.isShow !== project.id ? <i className={project.icon}></i> : null}
                        <input type="text" name="icon" defaultValue={project.icon} className={`form-control ${this.state.isShow === project.id ? 'activeInput' : 'notActiveInput'}`} onChange={(event)=>this.onChangeValue(event,'icon')}/>
                    </td>
                    <td>
                        {this.state.isShow !== project.id ? project.title : null}
                        <input type="text" name="title" defaultValue={project.title} className={`form-control ${this.state.isShow === project.id ? 'activeInput' : 'notActiveInput'}`} onChange={(event)=>this.onChangeValue(event,'title')}/>

                    </td>
                    <td>
                        {this.state.isShow !== project.id ? project.info : null}
                        {this.state.isShow ? <input type="text" name="info" defaultValue={project.info} className={`form-control ${this.state.isShow === project.id ? 'activeInput' : 'notActiveInput'}`} onChange={(event)=>this.onChangeValue(event,'info')}/> : null}
                    </td>
                    <td>
                        {
                            this.state.isShow !== project.id
                                ? <button className="btn btn-info" type="button" onClick={()=>this.onEdit(project.id)}>Edit</button>
                                : <button className="btn btn-success" type="button" onClick={()=>this.onSave(project.id,index)}>Save</button>
                        }
                    </td>
                    <td>
                        <button className="btn btn-danger" type="button" style={{marginLeft: '10px'}} onClick={()=>this.onDelete(project.id,index)}>Delete</button>
                    </td>
                </tr>
            );
        })


        return (
            <div className="projectList">
                <div className="container">
                    <div className="row">
                        {
                            this.state.isFormShow
                                ? <form action=""  method="post" className="w-100">
                                    <input type="text" placeholder="Icon Class"  onChange={(event)=>this.onChangeValue(event,'icon')}/>
                                    <input type="text" placeholder="Title"  onChange={(event)=>this.onChangeValue(event,'title')}/>
                                    <input type="text" placeholder="Info"  onChange={(event)=>this.onChangeValue(event,'info')}/>
                                    <button className="btn btn-success" type="button" onClick={()=>this.onAddProject()}>Save</button>
                                </form>
                                : null
                        }

                        <div className="w-100">
                            {
                                !this.state.isFormShow
                                    ?  <button className="btn btn-success" type="button" onClick={()=>this.formShow()}>Add New Project</button>
                                    : null
                            }
                        </div>
                        <h1>Project List</h1>
                        <form action="" method="post" className="list">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th style={{width:'100px'}}>#</th>
                                    <th style={{width:'200px'}}>Icon</th>
                                    <th style={{width:'230px'}}>Title</th>
                                    <th style={{width:'450px'}}>Info</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {project}
                                </tbody>
                            </Table>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProjects;