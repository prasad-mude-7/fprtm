const mongoose = require("mongoose")
const {model,Schema} = require("mongoose")

mongoose.connect('mongodb://localhost:27017/RELATION',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })

  const aap = require('express')()

  const DepartmentSchema = new Schema({
      name:String,
      loaction:String
  })

  var Department = model("department",DepartmentSchema)

   var EmployeeSchema = new Schema({
       fname:String,
       lname:String,
       department: [{type:Schema.Types.ObjectId, ref:'department'}]
   })

   var Employee = model('employee',EmployeeSchema)

  aap.use('/',async (req,res)=>{
      
    await Department.remove({})

    await Department.create({
        name:"marketing dept",
        loaction:"mumbai"
    })

    await Department.create({
        name:"IT dept",
        loaction:"pune"
    })

    await Employee.remove({})

    await Employee.create({
        fname:"viktor",
        lname:"khawaja",
        department: await Department.findOne({loaction:"pune"})
    })

    res.json({
        departments: await Department.find(),
        employees: await Employee.find(),
        employeeswithdept: await Employee.find().populate('department')
    })
})


aap.listen(3050,() => {
    console.log('Server is running on port 3050')
})