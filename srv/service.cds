using db from '../db/schema';
service  MyService {
    @odata.draft.enabled
entity department as projection on db.department;
entity lecturer as projection on db.lecturer;
entity student as projection on db.student;
 @odata.draft.enabled
entity lecture as projection on db.lecture;
entity auth as projection on db.auth;

function getNextLecturerId() returns String;
    function getNextStudentId() returns String;
}
