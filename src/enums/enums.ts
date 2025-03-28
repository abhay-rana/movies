export enum RoleType {
    SUPER_ADMIN = 'superAdmin',
    ORGANIZATION = 'organization',
    BRANCH_ADMIN = 'branchAdmin',
    TRAINER = 'trainer',
    FRONT_DESK_ADMIN = 'frontDeskAdmin',
    USER = 'user',
    WEBMASTER = 'webMaster'
}

export const Staff_Roles = {
    trainer: 'TRAINER',
    frontDeskAdmin: 'FRONT DESK ADMIN',
    webMaster: `Web Master`,
} as any;

export const ActivityLevel = {
    ROOKIE: 'Rookie',
    BEGINNER: 'Beginner',
    INTERMEDIATE: 'Intermediate',
    ADVANCE: 'Advance',
    TRUE_BEAST: 'True Beast',
};

export const AvailabilityType = {
    AVAILABLE: 'available',
    UNAVAILABLE: 'unavailable',
};

export const DateRangeType = {
    SINGLE: 'Single',
    MULTIPLE: 'Multiple',
    ONGOING: 'Ongoing',
};
