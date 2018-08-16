
var express = require('express');  
var path = require("path");
const http = require('http');   
var bodyParser = require('body-parser');  
var mongoose = require("mongoose");
var Promise = mongoose.Promise = require('bluebird');
var multer  = require('multer')

require('dotenv').config();
const nodemailer = require('nodemailer');
const mailer = require('express-mailer');
//app.set('view engine', 'pug')

var db = mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://dinesh:admin123@ds119161.mlab.com:19161/mogodata', { useNewUrlParser: true });  
const fs = require('fs');  
var app = express();  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
   
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', '*');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  

app.use(express.static(__dirname + '/dist/ProjectManegment'));

app.get('/', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/ProjectManegment/index.html'));
});
const port = process.env.PORT || 8181;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log('Running'));
 
var Schema = mongoose.Schema; 

var notificationschema = new Schema({ 
  projectid : { type: String},
  assignuser : { type: String},
  user : { type: String},
  notify : { type: String},
  action :{ type: String},
  invite :{ type: String}
});
var UsersAssigntask = new Schema({ 
  projectid : { type: String},
  projectname : { type: String},
  assignuser : { type: String},
  projecttaskid : { type: String},
  projecttaskname : { type: String},
  shortname : { type: String},
  state: {type: String }
});

var UsersAssignProject = new Schema({ 
  projectid : { type: String},
  projectname : { type: String},
  assignuser : { type: String},
  status : { type: String},
  user : { type: String}
});
var Usersproject = new Schema({ 
 name: { type: String},
 email: {type: String}
}); 
var Userstask = new Schema({ 
 projectid : { type: String},
 projectname : { type: String},
 task : { type: String},
 description : { type: String},
 user : { type: String},
 attachment : { type: String},
 duedate : { type: String},
 time: { type: String },
 status: { type: String },
 state: { type: String }
});

var adminLogin = new Schema({    
 email :{ type: String, required: true },
 password : { type: String},
 name : { type: String}
}); 
var usersLogin = new Schema({    
 email :{ type: String, required: true },
 password : { type: String},
 name : { type: String},
 profile : { type: String}
});
var UsersSchema = new Schema({
 projectid : { type: String}, 
 projectname : { type: String },
 taskid : { type: String },
 task : { type: String },
 user : { type: String},
 comment : { type: String}
}); 
var AttachSchema = new Schema({
  taskid : { type: String },
  attachment : { type: String}
 
}); 
var user = mongoose.model('user', usersLogin);  
var admin = mongoose.model('admin', adminLogin); 
var project = mongoose.model('project', Usersproject);
var task = mongoose.model('task', Userstask);
var comment = mongoose.model('comment', UsersSchema);
var project_user = mongoose.model('project_user', UsersAssignProject);
var task_user = mongoose.model('task_user', UsersAssigntask);
var notification = mongoose.model('notification', notificationschema);
var attachment = mongoose.model('attachment', AttachSchema);

/*---------for demo---------*/
var checkboxValue = new Schema({    
 checkedValue :{ type: String }
});

var checkbox = mongoose.model('checkbox', checkboxValue);
/*---------*/
/*----*/
app.post("/api/login",function(req,res){ 
    user.find().where({"email": req.body.email,"password": req.body.password})
          .count(function(err,count, data){  
      if(err){  
         res.send(err);                
      }  
      else{    
        if(count == "1")
        {
          res.send({data:"Matching"}); 
        }   
        else{
          res.send({data:"Invalide Username Or Password"}); 
        }  
      } 
 });
 }) 

app.post("/api/singUp",function(req,res){
  user.find().where({"email": req.body.email})
          .count(function(err,count, data){  
      if(err){  
         res.send(err);                
      }  
      else{    
        if(count == "1")
        {
          res.send({data:"The email address you have entered is already registered"}); 
        }   
        else{
          console.log(req.body);
          var mod = new user(req.body); 
          mod.save(function(err,data){  
            if(err){  
               res.send(err);                
            }  
            else{        
                res.send({data:"Record has been Inserted"});  
            }  
          }); 
        }  
      } 
 }); 
})
app.post("/api/createnewproject",function(req,res){
  var proj = new project(req.body); 
  proj.save(function(err,data){  
    if(err){  
       res.send(err);                
    }  
    else{        
        res.send({data:"Record has been Inserted"});  
    }  
  }); 

})
app.post("/api/createnewtasks",function(req,res){
  req.body.state = "1";
  var tasks = new task(req.body); 
  tasks.save(function(err,data){  
    if(err){  
       res.send(err);                
    }  
    else{        
        res.send({data:"Record has been Inserted"});  
    }  
  });
})
app.post("/api/GetAllProject/",function(req,res){  
    project.find().where({ email : req.body.email}).
          exec(function(err, data){  
              if(err){  
                  res.send(err);  
              }  
              else{              
                  res.send(data);  
                  }  
          });  
});
 
