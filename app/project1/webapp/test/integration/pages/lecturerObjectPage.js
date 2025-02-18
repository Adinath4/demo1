sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'dept.project1',
            componentId: 'lecturerObjectPage',
            contextPath: '/department/Depttolec'
        },
        CustomPageDefinitions
    );
});