({
    /* method called on component load, separates address description in two parts to display in two lines */
    doInit : function(component, event, helper){
        var address = component.get("v.address").description;
        var indexOfSeparator = address.indexOf(",") > 0 ? address.indexOf(",") : address.length;
        component.set( "v.mainText", address.substr(0, indexOfSeparator) );
        //no secondary text, if ',' is not found in the string
        component.set( "v.secondaryText", address.substr(indexOfSeparator < address.length ? indexOfSeparator+1 : indexOfSeparator, address.length) );
    },
    /* fire component event when a suggested place is selected by user  */
	addressSelected : function(component, event, helper) {
		var selectedAddress = component.get("v.address");
        // call the event
        var compEvent = component.getEvent("eAddressSelectedEvent");
        compEvent.setParams({
            "address" : selectedAddress
        });
        compEvent.fire();
	}
})
