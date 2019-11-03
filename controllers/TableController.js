const sequelize = require('sequelize')
const models = require('../models')
const Op = sequelize.Op;

const createTable = function(req, res){
    const body = req.body;
    console.log('body');
    console.log(body);
    const course_start = parseInt(body.course_start)
    const course_end = parseInt(body.course_end)
    const insertData = {
        code: body.code,
        lecture:body.lecture,
        professor:body.professor,
        location:body.location,
        start_time: course_start,
        end_time: course_end,
        dayofweek: body.course_day
    }
    try{
        if(checkTable(insertData)){
            models.Timetable.create(insertData) 
            .then(result => {
                console.log('controller'+result.course_code);
                res.send({ result: result });
        })
    }
        else{
            console.log('AAAAAAA')
            res.send({ message: '이미 등록된 과목입니다' });
        }
    }catch(err){
        console.log(err)
    }
}

let checkTable = function(insertData){
    return true;
}

module.exports = {
    createTable
}