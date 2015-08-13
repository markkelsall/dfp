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
			//there was an error, report it to the user and navigate back
			workOrderApp.getNavigation().backPage();
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

		//re-initialise the newWorkOrder model so the entered work order number is cleared out
		var jNewWorkOrder = new sap.ui.model.json.JSONModel({workOrderNumber : ""});
		sap.ui.getCore().setModel(jNewWorkOrder, "newWorkOrder");

		//initialise the editConfirmTime model
		var jEditConfirmTime = new sap.ui.model.json.JSONModel({postDate : new Date()});
		sap.ui.getCore().setModel(jEditConfirmTime, "editConfirmTime");

		//initialise the editConfirmTimeState model
		var jEditConfirmTimeState = new sap.ui.model.json.JSONModel();
		sap.ui.getCore().setModel(jEditConfirmTimeState, "editConfirmTimeState");
	},

	onAddConfirmTimePress : function () {
		if (!viewWorkOrderController.addConfirmTimeFragment) {
			viewWorkOrderController.addConfirmTimeFragment = new sap.ui.xmlfragment("application.fragments.addConfirmTime", this);
    }

		viewWorkOrderController.addConfirmTimeFragment.open();
	},

	onSaveWorkOrderPress : function () {

	},

	onTechnicallyCompleteWorkOrderPress : function () {

	},

	onAddCancelPress : function () {
		//initialise the editConfirmTimeState model
		var jEditConfirmTimeState = new sap.ui.model.json.JSONModel();
		sap.ui.getCore().setModel(jEditConfirmTimeState, "editConfirmTimeState");

		viewWorkOrderController.addConfirmTimeFragment.close();
	},

	onAddConfirmPress : function () {
		//validate that they've filled in all the details on the form
		var editConfirmTime = sap.ui.getCore().getModel("editConfirmTime").getData();

		var bValid = true;

		var editConfirmTimeState = sap.ui.getCore().getModel("editConfirmTimeState").getData();
		if (editConfirmTime === undefined || editConfirmTime === null) {
			//set all field value states to error
			editConfirmTimeState.duration = "Error";
			editConfirmTimeState.durationUnit = "Error";
			editConfirmTimeState.postDate = "Error";
			editConfirmTimeState.confirmationText = "Error";
			bValid = false;
		}

		if (editConfirmTime.duration === undefined || editConfirmTime.duration === "") {
			//set duration value state
			editConfirmTimeState.duration = "Error";
			bValid = false;
		} else {
			editConfirmTimeState.duration = "None";
		}

		if (editConfirmTime.durationUnit === "u1") {
			//set durationUnit value state
			editConfirmTimeState.durationUnit = "Error";
			bValid = false;
		} else {
			editConfirmTimeState.durationUnit = "None";
		}

		if (editConfirmTime.postDate === undefined || editConfirmTime.postDate === null) {
			//set post date value state
			editConfirmTimeState.postDate = "Error";
			bValid = false;
		} else {
			editConfirmTimeState.postDate = "None";
		}

		if (editConfirmTime.confirmationText === undefined || editConfirmTime.confirmationText === "") {
			//set confirmationText value state
			editConfirmTimeState.confirmationText = "Error";
			bValid = false;
		} else {
			editConfirmTimeState.confirmationText = "None";
		}

		if (!bValid) {
			var jEditConfirmTimeState = new sap.ui.model.json.JSONModel(editConfirmTimeState)
			sap.ui.getCore().setModel(jEditConfirmTimeState, "editConfirmTimeState");
			return;
		}

		
		//close
		viewWorkOrderController.onAddCancelPress();
	}
});
