import AccountId from "./AccountId";
import Hbar from "../Hbar";
import proto from "@hashgraph/proto";

/**
 * An account, and the amount that it sends or receives during a cryptocurrency transfer.
 */
export default class ProxyStaker {
    /**
     * @private
     * @param {object} props
     * @param {AccountId} props.accountId
     * @param {Hbar} props.amount
     */
    constructor(props) {
        /**
         * The Account ID that sends or receives cryptocurrency.
         *
         * @readonly
         */
        this.accountId = props.accountId;

        /**
         * The amount of tinybars that the account sends(negative)
         * or receives(positive).
         *
         * @readonly
         */
        this.amount = props.amount;

        Object.freeze(this);
    }

    /**
     * @internal
     * @param {proto.IProxyStaker} transfer
     * @returns {ProxyStaker}
     */
    static _fromProtobuf(transfer) {
        return new ProxyStaker({
            accountId: AccountId._fromProtobuf(
                /** @type {proto.IAccountID} */ (transfer.accountID)
            ),
            amount: Hbar.fromTinybars(transfer.amount ?? 0),
        });
    }

    /**
     * @internal
     * @returns {proto.IAccountAmount}
     */
    _toProtobuf() {
        return {
            accountID: this.accountId._toProtobuf(),
            amount: this.amount.toTinybars(),
        };
    }
}