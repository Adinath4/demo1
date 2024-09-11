using MyService as service from '../../srv/service';
annotate service.lecture with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Lecture Name',
                Value : Lectname,
            },
            {
                $Type : 'UI.DataField',
                Value : Lectphone,
                Label : 'Lecture Phone',
            },
            {
                $Type : 'UI.DataField',
                Value : LectEmail,
                Label : 'Lecture Email',
            },
            {
                $Type : 'UI.DataField',
                Value : Lectaddress,
                Label : 'Lecture Address',
            },
            {
                $Type : 'UI.DataField',
                Value : Lgender,
                Label : 'Gender',
            },
            {
                $Type : 'UI.DataField',
                Value : Lskill,
                Label : 'Additional Skill',
            },
            {
                $Type : 'UI.DataField',
                Value : Lectdept,
                Label : 'Lectdept',
            },
            {
                $Type : 'UI.DataField',
                Value : Dob,
                Label : 'Date Of Birth[DOB]',
            },
            {
                $Type : 'UI.DataField',
                Value : Age,
                Label : 'Age',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : Lectid,
            Label : 'Lecture ID',
        },
        {
            $Type : 'UI.DataField',
            Label : 'Lecture Name',
            Value : Lectname,
        },
        {
            $Type : 'UI.DataField',
            Value : Lectdept,
            Label : 'Lectdept',
        },
    ],
);

annotate service.lecture with @(
    UI.DeleteHidden : true,
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : Status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Approved',
                        },
                    ],
                },
            ],
        },
        Text : 'Approved',
    },
    UI.LineItem #tableView : [
    ],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View 1',
    }
);
annotate service.lecture with {
    Lectid @Common.FieldControl : #ReadOnly
};
annotate service.lecture with @(
    UI.FieldGroup #Department : {
        $Type : 'UI.FieldGroupType',
        Data : [
        ],
    }
);
annotate service.lecture with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : Lectname,
        },
        TypeName : '',
        TypeNamePlural : '',
    }
);
annotate service.lecture with {
    Lectname @Common.FieldControl : #Mandatory
};
annotate service.lecture with {
    Lectphone @Common.FieldControl : #Mandatory
};
annotate service.lecture with {
    LectEmail @Common.FieldControl : #Mandatory
};
annotate service.lecture with {
    Lectaddress @Common.FieldControl : #Optional
};
annotate service.lecture with @(
    UI.LineItem #tableView1 : [
        {
            $Type : 'UI.DataField',
            Value : Lectid,
            Label : 'Lectcture ID',
        },{
            $Type : 'UI.DataField',
            Value : Lectname,
            Label : 'Lecture Name',
        },{
            $Type : 'UI.DataField',
            Value : Lectdept,
            Label : 'Lecture Department',
        },
        {
            $Type : 'UI.DataField',
            Value : Rejectedby,
            Label : 'Rejected By',
        },],
    UI.SelectionPresentationVariant #tableView2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : Status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Rejected',
                        },
                    ],
                },
            ],
        },
        Text : 'Rejected',
    }
);
annotate service.lecture with @(
    UI.LineItem #tableView2 : [
        {
            $Type : 'UI.DataField',
            Value : Lectname,
            Label : 'Lecture Name',
        },{
            $Type : 'UI.DataField',
            Value : Lectdept,
            Label : 'Lecture Department',
        },],
    UI.SelectionPresentationVariant #tableView3 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView2',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : Status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Pending',
                        },
                    ],
                },
            ],
        },
        Text : 'Pending Approval''s',
    }
);
annotate service.lecture with {
    Lectdept @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'department',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Lectdept,
                    ValueListProperty : 'Deptname',
                },
            ],
            Label : 'dept',
        },
        Common.ValueListWithFixedValues : false,
        Common.FieldControl : #Mandatory,
)};

annotate service.lecture with {
    Age @Common.FieldControl : #ReadOnly
};

annotate service.lecture with {
    Dob @Common.FieldControl : #Mandatory
};

annotate service.lecture with {
    Lskill @Common.FieldControl : #Mandatory
};

annotate service.lecture with {
    Lgender @(
        UI.MultiLineText : true,
        Common.FieldControl : #Mandatory,
    )
};

