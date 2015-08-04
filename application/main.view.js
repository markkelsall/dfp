sap.ui.jsview("application.main", {

	getControllerName : function() {
		return "application.main";
	},

	createContent : function(oController) {

		var app = new sap.m.App("workOrderApp");
		oController.app = app;

		var oDetailView = workOrderApp.getNavigation().loadNewView("application.workOrderList");
		app.addPage(oDetailView);

		return app;
	}
});
