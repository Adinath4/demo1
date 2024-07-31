// const { cds } = require('@sap/cds');

module.exports = async function (params) {
    const { department,lecturer,student,lecture } = this.entities;
// debugger

this.before('READ',department, async (req) => {

});

    this.before('CREATE', lecture.drafts, async (req) => {
        let lec = await SELECT.from(lecture);
        let data=await SELECT.from(lecturer).where `Lectid='356330a4-43c2-4745-9046-16e0abde0598'`;  
        // debugger
        var e_dataLExits = data[0].Lectphone;
        let Stu = 'L001';
        if (e_dataLExits){
            const num_s = parseInt(e_dataLExits.substr(1));
            nextLec = 'L' + ('000' + (num_s + 1)).slice(-3);
        }
        // debugger
        req.data.Lectid = nextLec;
        let [ Lectid ] = [ nextLec ];
       
    });
// Validation of Lecture with mail and phone
this.before('CREATE', lecture, async (req) => {
    await cds.update(lecturer).set({Lectphone:nextLec}).where({  Lectid:'356330a4-43c2-4745-9046-16e0abde0598'});
    // debugger


    const Lectname = req.data.Lectname;
    const nameRegex = /^[A-Za-z\s]+$/;


        // Check if Deptname is valid
        if (!nameRegex.test(Lectname)) {
            req.error(400, 'Lecture name must contain only alphabetic characters.');
            return;  // Exit early if ther
        }


    const Phone1 = req.data.Lectphone;
    const phoneRegex = /^\d+$/;

    // Check if Deptphone is valid
    if (!phoneRegex.test(Phone1)) {
        req.error(400, 'Lecture phone number must contain only numeric values and no spaces.');
        return;  // Exit early if there's an error
    }

    const Lectemail = req.data.LectEmail;
    // const emailRegex = /^[^\s@]+@[^\s@]+\@gmail\.com$/;
    let existingEmail = await (SELECT.from(lecture).where({ LectEmail:Lectemail}));
    if (!Lectemail.endsWith('@gmail.com'))
        // Check if Lectemail is valid
        if (existingEmail.length > 0) {
            req.error(400, `Lecture mail ${Lemail} already exists.`);
            return;  // Exit early if there's an error
        }
        
    const Phone = req.data.Lectphone;
    let existingPhone1 = await (SELECT.from(lecture).where({ Lectphone: Phone}));
     
       if (existingPhone1.length > 0) {
           req.error(400, `Lecture Phone number ${Phone} already exists.`);
           return;  // Exit early if there's an error
       }
    
});

// Validation on both create and update
this.before('CREATE', department, async (req) => {
    await cds.update(lecturer).set({LectEmail:nextLec}).where({ Lectid :'356330a4-43c2-4745-9046-16e0abde0598'});
    // debugger
    const Deptname = req.data.Deptname;
    // const nameRegex = /^[A-Za-z]+$/;


    //     // Check if Deptname is valid
    //     if (!nameRegex.test(Deptname)) {
    //         req.error(400, 'Department name must contain only alphabetic characters and no spaces.');
    //         return;  // Exit early if ther
    //     }
    var existingEmail = await (SELECT.from(department).where({ Deptname: Deptname}));

   if (existingEmail.length > 0) {
       req.error(400, `Department ${Deptname} already exists.`);
       return;  // Exit early if there's an error
   }
   const Phone = req.data.Deptphone;
   const phoneRegex = /^\d+$/;

        // Check if Deptphone is valid
        if (!phoneRegex.test(Phone)) {
            req.error(400, 'Department phone number must contain only numeric values and no spaces.');
            return;  // Exit early if there's an error
        }
   
   let existingPhone = await (SELECT.from(department).where({ Deptphone: Phone}));

  if (existingPhone.length > 0) {
      req.error(400, `Department ${Phone} already exists.`);
      return;  // Exit early if there's an error
  }


 // Extract the list of students from the request data
 const students = req.data.Depttostu;
 debugger
     // Fetch the maximum student ID from the student.drafts table
     const maxStuidResult = await cds.run(
         SELECT.from(student)
             .columns('Stuid')
             .orderBy({ Stuid: 'desc' })
             .limit(1)
     );

     // Extract the maximum ID and determine the next ID
     let lastIdNumber = 0;
     if (maxStuidResult.length > 0) {
         const lastStuid = maxStuidResult[0].Stuid;
         lastIdNumber = parseInt(lastStuid.substring(1), 10); // Remove 'S' and convert to number
     }

     // Assign new IDs to each student
     students.forEach((stu, index) => {
         stu.Stuid = `S${lastIdNumber + index + 1}`; // Increment ID for each student
     });

     // No need to return anything explicitly as `before` hooks don't modify the response

});


this.before('UPDATE', department, async (req) => {
    const students = req.data.Depttostu;
 debugger
     // Fetch the maximum student ID from the student.drafts table
     const maxStuidResult = await cds.run(
         SELECT.from(student)
             .columns('Stuid')
             .orderBy({ Stuid: 'desc' })
             .limit(1)
     );

     // Extract the maximum ID and determine the next ID
     let lastIdNumber = 0;
     if (maxStuidResult.length > 0) {
         const lastStuid = maxStuidResult[0].Stuid;
         lastIdNumber = parseInt(lastStuid.substring(1), 10); // Remove 'S' and convert to number
     }

     // Assign new IDs to each student
     students.forEach((stu, index) => {
         stu.Stuid = `S${lastIdNumber + index + 1}`; // Increment ID for each student
     });

     // No need to return anything explicitly as `before` hooks don't modify the response

});


this.before('UPDATE', department, async (req) => {
    debugger
    const Deptname = req.data.Deptname;
    var existingEmail = await (SELECT.from(department).where({ Deptname : Deptname}));
    if (existingEmail[0].Deptname != Deptname) {
       req.error(400, `Department ${Deptname} already exists.`);
       return;  // Exit early if there's an error
   }
   debugger
   const Phone = req.data.Deptphone;
   let existingPhone = await (SELECT.from(department).where({ Deptphone: Phone}));
  if (existingPhone[0].Deptphone != Phone) {
      req.error(400, `Department ${Phone} already exists.`);
      return;  // Exit early if there's an error
  }
});
// ////////////////////////////////////////////////////
// Automatic Id generation
this.before('CREATE', department.drafts, async (req) => {
    // debugger

    let lec = await SELECT.from(department);
    let data=await SELECT.from(lecturer).where `Lectid='356330a4-43c2-4745-9046-16e0abde0598'`;  
    // debugger

    var e_dataLExits = data[0].LectEmail;
    let Stu = 'D001';
    if (e_dataLExits){
        const num_s = parseInt(e_dataLExits.substr(1));
        nextLec = 'D' + ('000' + (num_s + 1)).slice(-3);
    }
    req.data.Deptid = nextLec;
    let [ Deptid ] = [ nextLec ];
    // await cds.update(lecturer).set({LectEmail:nextLec}).where({ Lectid :'356330a4-43c2-4745-9046-16e0abde0598'});
});

// this.before('CREATE', student.drafts, async (req) => {
//     // debugger
//     let stud = await SELECT.from(student.drafts);
//     let data=await SELECT.from(lecturer).where `Lectid='356330a4-43c2-4745-9046-16e0abde0598'`;  
//     debugger

//     var e_dataLExits = data[0].Lectname;
//     let Stu = 'S001';
//     if (e_dataLExits){
//         const num_s = parseInt(e_dataLExits.substr(1));
//         nextLec = 'S' + ('000' + (num_s + 1)).slice(-3);
//     }
//     req.data.Stuid = nextLec;
//     let [ Stuid ] = [ nextLec ];
//     await cds.update(lecturer).set({Lectname:nextLec}).where({ Lectid:'356330a4-43c2-4745-9046-16e0abde0598'});
// });


this.before('UPDATE', student.drafts ,async (req) => {
    debugger
    const Phone = req.data.Stuphone;
    let existingPhone = await SELECT.from(student).where({ Stuphone : Phone });
    if (existingPhone.length > 0) {
        req.error(400, `Student Phone ${Phone} already exists in other department`);
        return;  // Exit early if there's an error
    }
    const phoneRegex = /^\d+$/;

        // Check if Deptphone is valid
        if (!phoneRegex.test(Phone)) {
            req.error(400, 'STUDENT phone number must contain only numeric values and no spaces.');
            return;  // Exit early if there's an error
        }
//     debugger
//     
// if (existingPhone.length > 0) {
//     // Phone number exists in the main student entity
//     req.error(400, `Student Phone ${Phone} already exists in other department`);
//     return;  // Exit early if there's an error
// }
// // // } else {
// //     //     // Phone number does not exist in the main student entity, check drafts
// //     //     let existingPhone1 = await SELECT.from(student.drafts).where({ Stuphone: Phone });
    
// //     //     if (existingPhone1.length > 0) {
// //     //         // Phone number exists in the draft records
// //     //         req.error(400, `Student Phone ${Phone} already exists.`);
// //     //         return;  // Exit early if there's an error
// //     //     }
// //     // }
 
//    debugger
  
// // //    existingPhone1 = await (SELECT.from(student.drafts).where({ Stuphone: Phone}));
// // //   if (existingPhone1.length > 0) {
// // //       req.error(400, `Student Phone ${Phone} already exists.`);
// // //       return;  // Exit early if there's an error
// // //   }

});

// this.before(['CREATE', 'UPDATE'], department, async (req) => {
//     const { Depttolec } = req.data;  // Extract the list of lectures to be added
// debugger
//     if ( Depttolec.length > 0) {
       
//             // Retrieve existing lectures associated with the department
//             const existingLecturers = await cds.run(
//                 SELECT.from(lecturer.drafts)
//                     .where({ Deptid: req.data.Deptid })
//                     .columns('Lectid')
//             );

//             // Create a set of existing lecture IDs for quick lookup
//             const existingLecturerIds = new Set(existingLecturers.map(l => l.Lectid));

//             // Check for duplicates in the request payload
//             for (const lec of Depttolec) {
//                 if (existingLecturerIds.has(lec.Lectid)) {
//                     req.error(400, `Lecture with ID ${lec.Lectid} is already associated with this department.`);
//                     return;  // Exit early if there's an error
//                 }
//             }
//     }
// });

this.before(['CREATE', 'UPDATE'], department, async (req) => {
debugger
    const newLectures = req.data.Depttolec;

    if (newLectures && newLectures.length > 0) {
        try {
            // Retrieve existing lectures associated with the department
            const existingLecturers = await cds.run(
                SELECT.from(lecturer.drafts)
                    .where({ Deptid: req.data.Deptid })
                    .columns('Lectid')
            );

            // Create a set of existing lecture IDs for quick lookup
            const existingLecturerIds = new Set(existingLecturers.map(l => l.Lectid));

            // Check for duplicates in the newLectures payload
            const lectureIds = new Set();
            for (const lec of newLectures) {
                // Check for duplicate IDs within the newLectures array
                if (lectureIds.has(lec.Lectid)) {
                    req.error(400, `Duplicate lecture ID ${lec.Lectid} found in request payload.`);
                    return;  // Exit early if there's an error
                }
                lectureIds.add(lec.Lectid);

                // Check if the lecture ID already exists in the department's existing lectures
                if (existingLecturerIds.has(lec.Lectid)) {
                    req.error(400, `Lecture with ID ${lec.Lectid} is already associated with this department.`);
                    return;  // Exit early if there's an error
                }
            }
        } catch (error) {
            req.error(500, `Error validating lecture associations: ${error.message}`);
        }
    }
});
//       // Check if a teacher with the same ID already exists in the same department
//                 var existingTeacher = await SELECT.from(lecturer.drafts)
//                     .where({ Lectid: req});
    
//                 if (existingTeacher.length > 0) {
//                     req.error(400, 'Teacher with the same ID already exists in this department.');
//                 }


// const newLectures = req.data.Depttolec;

//         if (newLectures && newLectures.length > 0) {
        
//                 // Retrieve existing lectures associated with the department
//                 const existingLecturers = await
//                     SELECT.from(lecturer.drafts)
//                         .where({ Lectid: req.data.Depttolec[0].Lectid });

//                         // if (existingLecturers.length > 1) {
//                         //                         req.error(400, 'Lecture with the same ID already exists in this department.');
//                         //                     }
                            
//                 // SELECT.from(lecturer.drafts).where(Deptid:)

//                 // Create a set of existing lecture IDs for quick lookup
//                 const existingLecturerIds = new Set(existingLecturers.map(l => l.Lectid));

//                 // Check each new lecture against existing ones
//                 for (const lec of newLectures) {
//                     if (existingLecturerIds.has(lec.Lectid)) {
//                         req.error(400, `Lecture with ID ${lec.Lectid} is already associated with this department.`);
//                         return;  // Exit early if there's an error
//                     }
//                 }
//             }
//           });
}
