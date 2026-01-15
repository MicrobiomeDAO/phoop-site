export interface SiteConfig {
  features: {
    showUrgencyBanner: boolean;
    showSpotsLeft: boolean;
    showStats: boolean;
    showFAQ: boolean;
    showTestimonials: boolean;
  };
  content: {
    urgencyMessage: string;
    spotsLeft: string;
    stats: {
      waitlistCount: string;
      betaSignups: string;
      averageRating: string;
      entriesLogged: string;
      rewardsRedeemed: string;
    };
  };
}

export const siteConfig: SiteConfig = {
  features: {
    showUrgencyBanner: false,
    showSpotsLeft: false,
    showStats: false,
    showFAQ: false,
    showTestimonials: false,
  },
  content: {
    urgencyMessage: "EARLY ACCESS ENDING SOON!",
    spotsLeft: "247 SPOTS LEFT",
    stats: {
      waitlistCount: "10K+",
      betaSignups: "10,000+",
      averageRating: "4.9★",
      entriesLogged: "50K+",
      rewardsRedeemed: "$2M+",
    },
  },
};