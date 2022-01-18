import { encodeURL } from '../../src/encodeURL';
import { MERCHANT_WALLET } from './constant';
import { establishConnection } from './establishConnection';
import { findTransaction } from './findTransaction';
import { simulateCheckout } from './simulateCheckout';
import { simulateWalletInteraction } from './simulateWalletInteraction';
import { validateTransaction } from './validateTransaction';

async function main() {
    console.log("Let's simulate a Solana Pay flow ... \n");
    let paymentStatus: string;

    console.log('1. ✅ Establish connection to the cluster');
    const connection = await establishConnection();

    /**
     * Simulate a checkout experience
     *
     * Recommendation:
     * `amount` and `reference` should be created in a trusted environment (server).
     * The `reference` should be unique to a single customer session,
     * and will be used to find and validate the payment in the future.
     *
     * Read our [getting started guide](#getting-started) for more information on the parameters.
     */
    console.log('\n2. 🛍 Simulate a customer checkout \n');
    const { label, message, memo, amount, reference } = await simulateCheckout();

    /**
     * Create a payment request link
     *
     * Solana pay uses a standard URI scheme across wallets for native SOL and SPL Token payments.
     * Several parameters are encoded within the link representing an intent to collect payment from a customer.
     */
    console.log('3. 💰 Create a payment request link \n');
    const url = encodeURL({ recipient: MERCHANT_WALLET, amount, reference, label, message, memo });

    /**
     * Simulate wallet interaction
     *
     * This is only for example purposes. This interaction will be handled by a wallet provider
     */
    console.log('4. 🔐 Simulate wallet interaction \n');
    simulateWalletInteraction(connection, url);

    // Update payment status
    paymentStatus = 'pending';

    /**
     * Wait for payment to be confirmed
     *
     * When a customer approves the payment request in their wallet, this transaction exists on-chain.
     * You can use any references encoded into the payment link to find the exact transaction on-chain.
     * Important to note that we can only find the transaction when it's **confirmed**
     */
    console.log('\n5. Find the transaction');
    const { signature } = await findTransaction(connection, reference);

    // Update payment status
    paymentStatus = 'confirmed';

    /**
     * Validate transaction
     *
     * Once the `findTransactionSignature` function returns a signature,
     * it confirms that a transaction with reference to this order has been recorded on-chain.
     *
     * `validateTransactionSignature` allows you to validate that the transaction signature
     * found matches the transaction that you expected.
     */
    console.log('\n6. 🔗 Validate transaction \n');

    try {
        await validateTransaction(connection, signature, MERCHANT_WALLET, amount, reference);

        // Update payment status
        paymentStatus = 'validated';
        console.log('✅ Payment validated');
        console.log('📦 Ship order to customer');
    } catch (error) {
        console.error('❌ Payment failed', error);
    }
}

main().then(
    () => process.exit(),
    (err) => {
        console.error(err);
        process.exit(-1);
    }
);
