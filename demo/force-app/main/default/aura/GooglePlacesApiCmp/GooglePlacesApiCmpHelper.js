({
    displayPredictions: function (component, searchString) {
        var action = component.get("c.getAddressAutoComplete");
        action.setParams({
            "input": searchString
        });
        action.setCallback(this, function (response) {
            var state = response.getState();

            if (state === "SUCCESS") {

                var options = JSON.parse(response.getReturnValue());
                var predictions = options.predictions;
                var addresses = [];

                if (predictions.length > 0) {
                    for (var i = 0; i < predictions.length; i++) {
                        addresses.push(
                            {
                                value: predictions[i].types[0],
                                label: predictions[i].description,
                                PlaceId: predictions[i].place_id,
                            });
                    }
                    component.set("v.predictions", addresses);
                }
            }
        });
        $A.enqueueAction(action);
    },
    displaySelectionDetails: function(component, placeId) {
        var action = component.get("c.getAddressDetails");
        action.setParams({
            "placeid": placeId
        });

        action.setCallback(this, function (response) {
            var state = response.getState();

            if (state === "SUCCESS") {

                var option = JSON.parse(response.getReturnValue());
                var address = option.result;
                var key = "address_components";
                var selection = address[key]  
                
                this.insertRecords(component, selection);
            }
        });
        $A.enqueueAction(action);

    },
    insertRecords:function(component, data, phone, company){
		var full_street_id = '';
        var street_number ='';
        var street_name = '';
        for(var prop in data) {
            
            if (data[prop].types[0] == "street_number") {
                   street_number = data[prop].long_name;         
            }    
            
            if (data[prop].types[0] == "route") {
                street_name = data[prop].long_name;               
            }  
            
            if (data[prop].types[0] == "locality") {
                component.set("v.googleCity", data[prop].long_name);
            }
       
            if (data[prop].types[0] == "postal_code") {
                component.set("v.googlePostalCode", data[prop].long_name);
            }
            
            if (data[prop].types[0] == "country") {
                component.set("v.googleCountry", data[prop].long_name);
            }
        }
        
         component.set("v.googleRoute", street_number+' '+street_name); 
    },
    openListbox: function (component, searchString) {

        var searchLookup = component.find("searchLookup");

        if (typeof searchString === 'undefined' || searchString.length < 3)
        {
            $A.util.addClass(searchLookup, 'slds-combobox-lookup');
            $A.util.removeClass(searchLookup, 'slds-is-open');
            return;
        }
        $A.util.addClass(searchLookup, 'slds-is-open');
        $A.util.removeClass(searchLookup, 'slds-combobox-lookup');
    },
    clearComponentConfig: function (component) {
        var searchLookup = component.find("searchLookup");
        var iconPosition = component.find("iconPosition");

        $A.util.addClass(searchLookup, 'slds-combobox-lookup');

        component.set("v.selectedOption", null);
        component.set("v.searchString", null);
        component.set("v.googleCity", null);
        component.set("v.googleRoute", null);
        component.set("v.googlePostalCode", null);
        component.set("v.googleCountry", null);

        $A.util.removeClass(iconPosition, 'slds-input-has-icon_right');
        $A.util.addClass(iconPosition, 'slds-input-has-icon_left');
    },
})