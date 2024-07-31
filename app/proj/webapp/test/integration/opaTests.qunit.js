sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'proj/test/integration/FirstJourney',
		'proj/test/integration/pages/lectureList',
		'proj/test/integration/pages/lectureObjectPage'
    ],
    function(JourneyRunner, opaJourney, lectureList, lectureObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('proj') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThelectureList: lectureList,
					onThelectureObjectPage: lectureObjectPage
                }
            },
            opaJourney.run
        );
    }
);