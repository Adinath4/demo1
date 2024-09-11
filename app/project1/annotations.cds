using MyService as service from '../../srv/service';
annotate service.department with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'department',
            ID : 'department',
            Target : '@UI.FieldGroup#department',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'STUDENT',
            ID : 'STUDENT',
            Target : 'Depttostu/@UI.SelectionPresentationVariant#STUDENT',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'lecture',
            ID : 'lecturetable',
            Target : 'Depttolec/@UI.LineItem#lecturetable1',
        },],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Department ID',
            Value : Deptid,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Department Name',
            Value : Deptname,
        },
    ],
);

annotate service.lecturer with @(
    UI.LineItem #lecturetable : [
        {
            $Type : 'UI.DataField',
            Value : Lectname,
            Label : 'Lectname',
        },]
);
annotate service.department with {
    Deptid @Common.FieldControl : #ReadOnly
};
annotate service.lecturer with @(
    UI.LineItem #LECTURE : [
        {
            $Type : 'UI.DataField',
            Value : Lectid,
            Label : 'Lecturer ID',
        },{
            $Type : 'UI.DataField',
            Value : Lectname,
            Label : 'Lecturer Name',
        },
        {
            $Type : 'UI.DataField',
            Value : Lectphone,
            Label : 'Lecturer Phone',
        },]
);
annotate service.student with @(
    UI.LineItem #STUDENT : [
        {
            $Type : 'UI.DataField',
            Value : Stuid,
            Label : ' Student ID',
        },{
            $Type : 'UI.DataField',
            Value : Stuname,
            Label : 'Student Name',
        },
        {
            $Type : 'UI.DataField',
            Value : Stuage,
            Label : 'Student Age',
        },
        {
            $Type : 'UI.DataField',
            Value : Stubg,
            Label : 'Student Blood Group',
        },
        {
            $Type : 'UI.DataField',
            Value : Stuphone,
            Label : 'Student Phone',
        },]
);
annotate service.lecturer with {
    Lectname @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'lecture',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Lectname,
                    ValueListProperty : 'Lectname',
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'Lectid',
                    LocalDataProperty : Lectid,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'Lectphone',
                    LocalDataProperty : Lectphone,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'Lectaddress',
                    LocalDataProperty : Lectaddress,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'LectEmail',
                    LocalDataProperty : LectEmail,
                },
            ],
            Label : 'Lect name',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.lecture with {
    Lectname @Common.Text : {
        $value : Lectid,
        ![@UI.TextArrangement] : #TextLast,
    }
};
annotate service.department with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : Deptid,
        },
        TypeName : 'Department Details',
        TypeNamePlural : 'CollegeDepartment ',
        Initials : Deptid,
        Description : {
            $Type : 'UI.DataField',
            Value : 'Department Name',
        },
    }
);
annotate service.lecturer with @(
    UI.LineItem #Department : [
        {
            $Type : 'UI.DataField',
            Value : Lectodept.Deptname,
            Label : 'Deptname',
        },]
);
annotate service.student with {
    Stuid @Common.FieldControl : #ReadOnly
};
annotate service.department with @(
    UI.FieldGroup #department : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Deptname,
                Label : 'Department Name',
            },
            {
                $Type : 'UI.DataField',
                Value : Deptphone,
                Label : 'Department Phone',
            },],
    }
);

annotate service.lecturer with {
    Lectname @Common.FieldControl : #ReadOnly
};
annotate service.lecturer with {
    Lectaddress @Common.FieldControl : #ReadOnly
};
annotate service.lecturer with {
    Lectphone @Common.FieldControl : #ReadOnly
};
annotate service.student with {
    Stuname @Common.FieldControl : #Mandatory
};
annotate service.student with {
    Stuphone @Common.FieldControl : #Mandatory
};
annotate service.lecturer with {
    LectEmail @Common.FieldControl : #ReadOnly
};
annotate service.department with {
    Deptname @Common.FieldControl : #Mandatory
};
annotate service.department with {
    Deptphone @Common.FieldControl : #Mandatory
};
annotate service.student with @(
    UI.SelectionPresentationVariant #STUDENT : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#STUDENT',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
    }
);
annotate service.lecturer with @(
    UI.LineItem #lecturetable1 : [
        {
            $Type : 'UI.DataField',
            Value : Lectid,
            Label : 'Lecture ID',
        },{
            $Type : 'UI.DataField',
            Value : Lectname,
            Label : 'Lectname',
        },]
);
annotate service.lecturer with {
    Lectid @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'teachersw',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Lectid,
                    ValueListProperty : 'Lectid',
                },
            ],
            Label : 'Lecture id',
        },
        Common.ValueListWithFixedValues : false
)};
annotate service.lecturer with {
    Lectid @Common.FieldControl : #Mandatory
};
