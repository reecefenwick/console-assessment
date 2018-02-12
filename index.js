/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => {
  return 'hello world';
};

exports.stripPrivateProperties = (bannedProperties = [], entries = []) => {
  if (!bannedProperties || bannedProperties.length < 1) {
    return entries;
  }
  return entries.map(entry => {
    bannedProperties.forEach(bannedProperty => delete entry[bannedProperty]);
    return entry;
  })
};

exports.excludeByProperty = (propertyToExclude, entries = []) => {
  if (!propertyToExclude) {
    return entries;
  }
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

/**
 * Verify that statusToColourMapping contains an entry for the specified status
 * @param statusToColourMapping
 * @param status {number} e.g. 418
 * @returns {boolean} true if status maps to a colour value
 */
const statusHasColourMapping = (statusToColourMapping = {}, status) => {
  return !!statusToColourMapping[status];
};

exports.applyStatusColor = (colourStatusMapping = {}, statuses = []) => {
  const statusToColourMapping = {};
  for (const colour of Object.keys(colourStatusMapping)) {
    colourStatusMapping[colour]
      .forEach(statusCode => statusToColourMapping[statusCode] = colour)
  }
  return statuses
    .filter(statusEntry => statusHasColourMapping(statusToColourMapping, statusEntry.status))
    .map(statusEntry => Object.assign(statusEntry, {
      color: statusToColourMapping[statusEntry.status]
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

const extractFirstName = (user) => {
  if (user.name) {
    const nameChunks = user.name.split(' ');
    return nameChunks[0] ? nameChunks[0] : '';
  }
};

const buildFullAddress = (user) => {
  return `${user.address.num} ${user.address.street}, ${user.address.suburb}`;
};

/**
 * User API represents months starting at 0, so we will increment by 1
 * @param user
 * @returns {number}
 */
const adjustMonthJoined = (user) => {
  return user.monthJoined + 1;
};

exports.sanitizeUser = (user = {}) => {
  // TODO RF - Move property checks to buildFullAddress()
  if (user.address && user.address.num && user.address.street && user.address.suburb) {
    user.fullAddress = buildFullAddress(user);
  }
  user.firstName = extractFirstName(user);

  user.monthJoined = adjustMonthJoined(user);

  return user;
};

