export const paymentService = {
  processPayment: async (amount, paymentDetails) => {
    console.log(`Processing mock payment of ₹${amount}...`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `tx-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          amount,
          timestamp: new Date().toISOString()
        });
      }, 1000);
    });
  }
};
