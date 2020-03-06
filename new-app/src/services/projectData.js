import React from 'react';
import axios from 'axios';
const projectData = {
    // projects: [
    //     {
    //         id: '1',
    //         icon: 'fa fa-share-alt',
    //         title: 'Title1',
    //         info: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    //     },
    //     {
    //         id: '2',
    //         icon: 'fa fa-eercast',
    //         title: 'Title2',
    //         info: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    //     },
    //     {
    //         id: '3',
    //         icon: 'fa fa-grav',
    //         title: 'Title3',
    //         info: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    //     },
    //     {
    //         id: '4',
    //         icon: 'fa fa-podcast',
    //         title: 'Title4',
    //         info: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    //     },
    //     {
    //         id: '5',
    //         icon: 'fa fa-car',
    //         title: 'Title5',
    //         info: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    //     },
    //     {
    //         id: '6',
    //         icon: 'fa fa-university',
    //         title: 'Title6',
    //         info: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    //     },
    //
    // ],

    getAllProjects: function () {
        // return this.projects;

        // Json Server
        return axios.get('http://localhost:3001/projects')
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            })

    },


    getCurrentProject: function (id) {
        // Json Server
        return axios.get('http://localhost:3001/projects')
            .then(function (response) {
                let project = []
                response.data.map(elem=>{
                    if (elem.id == id) {
                        project.push(elem);
                    }
                });
                return project[0];
            })
            .catch(function (error) {
                console.log(error);
            })

    },


};

export default projectData;