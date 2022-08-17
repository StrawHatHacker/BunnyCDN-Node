export type DateTime = string;
export type PullZoneStatus = 1 | 2 | 3 | 4;
export type Urls = {
    Url: string
    Status: 1 | 2
}

export type AbuseCaseItem = {
    Id: number
    ActualUrl: string
    DateCreated: DateTime | Date
    DateUpdated: DateTime | Date
    Deadline: DateTime | Date
    PullZoneId: number
    PullZoneName: string
    Path: string
    Message: string
    Status: PullZoneStatus
    Urls: Urls[]
}

export interface BunnyCDNOptions {
    parseDates: boolean
}

export interface AbuseCases {
    Items: AbuseCaseItem[];
    CurrentPage: number
    TotalItems: number
    HasMoreItems: boolean
}

export interface User {
    Id: string
    Email: string
    BillingEmail: string
    FirstName: string
    LastName: string
    StreetAddress: string
    City: string
    ZipCode: string
    Country: string
    CompanyName: string
    VATNumber: string
    ReceiveNotificationEmails: boolean
    ReceivePromotionalEmails: boolean
    Balance: number
    BillingFreeUntilDate: DateTime | Date
    DateJoined: DateTime | Date
    TrialBandwidthLimit: number
    TotalBandwidthUsed: number
    TwoFactorAuthenticationEnabled: boolean
    EmailVerified: boolean
    Permissions: string[]
    UnreadSupportTicketCount: number
    DpaAccepted: boolean
    DpaVersionAccepted: number
    DpaDateAccepted: DateTime | Date
}