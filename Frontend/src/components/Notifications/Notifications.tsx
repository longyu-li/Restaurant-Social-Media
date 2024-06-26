import { Offcanvas } from "react-bootstrap";
import { timeSince } from "../..";
import { BlogNotification, CommentNotif, FollowNotif, LikeNotif, MenuChange, MenuNotification, Notification, NotifType } from "../../responses/notification";

interface Props {
    show: boolean,
    setShow: (show: boolean) => void,
    nots: Notification[]
}

const Notifications: React.VFC<Props> = ({ show, setShow, nots }) => {
    return <Offcanvas placement="end" onHide={() => setShow(false)} show={show} style={{ width: "600px" }}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {
                nots.map(n => {
                    let img;
                    let msg;
                    let msg2;
                    let link;

                    const when = timeSince(new Date(n.timestamp));

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
                            // link = `/restaurants/${auser.}/?tab=menu`;
                            msg = `${user.first_name} ${user.last_name} commented on your restaurant: ${comment.comment.content}`;
                        }
                            break;
                        case NotifType.menu: {
                            const menu = n as MenuNotification;
                            const rst = menu.restaurant;
                            img = rst.logo;
                            link = `/restaurant/${rst.id}/?tab=menu`;
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
                            link = `/restaurant/${rst.id}/?tab=blogs`;
                            msg = `${rst.name} made a new blog post: ${blog.blog.title}`;
                            msg2 = `${blog.blog.likes} likes`;
                        }
                            break;
                        default:
                            return <></>
                    }

                    return <a key={n.id} href={link ?? "#"} className="list-group-item list-group-item-action">
                        <div className="d-flex align-items-center gap-3">
                            <img src={img} style={{ width: "50px", height: "50px", objectFit: "cover" }} className="avatar rounded-circle" />
                            <div className="d-flex flex-column flex-grow-1">
                                <div className="d-flex w-100 justify-content-between">
                                    <h6 style={{
                                        margin: "0",
                                        WebkitLineClamp: "3",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical"
                                    }}>{msg}</h6>
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