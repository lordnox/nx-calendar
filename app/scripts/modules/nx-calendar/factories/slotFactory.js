  /**
   *  unique-filter function to be applied with Array::filter
   **/
  var uniqueFilter = function(item, index, list) {
    return list.indexOf(item, index + 1) < 0;
  };

angular.module('nx-calendar').factory('nxSlotFactory', function(nxRangeFilterFactory) {
  /**
   * slotfactory creates different slots for events. That is necessary as they
   * may overlapp regarding start and end time. Before using slotFactory it
   * is necessary to order the list of events regarding time and length.
   *  @important This method changes the elements of the list!
   *  @param property
   *  @return map-function
   */
  var slotFactory = function slotFactory(property) {
    return function slotify(item, index, list) {
      var slots = list.slice(0, index)
        .filter(nxRangeFilterFactory(item.start, item.end))
        .map(function(event) {
          return event[property];
        })
        .filter(uniqueFilter)
        .sort();
      var slot = slots
        .reduce(function(result, item, index) {
          return !result && (item !== index + 1) ? index + 1 : result;
        }, undefined);
      item[property] = slot || slots.length + 1;
      return item;
    };
  };

  // shorthand for map-notation
  slotFactory.slot = function(property, list) {
    return list.map(slotFactory(property));
  };

  return slotFactory;
});