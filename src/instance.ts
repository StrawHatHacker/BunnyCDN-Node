import {
    AbuseCaseItem,
    AbuseCases,
    AffiliateDetails,
    BillingDetails,
    BillingRecord,
    BillingSummary,
    BunnyCDNOptions,
    ClaimedAffiliateCredits,
    CountryList,
    DNSZones,
    Region,
    Ticket,
    TicketComment,
    TicketList,
    VideoLibraries,
    VideoLibrary,
    VideoLibraryOptions
} from './types';
import { checkForApiKey, getBillingRecordTypeString } from './utils';
import axios from './axiosInstance';

let BunnyCDNAPIKey: string;
let parseDates: boolean = false;
let populateFields: boolean = false;

const BunnyCDNInstance = {
    setAPIKey(apikey: string) {
        if (apikey.length === 0 || typeof apikey !== 'string') {
            throw new Error('Parameter "apikey" is required and must be a string');
        }

        BunnyCDNAPIKey = apikey;
    },
    setOptions: (options: BunnyCDNOptions) => {
        if (options.parseDates && typeof options.parseDates === 'boolean') parseDates = options.parseDates;
        if (options.populateFields && typeof options.populateFields === 'boolean') populateFields = options.populateFields;
    },
    listAbuseCases: async (page = 1, perPage = 1000) => {
        // checkForApiKey(BunnyCDNAPIKey);

        if (page < 1 || page > 2147483647) {
            throw new Error('Parameter "page" must be a positive integer less than or equal to 2147483647');
        }

        if (perPage < 5 || perPage > 1000) {
            throw new Error('Parameter "perpage" must be a positive integer, larger than or equal to 5 and less than or equal to 1000');
        }

        const res = await axios.request<AbuseCases>({
            method: 'GET',
            url: `/abusecase?page=${page}&perPage=${perPage}`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) {
            if (parseDates) {
                res.data.Items.forEach((item: AbuseCaseItem) => {
                    item.DateCreated = new Date(item.DateCreated);
                    item.DateUpdated = new Date(item.DateUpdated);
                    item.Deadline = new Date(item.Deadline);
                });
            }
            return res.data;
        }
        else if (res.status === 401) throw new Error('Unauthorized');
        else throw new Error('BunnyCDN Server error');
    },
    checkAbuseCase: async (id: number) => {
        checkForApiKey(BunnyCDNAPIKey);

        if (!id || typeof id !== 'number') {
            throw new Error('Parameter "id" is required and must be a number');
        }

        const res = await axios.request<AbuseCaseItem>({
            method: 'POST',
            url: `/abusecase/${id}/check`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) {
            if (parseDates) {
                res.data.DateCreated = new Date(res.data.DateCreated);
                res.data.DateUpdated = new Date(res.data.DateUpdated);
                res.data.Deadline = new Date(res.data.Deadline);
            } return res.data;
        }
        else if (res.status === 401) throw new Error('Unauthorized');
        else throw new Error('BunnyCDN Server error');
    },
    getCountryList: async () => {
        checkForApiKey(BunnyCDNAPIKey);

        const res = await axios.request<CountryList[]>({
            method: 'GET',
            url: `/country`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) return res.data;
        else if (res.status === 401) throw new Error('Unauthorized');
        else throw new Error('BunnyCDN Server error');
    },
    getBillingDetails: async () => {
        checkForApiKey(BunnyCDNAPIKey);

        const res = await axios.request<BillingDetails>({
            method: 'GET',
            url: `/billing`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) {
            if (parseDates) {
                res.data.BillingRecords.forEach((item: BillingRecord) => {
                    item.Timestamp = new Date(item.Timestamp);
                })
            }

            if (populateFields) {
                res.data.BillingRecords.forEach((item: BillingRecord) => {
                    item.TypeString = getBillingRecordTypeString(item.Type);
                })
            }
            return res.data;
        }
        else if (res.status === 401) throw new Error('Unauthorized');
        else throw new Error('BunnyCDN Server error');
    },
    getAffiliateDetails: async () => {
        checkForApiKey(BunnyCDNAPIKey);

        const res = await axios.request<AffiliateDetails>({
            method: 'GET',
            url: `/billing/affiliate`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) return res.data;
        else if (res.status === 401) throw new Error('Unauthorized');
        else throw new Error('BunnyCDN Server error');
    },
    claimAffiliateCredits: async () => {
        checkForApiKey(BunnyCDNAPIKey);

        const res = await axios.request<ClaimedAffiliateCredits>({
            method: 'POST',
            url: `/billing/affiliate/claim`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) return res.data;
        else if (res.status === 401) throw new Error('Unauthorized');
        else throw new Error('BunnyCDN Server error');
    },
    /**
    * @deprecated badly documented from BunnyCDN API docs
    */
    createCoinifyPayment: async (amount: number) => {
        return;
        // checkForApiKey(BunnyCDNAPIKey);

        // if (!amount || typeof amount !== 'number') {
        //     throw new Error('Parameter "amount" is required and must be a number');
        // }

        // const res = await axios.request<CreatedCoinifyPayment[]>({
        //     method: 'GET',
        //     url: `/billing/coinify/create?amount=${amount}`,
        //     headers: { AccessKey: BunnyCDNAPIKey }
        // })

        // if (res.status === 200) return res.data;
        // else if (res.status === 401) throw new Error('Unauthorized');
        // else if (res.status === 404) throw new Error('Requested resource not found');
        // else throw new Error('BunnyCDN Server error');
    },
    getBillingSummary: async () => {
        checkForApiKey(BunnyCDNAPIKey);

        const res = await axios.request<BillingSummary>({
            method: 'GET',
            url: `/billing/summary`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) return res.data;
        else if (res.status === 401) throw new Error('Unauthorized');
        else throw new Error('BunnyCDN Server error');
    },
    /**
    * @deprecated badly documented from BunnyCDN API docs
    */
    applyPromoCode: async (code: string) => {
        // checkForApiKey(BunnyCDNAPIKey);

        // if (!code || typeof code !== 'string') {
        //     throw new Error('Parameter "code" is required and must be a string');
        // }

        // const res = await axios.request<ApplyPromoCode>({
        //     method: 'POST',
        //     url: `/billing/applycode?CouponCode=${code}`,
        //     headers: { AccessKey: BunnyCDNAPIKey }
        // })

        // if (res.status === 200) return res.data;
        // else if (res.status === 401) throw new Error('Unauthorized');
        // else throw new Error('BunnyCDN Server error');
    },
    getTicketList: async (page = 1, pageSize = 100) => {
        checkForApiKey(BunnyCDNAPIKey);

        if (!page || typeof page !== 'number') {
            throw new Error('Parameter "page" is required and must be a number');
        }
        if (!pageSize || typeof pageSize !== 'number') {
            throw new Error('Parameter "pageSize" is required and must be a number');
        }

        const res = await axios.request<TicketList>({
            method: 'GET',
            url: `/support/ticket/list?page=${page}&pageSize=${pageSize}`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) {
            if (parseDates) {
                res.data.Items.forEach((item: Ticket) => {
                    item.CreatedAt = new Date(item.CreatedAt);
                    item.Comments.forEach((comment: TicketComment) => {
                        comment.CreatedAt = new Date(comment.CreatedAt);
                    })
                })
            }
            return res.data;
        }
        else if (res.status === 401) throw new Error('Unauthorized');
        else throw new Error('BunnyCDN Server error');
    },
    getTicketDetails: async (id: number) => {
        checkForApiKey(BunnyCDNAPIKey);

        if (!id || typeof id !== 'number') {
            throw new Error('Parameter "id" is required and must be a number');
        }

        const res = await axios.request<Ticket>({
            method: 'GET',
            url: `/support/ticket/details/${id}`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) {
            if (parseDates) {
                res.data.CreatedAt = new Date(res.data.CreatedAt);
                res.data.Comments.forEach((comment: TicketComment) => {
                    comment.CreatedAt = new Date(comment.CreatedAt);
                })
            }
            return res.data;
        }
        else if (res.status === 401) throw new Error('Unauthorized');
        else if (res.status === 404) throw new Error('Requested resource not found');
        else throw new Error('BunnyCDN Server error');
    },
    closeTicket: async (id: number) => {
        checkForApiKey(BunnyCDNAPIKey);

        if (!id || typeof id !== 'number') {
            throw new Error('Parameter "id" is required and must be a number');
        }

        const res = await axios.request<Ticket>({
            method: 'POST',
            url: `/support/ticket/${id}/close`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) return;
        else if (res.status === 400) throw new Error('Bad request');
        else if (res.status === 401) throw new Error('Unauthorized');
        else throw new Error('BunnyCDN Server error');
    },
    /**
     * @deprecated badly documented from BunnyCDN API docs
    */
    replyToTicket: async (id: number, message: string) => { },
    /**
     * @deprecated badly documented from BunnyCDN API docs
    */
    createTicket: async () => { },
    getRegionList: async () => {
        checkForApiKey(BunnyCDNAPIKey);

        const res = await axios.request<Region[]>({
            method: 'GET',
            url: `/region`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) return res.data;
        else throw new Error('BunnyCDN Server error');
    },
    listVideoLibraries: async (page = 1, pageSize = 1000, includeAccessKey = false) => {
        checkForApiKey(BunnyCDNAPIKey);

        if (!page || typeof page !== 'number' || page < 1) {
            throw new Error('Parameter "page" is required and must be a number greater than 0');
        }

        if (!pageSize || typeof pageSize !== 'number' || pageSize < 5 || pageSize > 1000) {
            throw new Error('Parameter "pageSize" is required and must be a number between 5 and 1000, inclusive');
        }

        const res = await axios.request<VideoLibraries>({
            method: 'GET',
            url: `/region?page=${page}&pageSize=${pageSize}&includeAccessKey=${includeAccessKey}`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) {
            if (parseDates) {
                res.data.Items.forEach((item: VideoLibrary) => {
                    item.DateCreated = new Date(item.DateCreated);
                })
                return res.data;
            }
        }
        else if (res.status === 401) throw new Error('Unauthorized');
        else throw new Error('BunnyCDN Server error');
    },
    /**
     * @deprecated badly documented from BunnyCDN API docs
    */
    addVideoLibrary: async (name: string, replicationRegions: string[]) => { },
    getVideoLibrary: async (id: number) => {
        checkForApiKey(BunnyCDNAPIKey);

        if (!id || typeof id !== 'number') {
            throw new Error('Parameter "id" is required and must be a number');
        }

        const res = await axios.request<VideoLibrary>({
            method: 'GET',
            url: `/videolibrary/${id}`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) {
            if (parseDates) {
                res.data.DateCreated = new Date(res.data.DateCreated);
            }
            return res.data;
        }
        else if (res.status === 401) throw new Error('Unauthorized');
        else if (res.status === 404) throw new Error('Requested resource not found');
        else throw new Error('BunnyCDN Server error');
    },
    /**
     * @deprecated badly documented from BunnyCDN API docs
    */
    updateVideoLibrary: async (id: number, options: Partial<VideoLibraryOptions>) => {
        // checkForApiKey(BunnyCDNAPIKey);

        // if (!id || typeof id !== 'number') {
        //     throw new Error('Parameter "id" is required and must be a number');
        // }

        // if (!options) {
        //     throw new Error('Parameter "videoLibraryOptions" is required');
        // }

        // let obj: Partial<VideoLibraryOptions> = {};

        // if (options.Name && typeof options.Name === 'string') {
        //     obj.Name = options.Name;
        // }

        // if (options.CustomHTML && typeof options.CustomHTML === 'string') {
        //     obj.CustomHTML = options.CustomHTML;
        // }

        // if (options.PlayerKeyColor && typeof options.PlayerKeyColor === 'string') {
        //     obj.PlayerKeyColor = options.PlayerKeyColor;
        // }

        // if (options.EnableTokenAuthentication && typeof options.EnableTokenAuthentication === 'boolean') {
        //     obj.EnableTokenAuthentication = options.EnableTokenAuthentication;
        // }

        // if (options.EnableTokenIPVerification && typeof options.EnableTokenIPVerification === 'boolean') {
        //     obj.EnableTokenIPVerification = options.EnableTokenIPVerification;
        // }

        // if (options.ResetToken && typeof options.ResetToken === 'boolean') {
        //     obj.ResetToken = options.ResetToken;
        // }

        // if (options.WatermarkPositionTop && typeof options.WatermarkPositionTop === 'number') {
        //     obj.WatermarkPositionTop = options.WatermarkPositionTop;
        // }

        // if (options.WatermarkPositionLeft && typeof options.WatermarkPositionLeft === 'number') {
        //     obj.WatermarkPositionLeft = options.WatermarkPositionLeft;
        // }

        // if (options.WatermarkWidth && typeof options.WatermarkWidth === 'number') {
        //     obj.WatermarkWidth = options.WatermarkWidth;
        // }

        // if (options.WatermarkHeight && typeof options.WatermarkHeight === 'number') {
        //     obj.WatermarkHeight = options.WatermarkHeight;
        // }

        // if (options.EnabledResolutions && typeof options.EnabledResolutions === 'string') {
        //     obj.EnabledResolutions = options.EnabledResolutions;
        // }

        // if (options.ViAiPublisherId && typeof options.ViAiPublisherId === 'string') {
        //     obj.ViAiPublisherId = options.ViAiPublisherId;
        // }

        // if (options.VastTagUrl && typeof options.VastTagUrl === 'string') {
        //     obj.VastTagUrl = options.VastTagUrl;
        // }

        // if (options.WebhookUrl && typeof options.WebhookUrl === 'string') {
        //     obj.WebhookUrl = options.WebhookUrl;
        // }

        // if (options.CaptionsFontSize && typeof options.CaptionsFontSize === 'number') {
        //     obj.CaptionsFontSize = options.CaptionsFontSize;
        // }

        // if (options.CaptionsFontColor && typeof options.CaptionsFontColor === 'string') {
        //     obj.CaptionsFontColor = options.CaptionsFontColor;
        // }

        // if (options.CaptionsBackground && typeof options.CaptionsBackground === 'string') {
        //     obj.CaptionsBackground = options.CaptionsBackground;
        // }

        // if (options.UILanguage && typeof options.UILanguage === 'string') {
        //     obj.UILanguage = options.UILanguage;
        // }

        // if (options.AllowEarlyPlay && typeof options.AllowEarlyPlay === 'boolean') {
        //     obj.AllowEarlyPlay = options.AllowEarlyPlay;
        // }

        // if (options.PlayerTokenAuthenticationEnabled && typeof options.PlayerTokenAuthenticationEnabled === 'boolean') {
        //     obj.PlayerTokenAuthenticationEnabled = options.PlayerTokenAuthenticationEnabled;
        // }

        // if (options.BlockNoneReferrer && typeof options.BlockNoneReferrer === 'boolean') {
        //     obj.BlockNoneReferrer = options.BlockNoneReferrer;
        // }

        // if (options.EnableMP4Fallback && typeof options.EnableMP4Fallback === 'boolean') {
        //     obj.EnableMP4Fallback = options.EnableMP4Fallback;
        // }

        // if (options.KeepOriginalFiles && typeof options.KeepOriginalFiles === 'boolean') {
        //     obj.KeepOriginalFiles = options.KeepOriginalFiles;
        // }

        // if (options.AllowDirectPlay && typeof options.AllowDirectPlay === 'boolean') {
        //     obj.AllowDirectPlay = options.AllowDirectPlay;
        // }

        // if (options.EnableDRM && typeof options.EnableDRM === 'boolean') {
        //     obj.EnableDRM = options.EnableDRM;
        // }

        // if (options.Controls && typeof options.Controls === 'string') {
        //     obj.Controls = options.Controls;
        // }

        // if (options.Bitrate240p && typeof options.Bitrate240p === 'number') {
        //     obj.Bitrate240p = options.Bitrate240p;
        // }

        // if (options.Bitrate360p && typeof options.Bitrate360p === 'number') {
        //     obj.Bitrate360p = options.Bitrate360p;
        // }

        // if (options.Bitrate480p && typeof options.Bitrate480p === 'number') {
        //     obj.Bitrate480p = options.Bitrate480p;
        // }

        // if (options.Bitrate720p && typeof options.Bitrate720p === 'number') {
        //     obj.Bitrate720p = options.Bitrate720p;
        // }

        // if (options.Bitrate1080p && typeof options.Bitrate1080p === 'number') {
        //     obj.Bitrate1080p = options.Bitrate1080p;
        // }

        // if (options.Bitrate2160p && typeof options.Bitrate2160p === 'number') {
        //     obj.Bitrate2160p = options.Bitrate2160p;
        // }

        // if (options.ShowHeatmap && typeof options.ShowHeatmap === 'boolean') {
        //     obj.ShowHeatmap = options.ShowHeatmap;
        // }

        // if (options.EnableContentTagging && typeof options.EnableContentTagging === 'boolean') {
        //     obj.EnableContentTagging = options.EnableContentTagging;
        // }

        // if (options.FontFamily && typeof options.FontFamily === 'string') {
        //     obj.FontFamily = options.FontFamily;
        // }

        // const res = await axios.request<VideoLibrary>({
        //     method: 'POST',
        //     url: `/videolibrary/${id}`,
        //     headers: { AccessKey: BunnyCDNAPIKey }
        // })

        // if (res.status === 204) {
        //     if (parseDates) {
        //         res.data.DateCreated = new Date(res.data.DateCreated);
        //     }
        //     return res.data;
        // }
        // else if (res.status === 401) throw new Error('Unauthorized');
        // else if (res.status === 404) throw new Error('Requested resource not found');
        // else throw new Error('BunnyCDN Server error');
    },
    /**
     * @deprecated Badly documented by BunnyCDN API docs
    */
    deleteVideoLibrary: async (id: string) => {
        // checkForApiKey(BunnyCDNAPIKey);

        // if (!id || typeof id !== 'number') {
        //     throw new Error('Parameter "id" is required and must be a number');
        // }

        // const res = await axios.request<VideoLibrary>({
        //     method: 'DELETE',
        //     url: `/videolibrary/${id}`,
        //     headers: { AccessKey: BunnyCDNAPIKey }
        // })

        // if (res.status === 204) {
        //     if (parseDates) {
        //         res.data.DateCreated = new Date(res.data.DateCreated);
        //     }
        //     return res.data;
        // }
        // else if (res.status === 401) throw new Error('Unauthorized');
        // else if (res.status === 404) throw new Error('Requested resource not found');
        // else throw new Error('BunnyCDN Server error');
    },
    /**
     * Named Reset Password in BunnyCDN API docs
     * @deprecated Badly documented by BunnyCDN API docs
    */
    resetVideoLibraryApiKey: async () => { },
    /**
     * @deprecated Badly documented by BunnyCDN API docs
    */
    addWatermark: async (id: string) => { },
    /**
    * @deprecated Badly documented by BunnyCDN API docs
   */
    deleteWatermark: async (id: string) => { },
    addAllowedReferrer: async (id: string, hostname: string) => {
        checkForApiKey(BunnyCDNAPIKey);

        if (!id || typeof id !== 'number') {
            throw new Error('Parameter "id" is required and must be a number');
        }

        if (!hostname || typeof hostname !== 'string') {
            throw new Error('Parameter "hostname" is required and must be a string');
        }

        const res = await axios.request({
            method: 'POST',
            url: `/videolibrary/${id}/addAllowedReferrer`,
            headers: { AccessKey: BunnyCDNAPIKey },
            data: { Hostname: hostname }
        })

        if (res.status === 204) return {};
        else if (res.status === 400) throw new Error('Bad request');
        else if (res.status === 401) throw new Error('Unauthorized');
        else if (res.status === 404) throw new Error('Requested resource not found');
        else throw new Error('BunnyCDN Server error');
    },
    removeAllowedReferrer: async (id: string, hostname: string) => {
        checkForApiKey(BunnyCDNAPIKey);

        if (!id || typeof id !== 'number') {
            throw new Error('Parameter "id" is required and must be a number');
        }

        if (!hostname || typeof hostname !== 'string') {
            throw new Error('Parameter "hostname" is required and must be a string');
        }

        const res = await axios.request({
            method: 'POST',
            url: `/videolibrary/${id}/removeAllowedReferrer`,
            headers: { AccessKey: BunnyCDNAPIKey },
            data: { Hostname: hostname }
        })

        if (res.status === 204) return {};
        else if (res.status === 400) throw new Error('Bad request');
        else if (res.status === 401) throw new Error('Unauthorized');
        else if (res.status === 404) throw new Error('Requested resource not found');
        else throw new Error('BunnyCDN Server error');
    },
    addBlockedReferrer: async (id: string, hostname: string) => {
        checkForApiKey(BunnyCDNAPIKey);

        if (!id || typeof id !== 'number') {
            throw new Error('Parameter "id" is required and must be a number');
        }

        if (!hostname || typeof hostname !== 'string') {
            throw new Error('Parameter "hostname" is required and must be a string');
        }

        const res = await axios.request({
            method: 'POST',
            url: `/videolibrary/${id}/addBlockedReferrer`,
            headers: { AccessKey: BunnyCDNAPIKey },
            data: { Hostname: hostname }
        })

        if (res.status === 204) return {};
        else if (res.status === 400) throw new Error('Bad request');
        else if (res.status === 401) throw new Error('Unauthorized');
        else if (res.status === 404) throw new Error('Requested resource not found');
        else throw new Error('BunnyCDN Server error');
    },
    removeBlockedReferrer: async (id: string, hostname: string) => {
        checkForApiKey(BunnyCDNAPIKey);

        if (!id || typeof id !== 'number') {
            throw new Error('Parameter "id" is required and must be a number');
        }

        if (!hostname || typeof hostname !== 'string') {
            throw new Error('Parameter "hostname" is required and must be a string');
        }

        const res = await axios.request({
            method: 'POST',
            url: `/videolibrary/${id}/removeBlockedReferrer`,
            headers: { AccessKey: BunnyCDNAPIKey },
            data: { Hostname: hostname }
        })

        if (res.status === 204) return {};
        else if (res.status === 400) throw new Error('Bad request');
        else if (res.status === 401) throw new Error('Unauthorized');
        else if (res.status === 404) throw new Error('Requested resource not found');
        else throw new Error('BunnyCDN Server error');
    },
    /**
     * @deprecated Badly documented by BunnyCDN API docs
    */
    getDMCA: async (id: string) => { },
    /**
     * @deprecated Badly documented by BunnyCDN API docs
    */
    checkDMCAUrls: async (id: string) => { },
    listDNSZones: async (page = 1, perPage = 1000) => {
        checkForApiKey(BunnyCDNAPIKey);

        if (!page || typeof page !== 'number') {
            throw new Error('Parameter "page" is required and must be a number');
        }

        if (!perPage || typeof perPage !== 'number') {
            throw new Error('Parameter "perPage" is required and must be a number');
        }
        const res = await axios.request<DNSZones>({
            method: 'GET',
            url: `/dnszone?page=${page}&perPage=${perPage}`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (res.status === 200) {
            if (parseDates) {

            }
            return res.data;
        }
        else if (res.status === 401) throw new Error('Unauthorized');
        else if (res.status === 404) throw new Error('Requested resource not found');
        else throw new Error('BunnyCDN Server error');
    }
}

export default BunnyCDNInstance;
