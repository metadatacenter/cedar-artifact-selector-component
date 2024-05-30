export class JsonSchema {
  static properties = 'properties';
  static atContext = '@context';
  static atId = '@id';
  static atType = '@type';
  static schemaIsBasedOn = 'schema:isBasedOn';
  static schemaName = 'schema:name';
  static schemaDescription = 'schema:description';
  static pavDerivedFrom = 'pav:derivedFrom';
  static pavCreatedOn = 'pav:createdOn';
  static pavCreatedBy = 'pav:createdBy';
  static pavLastUpdatedOn = 'pav:lastUpdatedOn';
  static oslcModifiedBy = 'oslc:modifiedBy';
  static ownedByUserName = 'ownedByUserName';
  static createdByUserName = 'createdByUserName';
  static lastUpdatedByUserName = 'lastUpdatedByUserName';
  static path = 'path';
  static numberOfInstances = 'numberOfInstances';
  static resourceType = 'resourceType';
  static builtInProperties = new Map([
    [JsonSchema.atId, true],
    [JsonSchema.atContext, true],
    [JsonSchema.atType, true],
    [JsonSchema.schemaIsBasedOn, true],
    [JsonSchema.schemaName, true],
    [JsonSchema.schemaDescription, true],
    [JsonSchema.pavDerivedFrom, true],
    [JsonSchema.pavCreatedOn, true],
    [JsonSchema.pavCreatedBy, true],
    [JsonSchema.pavLastUpdatedOn, true],
    [JsonSchema.oslcModifiedBy, true],
    [JsonSchema.path, true],
    [JsonSchema.ownedByUserName, true],
    [JsonSchema.createdByUserName, true],
    [JsonSchema.lastUpdatedByUserName, true],
    [JsonSchema.numberOfInstances, true],
    [JsonSchema.resourceType, true]
  ]);
}
