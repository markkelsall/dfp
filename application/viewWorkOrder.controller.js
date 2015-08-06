sap.ui.controller("application.viewWorkOrder", {

	onInit: function() {
    viewWorkOrderController = this;

		this.getView().addEventDelegate({
			onBeforeShow: function(evt) {
				viewWorkOrderController.onBeforeShow(evt.data);
			}
		});
  },

	onBackPress : function () {
		workOrderApp.getNavigation().backPage();
	},

	onBeforeShow : function (evt) {
		console.log(evt);

		if (evt.action === "viewExisting") {
			//save it to the current work order
			var jCurrentWorkOrder = new sap.ui.model.json.JSONModel(evt.workOrder);
			sap.ui.getCore().setModel(jCurrentWorkOrder, "currentWorkOrder");
		} else if (evt.action === "readNew") {
			//make the call to the service (in the mean time, use the below code while there are no services)
			// workOrderApp.getEAO().read("service('" + evt.workOrderNumber + "')", viewWorkOrderController.onReadNewWorkOrderCallback);

			oResponse = {
				statusCode : 200,
				data : referenceData.workOrders[evt.workOrderNumber]
			};
			viewWorkOrderController.onReadNewWorkOrderCallback(oResponse);
		}
	},

	onReadNewWorkOrderCallback : function (oResponse) {
		if (oResponse === undefined || oResponse === null || oResponse.statusCode !== 200 || oResponse.data === undefined || oResponse.data === null) {
			//there was an error, report it to the user
			return;
		}

		//save the work order to the work order list
		var oWorkOrderList = sap.ui.getCore().getModel("workOrderList").getData();
		oWorkOrderList.data.push(oResponse.data);
		var jWorkOrderList = new sap.ui.model.json.JSONModel(oWorkOrderList);
		sap.ui.getCore().setModel(jWorkOrderList, "workOrderList");

		//save it to the current work order
		var jCurrentWorkOrder = new sap.ui.model.json.JSONModel(oResponse.data);
		sap.ui.getCore().setModel(jCurrentWorkOrder, "currentWorkOrder");
	},

	onAddConfirmTimePress : function () {

	},

	onSaveWorkOrderPress : function () {

	},
	
	onTechnicallyCompleteWorkOrderPress : function () {

	}
});
