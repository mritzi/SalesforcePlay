/*
 * Developer Name : M. Rizwan (rizwanakhtar08@gmail.com)
 * Github : https://github.com/mritzi/SalesforcePlay
 * Please submit enhacement requests @ GitHub repo link
 *********** CHANGE LOG *************************************************************************************
 * Developer            Date            Description
 * mritzi               2019/Feb/04     Original version with basic error handling
 */
public class AddressLookupCmpController {
    /*************** public methods ***************/

    /* method to get place recommendations from Google based on keyword */
    @AuraEnabled public static SuggestionWrapper getSuggestions(String keyword){
        SuggestionWrapper wrapper = new SuggestionWrapper();
        //custom metadata
        Google_Map__mdt callout = getCalloutDataByLabel('predictions');
        if(String.isEmpty(keyWord) || callout == null)
            return wrapper;
        // encoding user input
        keyWord = EncodingUtil.urlEncode(keyWord, 'UTF-8');
        String responseBody = getAPIResponse(callout, keyWord);
        //parse response
        if(responseBody != null && hasNoError(responseBody) == true)
            wrapper = (SuggestionWrapper)JSON.deserialize(responseBody, SuggestionWrapper.class);
        else
            wrapper.errorMessage = responseBody;
        return wrapper;
    }
    /* method to get place details */
    @AuraEnabled public static DetailWrapper getPlaceDetail(String placeId){
        DetailWrapper wrapper = new DetailWrapper();
        Google_Map__mdt callout = getCalloutDataByLabel('place detail');
        if(String.isEmpty(placeId) || callout == null )
            return wrapper;
        String responseBody = getAPIResponse(callout, placeId);
        if(responseBody != null && hasNoError(responseBody) == true)
            wrapper = (DetailWrapper)JSON.deserialize(responseBody, DetailWrapper.class);
        else
            wrapper.errorMessage = responseBody;
        return wrapper;
    }

    /*************** private methods ***************/

    /* process HttpResponse */
    private static String getAPIResponse(Google_Map__mdt callout, String keyStr){
        String endPoint = String.format(callout.endPoint__c, new List<String>{keyStr, callout.key__c});
        HttpRequest request = prepareRequest('GET', endPoint);
        HttpResponse response = new Http().send(request);

        if(response.getStatusCode() == 200){
            return response.getBody();
        }
        else{
            //basic error handling
            System.debug(response);
            return String.valueOf(response.getStatusCode())+ ' ' + response.getStatus();
        }
    }
    /* prepare HttpRequest */
    private static HttpRequest prepareRequest(String method, String endPoint){
        HttpRequest request = new HttpRequest();
        request.setMethod(method);
        request.setEndpoint(endpoint);
        return request;
    }
    /* get API data from custom metadata */
    private static Google_Map__mdt getCalloutDataByLabel(String label){
        List<Google_Map__mdt> mapList = new List<Google_Map__mdt>([
            Select Label, DeveloperName, EndPoint__c, Key__c
            From Google_Map__mdt Where Label =:label
        ]);
        if(mapList.size() > 0)
            return mapList[0];
        else
            return null;
    }
    /* basic error reporting */
    private static Boolean hasNoError(String responseStr){
        return !( responseStr.substring(0,3).isNumeric() );
    }

    /***************  Wrappers used in deserializing API responses [only necessary elements deserilaized] ***************/

    /* wrappers to deserialize suggestions */
    public class SuggestionWrapper{
        @AuraEnabled public String status;
        @AuraEnabled public String errorMessage;
        @AuraEnabled public List<Prediction> predictions = new List<Prediction>();

    }
    public class Prediction{
        @AuraEnabled public String description;
        @AuraEnabled public String id;
        @AuraEnabled public String place_id;
        @AuraEnabled public String reference;
        @AuraEnabled public List<String> types = new List<String>();
    }

    /* Wrappers to deserialize place details */
    public class DetailWrapper{
        @AuraEnabled public String errorMessage;
        @AuraEnabled public Result result = new Result();
    }
    public class Result{
        @AuraEnabled public String formatted_address;
        @AuraEnabled public Geometry geometry = new Geometry();
    }
    public class Geometry{
        @AuraEnabled public Location location = new Location();
    }
    public class Location{
        @AuraEnabled public String lat;
        @AuraEnabled public String lng;
    }
}
