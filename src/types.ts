export type DateTime = string;
export type PullZoneStatus = 1 | 2 | 3 | 4;
export type Urls = {
    Url?: string
    Status: 1 | 2
}

export type AbuseCaseItem = {
    Id: number
    ActualUrl?: string
    DateCreated: DateTime | Date
    DateUpdated: DateTime | Date
    Deadline: DateTime | Date
    PullZoneId: number
    PullZoneName?: string
    Path?: string
    Message?: string
    Status: PullZoneStatus
    Urls: Urls[]
}

export interface BunnyCDNOptions {
    parseDates: boolean
    populateFields: boolean
}

export interface AbuseCases {
    Items: AbuseCaseItem[];
    CurrentPage: number
    TotalItems: number
    HasMoreItems: boolean
}

export type BillingRecordType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
export type BillingRecordTypeString =
    'PayPal'
    | 'Bitcoin'
    | 'CreditCard'
    | 'MonthlyUsage'
    | 'Refund'
    | 'CouponCode'
    | 'BankTransfer'
    | 'AffiliateCredits'

export type BillingRecord = {
    Id: number

    /**
     * @description The external ID of the payment
     */
    PaymentId?: string

    /**
     * @description The amount linked to the record model
     */
    Amount: number

    /**
     * @description The payer reference that sent the payment
     */
    Payer?: string

    /**
     * @description The date and time when the billing record was created
     */
    Timestamp: DateTime | Date

    /**
     * @description The type of the billing record. PayPal = 0, Bitcoin = 1, CreditCard = 2, MonthlyUsage = 3, Refund = 4, CouponCode = 5, BankTransfer = 6, AffiliateCredits = 7
     */
    Type: BillingRecordType

    /**
     * @description The type of the billing record as a string. Available only if parseDates is true
     */
    TypeString?: BillingRecordTypeString

    /**
     * @description Determines if an invoice is available
     */
    InvoiceAvailable: boolean
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

export interface CountryList {
    Name: string
    IsoCode: string
    IsEU: boolean
    TaxRate: number
    FlagUrl: string
    PopList: string[]
}

export interface BillingDetails {

    /**
     * @description The current account balance
    */
    Balance: number

    /**
     * @description The current account charges of the running month
    */
    ThisMonthCharges: number

    /**
     * @description The list of billing records for this account
    */
    BillingRecords: BillingRecord[]

    /**
     * @description The total charges this month paid for Edge Storage
    */
    MonthlyChargesStorage: number

    /**
     * @description The total charges this month paid for European traffic
    */
    MonthlyChargesEUTraffic: number

    /**
     * @description The total charges this month paid for North American traffic
    */
    MonthlyChargesUSTraffic: number

    /**
     * @description The total charges this month paid for Asian and Oceanian traffic
    */
    MonthlyChargesASIATraffic: number

    /**
     * @description The total charges this month paid for African traffic
    */
    MonthlyChargesAFTraffic: number

    /**
     * @description The total charges this month paid for South American traffic
    */
    MonthlyChargesSATraffic: number

    /**
     * @invalid Not documented properly
     * @description The constructed billing history chart data
    */
    BillingHistoryChart: {
        [key: string]: number
    } | null

    /**
     * @description The total bandwidth used by the account during this month.
    */
    MonthlyBandwidthUsed: number

    /**
     * @description The monthly charges caused by optimizer.
    */
    MonthlyChargesOptimizer: number

    /**
     * @description The monthly charges caused by extra pull zones.
    */
    MonthlyChargesExtraPullZones: number

    /**
     * @description Determines if billing is currently enabled for this user.
    */
    BillingEnabled: boolean

    /**
     * @description Determines the minimim monthly commit of the user.
    */
    MinimumMonthlyCommit: number
}

export interface AffiliateDetails {

    /**
     * @description The amount of affiliate credits on the account
    */
    AffiliateBalance: number

    /**
    * @description The affiliate URL for the currently authenticated user
    */
    AffiliateUrl?: string

    /**
     * @invalid Not documented properly
    * @description The constructed affiliate click history chart data
    */
    AffiliateClicksChart?: {
        [key: string]: number
    }

    /**
     * @invalid Not documented properly
    * @description The constructed affiliate signup history chart data
    */
    AffiliateSignupsChart: {
        [key: string]: number
    }
}

export interface ClaimedAffiliateCredits {

    /**
     * @description The amount of affiliate credits that was claimed
    */
    AmountClaimed: number
}

export interface BillingSummary {
    PullZones: Array<{

        /**
         * @description The ID of the pull zone
        */
        PullZoneId: number

        /**
         * @description The total credit amount used in this month by the Pull Zone
        */
        MonthlyUsage: number

        /**
         * @description The total monthly bandwidth used by the pull zone
        */
        MonthlyBandwidthUsed: number
    }>
}

export type CommentUser = {
    Name: string
    ExternalId: string
    Alias: string
    Verified: boolean
    Signature: string
    Role: string
    PhotoUrl: string
}

export type TicketComment = {
    Id: number
    Type: string
    Body: string
    HtmlBody: string
    Public: boolean
    AuthorId: number
    CreatedAt: DateTime | Date
    User: CommentUser
}

export type Ticket = {
    Id: number
    Status: string
    Comments: TicketComment[]
    Subject: string
    CreatedAt: DateTime | Date
}

export interface TicketList {
    Items: Ticket[],
    CurrentPage: number,
    TotalItems: number,
    HasMoreItems: boolean
}

export interface Region {
    Id: number
    Name: string
    PricePerGigabyte: number
    RegionCode: string
    ContinentCode: string
    CountryCode: string
    Latitude: number
    Longitude: number
}

export type VideoLibrary = {
    Id: number

    /**
     * @description The name of the Video Library.
     */
    Name?: string

    /**
     * @description The number of videos in the video library
     */
    VideoCount: number

    /**
     * @description The amount of traffic usage this month
     */
    TrafficUsage: number

    /**
     * @description The total amount of storage used by the library
     */
    StorageUsage: number

    /**
     * @description The date when the video library was created
     */
    DateCreated: DateTime | Date

    /**
     * @description The geo-replication regions of the underlying storage zone
     */
    ReplicationRegions?: string[]

    /**
     * @description The API key used for authenticating with the video library
     */
    ApiKey?: string

    /**
     * @description The read-only API key used for authenticating with the video library
     */
    ReadOnlyApiKey?: string

    /**
     * @description Determines if the video library has a watermark configured
     */
    HasWatermark: boolean

    /**
     * @description The left offset of the watermark position (in %)
     */
    WatermarkPositionLeft: number

    /**
     * @description The top offset of the watermark position (in %)
     */
    WatermarkPositionTop: number

    /**
     * @description The width of the watermark (in %)
     */
    WatermarkWidth: number

    /**
     * @description The height of the watermark (in %)
     */
    WatermarkHeight: number

    /**
     * @description The ID of the connected underlying pull zone
     */
    PullZoneId: number

    /**
     * @description The ID of the connected underlying storage zone
     */
    StorageZoneId: number

    /**
     * @description The comma separated list of enabled resolutions
     */
    EnabledResolutions?: string

    /**
     * @description The vi.ai publisher id for advertising configuration
     */
    ViAiPublisherId?: string

    /**
     * @description The URL of the VAST tag endpoint for advertising configuration
     */
    VastTagUrl?: string

    /**
     * @description The webhook URL of the video library
     */
    WebhookUrl?: string

    /**
     * @description The captions display font size
     */
    CaptionsFontSize: number

    /**
     * @description The captions display font color
     */
    CaptionsFontColor?: string

    /**
     * @description The captions display background color
     */
    CaptionsBackground?: string

    /**
     * @description The UI language of the player
     */
    UILanguage?: string

    /**
     * @description Determines if the Early-Play feature is enabled
     */
    AllowEarlyPlay?: boolean

    /**
     * @description Determines if the player token authentication is enabled
     */
    PlayerTokenAuthenticationEnabled: boolean

    /**
     * @description The list of allowed referrer domains allowed to access the library
     */
    AllowedReferrers?: string[]


    /**
     * @description The list of blocked referrer domains blocked from accessing the library
     */
    BlockedReferrers?: string[]

    /**
     * @description Determines if the requests without a referrer are blocked
     */
    BlockNoneReferrer: boolean

    /**
     * @description Determines if the MP4 fallback feature is enabled
     */
    EnableMP4Fallback: boolean

    /**
     * @description Determines if the original video files should be stored after encoding
     */
    KeepOriginalFiles: boolean

    /**
     * @description Determines direct play URLs are enabled for the library
     */
    AllowDirectPlay: boolean

    /**
     * @description Determines if the MediaCage basic DRM is enabled
     */
    EnableDRM: boolean

    /**
     * @description The bitrate used for encoding 240p videos
     */
    Bitrate240p: number

    /**
     * @description The bitrate used for encoding 360p videos
     */
    Bitrate360p: number

    /**
     * @description The bitrate used for encoding 480p videos
     */
    Bitrate480p: number

    /**
     * @description The bitrate used for encoding 720p videos
     */
    Bitrate720p: number

    /**
     * @description The bitrate used for encoding 1080p videos
     */
    Bitrate1080p: number

    /**
     * @description The bitrate used for encoding 1440p videos
     */
    Bitrate1440p: number

    /**
     * @description The bitrate used for encoding 2160p videos
     */
    Bitrate2160p: number

    /**
     * @description The API access key for the library. Only added when the includeAccessKey parameter is set.
     */
    ApiAccessKey?: string

    /**
     * @description Determines if the video watch heatmap should be displayed in the player.
     */
    ShowHeatmap: boolean

    /**
     * @description Determines if content tagging should be enabled for this library.
    */
    EnableContentTagging: boolean

    /**
     * @description The type of the pull zone attached. Premium = 0, Volume = 1
    */
    PullZoneType: number

    /**
     * @description The custom HTMl that is added into the head of the HTML player.
    */
    CustomHTML?: string

    /**
     * @description The list of controls on the video player.
    */
    Controls?: string

    /**
     * @description The key color of the player.
    */
    PlayerKeyColor?: string

    /**
     * @description The captions font family.
    */
    FontFamily?: string
}

export interface VideoLibraryOptions {
    Name: string
    CustomHTML: string
    PlayerKeyColor: string
    EnableTokenAuthentication: boolean
    EnableTokenIPVerification: boolean
    ResetToken: boolean
    WatermarkPositionLeft: number
    WatermarkPositionTop: number
    WatermarkWidth: number
    WatermarkHeight: number
    EnabledResolutions: string
    ViAiPublisherId: string
    VastTagUrl: string
    WebhookUrl: string
    CaptionsFontSize: number
    CaptionsFontColor: string
    CaptionsBackground: string
    UILanguage: string
    AllowEarlyPlay: boolean
    PlayerTokenAuthenticationEnabled: boolean
    BlockNoneReferrer: boolean
    EnableMP4Fallback: boolean
    KeepOriginalFiles: boolean
    AllowDirectPlay: boolean
    EnableDRM: boolean
    Controls: string
    Bitrate240p: number
    Bitrate360p: number
    Bitrate480p: number
    Bitrate720p: number
    Bitrate1080p: number
    Bitrate1440p: number
    Bitrate2160p: number
    ShowHeatmap: boolean
    EnableContentTagging: boolean
    FontFamily: string
}

export interface VideoLibraries {
    Items: VideoLibrary[]
    CurrentPage: number
    TotalItems: number
    HasMoreItems: boolean
}

export type DNSRecordType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type IPGeoLocation = {
    /**
     * @description The ISO country code of the location
    */
    CountryCode: string

    /**
     * @description The name of the country of the location
    */
    Country: string

    /**
     * @description The ASN of the IP organization
    */
    ASN: number

    /**
     * @description The mame of the organization that owns the IP
    */
    OrganizationName: string

    /**
     * @description The name of the city of the location
    */
    City: string
}

export type EnviromentalVariable = {
    Name: string
    Value: string
}

export type DNSRecord = {
    Id: number
    Type: DNSRecordType
    Ttl: number
    Value: string
    Name: string
    Weight: number
    Priority: number
    Port: number
    Flags: number
    Tag: string
    Accelerated: boolean
    AcceleratedPullZoneId: number
    LinkName: string
    IPGeoLocationInfo: IPGeoLocation
    MonitorStatus: 1 | 2
    MonitorType: 1 | 2 | 3
    GeolocationLatitude: number
    GeolocationLongitude: number
    EnviromentalVariables: EnviromentalVariable[]
    LatencyZone: string
    SmartRoutingType: 1 | 2
    Disabled: boolean
}

export type DNSZone = {
    Id: number
    Domain: string
    Records: DNSRecord[]
    DateModified: DateTime | Date
    DateCreated: DateTime | Date
    NameserversDetected: boolean
    CustomNameserversEnabled: boolean
    Nameserver1: string
    Nameserver2: string
    SoaEmail: string
    NameserversNextCheck: DateTime | Date
    LoggingEnabled: boolean

    /**
     * @description Determines if the TLS 1 is enabled on the DNS Zone
    */
    LoggingIPAnonymizationEnabled: boolean

    /**
     * @description Sets the log anonymization type for this zone
    */
    LogAnonymizationType: number
}

export interface DNSZones {
    Items: DNSZone[]
    CurrentPage: number
    TotalItems: number
    HasMoreItems: boolean
}