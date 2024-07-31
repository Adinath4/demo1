sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('dept.project1.ext.controller.Listcontroller', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf dept.project1.ext.controller.Listcontroller
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				
var oUser = new sap.ushell.services.UserInfo().getEmail();
debugger
alert(oUser);
// alert'
// var oButton = this.base.getView().byId('dept.project1::departmentList--fe::table::department::LineItem::StandardAction::Create');
// 				var oButton1 = this.base.getView().byId('dept.project1::departmentList--fe::table::department::LineItem::StandardAction::Delete');

// 				if (sap.ushell && sap.ushell.Container) {
//                     var oUserInfoService = sap.ushell.Container.getService("UserInfo");
//                     var oUserEmail = oUserInfoService.getEmail();
//                     console.log(oUserEmail);
//                 } else {
//                     console.log("UserInfo service not available.");
//                 }
// 				if (oButton && oUserEmail !== 'adinath.jain@peolsolutions.com') {
// 					 oButton.setVisible(false);
					 
// 				}
// 				if (oButton1 && oUserEmail !== 'adinath.jain@peolsolutions.com') {
// 					oButton1.setVisible(false);
// 			   }
			}
		}
	});
});
