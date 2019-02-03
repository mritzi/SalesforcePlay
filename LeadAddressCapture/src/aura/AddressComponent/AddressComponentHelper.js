({
	/* Apex call to get lead data */
	getLeadData : function(component){
		var action = component.get("c.getLead");
        action.setParams({
            recordId : component.get("v.recordId")
        });
        action.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
				component.set("v.lead", response.getReturnValue());
            }
            else{
                this.showToastMessage(component, event, "error", "Error while getting record data");
            }
        	this.hideSpinner(component);
        });
        $A.enqueueAction(action);
	},
	/* Apex call to save lead data */
	saveLeadData : function(component){
		var action = component.get("c.saveLead");
		action.setParams({
			lead : component.get("v.lead")
		});
		action.setCallback(this, function(response){
			// when lead is saved in apex, Boolean [true] is received else [false]
			if(response.getState() === "SUCCESS" && response.getReturnValue() === true){
				this.showToastMessage(component, "success", "Record Saved Successfully");
				//close component after saving data
				this.closeComponent(component);
			}
			else{
				this.showToastMessage(component, "error", "Error while saving record");
			}
			this.hideSpinner(component);
			//updates values in the record detail page
			$A.get('e.force:refreshView').fire();
		});
		$A.enqueueAction(action);
	},
	/* to show error, info, warning, success messages in a SLDS popup */
	showToastMessage : function(component, toastType, toastMessage) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": toastType,
            "message": toastMessage,
            "mode": "dismissible"
        });
        toastEvent.fire();
    },
	/* close the component */
    closeComponent : function(component){
    	$A.get("e.force:closeQuickAction").fire();
    },
	/* show busy indicator */
    showSpinner : function(component){
        component.set("v.spinnerClass", "");
    },
	/* hide busy indicator */
    hideSpinner : function(component){
        component.set("v.spinnerClass", "slds-hide");
    }
})
