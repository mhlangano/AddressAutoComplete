public class msGoogleApiController {      
    @AuraEnabled
    public static string getAddressAutoComplete(String input) {
        String url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='
            + EncodingUtil.urlEncode(input, 'UTF-8')
            + '&key=' + msGoogleApiController.getGoogleMapsAPIKey()
            + '&libraries=places';
        return msGoogleApiController.getHttp(url);
    }
    @AuraEnabled
    public static string getAddressDetails (String placeid) {
        String url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='
            + placeid          
            + '&key=' + msGoogleApiController.getGoogleMapsAPIKey();
        return msGoogleApiController.getHttp(url);
    }     
    @AuraEnabled
    public static String getHttp(String url) {
        HttpRequest req = new HttpRequest();
        Http http = new Http();
        req.setMethod('GET');
        req.setEndpoint(url);
        HTTPResponse res = http.send(req);
        return res.getBody();
    }  
    @AuraEnabled
    public static String getGoogleMapsAPIKey() {
        return 'AIzaSyBa7QuHbuBv6gj6wHk3yCfBPLEqGjN5TcY';
    }
}