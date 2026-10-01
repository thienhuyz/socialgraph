import { Link, useNavigate } from "react-router";
import {
  Bell,
  Bookmark,
  ChartNoAxesColumnIncreasing,
  Ellipsis,
  Hash,
  Heart,
  House,
  Image,
  LogOut,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Search,
  Share,
  UserRound,
  UsersRound,
} from "lucide-react";
import styles from "./Home.module.css";

const trends = [
  { category: "Công nghệ · Đang thịnh hành", topic: "#AI", posts: "12,8K bài viết" },
  { category: "Việt Nam · Chủ đề nổi bật", topic: "Thiết kế sản phẩm", posts: "2.410 bài viết" },
  { category: "Khám phá · Đang thịnh hành", topic: "#Design", posts: "8.326 bài viết" },
];

const suggestions = [
  { name: "Minh Anh", handle: "minhanh.design", initials: "MA", color: "peach" },
  { name: "Quang Huy", handle: "huy.codes", initials: "QH", color: "blue" },
  { name: "Linh Nguyễn", handle: "linh.writes", initials: "LN", color: "violet" },
];

function Avatar({ initials, color = "blue", small = false }: { initials: string; color?: string; small?: boolean }) {
  return <div className={`${styles.avatar} ${styles[color]} ${small ? styles.avatarSmall : ""}`}>{initials}</div>;
}

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <main className={styles.appShell}>
      <aside className={styles.sidebar}>
        <Link to="/" className={styles.brand} aria-label="HUNIA trang chủ">h</Link>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          <Link to="/" className={`${styles.navItem} ${styles.navActive}`}><House /><span>Trang chủ</span></Link>
          <a href="#explore" className={styles.navItem}><Search /><span>Khám phá</span></a>
          <a href="#notifications" className={styles.navItem}><Bell /><span>Thông báo</span><b className={styles.badge}>3</b></a>
          <a href="#messages" className={styles.navItem}><Mail /><span>Tin nhắn</span></a>
          <a href="#communities" className={styles.navItem}><UsersRound /><span>Cộng đồng</span></a>
          <a href="#bookmarks" className={styles.navItem}><Bookmark /><span>Đã lưu</span></a>
          <a href="#profile" className={styles.navItem}><UserRound /><span>Hồ sơ</span></a>
          <button className={styles.navItem}><Ellipsis /><span>Thêm</span></button>
        </nav>
        <button className={styles.postButton}>Đăng bài</button>
        <button className={styles.accountCard} onClick={handleLogout} title="Đăng xuất">
          <Avatar initials="HN" color="violet" small />
          <span className={styles.accountCopy}><strong>HUNIA member</strong><small>Đăng xuất</small></span>
          <MoreHorizontal size={19} />
        </button>
      </aside>

      <section className={styles.timeline} aria-label="Dòng thời gian">
        <header className={styles.topBar}>
          <h1>Trang chủ</h1>
          <button aria-label="Đăng xuất" onClick={handleLogout}><LogOut size={19} /></button>
        </header>
        <div className={styles.feedTabs}>
          <button className={styles.selectedTab}>Dành cho bạn</button>
          <button>Đang theo dõi</button>
        </div>

        <section className={styles.composer} aria-label="Tạo bài viết">
          <Avatar initials="HN" color="violet" />
          <div className={styles.composerBody}>
            <textarea aria-label="Bạn đang nghĩ gì?" placeholder="Có chuyện gì mới?" rows={2} />
            <div className={styles.composerFooter}>
              <div className={styles.composerTools}>
                <button aria-label="Thêm ảnh"><Image /></button>
                <button aria-label="Thêm chủ đề"><Hash /></button>
              </div>
              <button className={styles.postButtonSmall}>Đăng</button>
            </div>
          </div>
        </section>

        <article className={styles.post}>
          <Avatar initials="MA" color="peach" />
          <div className={styles.postContent}>
            <div className={styles.postHeading}>
              <div><strong>Minh Anh</strong><span className={styles.verified}>✓</span><span className={styles.handle}>@minhanh.design · 2 giờ</span></div>
              <button aria-label="Thêm tùy chọn"><MoreHorizontal /></button>
            </div>
            <p>Một giao diện tốt không cần nói quá nhiều. Chỉ cần giúp người dùng tìm đúng thứ họ cần, đúng lúc. ✨</p>
            <div className={styles.postActions}>
              <span><MessageCircle /> 18</span><span><Repeat2 /> 32</span><span><Heart /> 246</span><span><ChartNoAxesColumnIncreasing /> 4,2K</span><span><Share /></span>
            </div>
          </div>
        </article>

        <article className={styles.post}>
          <Avatar initials="QH" color="blue" />
          <div className={styles.postContent}>
            <div className={styles.postHeading}>
              <div><strong>Quang Huy</strong><span className={styles.handle}>@huy.codes · 4 giờ</span></div>
              <button aria-label="Thêm tùy chọn"><MoreHorizontal /></button>
            </div>
            <p>Ghi chú nhỏ cho hôm nay: làm cho thứ phức tạp trở nên dễ hiểu thường khó hơn viết thêm tính năng mới.</p>
            <div className={styles.postActions}>
              <span><MessageCircle /> 7</span><span><Repeat2 /> 12</span><span><Heart /> 89</span><span><ChartNoAxesColumnIncreasing /> 1,1K</span><span><Share /></span>
            </div>
          </div>
        </article>

        <article className={styles.post}>
          <Avatar initials="LN" color="violet" />
          <div className={styles.postContent}>
            <div className={styles.postHeading}>
              <div><strong>Linh Nguyễn</strong><span className={styles.handle}>@linh.writes · 6 giờ</span></div>
              <button aria-label="Thêm tùy chọn"><MoreHorizontal /></button>
            </div>
            <p>Cuối tuần này bạn muốn học thêm điều gì? Mình đang tìm cảm hứng cho một dự án mới.</p>
            <div className={styles.postActions}>
              <span><MessageCircle /> 24</span><span><Repeat2 /> 5</span><span><Heart /> 61</span><span><ChartNoAxesColumnIncreasing /> 930</span><span><Share /></span>
            </div>
          </div>
        </article>
      </section>

      <aside className={styles.rightRail}>
        <label className={styles.searchBox}><Search size={18} /><input placeholder="Tìm kiếm" /></label>
        <section className={styles.panel}>
          <h2>Chủ đề nổi bật</h2>
          {trends.map((trend) => <a className={styles.trend} href="#trends" key={trend.topic}>
            <span>{trend.category}</span><strong>{trend.topic}</strong><small>{trend.posts}</small><MoreHorizontal size={17} />
          </a>)}
          <a href="#more-trends" className={styles.showMore}>Xem thêm</a>
        </section>
        <section className={styles.panel}>
          <h2>Gợi ý theo dõi</h2>
          {suggestions.map((person) => <div className={styles.suggestion} key={person.handle}>
            <Avatar initials={person.initials} color={person.color} small />
            <div className={styles.personCopy}><strong>{person.name}</strong><span>@{person.handle}</span></div>
            <button>Theo dõi</button>
          </div>)}
          <a href="#people" className={styles.showMore}>Xem thêm</a>
        </section>
        <footer className={styles.footerLinks}>
          <a href="#terms">Điều khoản</a><a href="#privacy">Quyền riêng tư</a><a href="#policy">Chính sách</a><span>© 2026 HUNIA</span>
        </footer>
      </aside>
    </main>
  );
}
