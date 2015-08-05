sap.ui.controller("application.workOrderList", {

	onInit: function() {
    workOrderListController = this;

		//initialise the newWorkOrder model
		var jNewWorkOrder = new sap.ui.model.json.JSONModel({workOrderNumber : ""});
		sap.ui.getCore().setModel(jNewWorkOrder, "newWorkOrder");

		//initialise the workOrderList model
		var oWorkOrderList = {
			data : []
		};
		var jWorkOrderList = new sap.ui.model.json.JSONModel(oWorkOrderList);
		sap.ui.getCore().setModel(jWorkOrderList, "workOrderList");
  },

  onViewWorkOrderPress : function (e) {
    //get the model from the event
		var workOrder = e.getSource().getBindingContext("workOrderList").getObject();
    //save it to the current work order, navigate to the new page
		workOrderApp.getNavigation().toPage("application.viewWorkOrder", {workOrder : workOrder, action : "viewExisting"});
  },

  onReadNewWorkOrderPress : function (e) {
		var newWorkOrder = sap.ui.getCore().getModel("newWorkOrder").getData();
		if (newWorkOrder === undefined || newWorkOrder === null || newWorkOrder.workOrderNumber === "" || newWorkOrder.workOrderNumber.length === 0) {
			console.log("no work order number entered");
			return;
		}
		newWorkOrder.workOrderNumber.trim();
		console.log("Work Order to read: " + newWorkOrder.workOrderNumber + ".");

		newWorkOrder.action = "readNew";
		workOrderApp.getNavigation().toPage("application.viewWorkOrder", newWorkOrder);
  }
});
