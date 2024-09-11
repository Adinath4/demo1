// const { cds } = require('@sap/cds');
const cds = require('@sap/cds');
const { update } = require('@sap/cds/libx/_runtime/hana/execute');

module.exports = async function (params) {
    const { department, lecturer, student, lecture, auth,files } = this.entities;

    this.on('postattach', async (req) => {
        debugger
        console.log('jatsfd');

    });
    this.on('discard', async (req) => {
        debugger
        await DELETE.from(files.drafts) .where({fkey :req.data.d});

    });
    this.before('CREATE', files.drafts, async (req) => {
    debugger
        req.data.url = `/files(id=${req.data.id},IsActiveEntity=true)/content`;
        return req;
    })
    this.before(['UPDATE','DELETE'], files.drafts, async (req) => {
        debugger
        await DELETE.from(files.drafts) .where({fkey :req.idd});
    })

    this.before(['CREATE','UPDATE'],lecture, async (req) => {
        debugger
        // await DELETE.from(files.drafts) .where({fkey :req.idd});     const today = new Date();

    })
    this.on('READ', lecture.drafts, async (req, next) => {
        // debugger
        if(req.data.Dob)
            {
                const dob = req.data.Dob;
                const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        // Adjust age if the birthday hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        await cds.update(lecture.drafts).set({ Age: age}).where({ idd : req.data.idd });
            }
        // await DELETE.from(files.drafts).where({fkey :req.idd});
        
        return next();
    });

    this.before('UPDATE', lecture, async (req) => {
        if (req.data.Status == 'Approved' && req.data.Lectid == null ) {
            let lec = await SELECT.from(lecture);
            let data = await SELECT.from(lecturer).where`Lectid='356330a4-43c2-4745-9046-16e0abde0598'`;
            // debugger
            var e_dataLExits = data[0].Lectphone;
            let Stu = 'L001';
            if (e_dataLExits) {
                const num_s = parseInt(e_dataLExits.substr(1));
                nextLec = 'L' + ('000' + (num_s + 1)).slice(-3);
            }
            // debugger
            req.data.Lectid = nextLec;
            let [Lectid] = [nextLec];

            await cds.update(lecturer).set({ Lectphone: nextLec }).where({ Lectid: '356330a4-43c2-4745-9046-16e0abde0598' });

        }
        await DELETE.from(files.drafts) .where({fkey :req.idd});
    });
    this.before('CREATE', lecture, async (req) => {
        debugger
        var Adminmail = await SELECT.from(auth).where`Username = 'ADMIN'`;
        var aemail = Adminmail[0].Id;
            var Hodmail = await SELECT.from(auth).where`Username = ${req.data.Lectdept}`;
            if (Hodmail == 0 || Hodmail == null || !Hodmail) {
                var data = await SELECT.from(auth).where`Username = 'NONE'`;
                hemail = data[0].Id;
            }
            else {
                var hemail = Hodmail[0].Id;
            }
        const workflowContent = {
            "definitionId": "us10.eb96ee75trial.bpaproject.process1",
            "context": {
                "lecturerName": req.data.Lectname,
                "dEPARTMENT": req.data.Lectdept,
                "eMAILADDRESS": req.data.LectEmail,
                "gENDER": req.data.Lgender,
                "aDDITIONALSKILL": req.data.Lskill,
                "fIELD1": hemail,
                "fIELD2": aemail,
                "tableid": req.data.idd

            }
        };
        req.data.Status = 'Pending';
        var SPA_API = await cds.connect.to('BpaDest');
        var result = await SPA_API.post('/workflow/rest/v1/workflow-instances', workflowContent);
        console.log(result);
        
    });
    this.on('getRole', async (req) => {
        console.log("ahhshdfafnsafjnsjfd");
        var rol;
        if (!rolee) {
            rol = 'ADMIN';
        } else {
            rol = null;
        }

        return rol;
    });

    // Validation of Lecture with mail and phone
    this.before('CREATE', lecture, async (req) => {

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
        let existingEmail = await (SELECT.from(lecture).where({ LectEmail: Lectemail }));
        if (!Lectemail.endsWith('@gmail.com'))
            // Check if Lectemail is valid
            if (existingEmail.length > 0) {
                req.error(400, `Lecture mail ${Lemail} already exists.`);
                return;  // Exit early if there's an error
            }

        const Phone = req.data.Lectphone;
        let existingPhone1 = await (SELECT.from(lecture).where({ Lectphone: Phone }));

        if (existingPhone1.length > 0) {
            req.error(400, `Lecture Phone number ${Phone} already exists.`);
            return;  // Exit early if there's an error
        }

    });

    // Validation on both create and update
    this.before('CREATE', department, async (req) => {
        let lec = await SELECT.from(department);
        let data = await SELECT.from(lecturer).where`Lectid='356330a4-43c2-4745-9046-16e0abde0598'`;
        // debugger

        var e_dataLExits = data[0].LectEmail;
        let Stu = 'D001';
        if (e_dataLExits) {
            const num_s = parseInt(e_dataLExits.substr(1));
            nextLec = 'D' + ('000' + (num_s + 1)).slice(-3);
        }
        req.data.Deptid = nextLec;
        let [Deptid] = [nextLec];
        await cds.update(lecturer).set({ LectEmail: nextLec }).where({ Lectid: '356330a4-43c2-4745-9046-16e0abde0598' });
        // debugger
        const Deptname = req.data.Deptname;
        // const nameRegex = /^[A-Za-z]+$/;


        //     // Check if Deptname is valid
        //     if (!nameRegex.test(Deptname)) {
        //         req.error(400, 'Department name must contain only alphabetic characters and no spaces.');
        //         return;  // Exit early if ther
        //     }
        var existingEmail = await (SELECT.from(department).where({ Deptname: Deptname }));

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

        let existingPhone = await (SELECT.from(department).where({ Deptphone: Phone }));

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
        debugger
        const students = req.data.Depttostu;
        // debugger
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
        debugger
        students.forEach((stu, index) => {
            debugger
            // Correct comparison operator is '==' or '==='
            if (stu.Stuid === '-') {
                stu.Stuid = `S${lastIdNumber + 1}`; // Increment ID for each student
            }
        });
    });
    this.before('UPDATE', department, async (req) => {

        const Deptname = req.data.Deptname;
        var existingEmail = await (SELECT.from(department).where({ Deptname: Deptname }));
        if (existingEmail[0].Deptname != Deptname) {
            req.error(400, `Department ${Deptname} already exists.`);
            return;  // Exit early if there's an error
        }
        //    debugger
        const Phone = req.data.Deptphone;
        let existingPhone = await (SELECT.from(department).where({ Deptphone: Phone }));
        if (existingPhone[0].Deptphone != Phone) {
            req.error(400, `Department ${Phone} already exists.`);
            return;  // Exit early if there's an error
        }
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


    this.before('UPDATE', student.drafts, async (req) => {
        // debugger
        const Phone = req.data.Stuphone;
        let existingPhone = await SELECT.from(student).where({ Stuphone: Phone });
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
        // debugger
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
