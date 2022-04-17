import { Offcanvas } from "react-bootstrap";
import { BlogNotification, CommentNotif, FollowNotif, LikeNotif, MenuChange, MenuNotification, Notification, NotifType } from "../../responses/notification";

interface Props {
    show: boolean,
    setShow: (show: boolean) => void,
    nots: Notification[]
}

const Notifications: React.VFC<Props> = ({ show, setShow, nots }) => {
    return <Offcanvas placement="end" onHide={() => setShow(false)} show={show} style={{width: "600px"}}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {nots.map(n => {
                let img;
                let msg;
                let msg2;

                const since_s = (Date.now() - new Date(n.timestamp).getTime()) / 1000;
                const since_m = since_s / 60;
                const since_h = since_m / 60;
                let when;
                if (since_m < 1) {
                    when = `${Math.round(since_s)} seconds ago`;
                } else if (since_h < 1) {
                    when = `${Math.round(since_m)} minutes ago`;
                } else if (since_h < 24) {
                    when = `${Math.round(since_h)} hours ago`;
                } else {
                    when = `${Math.round(since_h / 24)} days ago`;
                }

                switch (n.type) {
                    case NotifType.like: {
                        const like = n as LikeNotif;
                        const user = like.user;
                        img = user.avatar;
                        msg = `${user.first_name} ${user.last_name} liked your ${like.kind}`;
                    }
                    break;
                    case NotifType.follow: {
                        const follow = n as FollowNotif;
                        const user = follow.user;
                        img = user.avatar;
                        msg = `${user.first_name} ${user.last_name} followed your restaurant`;
                    }
                    break;
                    case NotifType.comment: {
                        const comment = n as CommentNotif;
                        const user = comment.user;
                        img = user.avatar;
                        msg = `${user.first_name} ${user.last_name} commented on your restaurant: ${comment.comment.content}`;
                    }
                    break;
                    case NotifType.menu: {
                        const menu = n as MenuNotification;
                        const rst = menu.restaurant;
                        img = rst.logo;
                        let verb;
                        switch (menu.change) {
                            case MenuChange.Create:
                                verb = "added a new item";
                                break;
                            case MenuChange.Delete:
                                verb = "removed an item";
                                break
                            case MenuChange.Update:
                                verb = "updated an item";
                                break;
                            default:
                                break;
                        }
                        msg = `${rst.name} ${verb}: ${menu.item.name}`;
                        msg2 = `Priced at ${menu.item.price}`;
                    }
                    break;
                    case NotifType.blog: {
                        const blog = n as BlogNotification;
                        const rst = blog.restaurant;
                        img = rst.logo;
                        msg = `${rst.name} made a new blog post: ${blog.blog.title}`;
                        msg2 = `${blog.blog.likes} likes`;
                    }
                    break;
                    default:
                        return <></>
                }

                return <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex align-items-center gap-3">
                    <img src={img} style={{width: "50px"}} className="avatar rounded-circle" />
                    <div className="d-flex flex-column flex-grow-1">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 style={{margin: "0"}}>{msg}</h6>
                            <small style={{
                                flexShrink: "0",
                                flexGrow: "0"
                            }}>{when}</small>
                        </div>
                        {
                            msg2 ? <span className="flex-grow-1 align-self-stretch notif-desc">{msg2}</span> : <></>
                        }
                    </div>
                </div>
            </a>
            }
            )}
        </Offcanvas.Body>
    </Offcanvas>
}

export default Notifications;