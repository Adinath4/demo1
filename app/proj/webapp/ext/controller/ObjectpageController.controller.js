sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var hidden;
	var actiontool = false;
	var setcreatebutton;
	var objfinalUrl;
	return ControllerExtension.extend('proj.ext.controller.ObjectpageController', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf l.leacture.ext.controller.Obj_lec_page
			 */
			onInit: function () {
				debugger
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			onAfterRendering: async function (oParameter) {
				debugger

			},
			editFlow: {
				onBeforeDiscard: async function (oParameter) {
					debugger
					let funcname = 'discard';
					let oFunction = oParameter.context.getModel().bindContext(`/${funcname}(...)`);
					var val = window.location.href;
            		const regex = /idd=([a-fA-F0-9-]+)/;
					const match = val.match(regex);
					if (match) {
						val = match[1];
						console.log(val); // Output: 1
					}
					oFunction.setParameter('d',val);
					await oFunction.execute();
					const oContext = oFunction.getBoundContext();
					var result = oContext.getValue();
				}
			},
			routing: {
				onBeforeBinding: async function (oParameter) {
					debugger

					// var b1 = "l.leacture::lecturesObjectPage--fe::CustomSubSection::Attachments--upload-uploader";
					// var b2 = "l.leacture::lecturesObjectPage--fe::CustomSubSection::Attachments--upload-uploadButton"
					// var button = document.getElementById('l.leacture::lecturesObjectPage--fe::CustomSubSection::Attachments--upload-uploader');
					// var button1 = document.getElementById('l.leacture::lecturesObjectPage--fe::CustomSubSection::Attachments--upload-uploadButton');		
					// if (b1) {							
					// 	b1.disabled = false;
					// 	b1.setVisible(false);
					// 	// button.disabled = true;
					// 	// Hide the button by setting its display style to 'none'
					// 	// button.style.display = 'none';
					// }
					// setTimeout(() => {
					// 	sap.ui.getCore().byId(b1).disabled = true;
					// 	sap.ui.getCore().byId(b2).disabled = true;
					// }, 1000);
					var sId;
					await this.base.getView().getContent()[0].getFooter().mAggregations.content.getContent().forEach(element => {
						// if(element.getText())
						var text;
						try {
							text = element.getText()
						} catch (error) {
							text = null;
						}
						// var text =element.getText();
						if (text == 'Create')
							sId = element.sId;
						// element.setText("Send for Approval");
					});
					setTimeout(() => {
						sap.ui.getCore().byId(sId).setText("Send for Approval");
					}, 400);
					// [4].setText("Send for Approval");
					// setcreatebutton = this.base.getView().byId("proj::lectureObjectPage--fe::FooterBar::StandardAction::Save").mProperties.text;
					// this.base.getView().byId("proj::lectureObjectPage--fe::FooterBar::StandardAction::Save").setVisible(false);
					// setcreatebutton.setVisible(false);
					// setcreatebutton = this.base.getView().getContent()[0].mAggregations.footer.oParent.mAggregations.footer.mAggregations.content.mAggregations.content[4].mProperties;
					// this.base.getView().getContent()[0].mAggregations.footer.oParent.mAggregations.footer.mAggregations.content.mAggregations.content[4].mProperties.visible
					this.base.getView().getContent()[0].mAggregations.footer.mAggregations.content.mAggregations.content[4].mProperties.
						debugger
					// var oUser = new sap.ushell.services.UserInfo();
					// var emailuser = oUser.getUser().isAdminUser();
					// if (emailuser){
					// 	// this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar(!actiontool);
					// 	this.base.getView().getContent()[0].mProperties.showEditHeaderButton = true;
					// 	// this.base.getView().findAggregatedObjects(true, function (control) {
					// 	// 	return control.isA("sap.m.Input") && control.getBindingPath("value") === "lName";
					// 	// 		}).forEach(function (oInput) {
					// 	// 			oInput.setEnabled(false);
					// 	// 	   });

					// 	// sap.ui.getCore().byId(setcreatebutton).setcreatebutton({
					// 	// 	"$editState": [
					// 	// 	{
					// 	// 		"label" : ""
					// 	// 	}
					// 	// 	]
					// }
					// else{
					// // this.base.getView().getContent()[0].mProperties.showEditHeaderButton.setVisible(false);
					// this.base.getView().getContent()[0].mProperties.showEditHeaderButton = false;
					// this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.setVisible(false);
					// }
				},
				onAfterBinding: async function (oParameter) {
					debugger
					var sId;
					var text = null;
					var sidd = this.base.getView().getContent()[0].getSections()[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.sId;
					await this.base.getView().getContent()[0].getSections()[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.setUploadEnabled(false);
					var footerId = null;

					try {
						footerId = await this.getView().getContent()[0].mAggregations.footer.sId;
					} catch (error) {
						footerId = null;
					}
					setTimeout(async () => {
						sap.ui.getCore().byId(footerId).mAggregations.content.mAggregations.content.forEach(async element => {
							if (element.getVisible()) {
								if (element.getText() == "Discard Draft") {
									await sap.ui.getCore().byId(sidd).setUploadEnabled(true);
									await sap.ui.getCore().byId(sidd).mAggregations.items.forEach(async element => {
										element.setEnabledRemove(true);
										element.setEnabledEdit(true);


									});
								}
							}
						});

					}, 400);
					debugger
					const link = window.location.href;
            		const regex = /idd=([a-fA-F0-9-]+)/;
					const match = link.match(regex);
					if (match) {
						var val = match[1];
						console.log(val); // Output: 1
					}

					// let objPath=oParameter.sPath.substring(1);
					let baseUri =this.base.getModel().getServiceUrl();
					baseUri += `lecture?$filter=idd eq ${val}` ;
					try {
					function pr(baseUri) {
						return new Promise(async resolve => {
							await $.ajax({
								url: baseUri,
								type: 'GET',
								success: async function(res) {
									debugger
									var status = res.value[0].Status;
									if(status == "Approved"){
										debugger
										 hidden = true;
									}else{
										hidden = false;
									}

									resolve();
									console.log(res);	
								}
	
							});	
						});
					}	
					let promisee = await pr(baseUri,objfinalUrl);
					this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[4].setEnabled(hidden);
				} catch (error) {
					debugger
				}
					// sap.ui.getCore().byId(footerId).mAggregations.content.mAggregations.content.forEach(async element=>{
					// 	if(element.getText() == "Discard Draft" && element.getVisible())
					// 		await	sap.ui.getCore().byId(e).enabledEdit(true);
					// 		await	sap.ui.getCore().byId(e).enabledRemove(true);
					// });
					let funcname = 'postattach';
					let oFunction = oParameter.getModel().bindContext(`/${funcname}(...)`);
					const a = 11111;
					oFunction.setParameter('p', a);
					await oFunction.execute();
					const oContext = oFunction.getBoundContext();
					var result = oContext.getValue();
				}
			}
		}
	});
});
