sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'dept/project1/test/integration/FirstJourney',
		'dept/project1/test/integration/pages/departmentList',
		'dept/project1/test/integration/pages/departmentObjectPage',
		'dept/project1/test/integration/pages/lecturerObjectPage'
    ],
    function(JourneyRunner, opaJourney, departmentList, departmentObjectPage, lecturerObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('dept/project1') + '/index.html'
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