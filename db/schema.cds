namespace db;
using {managed} from '@sap/cds/common';
entity department {
    key Did       : UUID;
        Deptid    : String;
        Deptname  : String;
        Deptphone : String;
        Depttolec : Composition of many lecturer
                        on Depttolec.Lectodept = $self;
        Depttostu : Composition of many student
                        on Depttostu.Stutodept = $self;
}

entity lecturer {
        key Lid         : UUID;
         Lectid      : String;
         Did         : String;
        Lectname    : String;
        Lectphone   : String;
        Lectaddress : String;
        LectEmail   : String;
        Deptid      : String;
        Lectodept   : Association to  many department
                          on Lectodept.Did = Did;
}

entity student {
    key Sid       : UUID;
        Did       : UUID;
       key Stuid     : String default '-';
        Stuname   : String;
        Stuage    : String;
        Stuphone  : String;
        Stubg     : String;
        Deptid    : String;
        Stutodept : Association to many department
                        on Stutodept.Did = Did;
}

entity lecture {
    key idd         : UUID;
        Lectid      : String default '-';
        // default 'default lecturer' @readonly;
        Lectname    : String;
        Lectphone   : String;
        Lectaddress : String;
        LectEmail   : String;
        Status : String default 'Pending';
        Lectdept : String;
        Lgender : String;
        Lskill : String;
        Rejectedby : String;
        Dob : Date;
        Age : Integer;
        
        lectofil : Composition of  many files on lectofil.filtolec = $self;
}

entity auth{
    key Username:String;
    Id:String;
}

entity files : managed {
    key id        : UUID;
        fkey      : UUID;

        @Core.MediaType  : mediaType
        content   : LargeBinary;

        @Core.IsMediaType: true
        mediaType : String;
        fileName  : String;
        size      : Integer;
        url       : String;
        filtolec  : Association to one lecture 
                        on filtolec.idd = fkey;
        
}