app.post("/api/getbyprojectid",function(req,res){     
  task.find().where({ projectid : req.body.projectid}).
    exec(function(err, data){ 
    if (err) {  
      res.send(err);         
    }  
    else{   
      var users = [];
      for(var i =0; i<data.length; i++)
      {
        if(data[i].state == "1"){
          users.push(data[i]);
        }
      }  
      res.send(users);
      //res.write(users);  
    } 
  });
})

app.post("/api/Getdeactivetasks",function(req,res){     
  task.find().where({ projectid : req.body.projectid}).
    exec(function(err, data){ 
    if (err) {  
      res.send(err);         
    }  
    else{   
      var users = [];
      for(var i =0; i<data.length; i++)
      {
        if(data[i].state == "0"){
          users.push(data[i]);
        }
      }  
      res.send(users);
      //res.write(users);  
    } 
  });
})
app.post("/api/GetAlltasks",function(req,res){     
  task.find().where({ projectid : req.body.projectid}).
    exec(function(err, data){ 
    if (err) {  
      res.send(err);         
    }  
    else{    
      res.send(data);
      //res.write(users);  
    } 
  });
})
app.post("/api/GettaskUsers",function(req,res){     
      task_user.find().where({ projectid : req.body.projectid}).
          exec(function(err, data){ 
   if (err) {  
   res.send(err);         
   }  
   else{   
        res.send(data);  
     } 
   });
})
app.post("/api/getbyassinedprojectid",function(req,res){     
       task_user.find().where({ projectid : req.body.projectid, assignuser : req.body.user}).
          exec(function(err, data){ 
   if (err) {  
   res.send(err);         
   }  
   else{        
        var users = [];
      for(var i =0; i<data.length; i++)
      {
        if(data[i].state == "1"){
          users.push(data[i]);
        }
      }  
      res.send(users);
     } 
   });
})
app.post("/api/getTaskDescription",function(req,res){    
       task.find().where({ _id : req.body.taskid}).
          exec(function(err, data){ 
   if (err) {  
   res.send(err);         
   }  
   else{       
        res.send(data);  
     } 
   });
})
app.post("/api/Setdescription",function(req,res){ 
    task.findByIdAndUpdate(req.body.task, { description: req.body.description},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{        
          res.send({data:"Record has been Updated..!!"});  
     } 
   });
  })
