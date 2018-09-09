import React, {Component} from 'react';
import * as API from '../api/API';
import './homepage.css';
import {Button} from 'react-bootstrap'
import Header from "./Header";
import Footer from "./Footer";
//import Modal from "react-modal";
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

        console.log("buttong clicked");

        // API.uploadFile(this.filepayload)
        //     .then((res1) => {
        //
        //         if (res1.status == 200) {
        //
        //             res1.json().then(data1 => {
        //
        //                 this.setState({
        //                     link: data1.link,
        //                     filetype: data1.filetype
        //                 });
        //                 userstate.confLink = data1.link
        //                 userstate.filetype = data1.filetype
        //
        //                 console.log(userstate)
        //
        //                 API.submit(userstate)
        //                     .then((res2)  => {
        //
        //                         if (res2.status == 200) {
        //                             res2.json().then(data2 => {
        //                             this.setState({
        //                                 logUrl : data2.log
        //                             });
        //
        //                                 this.openModal()
        //
        //                             });
        //
        //                         } else if (res2.status == 401) {
        //                             this.setState({
        //
        //                                 message: "Try again..!!"
        //                             });
        //                         }
        //                     });
        //             });
        //
        //         }else if (res1.status == 401) {
        //             this.setState({
        //
        //                 message: "Error upgrading!!"
        //             });
        //         }
        //     });

    }

    handleFileUpload = (event) => {

        this.filepayload.append('conf', event.target.files[0]);

        if(event.target.files[0])
            this.setState({ filename : event.target.files[0].name})

    };


    // setVersionFrom = (event) => {
    //
    //     const verFrom = event.target.value;
    //     const startIndex = this.versionFromList.indexOf(verFrom)
    //     var endIndex={}
    //     const reg = /(\d+).(\d+)/.exec(verFrom)[0]
    //
    //     for(var i=this.prodList.length-1; i>=0; i--){
    //         if(this.prodList[i]["from-versions"].indexOf(reg)!=-1){
    //             endIndex=i;
    //             break;
    //         }
    //     }
    //
    //     this.versionToList = this.versionFromList.slice(startIndex+1, endIndex+1)
    //     this.setState({ versionFrom: verFrom });
    //
    // };



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

                <Button>Need help</Button>
                <br/>

                <br/>
                <Button>Provide help </Button>
                <br/>

                <br/>
                <Button>Professional</Button>

                <Footer/>
                <ReactTooltip />
            </div>
        );
    }
}

export default HomePage;