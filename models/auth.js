const Base = require("./base");
const CosmosClient = require("@azure/cosmos").CosmosClient;

// For simplicity we'll set a constant partition key
const partitionKey = 'id';
class Auth extends Base {
  /**
   * Manages reading, adding, and updating Tasks in Cosmos DB
   * @param {CosmosClient} cosmosClient
   * @param {string} databaseId
   * @param {string} containerId
   */
  constructor(cosmosClient, databaseId, containerId) {
    super(cosmosClient, databaseId, containerId);
  }

  /**
   * @param {any} itemId
   */
  async getItem(itemId) {
    const { resource } = await this.container.item(itemId, partitionKey).read();
    return resource;
  }
}

module.exports = Auth;
