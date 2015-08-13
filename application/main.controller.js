sap.ui.controller("application.main", {

	onInit: function() {

		$.sap.require("sap.ui.unified.Calendar");
    $.sap.require("sap.ui.unified.DateRange");
    $.sap.require("sap.ui.unified.CalendarRenderer");
		$.sap.require("sap.ui.unified.calendar.HeaderRenderer");
		$.sap.require("sap.ui.unified.calendar.MonthRenderer");
		$.sap.require("sap.ui.unified.calendar.MonthPickerRenderer");

		this.getView().setDisplayBlock(true);
		mainController = this;

		//load objectParts
		var jObjectParts = new sap.ui.model.json.JSONModel({data : referenceData.objectParts});
		sap.ui.getCore().setModel(jObjectParts, "objectParts");

		//load causeCodes
		var jCauseCodes = new sap.ui.model.json.JSONModel({data : referenceData.causeCodes});
		sap.ui.getCore().setModel(jCauseCodes, "causeCodes")

		//load damage
		var jDamage = new sap.ui.model.json.JSONModel({data : referenceData.damage});
		sap.ui.getCore().setModel(jDamage, "damage");

		//load units
		var jUnits = new sap.ui.model.json.JSONModel({data : referenceData.units});
		sap.ui.getCore().setModel(jUnits, "units");

		//initialise the workOrderList model.
		//this is done in the mainController so that if further functionality like storing work orders offline is added
		var jWorkOrderList = new sap.ui.model.json.JSONModel({data : []});
		sap.ui.getCore().setModel(jWorkOrderList, "workOrderList");
  }
});
