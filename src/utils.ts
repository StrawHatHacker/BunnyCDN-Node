import { BillingRecordType, BillingRecordTypeString } from './types';

export const checkForApiKey = (apiKey: string): void => {
    if (!apiKey) throw new Error('API key is not set. Use BunnyCDN.setAPIKey(key) to set it.');
}

export const getBillingRecordTypeString = (recordType: BillingRecordType): BillingRecordTypeString => {
    switch (recordType) {
        case 0:
            return 'PayPal';
        case 1:
            return 'Bitcoin';
        case 2:
            return 'CreditCard';
        case 3:
            return 'MonthlyUsage';
        case 4:
            return 'Refund';
        case 5:
            return 'CouponCode';
        case 6:
            return 'BankTransfer';
        case 7:
            return 'AffiliateCredits';
        default:
            throw new Error('Invalid billing record type');
    }
}