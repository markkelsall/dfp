sap.ui.controller("application.workOrderList", {

	onInit: function() {
    workOrderListController = this;
  },

  onViewWorkOrderPress : function (e) {
    //get the model from the event
    //save it to the current work order, navigate to the new page
		workOrderApp.getNavigation().toPage("application.viewWorkOrder");
  },

  onReadNewWorkOrderPress : function (e) {
    //get the number from the model
    //make read call
    //on response save it to the work order list, save it to the current work order, navigate to the new page
		workOrderApp.getNavigation().toPage("application.viewWorkOrder");
  }
});
