({
    /* Apex call to get place recoomendations */
    callSuggestionApex : function(component, searchKeyword){
        this.openLookupSpinner(component);
        this.clearErrorMessage(component);
    	var action = component.get("c.getSuggestions");
        action.setParams({
            keyword : searchKeyword
        });
        action.setCallback(this, function(response){
            this.hideLookupSpinner(component);
            if(response.getState() === "SUCCESS"){
                var returnValue = response.getReturnValue();
                // when API call goes well
                if(returnValue.errorMessage === undefined || returnValue.errorMessage === ""){
                    component.set("v.suggestionWrapper", returnValue);
                    // no recommendations received for keyword
                    if(returnValue.predictions === null || returnValue.predictions.length === 0)
                        component.set("v.message", "No matching place found");
                }
                //when API call goes wrong
                else{
                    this.showToastMessage("error", returnValue.errorMessage);
                }
            }
            //when apex call fails
            else{
                this.showToastMessage("error", "Intenal error while getting data");
            }
        });
        $A.enqueueAction(action);
    },
    /* show suggestions dropdown */
	openSearchResults : function(component){
        var resultDiv = component.find("parentDiv");
        $A.util.addClass(resultDiv, "slds-is-open");
        $A.util.removeClass(resultDiv, "slds-is-close");
    },
    /* hide suggestion dropdown */
    closeSearchResults : function(component){
        var resultDiv = component.find("parentDiv");
        $A.util.addClass(resultDiv, "slds-is-close");
        $A.util.removeClass(resultDiv, "slds-is-open");
    },
    /* apex call to get address details using placeId */
    getDetailApex : function(component, placeId){
    	var action = component.get("c.getPlaceDetail");
        action.setParams({
            "placeId" : placeId
        });
        action.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                var selectedPlace = response.getReturnValue();
                // when API call goes well
                if(selectedPlace.errorMessage === undefined || selectedPlace.errorMessage === "")
                    this.updateLead(component, selectedPlace);
                // when API call fails
                else
                    this.showToastMessage("error", selectedPlace.errorMessage);
            }
            // when apex call fails
            else{
                this.showToastMessage(component, "error", "Internal error in getting place detail");
            }
        });
        $A.enqueueAction(action);
    },
    /* update component variable busing details of selected place */
    updateLead : function(component, selectedAddress){
        var lead = component.get("v.lead");
        // array of address separated by <comma><space>
        var addressChunks = selectedAddress.result.formatted_address.split(", ");
        var chunkSize = addressChunks.length;
        // decremanting index(chunkSize) to get each address value starting from the end
        lead.Country = addressChunks[--chunkSize];
        // array of stage & postalCode separate by <space>
        lead.PostalCode = addressChunks[--chunkSize].split(" ")[1];
        lead.State = addressChunks[chunkSize].split(" ")[0];
        lead.City = addressChunks[--chunkSize];
        lead.Street = "";
        for(var i=0; i<chunkSize;i++)
            lead.Street += addressChunks[i]+", ";
        //remove last <comma> from street field
        lead.Street = lead.Street.substr(0, lead.Street.length-1);
        // geolocation data
        lead.GeoLocation__Latitude__s = selectedAddress.result.geometry.location.lat;
        lead.GeoLocation__Longitude__s = selectedAddress.result.geometry.location.lng;
        component.set("v.lead", lead);

    },
    /* show spinner */
    openLookupSpinner : function(component){
        component.set("v.lookupSpinnerClass", "");
    },
    /* hide spinner */
    hideLookupSpinner : function(component){
        component.set("v.lookupSpinnerClass", "slds-hide");
    },
    /* clear message variable used in dropdown */
    clearErrorMessage : function(component){
        component.set("v.message", "");
    },
    /* show error, info, warning, success message in SLDS popup */
    showToastMessage : function(component, toastType, toastMessage) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": toastType,
            "message": toastMessage
        });
        toastEvent.fire();
    },
})
