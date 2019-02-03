({
    /* called on component load */
    doInit : function(component, event, helper){

    },
    /* to call backend method & get place recommendations from Google based on keyword */
    recommendPlaces : function(component, event, helper) {
        var searchKeyword = component.get("v.searchKeyword");
		if(searchKeyword !== undefined && searchKeyword !== null && searchKeyword.length > 0){
            helper.openSearchResults(component);
            helper.callSuggestionApex(component, searchKeyword);
        }
        else{
            component.set("v.suggestionWrapper", {});
            helper.closeSearchResults(component);
        }
	},
    /* clear values & close dropdpwn when 'X' icon is clicked in search box */
    clear: function(component, event, helper) {
        var lead = component.get("v.lead");
        lead.Street = lead.City = lead.State = lead.PostalCode = lead.Country = lead.GeoLocation__Latitude__s = lead.GeoLocation__Longitude__s = lead.Nearby_Landmark__c = "";
        component.set("v.searchKeyword", "");
        helper.closeSearchResults(component);
        component.set("v.lead", lead);
	},
    /* get place detail after user selects any of the suggested places  */
    getAddressData : function(component, event, helper){
        var address = event.getParam("address");
        var place_id = address.place_id;
        component.set("v.searchKeyword", address.description);
        helper.closeSearchResults(component);
        helper.getDetailApex(component, place_id);
    }

})
