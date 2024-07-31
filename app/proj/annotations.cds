using MyService as service from '../../srv/service';
annotate service.lecture with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Lecture ID',
                Value : Lectid,
            },
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
    ],
);

annotate service.lecture with @(
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
            ],
        },
        Text : 'Table View',
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
