sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'dept.project1',
            componentId: 'departmentList',
            contextPath: '/department'
        },
        CustomPageDefinitions
    );
});