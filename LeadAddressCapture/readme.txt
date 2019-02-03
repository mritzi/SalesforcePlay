Q2 ReadME

Items Used

Lightning Component
* AddressComponent
* AddressLookupComponent
* AddressResultComponent

Lightning Events
* AddressSelectedEvent

Apex Classes
* AddressCmpController
* AddressLookupCmpController

Custom Metadata
* Goole Map (Google_Map__mdt)
	Additional Fields:
	* Key
	* Endpoint
	Records:
	* predcitions
	* place detail

Custom Fields
* Lead.GeoLocation__c
* Lead.Nearby_Landmark__c

------------------------------------------------------
Deployment Instructions:

Use workbench/ANT to deploy the zip file of 'code' folder
Give (atleast) System Administrators access to read/write the two custom Lead fields
Update relevant lead page layout and add lightning action 'Get Address'+custom fields on the page
Verify that records are correctly deployed in Custom metadata (Google Map)

------------------------------------------------------
Caution: Only meant to be deployed in sandbox/developer org.


*********************************************************************************
Reach out to 'Mohammed Rizwan' on rizwanakhtar08@gmail.com for any communication
*********************************************************************************

/* End of document */