import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import './EditProjects.css';
import projectData from './../../services/projectData';
import axios from 'axios';

import { connect } from 'react-redux';
import {currentProject,getData,addProject, editProject, deleteProject, changeValue, saveProject, formShow} from './../../Redux/actions/action';


class EditProjects extends Component {


componentDidMount() {
    projectData.getAllProjects().then(projects => {
        this.props.onGetData(projects)
    })
}

    onEdit =  (projectId)=>{
        this.props.onEditProject(projectId)
    };

    onChangeValue = (event,type)=>{
        let input = event.target.value;
        this.props.onChangeProjectValue(input,type)
    };

    onSave = async (projectId,index)=>{

       await projectData.getCurrentProject(projectId).then(project => {
           this.props.onCurrentProject(project)
        });


        await axios.patch(`http://localhost:3001/projects/${projectId}/`, {
            icon: this.props.icon !== '' ? this.props.icon : this.props.currentProject.icon,
            title: this.props.title !== '' ? this.props.title : this.props.currentProject.title,
            info: this.props.info !== '' ? this.props.info : this.props.currentProject.info
        }).then(resp => {
            let projects = [...this.props.projects];
            projects[index] = resp.data;
            this.props.onSaveProject(projects)
        }).catch(error => {
            console.log(error);
        });
    };


    onDelete = async (projectId,index)=>{
       await axios.delete(`http://localhost:3001/projects/${projectId}`)
            .then(resp => {
                let projects = [...this.props.projects];
                projects.splice(index, 1);
                this.props.onDeleteProject(projects)
            }).catch(error => {
            console.log(error);
        });
    };


    onAddProject = async()=>{
        let maxId = Math.max(...this.props.projects.map(item => item.id));
        let maxIndex = Math.max(...this.props.projects.map((elem,index) => index))

        await axios.post(`http://localhost:3001/projects/`,{
            id:`${maxId+1}`,
            icon: this.props.icon,
            title: this.props.title,
            info: this.props.info
        })
            .then(resp => {
                let projects = [...this.props.projects];
                projects[maxIndex + 1] = resp.data;
                this.props.onAddProject(projects);
            }).catch(error => {
                console.log(error);
            });
    };

    formShow = ()=>{
        this.props.onformShow();
    };

    render() {
        let project = this.props.projects.map((project,index)=>{
            return(
                <tr key={index}>
                    <td>
                        {project.id}
                    </td>
                    <td>
                        {this.props.isShow !== project.id ? <i className={project.icon}></i> : null}
                        <input type="text" name="icon" defaultValue={project.icon} className={`form-control ${this.props.isShow === project.id ? 'activeInput' : 'notActiveInput'}`} onChange={(event)=>this.onChangeValue(event,'icon')}/>
                    </td>
                    <td>
                        {this.props.isShow !== project.id ? project.title : null}
                        <input type="text" name="title" defaultValue={project.title} className={`form-control ${this.props.isShow === project.id ? 'activeInput' : 'notActiveInput'}`} onChange={(event)=>this.onChangeValue(event,'title')}/>

                    </td>
                    <td>
                        {this.props.isShow !== project.id ? project.info : null}
                        {this.props.isShow ? <input type="text" name="info" defaultValue={project.info} className={`form-control ${this.props.isShow === project.id ? 'activeInput' : 'notActiveInput'}`} onChange={(event)=>this.onChangeValue(event,'info')}/> : null}
                    </td>
                    <td>
                        {
                            this.props.isShow !== project.id
                            ? <button className="btn btn-info" type="button" onClick={()=>this.onEdit(project.id)}>Edit</button>
                            : <button className="btn btn-success" type="button" onClick={()=>this.onSave(project.id,index)}>Save</button>
                        }
                    </td>
                    <td>
                        <button className="btn btn-danger" type="button" style={{marginLeft: '10px'}} onClick={()=>this.onDelete(project.id,index)}>Delete</button>
                    </td>
                </tr>
            );
        });


        return (
            <div className="projectList">
                <div className="container">
                    <div className="row">
                        {
                            this.props.isFormShow
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
                                !this.props.isFormShow
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

const mapStateToProps = (state)=>{
        return {
            projects: state.project.projects,
            isShow: state.project.isShow,
            isFormShow: state.project.isFormShow,
            icon: state.project.icon,
            title: state.project.title,
            info: state.project.info,
            currentProject: state.project.currentProject
        }
};

const mapDispatchToProps = (dispatch)=>{
    return{
        onGetData: (projects)=> dispatch(getData(projects)),
        onEditProject: (projectId)=> dispatch(editProject(projectId)),
        onDeleteProject: (projects)=> dispatch(deleteProject(projects)),
        onformShow: ()=> dispatch(formShow()),
        onChangeProjectValue: (input,type)=> dispatch(changeValue(input,type)),
        onAddProject: (projects)=> dispatch(addProject(projects)),
        onSaveProject: (projects)=> dispatch(saveProject(projects)),
        onCurrentProject: (projects)=> dispatch(currentProject(projects)),

    }
};
export default connect(mapStateToProps,mapDispatchToProps)(EditProjects);