sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var removeAllAction;
	var setFilterCondition;
	return ControllerExtension.extend('dept.project1.ext.controller.Listcontroller', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf c.collageapp.ext.controller.List_page
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
		onBeforeRendering: async function (oParameter) {
				debugger
				
				// filterbar = "c.collageapp::departList--fe::FilterBar::depart-btnAdapt";
		},

		onAfterRendering: async function (oParameter) {
			debugger
			var mailId = new sap.ushell.services.UserInfo().getEmail();
			let baseUri = this.base.getModel().getServiceUrl();
			baseUri += `auth?$filter=Id eq '${mailId}'` ;
			var oUser = new sap.ushell.services.UserInfo();
			var emailuser = oUser.getUser().isAdminUser();
			removeAllAction = this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;
			setFilterCondition = this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;
						if (!emailuser){
							sap.ui.getCore().byId(removeAllAction).removeAllActions();
														removeAllAction = null;
							
							sap.ui.getCore().byId(setFilterCondition).setFilterConditions({
									"$editState": [
									{
										"operator": "DRAFT_EDIT_STATE",
										"values": [
												"ALL_HIDING_DRAFTS",
												"All (Hiding Drafts)"
												],
												"validated": "Validated"
									}
									]
							});
							setFilterCondition = null;
							// sap.ui.getCore().byId(filterbar).removeAllActions();
							// filterbar = null;
							// this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.removeAllFilterItems(false);
						}
						else{
							this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.removeAllFilterItems(true);
						}
			console.log('first Ajax is ended');
		}

			}
	});
});
