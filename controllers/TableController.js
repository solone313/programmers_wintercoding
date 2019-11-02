const sequelize = require('sequelize')
const models = require('../models')
const Op = sequelize.Op;

const createTable = function(req, res){
    const body = req.body;
    const course_start = parseInt(body.course_start)
    try{
        if(checkTable(body.code)){
            models.Timetable.create(
                { 
                    course_code: body.code,
                    course_start: course_start,
                    course_day: body.course_day
                }
            ) 
            .then(result => res.send({message: '등록되었습니다'}))
        }
        else{
            res.send({ message: '이미 등록된 과목입니다' });
        }
    }catch(err){
        console.log(err)
    }
}

const checkTable = function(code){
    try{
        models.Timetable.findOne({where: {course_code: code}})
        .then(result => {
            if(result){
                console.log(result);
                return false
            }
            else{
                return true
            }
        })
    }catch(err){
        console.log(err);
    }    
}

module.exports = {
    createTable
}