/*-------------Assing User And Send Notification ---------------*/
app.post("/api/inviteprojectuser",function(req,res){
  req.body.invite = "invite";
  req.body.status = "false";
  req.body.notify = ("You are invited by " +req.body.user+ " for " +req.body.projectname+" project");
  project_user.find().where({projectid : req.body.projectid, assignuser: req.body.assignuser })
  .count(function(err,count, data){  
    if(err){  
       res.send(err);                
    }  
    else{ 
      if(count == "1")
      { res.send({data:"The email address you have entered is already registered"}); }
      else{
        var assignuser = new project_user(req.body); 
        assignuser.save(function(err,data){  
        if(err){  
           res.send(err);                
        }  
        else{  
          req.body.action = "unseen";
          var notifications = new notification(req.body); 
          notifications.save(function(err,data){  
          if(err){  
             res.send(err);                
          }  
          else{       
               let transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false,
                port: 25,
                auth: {
                  user: 'anniat44@gmail.com',
                  pass: 'annyattri@#1'
                },
                tls: {
                  rejectUnauthorized: false
                }
            });

            let mailOptions = {
                from: '"Admin" <dinesh.codecorners@gmail.com>', // sender address
                to: req.body.assignuser, // list of receivers to: 'bar@example.com, baz@example.com',
                subject: 'Notification', // Subject line
                text: 'Node js App', // plain text body
                html: '<b style="color: #080808; font-size:17px;">'+req.body.notify+'</b><div class="row" style="color: #3f3f44; font-size:16px; font-family: Helvetica,Arial,sans-serif; font-weight: 400;line-height: 1.5"><div class="col-md-3" style="border:1px solid #ccc; background: #f5f5f5; padding:20px; width:40%; margin-top:10px; box-shadow: 1px 1px 0px 2px #e6e6e6; border-radius: 5px;"><h2 style="margin: 2px 0px 8px 0px;">'+req.body.projectname+'</h2><p>Do you want to accept a request?</p><div class="inln"><a class="pdngs" style="color:#fff; font-weight: bold; border: 1px solid; padding: 4px 10px 4px 10px; text-decoration: none; color: #fff; background: red;" href="https://project-managment-ap.herokuapp.com/login?projectid='+req.body.projectid+'&user='+req.body.assignuser+'&projectname='+req.body.projectname+'&action=decline">Decline</a><a style="margin-left:40px; font-weight:bold; font-weight: bold; border: 1px solid; padding: 4px 10px 4px 10px; text-decoration: none; color: #fff; background: #ff5800;" href="https://project-managment-ap.herokuapp.com/login?projectid='+req.body.projectid+'&user='+req.body.assignuser+'&projectname='+req.body.projectname+'&action=accept">Accept</a></span></div></div></div>'
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                res.send({data:"Record has been Inserted"});
            });    
          }   
          })
        }
      })
      }
    }
  }) 
})

app.post("/api/createassignuser",function(req,res){ 
    var assignusertask = new task_user(req.body); 
    assignusertask.save(function(err,data){  
    if(err){  
         res.send(err);                
      }  
      else{        
            req.body.action = "unseen";
            req.body.notify = ("Your are invited by "+req.body.user+" for "+req.body.projecttaskname+" task ");
            var notifications = new notification(req.body); 
            notifications.save(function(err,data){  
            if(err){  
               res.send(err);                
            }  
            else{
              res.send({data:"Notification has been Inserted..!!"}); 
            }
          })
      }
    });
})
app.post("/api/deleteAssignUser",function(req,res){
  task_user.remove({ "projecttaskid": req.body.taskid,"assignuser": req.body.userassigned }, function(err) {    
            if(err){    
                 res.send(err);    
            }    
            else{    
                req.body.assignuser = req.body.userassigned   
                req.body.action = "unseen";
                req.body.notify = ("Your are Deleted by "+req.body.user+" for "+req.body.taskname+" task ");
                var notifications = new notification(req.body); 
                notifications.save(function(err,data){  
                if(err){  
                   res.send(err);                
                }  
                else{
                  res.send({data:"Notification has been Inserted..!!"}); 
                }
              })               
            }    
          });
})
/*/////////???*/
app.post("/api/getbytaskid",async function(req,res){ 
var users = []; 
   let all_users = await project_user.find().where({ projectid : req.body.projectid, status: "true"}).exec( );
    for(var i = 0; i < all_users.length; i++){
        var objectuser = {};
        let tu = await task_user.findOne().where({ projecttaskid : req.body.taskid, assignuser: all_users[i].assignuser}).exec();

        if(!tu){
           objectuser = {
            assignuserdata:  all_users[i].assignuser,
            is_assigned: false
          }
        }else{
          objectuser = {
            assignuserdata: all_users[i].assignuser,
            is_assigned: true  
          }
        }
        users.push(objectuser);
    }
    res.send(users);
  })
/*----comments--------*/
  app.post("/api/createcomment",function(req,res){
  var comments = new comment(req.body); 
  comments.save(function(err,data){  
    if(err){  
       res.send(err);                
    }  
    else{        
        res.send({data:"Record has been Inserted"});  
    }  
  });
})
  app.post("/api/getComments",function(req,res){  
       comment.find().where({ projectid : req.body.projectid, taskid : req.body.taskid}).sort({_id: -1}).
          exec(function(err, data){ 
   if (err) {  
   res.send(err);         
   }  
   else{        
        res.send(data);  
     } 
   });
})
app.post("/api/deleteComment",function(req,res){
  comment.remove({ "_id": req.body.commentid }, function(err) {    
    if(err){    
         res.send(err);    
    }    
    else{      
        res.send({data:"Record has been Deleted..!!"});               
    }    
  });
})
app.post("/api/updateComment",function(req,res){ 
    comment.findByIdAndUpdate(req.body.id, { comment: req.body.comment},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{        
          res.send({data:"Record has been Updated..!!"});  
     } 
   });
     })
