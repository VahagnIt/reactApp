import React, {Component} from 'react';
import "./Burger.css"
import axios from 'axios';

class Burger extends Component {

    state = {
        layers: [
            {
                "type": "1",
                "img": "/images/burger/topBred.png",
                "name": "Հաց վերևի",
                "price": "100"
            }
        ],
        maxSum: 0,
        showList: [],
        isPreview: true
    };

    componentDidMount(){
        var self = this;

        axios.get("http://localhost:3001/layers")
            .then(resp => {
                self.setState({layers:resp.data})
            })
            .catch(error => {
            console.log(error);
        })
    }


    onSelectType = (event)=>{
        let selectType = event.target.value;
        let layers = [...this.state.layers];
        let list = [...this.state.showList];
        let maxCount = this.state.maxSum;


        layers.map((elem)=>{
            if (elem.type == selectType){
                list.push(elem);
                maxCount = maxCount + +elem.price;
            }
        });

        this.setState({showList:list,maxSum:maxCount});

    };

    onUpdate = (event,index)=>{
        let selectType = event.target.value;
        let layers = [...this.state.layers];
        let list = [...this.state.showList];
        let maxCount = 0;

        layers.map((elem)=>{
            if (elem.type == selectType){
                list[index] = elem;
                this.setState({showList:list});
            }
        });

        list.map((elem)=>{
            maxCount = maxCount + +elem.price
        })
        this.setState({maxSum:maxCount});

    };

    onDelete = (index,price)=>{
        let showList = [...this.state.showList];
        showList.splice(index,1);
        let maxSum = this.state.maxSum;
        let newSum = maxSum - price;
        this.setState({showList:showList,maxSum:newSum});

        if (this.state.showList.length == 1) {
            this.setState({isPreview:true});
        }
    };

    onPreview = ()=>{
        let showList = [...this.state.showList];
        let maxSum = this.state.maxSum;
        var exist = false;
        let layers = [...this.state.layers];
        let maxIndex = Math.max(...this.state.showList.map((elem,index) => index))

        showList.map((elem)=>{
           if (elem.type == 7){
               exist = true;
           }
        });

        if (!exist){
            showList[maxIndex + 1] = layers[6];
            maxSum = maxSum + +layers[6].price;
            this.setState({showList: showList,maxSum:maxSum})
        }

        this.setState({isPreview: false,})
    };

    render() {


        if ( this.state.showList.length !== 0){
            var selectBox = this.state.layers.map((elem,index)=>{
                return(
                    <option key={index} value={elem.type}>{elem.name}</option>
                );
            });
        } else{
            var selectBox = <option value={this.state.layers[0].type}>{this.state.layers[0].name}</option>
        }


        let burger = this.state.showList.map((elem,index)=>{
            return(

                <div key={index}>
                    <div className="col-md-4">
                        <img src={window.location.origin + elem.img} alt=""/>
                    </div>
                    <div className="col-md-6 col-md-offset-2">
                        <select name="" id=""  onChange={(event)=>{this.onUpdate(event,index)}}>
                            {
                                this.state.layers.map((element,index)=>{
                                    return(<option key={index} value={element.type} selected={element.type == elem.type ? 'selected' : null}>{element.name}</option>)
                                })
                            }
                        </select>
                        <button className="btn btn-danger btn-sm" onClick={()=>this.onDelete(index,elem.price)}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            );
        });

        return (
            <div className="container burger">
                <div className="row">
                    <h1 className="w-100 text-left">Sum = {this.state.maxSum}</h1>
                    <hr className="w-100"/>
                    <div className="w-100 burgerBox">
                        <div className={this.state.isPreview ? 'w-100 ' : 'w-100 showList'}  >
                            {burger}
                        </div>
                        {
                            this.state.isPreview
                            ? <div>
                                    <div className="col-md-4">
                                        <div className="img-block"></div>
                                    </div>
                                    <div className="col-md-6 col-md-offset-2" style={{marginTop: '20px'}}>
                                        <select name="" id=""  onChange={(event)=>this.onSelectType(event)}>
                                            <option defaultValue="DEFAULT" >Select</option>
                                            {selectBox}
                                        </select>
                                    </div>
                                </div>
                                : ''
                        }

                        <div className="text-left">
                            <button className="btn btn-primary btn-sm" disabled={this.state.showList.length >= 2 ? '' : 'disabled'} onClick={()=>this.onPreview()}>Preview</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Burger;