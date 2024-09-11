using db from '../db/schema';
service  MyService {
    @cds.redirection.target
entity teachersw as projection on db.lecture where Status = 'Approved';

    @odata.draft.enabled
entity department as projection on db.department;
entity lecturer as projection on db.lecturer;
entity student as projection on db.student;
 @odata.draft.enabled
 @odata.draft.bypass
 @Common.SideEffects  : {
        $Type : 'Common.SideEffectsType',
        SourceProperties : [
            'Dob'
        ],
        TargetProperties : [
            'Age',
        ]
    }
entity lecture as projection on db.lecture;
entity auth as projection on db.auth;
//  @odata.draft.enabled
//   @odata.draft.bypass
entity files as projection on db.files;

function getRole(user:String) returns String;
    function getNextStudentId() returns String;
     function postattach(p : String) returns String;
     function discard(d : String) returns String;

}
