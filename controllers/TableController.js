const sequelize = require('sequelize')
const models = require('../models')
const Op = sequelize.Op;

const getTable = function(req, res){
    const tableId = req.params.tableId;
    console.log(tableId);
    models.Timetable.findOne({where: {code: tableId}})
    .then( table => {
        console.log(table);
        res.send({ course: table})
    })
}

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
        models.Timetable.findAll({
            where:{
                [Op.or]:[
                    {
                        code: insertData.code
                    },
                ]
            }
        })
        .then(result =>{
            if(!result.length){
                models.Timetable.create(insertData) 
                .then(result => {
                    console.log('controller'+result.course_code);
                    res.send({ result: result,message:'등록되었습니다.'});
            })
            }
            else{
                console.log('AAAAAAA')
                res.send({ message: '이미 등록된 과목입니다' });
            }
        })
  
        
    }catch(err){
        console.log(err)
    }
}

const deleteTable =function(req, res){
    const id = req.params.tableId;
    console.log(req.params);
    console.log(id);
    try{
    models.Timetable.destroy({ where: { id: id }})
    .then( result => res.send({message: '삭제되었습니다'}))
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    getTable,
    createTable,
    deleteTable
}