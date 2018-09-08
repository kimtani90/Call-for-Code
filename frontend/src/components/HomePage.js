import React, {Component} from 'react';
import * as API from '../api/API';
import './homepage.css';
import Header from "./Header";
import Footer from "./Footer";
import Modal from "react-modal";
import axios from 'axios';
import ReactTooltip from 'react-tooltip'
var yaml = require('js-yaml');


class HomePage extends Component {

    state = {
        message: '',
        product: '',
        versionFrom:'',
        versionTo:'',
        confLink:'',
        letterSpacing:'',
        email:'',
        customer:'',
        isModalOpen: false,
        filename:'',
        logUrl : '',
        filetype:''
    };

    versionFromList = []
    versionToList = []
    parsedYml = {}
    prodList = []
    filepayload = new FormData();


    openModal() {
        this.setState({ isModalOpen: true})
    }

    closeModal() {
        this.setState({ isModalOpen: false})
    }

    componentDidMount() {
        axios.get(`/catalog.yml`)
            .then(res => {
                var doc = yaml.safeLoad(res.data)
                this.parsedYml = doc.software_images
            });
    }

    handleSubmit = (userstate) => {

        API.uploadFile(this.filepayload)
            .then((res1) => {

                if (res1.status == 200) {

                    res1.json().then(data1 => {

                        this.setState({
                            link: data1.link,
                            filetype: data1.filetype
                        });
                        userstate.confLink = data1.link
                        userstate.filetype = data1.filetype

                        console.log(userstate)

                        API.submit(userstate)
                            .then((res2)  => {

                                if (res2.status == 200) {
                                    res2.json().then(data2 => {
                                    this.setState({
                                        logUrl : data2.log
                                    });

                                        this.openModal()

                                    });

                                } else if (res2.status == 401) {
                                    this.setState({

                                        message: "Try again..!!"
                                    });
                                }
                            });
                    });

                }else if (res1.status == 401) {
                    this.setState({

                        message: "Error upgrading!!"
                    });
                }
            });
    }

    handleFileUpload = (event) => {

        this.filepayload.append('conf', event.target.files[0]);

        if(event.target.files[0])
            this.setState({ filename : event.target.files[0].name})

    };

    setVersionFrom = (event) => {

        const verFrom = event.target.value;
        const startIndex = this.versionFromList.indexOf(verFrom)
        var endIndex={}
        const reg = /(\d+).(\d+)/.exec(verFrom)[0]

        for(var i=this.prodList.length-1; i>=0; i--){
            if(this.prodList[i]["from-versions"].indexOf(reg)!=-1){
                endIndex=i;
                break;
            }
        }

        this.versionToList = this.versionFromList.slice(startIndex+1, endIndex+1)
        this.setState({ versionFrom: verFrom });

    };

    setVersionTo = (event) => {
        this.setState({ versionTo: event.target.value });
    };

    selectProduct = (event) => {

        this.versionFromList = []
        this.versionToList = []
        const prod = event.target.value

        if(prod == 'bcf')
            this.prodList= this.parsedYml.bcf
        else if(prod == 'bmf')
            this.prodList= this.parsedYml.bmf

        this.prodList.map(item => {
            this.versionFromList.push(item.release)
        })

        this.setState({ product: prod });
    }

    style = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };


    render() {

        return (
            <div>
                <Header/>
                <br/>
                <div className="bg-light text-dark">
                        { this.state.message===''?'':(
                            <div className="text-danger">
                                {this.state.message}
                            </div>)
                        }
                    <div className="row">

                        <div className="col-md-offset-5 col-md-3">
                        </div>
                        <div className="col-md-6">
                            <br/>
                            <br/>
                            <br/>
                            <div className="row wrapper">
                                <div className="col-md-5" data-tip="Choose a product to upgrade">
                                    Product
                                </div>

                                <div className="col-md-3">

                                    <label>
                                        <input
                                            type="radio"
                                            value= "bcf"
                                            checked={this.state.product == 'bcf'}
                                            onChange={this.selectProduct}
                                        /> &nbsp;
                                        BCF
                                    </label>

                                </div>
                                <div className="col-md-3">
                                    <label>
                                        <input
                                            type="radio"
                                            value= "bmf"
                                            checked={this.state.product == 'bmf'}
                                            onChange={this.selectProduct}
                                        /> &nbsp;
                                        BMF
                                    </label>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <div className="row wrapper">
                                <div className="col-md-5" data-tip="Select version from and to">
                                    Version
                                </div>
                                <div className="col-md-3">
                                    From &nbsp;
                                    <select onChange={this.setVersionFrom} >
                                        {this.versionFromList.map(item => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}

                                    </select>
                                </div>

                                <div className="col-md-3">
                                    To &nbsp;
                                    <select onChange={this.setVersionTo} >
                                        {this.versionToList.map(item => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <br/>

                            <div className="row wrapper">

                                <div className="col-md-5" data-tip="Name of the customer">
                                    Customer
                                </div>

                                <div className="col-md-6">
                                    <input type="text"  required
                                           onChange={(event) => {
                                               this.setState({
                                                   customer: event.target.value
                                               });
                                           }}/>
                                </div>
                            </div>
                            <br/>
                            <br/>

                            <div className="row wrapper">

                                <div className="col-md-5" data-tip="Email Address to send results">
                                    Email Address
                                </div>

                                <div className="col-md-6">
                                    <input type="email"  placeholder="example@domain.com" required
                                           onChange={(event) => {
                                               this.setState({
                                                   email: event.target.value
                                               });
                                           }}/>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <div className="row wrapper">

                                <div className="col-md-5" data-tip="Upload a configuration or snapshot file">
                                    Configuration file
                                </div>


                                <div className="col-md-6">
                                    <div className="upload-btn-wrapper">
                                        {/*<button className="btn btn-light">Upload File</button>*/}

                                        <span className="fa fa-upload"></span>&nbsp;{this.state.filename==''? "Choose File" :this.state.filename}

                                        <input type="file" name="conf" onChange={this.handleFileUpload}/>
                                    </div>

                                </div>
                            </div>
                            <br/>

                            <br/>
                            <br/>

                            <button className="btn btn-dark" type="submit"
                                    onClick={() => this.handleSubmit(this.state)}>
                                Submit
                            </button>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>

                            <Modal isOpen={this.state.isModalOpen} style={this.style} onClose={() => this.closeModal()}>

                                <br/>
                                <div className=" row justify-content-md-center">

                                    <iframe src={this.state.logUrl}/>
                                    <div className=" col-md-4">
                                        <button className="btn btn-dark" type="submit"
                                                onClick={() => this.closeModal()}>Close</button>
                                    </div>

                                </div>

                            </Modal>

                        </div>

                        <div className="col-md-offset-5 col-md-3">
                        </div>

                    </div>
                </div>

                <Footer/>
                <ReactTooltip />
            </div>
        );
    }
}

export default HomePage;