/*----end Comments-----------*/
 /*---get Notifications-----------*/
 app.post("/api/Getnotification",function(req,res){
 var mysort = { _id: -1 };    
  notification.find().where({ assignuser : req.body.email}).sort(mysort).
  exec(function(err, data){ 
   if (err) {  
    res.send(err);         
   }  
   else{   
    res.send(data);  
     } 
  });
}) 
 app.post("/api/GetUnseenNotification",function(req,res){  
  notification.find().where({ assignuser : req.body.email, action : "unseen"}).sort({_id: -1}).
  exec(function(err, data){ 
   if (err) {  
    res.send(err);         
   }  
   else{   
    res.send(data);  
     } 
  });
}) 

app.post("/api/Setnotification",function(req,res){ 
  notification.findByIdAndUpdate(req.body.id, { action: "seen"},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{        
          res.send({data:"Record has been Updated..!!"});  
     } 
   });
})   
/******************************/

app.post("/api/GetAllInvitation/",function(req,res){  
  project_user.find().where({ assignuser : req.body.email, status: "false"}).
  exec(function(err, data){  
    if(err){  
      res.send(err);  
    }  
    else{              
      res.send(data);  
    }  
  });  
}); 
app.post("/api/GetOneInvitation/",function(req,res){  
  project_user.find().where({ assignuser : req.body.email, projectid : req.body.projectid, status: "false"}).
  exec(function(err, data){  
    if(err){  
      res.send(err);  
    }  
    else{             
      res.send(data);  
    }  
  });  
}); 

app.post("/api/GetAcceptdProject/",function(req,res){ 
//console.log(req.body); 
  project_user.find().where({ assignuser : req.body.email, status: "true"}).
  exec(function(err, data){  
    if(err){  
      res.send(err);  
    }  
    else{              
      res.send(data);  
    }  
  });  
}); 
app.post("/api/acceptrequest",function(req,res){ 
  req.body.status = "true";
  project_user.findByIdAndUpdate(req.body.id, { status: req.body.status},  
  function(err,data) {  
    if (err) {  
      res.send(err);         
    }  
    else{
      req.body.action = "unseen";
      req.body.status = "true";
      req.body.notify = ("Your request has been accepted by " +req.body.user+ " for " +req.body.projectname+" project");
      var notifications = new notification(req.body); 
      notifications.save(function(err,data){  
        if(err){  
           res.send(err);                
        }  
        else{
          res.send({data:"Accepted successfully"});   
        }
      })
    } 
  });
})

app.post("/api/deleteProject",function(req,res){
  project.remove({ "_id": req.body.id }, function(err) {    
    project_user.remove({ "projectid": req.body.id }, function(err) { 
      task.remove({ "projectid": req.body.id }, function(err) { 
        comment.remove({ "projectid": req.body.id }, function(err) {
          notification.remove({ "projectid": req.body.id }, function(err) { 
            task_user.remove({ "projectid": req.body.id }, function(err) { 
              res.send({data:"Record has been Deleted..!!"
              });       
            });      
          });        
        });       
      });       
    });
  });
})
  
app.post("/api/updatproject",function(req,res){ 
    project.findByIdAndUpdate(req.body.id, { name: req.body.name},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{
        project_user.update({"projectid": req.body.id }, {$set:{"projectname": req.body.name}}, function(err, result){
          if (err) {
              res.send({err});
          } else {
              res.send({data:"Project Name has been Updated..!!"});
          }
        });    
     } 
   });
     })

app.post("/api/deleteNotification",function(req,res){
  notification.remove({ "_id": req.body.id }, function(err) {    
    if(err){    
         res.send(err);    
    }    
    else{  
     res.send({data:"Notification has been Deleted..!!"});              
    } 
  })
})
app.post("/api/declinerequest",function(req,res){
  project_user.remove({ "_id": req.body.id }, function(err) {    
    if(err){    
         res.send(err);    
    }    
    else{
        req.body.action = "unseen";
        req.body.notify = ("Your request are decline by "+req.body.user+" for "+req.body.projectname+" project");
        var notifications = new notification(req.body); 
        notifications.save(function(err,data){  
        if(err){  
           res.send(err);                
        }  
        else{
            res.send({data:"Declined successfully"});
          }  
        })
    }              
  })   
})

