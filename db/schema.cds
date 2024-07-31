namespace db;

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
        Lectodept   : Association to many department
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
      key  Lectid      : String default '-';
        // default 'default lecturer' @readonly;
        Lectname    : String;
        Lectphone   : String;
        Lectaddress : String;
        LectEmail   : String;
}

entity auth{
    key Username:String;
    Id:String;
}