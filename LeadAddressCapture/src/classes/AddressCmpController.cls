/*
 * Developer Name : M. Rizwan (rizwanakhtar08@gmail.com)
 * Github : https://github.com/mritzi/SalesforcePlay
 * Please submit enhacement requests @ GitHub repo link
 *********** CHANGE LOG *************************************************************************************
 * Developer            Date            Description
 * mritzi               2019/Feb/04     Original version with basis error handling
 */

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
            }
        }
        //method will return 'true' only when update succeeds, else 'false' will be returned
        return isSuccess;
    }
}