app.post("/api/changepassword",function(req,res){
  user.find().where({"email": req.body.email, "password": req.body.password})
    .count(function(err,count, data){  
    if(err){  
       res.send(err);                
    }  
    else{    
      if(count == "1")
      {
        user.update({"email": req.body.email }, {$set:{"password": req.body.confirmpassword}}, function(err, result){
          if (err) {
              res.send({err});
          } else {
              res.send({data:"Password has been Updated..!!"});
          }
        });
      }   
      else{
        res.send({data:"Invalide Old Password "});  
      }  
    } 
  }); 
})
app.post("/api/resendpassword",function(req,res){
  user.find().where({"email": req.body.email})
          .count(function(err,count, data){  
      if(err){  
         res.send(err);                
      }  
      else{    
        if(count == "1")
        {
          
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false,
                port: 25,
                auth: {
                  user: 'anniat44@gmail.com',
                  pass: 'annyattri@#1'
                },
                tls: {
                  rejectUnauthorized: false
                }
            });

            let mailOptions = {
                from: '"Admin" <dinesh.codecorners@gmail.com>', // sender address
                to: req.body.email, // list of receivers to: 'bar@example.com, baz@example.com',
                subject: 'Notification', // Subject line
                text: 'Node js App', // plain text body
                html: '<div class="row" style="color: #3f3f44; font-size:16px; font-family: Helvetica,Arial,sans-serif; font-weight: 400;line-height: 1.5"><div class="col-md-3" style="border:1px solid #ccc; background: #f5f5f5; padding:20px; width:60%; margin-top:10px; box-shadow: 1px 1px 0px 2px #e6e6e6; border-radius: 5px;"><h2 style="color: #080808; text-align: center; margin-bottom: 10px;"> Reset Password</h2><hr style="margin-bottom: 25px !important;"><b style="margin: 2px 0px 8px 0px;">If You Forgot Your Password</b><p>Please click the button below to change your password</p><div class="inln"><a class="pdngs" style="color:#fff; font-weight: bold; border: 1px solid; padding: 10px 20px 10px 20px; text-decoration: none; color: #fff; background: #54c4ff;" href="https://project-managment-ap.herokuapp.com/resetpassword?email='+req.body.email+'">Reset Password</a></span></div></div></div>'
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                res.send({data:"Send Email"});
            });
          
           
        }   
        else{
          res.send({data:"The email address you have entered is not registered"}); 
        }  
      } 
 }); 
})
app.post("/api/resetpassword",function(req,res){
  user.update({"email": req.body.email }, {$set:{"password": req.body.confirmpassword}}, function(err, result){
    if (err) {
        res.send({err});
    } else {
        res.send({data:"Password has been Updated..!!"});
    }
  });
})
app.post("/api/getUserProfile/",function(req,res){ 
  user.find().where({ "email" : req.body.email}).
  exec(function(err, data){  
    if(err){  
      res.send(err);  
    }  
    else{              
      res.send(data);  
    }  
  });  
});
app.post("/api/updatusername/",function(req,res){  
  user.update({"email": req.body.email }, {$set:{"name": req.body.name}}, function(err, result){
    if (err) {
        res.send({err});
    } else {
        res.send({data:"User Name has been Updated..!!"});
    }
  }); 
});
/*--Delete Update Task---*/
app.post("/api/updateTask",function(req,res){ 
    task.findByIdAndUpdate(req.body.id, { task: req.body.task},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{
        task_user.update({"projecttaskid": req.body.id }, {$set:{"projecttaskname": req.body.task}}, function(err, result){
          if (err) {
              res.send({err});
          } else {
              res.send({data:"Task Name has been Updated..!!"});
          }
        });    
     } 
  });
})
app.post("/api/deleteTask",function(req,res){
  task.remove({ _id: req.body.id }, function(err) {    
   task_user.remove({ "taskid": req.body.id }, function(err) { 
      comment.remove({ "taskid": req.body.id }, function(err) {
        notification.remove({ "taskid": req.body.id }, function(err) { 
            res.send({data:"Task has been Deleted..!!"
            });       
        });      
      });        
    });      
  });   
});
app.post("/api/sendDueDate",function(req,res){ 
    task.findByIdAndUpdate(req.body.id, { duedate: req.body.date,  time: req.body.time},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{
      res.send({data:"Due Date has been Updated..!!"});
    }
  });  
});
app.post("/api/removedate",function(req,res){ 
  req.body.date = "";
   req.body.time = "";
    task.findByIdAndUpdate(req.body.id, { duedate: req.body.date,time: req.body.time },  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{
      res.send({data:"Date has been Updated..!!"});
    }
  });  
});
app.post("/api/sendMove",function(req,res){ 
    task.findByIdAndUpdate(req.body.id, { status: req.body.status},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{
      res.send({data:"Status has been Updated..!!"});
    }
  });  
});
app.post("/api/archive",function(req,res){ 
    req.body.state ="0";
    task.findByIdAndUpdate(req.body.id, { state: req.body.state},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{
    task_user.update({"projecttaskid": req.body.id }, {$set:{"state": req.body.state}},{multi: true},
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{
      res.send({data:"task has been deactive..!!"});
    }
  });
    }
  });  
});
app.post("/api/activeArchive",function(req,res){ 
    req.body.state ="1";
    task.findByIdAndUpdate(req.body.id, { state: req.body.state},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }
   else{
    task_user.update({"projecttaskid": req.body.id }, {$set:{"state": req.body.state}},{multi: true},
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{
      res.send({data:"task has been Active..!!"});
    }
  });
    }  
  });  
});
/*--------------------------------*/
/*-------------*/
/*var upload = multer({ dest: 'assets/images/'});
var type = upload.single('image'); */

