export enum Messages {
    InvalidToken = 'Invalid authentication credentials',
    InvalidType = 'Invalid parameter type, it must be {0}',
    RouteNotFound = 'The route provided does not exist. Please check if the values are correct and try again.',
    TooManyRequests = 'You have exceeded your daily/monthly API rate limit. Please review and upgrade your subscription plan at https://promptapi.com/subscriptions to continue.',
    Unauthorized = 'You cannot consume this service'
}
