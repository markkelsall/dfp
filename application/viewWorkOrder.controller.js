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
		var jEditConfirmTime = new sap.ui.model.json.JSONModel({date : new Date()});
		sap.ui.getCore().setModel(jEditConfirmTime, "editConfirmTime");

		//initialise the editConfirmTimeState model
		var jEditConfirmTimeState = new sap.ui.model.json.JSONModel();
		sap.ui.getCore().setModel(jEditConfirmTimeState, "editConfirmTimeState");
	},

	onOperationItemPress : function (evt) {
		var operation = evt.getSource().getSelectedItem().getBindingContext("currentWorkOrder").getObject();

		var sapDate = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd/MM/YYYY"});
		operation.date = sapDate.parse(operation.dateString, false);

		var jEditConfirmTime = new sap.ui.model.json.JSONModel(operation);
		sap.ui.getCore().setModel(jEditConfirmTime, "editConfirmTime");

		if (!viewWorkOrderController.addConfirmTimeFragment) {
			viewWorkOrderController.addConfirmTimeFragment = new sap.ui.xmlfragment("application.fragments.addConfirmTime", this);
    }
		viewWorkOrderController.addConfirmTimeFragment.open();
	},

	onSaveWorkOrderPress : function () {
		var currentWorkOrder = sap.ui.getCore().getModel("currentWorkOrder").getData();

		// workOrderApp.getEAO().post("service('" + currentWorkOrder.workOrderNumber + "')", currentWorkOrder, viewWorkOrderController.onReadNewWorkOrderCallback);

		oResponse = {
			statusCode : 200,
			data : currentWorkOrder
		};
		viewWorkOrderController.onSaveWorkOrderCallback(oResponse);
	},

	onSaveWorkOrderCallback : function (oResponse) {
		if (oResponse.statusCode !== 200) {
			sap.m.MessageToast.show("There was an error when trying to save your Work Order. Please try again.");
			return;
		}
		sap.m.MessageToast.show("The Work Order has been saved.");
	},

	onAddCancelPress : function () {
		//initialise the editConfirmTimeState model
		var jEditConfirmTimeState = new sap.ui.model.json.JSONModel();
		sap.ui.getCore().setModel(jEditConfirmTimeState, "editConfirmTimeState");

		//re-initialise the editConfirmTime model
		var jEditConfirmTime = new sap.ui.model.json.JSONModel({date : new Date()});
		sap.ui.getCore().setModel(jEditConfirmTime, "editConfirmTime");

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

		if (editConfirmTime.unit === "u1") {
			//set durationUnit value state
			$("#durationUnit").addClass("durationUnitErrorState");
			bValid = false;
		} else {
			$("#durationUnit").removeClass("durationUnitErrorState");
		}

		if (editConfirmTime.date === undefined || editConfirmTime.date === null) {
			//set post date value state
			editConfirmTimeState.date = "Error";
			bValid = false;
		} else {
			editConfirmTimeState.date = "None";
		}

		if (editConfirmTime.confirmationText === undefined || editConfirmTime.confirmationText === "") {
			//set confirmationText value state
			editConfirmTimeState.confirmationText = "Error";
			bValid = false;
		} else {
			editConfirmTimeState.confirmationText = "None";
		}

		if (!bValid) {
			var jEditConfirmTimeState = new sap.ui.model.json.JSONModel(editConfirmTimeState);
			sap.ui.getCore().setModel(jEditConfirmTimeState, "editConfirmTimeState");
			return;
		}

		//get the text for the unit id selected
		for (var i = 0; i < referenceData.units.length; i++) {
			if (editConfirmTime.unitId === referenceData.units[i].id) {
				editConfirmTime.unit = referenceData.units[i].text;
				break;
			}
		}

		var date;
		if (editConfirmTime.date.getDate().toString().length === 1) {
			date = "0" + editConfirmTime.date.getDate();
		} else {
			date = editConfirmTime.date.getDate();
		}

		var month;
		if (editConfirmTime.date.getMonth().toString().length === 1) {
			 month = "0" + (editConfirmTime.date.getMonth() + 1);
		} else {
			month = (editConfirmTime.date.getMonth() + 1);
		}

		editConfirmTime.dateString = date + "/" + month + "/" + editConfirmTime.date.getFullYear();

		var currentWorkOrder = sap.ui.getCore().getModel("currentWorkOrder").getData();

		editConfirmTime.workCentre = currentWorkOrder.workCentre;
		if (currentWorkOrder.confirmedTime === undefined || currentWorkOrder.confirmedTime === null) {
			currentWorkOrder.confirmedTime = [];
		}
		currentWorkOrder.confirmedTime.push(editConfirmTime);

		//save the current work order with additional confirmed time
		var jCurrentWorkOrder = new sap.ui.model.json.JSONModel(currentWorkOrder);
		sap.ui.getCore().setModel(jCurrentWorkOrder, "currentWorkOrder");

		//update the referenceData.workOrders element so that if the user navigates
		//to another work order and then back again, the data is still saved and
		//they can still press save to save it to the server
		referenceData.workOrders[currentWorkOrder.workOrderNumber] = currentWorkOrder;

		//close
		viewWorkOrderController.onAddCancelPress();
	},

	onTechnicallyCompleteWorkOrderPress : function () {
		if (!viewWorkOrderController.technicallyCompleteConfirmFragment) {
			viewWorkOrderController.technicallyCompleteConfirmFragment = new sap.ui.xmlfragment("application.fragments.technicallyCompleteConfirm", this);
    }
		viewWorkOrderController.technicallyCompleteConfirmFragment.open();
	},

	onTechnicallyCompleteCancelPress : function () {
		viewWorkOrderController.technicallyCompleteConfirmFragment.close();
	},

	onTechnicallyCompleteConfirmPress : function () {
		// workOrderApp.getEAO().post("service('" + currentWorkOrder.workOrderNumber + "')", currentWorkOrder, viewWorkOrderController.onReadNewWorkOrderCallback);
		var currentWorkOrder = sap.ui.getCore().getModel("currentWorkOrder").getData();

		oResponse = {
			statusCode : 200,
			data : currentWorkOrder
		};
		viewWorkOrderController.onTechnicallyCompleteWorkOrderCallback(oResponse);
	},

	onTechnicallyCompleteWorkOrderCallback : function (oResponse) {
		viewWorkOrderController.technicallyCompleteConfirmFragment.close();

		if (oResponse.statusCode !== 200) {
			sap.m.MessageToast.show("There was an error when trying to technically complete your Work Order. Please try again.");
			return;
		}
		sap.m.MessageToast.show("The Work Order has been technically completed.");
	}
});
