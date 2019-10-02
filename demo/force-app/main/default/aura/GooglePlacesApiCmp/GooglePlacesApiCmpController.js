({
    KeyUpHandler: function (component, event, helper) {
        var searchString = component.get("v.searchString");
        
        helper.openListbox(component, searchString);
        helper.displayPredictions(component, searchString);
    },
    selectOption: function (component, event, helper) {
        var list = component.get("v.predictions");
        var placeId = component.get("v.placeId");
        var searchLookup = component.find("searchLookup");
        var iconPosition = component.find("iconPosition");
        var selection  = event.currentTarget.dataset.record;

        for (var i =0; i < list.length; i++) {
            if (list[i].label == selection ) {
                placeId = (list[i].PlaceId);
            }
        }

        component.set("v.selectedOption ", selection);
        component.set("v.searchString", selection);

        $A.util.removeClass(searchLookup, 'slds-is-open');
        $A.util.removeClass(iconPosition, 'slds-input-has-icon_left');
        $A.util.addClass(iconPosition, 'slds-input-has-icon_right');

        helper.displaySelectionDetails(component, placeId);
    },
    clear: function (component, event, helper) {
        helper.clearComponentConfig(component);
    } 
})