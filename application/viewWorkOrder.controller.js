sap.ui.controller("application.viewWorkOrder", {

	onInit: function() {
    viewWorkOrderController = this;
  },

	onBackPress : function () {
		workOrderApp.getNavigation().backPage();
	}
});
