export enum NotifType {
    comment = "comment",
    like = "like",
    follow = "follow",
    blog = "blog",
    menu = "menu"
}

export interface Notification {
    id: string,
    type: NotifType,
    timestamp: string
}

export interface NotificationUser {
    id: number,
    first_name: string,
    last_name: string,
    avatar: string
}

export interface RestaurantNotification extends Notification {
    user: NotificationUser
}

export interface CommentNotif extends RestaurantNotification {
    comment: {
        id: number,
        content: string,
        date: Date
    }
}

// export enum LikeKind {
//     Restaurant = "restaurant", Post = "post"
// }

export interface LikeNotif extends RestaurantNotification {
    kind: "restaurant" | "post"
}

export interface FollowNotif extends RestaurantNotification {}

export interface NotificationRestaurant {
    id: number,
    name: string,
    logo: string
}

export interface UserNotification extends Notification {
    restaurant: NotificationRestaurant
}

export interface BlogNotification extends UserNotification {
    blog: {
        title: string,
        content: string,
        date: Date,
        likes: number
    }
}

export enum MenuChange {
    Create = "c", Update = "u", Delete = "d"
}

export interface MenuNotification extends UserNotification {
    change: MenuChange,
    item: {
        id: number,
        image: string,
        name: string,
        description: string,
        price: number
    }
}
