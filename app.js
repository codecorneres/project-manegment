
var express = require('express');  
var path = require("path");
const http = require('http');   
var bodyParser = require('body-parser');  
var mongoose = require("mongoose");
var Promise = mongoose.Promise = require('bluebird');

require('dotenv').config();
const nodemailer = require('nodemailer');
const mailer = require('express-mailer');
//app.set('view engine', 'pug')

var db = mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://dinesh:admin123@ds119161.mlab.com:19161/mogodata', { useNewUrlParser: true });  
const fs = require('fs');  
var app = express();  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) 
var Transport = require("transport"),
  transport = new Transport();
   
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

// set the view folder to views
/*app.set('views', __dirname + '/views');
// set the view engine to pug
app.set('view engine', 'pug');
mailer.extend(app, {
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
  user: 'anniat44@gmail.com', // gmail id
  pass: '9418165286' // gmail password
  }
});
app.get('/', function (req, res) {
  var mailOptions = {
    from: 'ADmin <info@codecorners.com>',
    to: 'anniat44@gmail.com',
    subject: 'Email from SMTP sever',
    user: {  // data to view template, you can access as - user.name
      name: 'admin',
      message: 'Welcome to Node js'
    }
  }
 
  app.mailer.send('email', mailOptions, function (err, message) {
    if (err) {
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    console.log(message);
    return res.send('Email has been sent!');
  });
 
});*/
 
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
  projecttaskname : { type: String}
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
 user : { type: String}
});

var adminLogin = new Schema({    
 email :{ type: String, required: true },
 password : { type: String},
 name : { type: String}
}); 
var usersLogin = new Schema({    
 email :{ type: String, required: true },
 password : { type: String},
 name : { type: String}
});

var UsersSchema = new Schema({
 projectid : { type: String}, 
 projectname : { type: String },
 taskid : { type: String },
 task : { type: String },
 user : { type: String},
 comment : { type: String}
});  
var user = mongoose.model('user', usersLogin);  
var admin = mongoose.model('admin', adminLogin); 
var project = mongoose.model('project', Usersproject);
var task = mongoose.model('task', Userstask);
var comment = mongoose.model('comment', UsersSchema);
var project_user = mongoose.model('project_user', UsersAssignProject);
var task_user = mongoose.model('task_user', UsersAssigntask);
var notification = mongoose.model('notification', notificationschema);

 
/*----------For Admin Sing Up------------*/
/*app.post("/api/login",function(req,res){ 
    admin.find().where({"email": req.body.email,"password": req.body.password})
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
 }) */

/*app.post("/api/singUp",function(req,res){
  admin.find().where({"email": req.body.email})
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
          var mod = new admin(req.body); 
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
}) */
/*-------------------*/
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
        res.send(data);  
     } 
   });
})
app.post("/api/getTaskDescription",function(req,res){     
       task.findOne().where({ _id : req.body.taskid}).
          exec(function(err, data){ 
   if (err) {  
   res.send(err);         
   }  
   else{       
        res.send({data: data.description});  
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
  user.find().where({"email": req.body.assignuser})
  .count(function(err,count, data){  
    if(err){  
       res.send(err);                
    }  
    else{    
      if(count == "1")
      {
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
                      html: '<b style="color: #080808;">'+req.body.notify+'</b><div class="row" style="color: #3f3f44; font-family: Helvetica,Arial,sans-serif; font-size: 15px; font-weight: 400;line-height: 1.5"><div class="col-md-3" style="border:1px solid #ccc; background: #f5f5f5; padding:10px; width:30%; margin-top:10px; box-shadow: 1px 1px 0px 2px #e6e6e6; border-radius: 5px;"><h2 style="margin: 2px 0px 8px 0px;">'+req.body.projectname+'</h2><b style="padding-bottom:10px;">Do you want to accept a request?</b><div class="inln"><a class="pdngs" style="color:#fff; font-weight: bold; border: 1px solid; padding: 1px 10px 1px 10px; text-decoration: none; color: #fff; background: red;" href="https://project-managment-ap.herokuapp.com/login?projectid='+req.body.projectid+'&user='+req.body.assignuser+'&projectname='+req.body.projectname+'&action=decline">Decline</a><a style="margin-left:20px; font-weight:bold; font-weight: bold; border: 1px solid; padding: 1px 10px 1px 10px; text-decoration: none; color: #fff; background: #ff5800;" href="https://project-managment-ap.herokuapp.com/login?projectid='+req.body.projectid+'&user='+req.body.assignuser+'&projectname='+req.body.projectname+'&action=accept">Accept</a></span></div></div></div>' // html body
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
      }   
      else{
        res.send({data:"The email address you have entered is not registered"});  
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
       comment.find().where({ projectid : req.body.projectid, taskid : req.body.taskid}).sort({_id: -1}).limit(5).
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
          res.send({data:"Record has been Updated..!!"});  
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

app.post("/api/sendMail",function(req,res){

    // create reusable transporter object using the default SMTP transport
//console.log(req.body);
    /*let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
          user: 'anniat44@gmail.com',
          pass: '9418165286'
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
        html: '<b style="color: #080808;">'+req.body.notify+'</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(info);
        
    });*/
})
/*const sendmail = require('sendmail')({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  silent: false,
  dkim: { // Default: False
    privateKey: fs.readFileSync('./dkim-private.pem', 'utf8'),
    keySelector: 'mydomainkey'
  },
  devPort: 1025, // Default: False
  devHost: 'localhost', // Default: localhost
  smtpPort: 2525, // Default: 25
  smtpHost: 'localhost' // Default: -1 - extra smtp host after resolveMX
})
 
sendmail({
    from: 'anniat44@gmail.com',
    to: 'p2072627@nwytg.com',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});*/
/***********/
/********/
/*****/
/*app.post("/api/SaveUser",function(req,res){
model.update({"email": req.body.email }, {$set:{"projectname": req.body.projectname,"date": req.body.date,"starttime": req.body.starttime,"endtime": req.body.endtime}}, function(err, result){
    if (err) {
        res.send({err});
    } else {
        res.send({data:"Record has been Inserted..!!"});
    }
});
})



  app.post("/api/update",function(req,res){ 
       model.findByIdAndUpdate(req.body.id, { name: req.body.name, email: req.body.email, password: req.body.password},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{        
          res.send({data:"Record has been Updated..!!"});  
     } 
   });
     })
 app.post("/api/deleteUser",function(req,res){     
    model.remove({ _id: req.body.id }, function(err) {    
     if(err){    
         res.send(err);    
     }    
     else{      
            res.send({data:"Record has been Deleted..!!"});               
        }    
 });    
   })  */

  /*var upload = multer({ dest: 'assets/images/upload/'});
  var type = upload.single('image');
*/
  /*app.post("/api/uploadImage",type,function(req,res){
      var tmp_path = req.file.path;
      var target_path = 'assets/images/upload/' + req.file.originalname;
      //var src = fs.createReadStream(target_path);
      ///var dest = fs.createWriteStream(target_path);

    console.log(tmp_path);
  });
  send notifications
https://www.c-sharpcorner.com/article/push-notifications-using-angular-4-in-browser/

// 
        /*task_user.find().where({ projecttaskid : req.body.taskid}).
        exec(function(err, data){ 

          data.forEach(function(assign) {
            arrayassingvalue.push(assign.assignuser);
          }); */

        //console.log(arrayassingvalue);
      /*for(var x = 0; x< arrayvalue.length; x++){
        if(arrayassingvalue[x] == arrayvalue[]){
            console.log(arrayvalue);
        }*/
        //console.log(arrayassingvalue[x]);
      //}


