import axios from './axiosInstance';
import { AbuseCaseItem, AbuseCases, BunnyCDNOptions } from './types';

let BunnyCDNAPIKey: string;
let parseDates: boolean = false;

const BunnyCDNInstance = {
    setAPIKey(key: string) {
        if (key.length === 0 || typeof key !== "string") {
            throw new Error("API key is required and must be a string");
        }

        BunnyCDNAPIKey = key;
    },
    setOptions: (options: BunnyCDNOptions) => {
        if (options.parseDates && typeof options.parseDates === "boolean") parseDates = options.parseDates;
    },
    listAbuseCases: async (page: number = 1, perPage: number = 1000) => {
        if (!BunnyCDNAPIKey) {
            throw new Error("API key is not set. Use BunnyCDN.setAPIKey(key) to set it.");
        }

        if (page < 1 || page > 2147483647) {
            throw new Error("Page must be a positive integer less than or equal to 2147483647");
        }

        if (perPage < 5 || perPage > 1000) {
            throw new Error("Per page must be a positive integer, larger than or equal to 5 and less than or equal to 1000");
        }

        const res = await axios.request<AbuseCases>({
            method: 'GET',
            url: `/abusecase?page=${page}&perPage=${perPage}`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (parseDates) {
            res.data.Items.forEach((item: AbuseCaseItem) => {
                item.DateCreated = new Date(item.DateCreated);
                item.DateUpdated = new Date(item.DateUpdated);
                item.Deadline = new Date(item.Deadline);
            });
        }

        if (res.status === 200) return res.data;
        else if (res.status === 401) throw new Error("Unauthorized");
        else throw new Error("BunnyCDN Server error");
    },
    checkAbuseCase: async (id: number) => {
        if (!BunnyCDNAPIKey) {
            throw new Error("API key is not set. Use BunnyCDN.setAPIKey(key) to set it.");
        }

        if (!id || typeof id !== "number") {
            throw new Error("ID is required and must be a number");
        }

        const res = await axios.request<AbuseCaseItem>({
            method: 'POST',
            url: `/abusecase/${id}/check`,
            headers: { AccessKey: BunnyCDNAPIKey }
        })

        if (parseDates) {
            res.data.DateCreated = new Date(res.data.DateCreated);
            res.data.DateUpdated = new Date(res.data.DateUpdated);
            res.data.Deadline = new Date(res.data.Deadline);
        }

        if (res.status === 200) return res.data;
        else if (res.status === 401) throw new Error("Unauthorized");
        else throw new Error("BunnyCDN Server error");
    }
};

export default BunnyCDNInstance;