/*app.post("/api/uploadImage",function(req,res){
  console.log(req.file);
      var src = fs.createReadStream(target_path);
      var dest = fs.createWriteStream(target_path);

  user.update({"email": req.body.email }, {$set:{"profile": req.file.path}}, function(err, result){
    if (err) {
        res.send({err});
    } else {
        res.send({data:"Profile has been Added..!!"});
    }
  });
});*/
/*-------for file upload (Attachment of task)---------*/ 
var fileName;
var uniqname;
var uploadfileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'dist/ProjectManegment/assets/images/fileUpload/');
    },
    filename: function (req, file, cb) {
        fileName = file.fieldname + "_" +Date.now() + "_" + file.originalname;
        uniqname =fileName;
        cb(null, fileName);
    }
});
var uploadFile = multer({storage: uploadfileStorage});
var type = uploadFile.single('file');

app.post("/api/uploadattachment",type,function(req,res){
  console.log(uniqname);
  req.body.attachment =uniqname;
  req.body.taskid = req.body.id;
  var attach = new attachment(req.body); 
  attach.save(function(err,data){  
    if(err){  
       res.send(err);                
    }  
    else{        
        res.send({data:"Record has been Inserted"});  
    }  
  });
})
app.post("/api/getAttachment/",function(req,res){ 
  attachment.find().where({ "taskid" : req.body.id}).
  exec(function(err, data){  
    if(err){  
      res.send(err);  
    }  
    else{              
      res.send(data);  
    }  
  });  
});
app.post("/api/removeattachment/",function(req,res){ 
  attachment.remove({ "_id": req.body.id }, function(err) {    
    if(err){    
         res.send(err);    
    }    
    else{      
        res.send({data:"Record has been Deleted..!!"});               
    }    
  });
})
 
/*task.update({"id": req.body.id }, {$set:{"attachment": req.file.originalname}}, function(err, result){
    if (err) {
        res.send({err});
    } else {
        res.send({data:"Attachment has been Added..!!"});
    }
  });
}); */
/*----for User Proile images change---------*/
var imageName;

var uploadStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'dist/ProjectManegment/assets/images/upload');
    },
    filename: function (req, file, cb) {
        imageName = file.originalname;
        cb(null, imageName);
    }
});
var upload = multer({storage: uploadStorage});
var type = upload.single('image');

app.post("/api/uploadImage",type,function(req,res){
user.update({"email": req.body.email }, {$set:{"profile": req.file.originalname}}, function(err, result){
    if (err) {
        res.send({err});
    } else {
        res.send({data:"Profile has been Added..!!"});
    }
  });
});