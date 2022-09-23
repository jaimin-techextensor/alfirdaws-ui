export class SubscriptionModel {
    public name: string = '';
    public userType: string = '';
    public subscriptionType: string = '';
    public nrOfAds: number = 0;
    public nrOfPictures: number = 0;
    public unlimitedAds: boolean = false;
    public unlimitedPictures: boolean = false;
    public isSearchEngine: boolean = false;
    public isVouchers: boolean = false;
    public isSocialMedia: boolean = false;
    public isBasicCampaigns: boolean = false;
    public isExtendedCampaigns: boolean = false;
    public isStatistics: boolean = false;
    public isTrends: boolean = false;
    public isPartnership: boolean = false;
    public isOnlineSupport: boolean = false;
    public active: boolean = false;
    public visual: string = '';
    public desciption: string = '';
}