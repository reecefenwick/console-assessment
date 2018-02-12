/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => {
  return 'hello world';
};

exports.stripPrivateProperties = (bannedProperties = [], entries = []) => {
  return entries.map(entry => {
    bannedProperties.forEach(bannedProperty => delete entry[bannedProperty]);
    return entry;
  })
};

exports.excludeByProperty = (propertyToExclude, entries = []) => {
  return entries
    .filter(entry => {
      const propertyNames = new Set(Object.keys(entry));
      return !propertyNames.has(propertyToExclude);
    });
};

const sumEntryValues = (objects = []) => {
  let sum = 0;
  objects.forEach(o => sum += o.val);
  return sum;
};

exports.sumDeep = (entries = []) => {
  return entries.map(entry => ({
    objects: sumEntryValues(entry.objects)
  }));
};

const statusHasColourMapping = (statusToColourMapping = {}, status) => {
  return !!statusToColourMapping[status];
};

exports.applyStatusColor = (colourStatusMapping = {}, statuses = []) => {
  const mappings = {};
  for (const colour of Object.keys(colourStatusMapping)) {
    colourStatusMapping[colour]
      .forEach(statusCode => mappings[statusCode] = colour)
  }
  return statuses
    .filter(statusEntry => statusHasColourMapping(mappings, statusEntry.status))
    .map(statusEntry => Object.assign(statusEntry, {
      color: mappings[statusEntry.status]
    }));
};

exports.createGreeting = (greeter, greeting) => {
  return (personsName) => greeter(greeting, personsName);
};


exports.setDefaults = (defaultProperties = {}) => {
  return (objectToApplyDefaults = {}) => {
    const actualProperties = new Set(Object.keys(objectToApplyDefaults));
    for (const defaultPropertyName of Object.keys(defaultProperties)) {
      if (!actualProperties.has(defaultPropertyName)) {
        objectToApplyDefaults[defaultPropertyName] = defaultProperties[defaultPropertyName];
      }
    }
    return objectToApplyDefaults;
  }
};

exports.sanitizeUser = (user = {}) => {
  // TODO RF - Refactor this beast
  var foundUsersFirstname;

  // Create a helper that converts the users name to an array
  function getNameArray() {
    return user.name.split('');
  }

  // Ensure a user has an `fullAddress` property by combining `address.streetNum, address.streetName, address.suburb`
  if (user.address.num && user.address.street && user.address.suburb) {
    user.fullAddress = user.address.num + ' ' + user.address.street + ', ' + user.address.suburb;
  }

  // The given user always returns the `monthJoined` as 0 to 11. We need it to be 1 to 12 so add 1.
  user.monthJoined = user.monthJoined + 1;

  // The users name is their full name. We want easy access to the first name.
  for (i = 0; i < getNameArray().length; i++) {

    // Make sure `firstName` exists and is a String
    if (!user.firstName) user.firstName = '';

    // We can detect the first name by assuming it is separated with a space. So check if the current character is a space.
    if (!foundUsersFirstname) foundUsersFirstname = getNameArray()[i] != ' ' ? false : true;

    // If we haven't found the first name yet, append the next character
    if (getNameArray()[i] && !foundUsersFirstname) {
      user.firstName = user.firstName + getNameArray()[i];
    }
  }

  return user;
};

