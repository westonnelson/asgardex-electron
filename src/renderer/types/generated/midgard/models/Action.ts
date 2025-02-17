// tslint:disable
/**
 * Midgard Public API
 * The Midgard Public API queries THORChain and any chains linked via the Bifröst and prepares information about the network to be readily available for public users. The API parses transaction event data from THORChain and stores them in a time-series database to make time-dependent queries easy. Midgard does not hold critical information. To interact with BEPSwap and Asgardex, users should query THORChain directly.
 *
 * The version of the OpenAPI document: 2.0.0-alpha.3
 * Contact: devs@thorchain.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {
    Metadata,
    Transaction,
} from './';

/**
 * action details among with related transactions
 * @export
 * @interface Action
 */
export interface Action {
    /**
     * Int64, nano timestamp of the block at which the action was registered
     * @type {string}
     * @memberof Action
     */
    date: string;
    /**
     * Int64, height of the block at which the action was registered
     * @type {string}
     * @memberof Action
     */
    height: string;
    /**
     * Inbound transactions related to the action
     * @type {Array<Transaction>}
     * @memberof Action
     */
    in: Array<Transaction>;
    /**
     * @type {Metadata}
     * @memberof Action
     */
    metadata: Metadata;
    /**
     * Outbound transactions related to the action
     * @type {Array<Transaction>}
     * @memberof Action
     */
    out: Array<Transaction>;
    /**
     * Pools involved in the action
     * @type {Array<string>}
     * @memberof Action
     */
    pools: Array<string>;
    /**
     * Indicates if the action is completed or if related outbound transactions are still pending.
     * @type {string}
     * @memberof Action
     */
    status: ActionStatusEnum;
    /**
     * Type of action
     * @type {string}
     * @memberof Action
     */
    type: ActionTypeEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum ActionStatusEnum {
    Success = 'success',
    Pending = 'pending'
}
/**
 * @export
 * @enum {string}
 */
export enum ActionTypeEnum {
    Swap = 'swap',
    AddLiquidity = 'addLiquidity',
    Withdraw = 'withdraw',
    Donate = 'donate',
    Refund = 'refund'
}

