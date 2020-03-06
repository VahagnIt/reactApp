import React from 'react';
import axios from 'axios';
const teamData = {
    // members: [
    //     {
    //         id: '1',
    //         name: 'Jeff Bezos',
    //         profession: 'President of Amazon',
    //         info: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    //         img: '/images/416x416.jpg'
    //     },
    //     {
    //         id: '2',
    //         name: 'Bill Gates',
    //         profession: 'Software Developer',
    //         info: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    //         img: '/images/bill.jpg'
    //     },
    //     {
    //         id: '3',
    //         name: 'Mark Zuckerberg',
    //         profession: 'Chief Executive Officer',
    //         info: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    //         img: '/images/mark-zuckerberg-barcelona-march-.jpg'
    //     },
    //     {
    //         id: '4',
    //         name: 'Steve Jobs',
    //         profession: 'Co-founder of Apple',
    //         info: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    //         img: '/images/stevejpg.jpg'
    //     },
    //
    // ],

    getAllMembers: function () {
        // Json Server
       return axios.get('http://localhost:3001/members')
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            })

        // return this.members;
    },

    getCurrentMember: function (id) {
        // let member = [];
        // this.members.map((elem) =>{
        //     if (elem.id == id){
        //         member.push(elem);
        //     }
        // });
        // return member[0];


        // Json Server
        return axios.get('http://localhost:3001/members')
            .then(function (response) {
                let member = []
                 response.data.map(elem=>{
                     if (elem.id == id) {
                         member.push(elem);
                     }
                 });
                return member[0];
            })
            .catch(function (error) {
                console.log(error);
            })

    },

};

export default teamData;