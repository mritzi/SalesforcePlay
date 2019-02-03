({
	/* called on page load to fetch exisitng lead details based on recordId in the component */
	doInit : function(component, event, helper) {
        helper.showSpinner(component);
		helper.getLeadData(component);
	},
	/* to save lead record in Salesforce backend */
    save : function(component, event, helper) {
		helper.showSpinner(component);
		helper.saveLeadData(component);

	},
	/* to close component */
    cancel : function(component, event, helper) {
		helper.closeComponent(component);
	}
})
