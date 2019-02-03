public class AddressCmpController {
    /* method to get lead details based on lead record Id */
    @AuraEnabled public static Lead getLead(Id recordId){
        Lead lead = new Lead();
        if(String.isNotEmpty(recordId)){
            lead = [Select Id, Name, Street, City, State, PostalCode, Country, GeoLocation__Latitude__s, GeoLocation__Longitude__s, Nearby_LandMark__c
                   From Lead Where Id =: recordId LIMIT 1];
        }
        return lead;
    }
    /* method to save lead details */
    @AuraEnabled public static Boolean saveLead(Lead lead){
        Boolean isSuccess = false;
        if(lead != null){
            try{
                update lead;
                isSuccess = true;
            }catch(Exception ex){
                System.debug(ex.getMessage());
                isSuccess = false;
            }
        }
        return isSuccess;
    }
}
