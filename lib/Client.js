'use strict';

const request = require('request');
const querystring = require('querystring');

const API_HOST = 'https://api.hypixel.net';

class Client {

    /**
     * Constructs a new Client instance
     *
     * @param {object} options - an object containing options, currently only the key
     */
    constructor(options) {
        if (!options.key) {
            throw new Error('Hypixel API key not provided.');
        }

        this.key = options.key;
    }

    /**
     * Returns the full request path for a combination of path and query options
     *
     * @param {string} path - the path
     * @param {object} query - an object of url query params
     * @returns {string} the request url
     * @private
     */
    _buildPath(path, query) {
        const params = query || null;

        const _query = querystring.stringify(Object.assign({}, params, {
            key: this.key,
        }));

        return `${API_HOST}/${path}?${_query}`;
    }

    /**
     * Sends a request to the API
     *
     * @param {string} path - the endpoint of the api request
     * @param {object} query - an object of url query parameters
     * @param {string} resultField - the name of the top level result data field
     * @param {function} callback - The callback function
     * @private
     */
    _sendRequest(path, query, resultField, callback) {
        request(this._buildPath(path, query), (error, res, body) => {
            let data = null;

            if (!error) {
                try {
                    data = JSON.parse(body);
                } catch (ex) {
                    return callback(new Error('malformed json'), null);
                }
            }

            if (data) {
                if (data.success) {
                    return callback(error, resultField ? data[resultField] : data);
                }

                return callback(new Error(data.cause), null);
            }

            return callback(error, data);
        });
    }

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
    _request(path, query, resultField, callback) {
        if (callback) {
            return this._sendRequest(path, query, resultField, callback);
        }

        return new Promise((resolve, reject) => {
            this._sendRequest(path, query, resultField, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * Retrieves information about the provided API key
     *
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getKeyInfo(callback) {
        return this._request('key', null, 'record', callback);
    }

    /**
     * Finds the id of a guild
     *
     * @param {string} field - The field to query
     * @param {string} value - The value to query
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     * @private
     */
    _findGuild(field, value, callback) {
        return this._request('findGuild', { [field]: value }, 'guild', callback);
    }

    /**
     * Finds the id of a guild by the guild name
     *
     * @param {string} name - the name of the guild
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    findGuildByName(name, callback) {
        return this._findGuild('byName', name, callback);
    }

    /**
     * Finds the id of a guild a player is in
     *
     * @param {string} player - a player in the guild
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    findGuildByPlayer(player, callback) {
        return this._findGuild('byUuid', player, callback);
    }

    /**
     * Gets a guild by the guild id
     *
     * @param {string} id - the id of the guild
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getGuild(id, callback) {
        return this._request('guild', { id }, 'guild', callback);
    }

    /**
     * Gets all active boosters
     *
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getBoosters(callback) {
        return this._request('boosters', null, 'boosters', callback);
    }

    /**
     * Gets the friend ids of a player
     *
     * @param {string} player - The id or username of the player
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getFriends(player, callback) {
        return this._request('friends', { player }, 'records', callback);
    }

    /**
     * Gets a players session
     *
     * @param {string} player - The id of the player
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getSession(player, callback) {
        return this._request('session', { uuid: player }, 'session', callback);
    }

    /**
     * Gets a player
     *
     * @param {string} field - The field to query
     * @param {string} value - The value to query
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     * @private
     */
    _getPlayer(field, value, callback) {
        return this._request('player', { [field]: value }, 'player', callback);
    }

    /**
     * Gets a player
     *
     * @param {string} player - The id of the player
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getPlayer(id, callback) {
        return this._getPlayer('uuid', id, callback);
    }

    /**
     * Gets a player by their username
     *
     * @param {string} username - The username of the player
     * @param {function} callback - The callback function, if not provided {Promise} is returned
     * @returns {Promise|undefined} - undefined if callback defined, Promise if no callback
     */
    getPlayerByUsername(username, callback) {
        return this._getPlayer('name', username, callback);
    }
}

module.exports = Client;
