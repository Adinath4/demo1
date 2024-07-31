sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'department/test/integration/FirstJourney',
		'department/test/integration/pages/departmentList',
		'department/test/integration/pages/departmentObjectPage',
		'department/test/integration/pages/lecturerObjectPage'
    ],
    function(JourneyRunner, opaJourney, departmentList, departmentObjectPage, lecturerObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('department') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThedepartmentList: departmentList,
					onThedepartmentObjectPage: departmentObjectPage,
					onThelecturerObjectPage: lecturerObjectPage
                }
            },
            opaJourney.run
        );
    }
);