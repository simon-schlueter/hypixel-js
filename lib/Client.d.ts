declare const request: any;
declare const querystring: any;
declare const API_HOST = "https://api.hypixel.net";
declare class Client {
    key: string;
    /**
     * Constructs a new Client instance
     *
     * @param {object} options - an object containing options, currently only the key
     */
    constructor(options: {
        key: string;
    });
    /**
     * Returns the full request path for a combination of path and query options
     *
     * @param {string} path - the path
     * @param {object} query - an object of url query params
     * @returns {string} the request url
     * @private
     */
    _buildPath(path: string, query: object | null): string;
    /**
     * Sends a request to the API
     *
     * @param {string} path - the endpoint of the api request
     * @param {object} query - an object of url query parameters
     * @param {string} resultField - the name of the top level result data field
     * @param {function} callback - The callback function
     * @private
     */
    _sendRequest<T>(path: string, query: object | null, resultField: string, callback: (error: Error, data: T | null) => void): void;
    /**
     * Sends a request to the API and creates and returns a Promise if no callback is provided
     *
     * @param {string} path - the endpoint of the api request
     * @param {object} query - an object of url query parameters
     * @param {string} resultField - the name of the top level result data field
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     * @private
     */
    _request<T>(path: string, query: object | null, resultField: string, callback: (error: Error, data: object | null) => void): Promise<T> | void;
    /**
     * Retrieves information about the provided API key
     *
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getKeyInfo<T>(callback: (error: Error, data: object | null) => void): Promise<T> | void;
    /**
     * Finds the id of a guild
     *
     * @param {string} field - The field to query
     * @param {string} value - The value to query
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     * @private
     */
    _findGuild<T>(field: string, value: string, callback: (error: Error, data: object | null) => void): Promise<T> | void;
    /**
     * Finds the id of a guild by the guild name
     *
     * @param {string} name - the name of the guild
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    findGuildByName<T>(name: string, callback: (error: Error, data: object | null) => void): Promise<T> | void;
    /**
     * Finds the id of a guild a player is in
     *
     * @param {string} player - a player in the guild
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    findGuildByPlayer<T>(player: string, callback: (error: Error, data: object | null) => void): Promise<T> | void;
    /**
     * Gets a guild by the guild id
     *
     * @param {string} id - the id of the guild
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getGuild<T>(id: string, callback: (error: Error, data: object | null) => void): Promise<T> | void;
    /**
     * Gets all active boosters
     *
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getBoosters<T>(callback: (error: Error, data: object | null) => void): Promise<T> | void;
    /**
     * Gets the friend ids of a player
     *
     * @param {string} player - The id or username of the player
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getFriends<T>(player: string, callback: (error: Error, data: object | null) => void): Promise<T> | void;
    /**
     * Gets a players session
     *
     * @param {string} player - The id of the player
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getSession<T>(player: string, callback: (error: Error, data: object | null) => void): Promise<T> | void;
    /**
     * Gets a player
     *
     * @param {string} field - The field to query
     * @param {string} value - The value to query
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     * @private
     */
    _getPlayer<T>(field: string, value: string, callback: (error: Error, data: object | null) => void): Promise<T> | void;
    /**
     * Gets a player
     *
     * @param {string} id - The id of the player
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getPlayer<T>(id: string, callback: (error: Error, data: object | null) => void): Promise<T> | void;
    /**
     * Gets a player by their username
     *
     * @param {string} username - The username of the player
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getPlayerByUsername<T>(username: string, callback: (error: Error, data: object | null) => void): Promise<T> | void;
}
