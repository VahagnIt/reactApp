import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./ImageUpload.css";
import axios from 'axios';

class ImageUpload extends Component{

    state = {
        selectedFiles: '',
        imagePreviewUrl: '',
        input: "",
        message: ' '
    };



    getImageFile = (event)=>{
        this.setState({selectedFiles: [...this.state.selectedFiles,...event.target.files]});

        let files = [...event.target.files];
        files.map((file,index)=>{
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    imagePreviewUrl: [...this.state.imagePreviewUrl, reader.result]
                });
            };
            reader.readAsDataURL(file);
        });
        this.setState({input:""})
    };

    deleteImage = (index) =>{
        let files = [...this.state.selectedFiles];
        files.splice(index, 1);
        this.setState({selectedFiles:files});

        let imageUrl = [...this.state.imagePreviewUrl];
        imageUrl.splice(index, 1);
        this.setState({imagePreviewUrl:imageUrl});
    };



    saveImages = async () =>{
        let files = [...this.state.selectedFiles];
        let path = window.location.pathname;
        path = path.split('/')[1];
        var self = this;

        let formData = new FormData();
        files.map(elem => {
            console.log(elem)
            formData.append('files[]', elem);
        });

        // headers: { 'content-type': 'multipart/form-data' }
        // headers: { 'Content-Type': 'application/json' }

        await  axios({
            method: 'post',
            url: '/'+path+'/save-image ',
            data: formData,
            headers: {'content-type': 'multipart/form-data'},
        })
            .then(function (response) {

                if (response.data.success == 'success'){
                    self.setState({message: response.data.success});
                    self.setState({imagePreviewUrl: ''});
                }else{
                    self.setState({message: response.data.error});
                    self.setState({imagePreviewUrl: ''});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };



    render() {
        let imagePreview;
        if (this.state.imagePreviewUrl) {
            imagePreview = this.state.imagePreviewUrl.map((image,index)=>{
                return(
                    <div className="image-container col-md-2" key={index}>
                        <img src={image}  alt="icon"  />
                        <button type="button" className="btn btn-danger btn-sm"  onClick={()=>this.deleteImage(index)}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                )
            });
        }

        let messageType;

        if (this.state.message == 'success'){
            messageType =  <div className="successMesssage">Successfully Add</div>;
        }else if(this.state.message == 'error'){
            messageType =  <div className="errorMesssage">Something went wrong</div>;
        }else {
            messageType =  ''
        }

        return(
            <div className="container Image">
                <div className="row">
                    <div>
                        <h1></h1>
                        <h1>Image Upload</h1>
                        {messageType}
                        <form action=""  encType="multipart/form-data">
                            <div className="form-group">
                                <div className="upload-btn-wrapper">
                                    <button className="btn">Upload a file</button>
                                    <input type="file" onChange={(event)=>this.getImageFile(event)} value={this.state.input} multiple/>
                                </div>
                                <div>
                                    <button className="btn btn-success" type="button" onClick={()=>this.saveImages()}>Save</button>
                                </div>
                            </div>
                            <div className="row">
                                {imagePreview}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default ImageUpload;
