import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Bell,
  Bookmark,
  Compass,
  Heart,
  House,
  Image as ImageIcon,
  LogOut,
  Mail,
  MessageSquare,
  MoreHorizontal,
  PlusCircle,
  Search,
  Share2,
  SlidersHorizontal,
  Smile,
  Sparkles,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import logoImg from "../assets/logo.png";
import styles from "./Home.module.css";

interface PostItem {
  id: string;
  author: {
    name: string;
    handle: string;
    initials: string;
    color: "peach" | "blue" | "violet" | "emerald";
    badge?: string;
  };
  time: string;
  content: string;
  tags?: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  mediaNote?: string;
}

const initialPosts: PostItem[] = [
  {
    id: "p-1",
    author: {
      name: "Minh Anh",
      handle: "minhanh.design",
      initials: "MA",
      color: "peach",
      badge: "UI/UX Lead",
    },
    time: "2 giờ trước",
    content:
      "Một sản phẩm tốt không cần quá nhiều chi tiết rối rắm. Trọng tâm luôn là sự cân bằng giữa trải nghiệm người dùng, tốc độ phản hồi và tính thẩm mỹ tinh tế. ✨",
    tags: ["DesignSystem", "ProductDesign", "UserExperience"],
    likes: 248,
    comments: 18,
    shares: 32,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "p-2",
    author: {
      name: "Quang Huy",
      handle: "huy.codes",
      initials: "QH",
      color: "blue",
      badge: "Fullstack Dev",
    },
    time: "4 giờ trước",
    content:
      "Ghi chú cho tuần này: Đơn giản hóa kiến trúc trước khi mở rộng tính năng mới. Tối ưu hiệu năng và code sạch luôn mang lại giá trị bền vững lâu dài.",
    tags: ["WebDev", "CleanCode", "Architecture"],
    likes: 95,
    comments: 7,
    shares: 12,
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: "p-3",
    author: {
      name: "Linh Nguyễn",
      handle: "linh.writes",
      initials: "LN",
      color: "violet",
      badge: "Content Creator",
    },
    time: "6 giờ trước",
    content:
      "Cuối tuần này bạn đang ấp ủ dự án hay kỹ năng mới nào? Mình vừa hoàn thiện bản phác thảo cuốn sổ tay sáng tạo nội dung cho cộng đồng, sẽ sớm chia sẻ cùng mọi người nhé! 💡",
    tags: ["Inspiration", "Community", "Writing"],
    likes: 64,
    comments: 24,
    shares: 5,
    isLiked: false,
    isBookmarked: false,
  },
];

const trendingTopics = [
  {
    tag: "#TríTuệNhânTạo",
    category: "Công nghệ",
    count: "14.2K thảo luận",
    growth: "+28%",
  },
  {
    tag: "#ThiếtKếGiaoDiện",
    category: "Sáng tạo",
    count: "8.6K thảo luận",
    growth: "+15%",
  },
  {
    tag: "#LapTrinhWeb",
    category: "Lập trình",
    count: "6.1K thảo luận",
    growth: "+12%",
  },
  {
    tag: "#KhoiNghiepTech",
    category: "Kinh doanh",
    count: "4.5K thảo luận",
    growth: "+9%",
  },
];

const initialSuggestions = [
  {
    id: "s-1",
    name: "Thu Hà",
    handle: "thuha.art",
    initials: "TH",
    color: "emerald" as const,
    subtitle: "Designer & Họa sĩ số",
    isFollowed: false,
  },
  {
    id: "s-2",
    name: "Đức Nam",
    handle: "ducnam.ai",
    initials: "DN",
    color: "blue" as const,
    subtitle: "Kỹ sư AI / ML",
    isFollowed: false,
  },
  {
    id: "s-3",
    name: "Mai Trang",
    handle: "maitrang.pm",
    initials: "MT",
    color: "peach" as const,
    subtitle: "Product Manager",
    isFollowed: false,
  },
];

const activeCommunities = [
  {
    name: "Cộng đồng UI/UX Việt Nam",
    members: "34.5K thành viên",
    avatarColor: "peach",
  },
  {
    name: "Frontend & Fullstack Hub",
    members: "28.2K thành viên",
    avatarColor: "blue",
  },
  {
    name: "Khởi nghiệp Sáng tạo",
    members: "19.8K thành viên",
    avatarColor: "violet",
  },
];

function Avatar({
  initials,
  color = "blue",
  size = "md",
}: {
  initials: string;
  color?: "peach" | "blue" | "violet" | "emerald";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={`${styles.avatar} ${styles[color]} ${styles[`avatar_${size}`]}`}
    >
      {initials}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "for-you" | "following" | "trending"
  >("for-you");
  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [composerText, setComposerText] = useState("");
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const handleToggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      }),
    );
  };

  const handleToggleBookmark = (id: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            isBookmarked: !post.isBookmarked,
          };
        }
        return post;
      }),
    );
  };

  const handleFollowToggle = (id: string) => {
    setSuggestions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFollowed: !item.isFollowed } : item,
      ),
    );
  };

  const handleCreatePost = () => {
    if (!composerText.trim()) return;

    const newPost: PostItem = {
      id: `p-${Date.now()}`,
      author: {
        name: "HUNIA Member",
        handle: "hunia.member",
        initials: "HN",
        color: "violet",
        badge: "Thành viên",
      },
      time: "Vừa xong",
      content: composerText,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isBookmarked: false,
    };

    setPosts([newPost, ...posts]);
    setComposerText("");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.layoutWrapper}>
        {/* ==================== LEFT SIDEBAR ==================== */}
        <aside className={styles.sidebar}>
          {/* Brand header */}
          <Link
            to="/"
            className={styles.brandContainer}
            aria-label="HUNIA Trang chủ"
          >
            <img src={logoImg} alt="HUNIA" className={styles.brandLogo} />
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>HUNIA</span>
              <span className={styles.brandSubtitle}>Mạng xã hội mở</span>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className={styles.navigation} aria-label="Menu chính">
            <Link to="/" className={`${styles.navItem} ${styles.navActive}`}>
              <div className={styles.navIconWrapper}>
                <House size={20} />
              </div>
              <span className={styles.navLabel}>Bảng tin</span>
            </Link>

            <a href="#explore" className={styles.navItem}>
              <div className={styles.navIconWrapper}>
                <Compass size={20} />
              </div>
              <span className={styles.navLabel}>Khám phá</span>
            </a>

            <a href="#notifications" className={styles.navItem}>
              <div className={styles.navIconWrapper}>
                <Bell size={20} />
                <span className={styles.navBadge}>3</span>
              </div>
              <span className={styles.navLabel}>Thông báo</span>
            </a>

            <a href="#messages" className={styles.navItem}>
              <div className={styles.navIconWrapper}>
                <Mail size={20} />
              </div>
              <span className={styles.navLabel}>Tin nhắn</span>
            </a>

            <a href="#communities" className={styles.navItem}>
              <div className={styles.navIconWrapper}>
                <Users size={20} />
              </div>
              <span className={styles.navLabel}>Cộng đồng</span>
            </a>

            <a href="#bookmarks" className={styles.navItem}>
              <div className={styles.navIconWrapper}>
                <Bookmark size={20} />
              </div>
              <span className={styles.navLabel}>Bộ sưu tập</span>
            </a>
          </nav>

          {/* New Post Action */}
          <button
            className={styles.sidebarPostBtn}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              document.getElementById("composerInput")?.focus();
            }}
          >
            <PlusCircle size={18} />
            <span>Tạo bài viết</span>
          </button>

          {/* User Account Card */}
          <div className={styles.accountWidget}>
            <div className={styles.accountProfile}>
              <div className={styles.avatarWithStatus}>
                <Avatar initials="HN" color="violet" size="sm" />
                <span className={styles.onlineDot} title="Đang hoạt động" />
              </div>
              <div className={styles.accountMeta}>
                <strong className={styles.accountName}>HUNIA Member</strong>
                <span className={styles.accountHandle}>@member</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className={styles.logoutBtn}
              title="Đăng xuất khỏi hệ thống"
              aria-label="Đăng xuất"
            >
              <LogOut size={18} />
            </button>
          </div>
        </aside>

        {/* ==================== CENTER FEED ==================== */}
        <main className={styles.mainFeed}>
          {/* Feed Header with Tabs & Filters */}
          <header className={styles.feedHeaderCard}>
            <div className={styles.feedHeaderTop}>
              <div className={styles.feedTitleWrap}>
                <h1 className={styles.feedHeading}>Trang chủ</h1>
                <span className={styles.feedSubhead}>
                  Những chia sẻ và thảo luận mới nhất
                </span>
              </div>
              <button className={styles.filterBtn} title="Lọc bảng tin">
                <SlidersHorizontal size={17} />
              </button>
            </div>

            <div className={styles.tabBar}>
              <button
                className={`${styles.tabItem} ${activeTab === "for-you" ? styles.tabActive : ""}`}
                onClick={() => setActiveTab("for-you")}
              >
                <Sparkles size={16} />
                <span>Dành cho bạn</span>
              </button>
              <button
                className={`${styles.tabItem} ${activeTab === "following" ? styles.tabActive : ""}`}
                onClick={() => setActiveTab("following")}
              >
                <span>Đang theo dõi</span>
              </button>
              <button
                className={`${styles.tabItem} ${activeTab === "trending" ? styles.tabActive : ""}`}
                onClick={() => setActiveTab("trending")}
              >
                <TrendingUp size={16} />
                <span>Thịnh hành</span>
              </button>
            </div>
          </header>

          {/* Post Composer Card */}
          <section className={styles.composerCard} aria-label="Tạo bài viết">
            <div className={styles.composerHeader}>
              <Avatar initials="HN" color="violet" size="md" />
              <div className={styles.composerInputWrap}>
                <textarea
                  id="composerInput"
                  value={composerText}
                  onChange={(e) => setComposerText(e.target.value)}
                  placeholder="Chia sẻ ý tưởng, kiến thức hoặc câu hỏi của bạn..."
                  rows={3}
                  className={styles.composerTextarea}
                />
              </div>
            </div>

            <div className={styles.composerFooter}>
              <div className={styles.composerAttachList}>
                <button
                  type="button"
                  className={styles.attachBtn}
                  title="Thêm hình ảnh"
                >
                  <ImageIcon size={18} className={styles.iconEmerald} />
                  <span>Hình ảnh</span>
                </button>
                <button
                  type="button"
                  className={styles.attachBtn}
                  title="Chủ đề bài viết"
                >
                  <TrendingUp size={18} className={styles.iconBlue} />
                  <span>Chủ đề</span>
                </button>
                <button
                  type="button"
                  className={styles.attachBtn}
                  title="Biểu cảm"
                >
                  <Smile size={18} className={styles.iconAmber} />
                  <span>Cảm xúc</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCreatePost}
                disabled={!composerText.trim()}
                className={styles.publishBtn}
              >
                <span>Đăng bài</span>
              </button>
            </div>
          </section>

          {/* Feed Posts */}
          <section
            className={styles.feedStream}
            aria-label="Danh sách bài viết"
          >
            {posts.map((post) => (
              <article key={post.id} className={styles.postCard}>
                {/* Author Info */}
                <div className={styles.postTop}>
                  <div className={styles.postAuthorGroup}>
                    <Avatar
                      initials={post.author.initials}
                      color={post.author.color}
                      size="md"
                    />
                    <div className={styles.authorMeta}>
                      <div className={styles.authorNameRow}>
                        <strong className={styles.authorName}>
                          {post.author.name}
                        </strong>
                        {post.author.badge && (
                          <span className={styles.badgePill}>
                            {post.author.badge}
                          </span>
                        )}
                      </div>
                      <span className={styles.authorHandle}>
                        @{post.author.handle} · {post.time}
                      </span>
                    </div>
                  </div>

                  <div className={styles.postTopActions}>
                    <button
                      className={`${styles.postIconBtn} ${post.isBookmarked ? styles.bookmarked : ""}`}
                      onClick={() => handleToggleBookmark(post.id)}
                      title={
                        post.isBookmarked ? "Bỏ lưu bài viết" : "Lưu bài viết"
                      }
                    >
                      <Bookmark
                        size={18}
                        fill={post.isBookmarked ? "currentColor" : "none"}
                      />
                    </button>
                    <button
                      className={styles.postIconBtn}
                      title="Tùy chọn khác"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className={styles.postBody}>
                  <p className={styles.postText}>{post.content}</p>

                  {post.tags && post.tags.length > 0 && (
                    <div className={styles.postTagsRow}>
                      {post.tags.map((tag) => (
                        <span key={tag} className={styles.tagChip}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Interaction Footer */}
                <div className={styles.postActionGroup}>
                  <button
                    className={`${styles.interactionBtn} ${post.isLiked ? styles.liked : ""}`}
                    onClick={() => handleToggleLike(post.id)}
                  >
                    <Heart
                      size={18}
                      fill={post.isLiked ? "currentColor" : "none"}
                    />
                    <span>{post.likes}</span>
                  </button>

                  <button className={styles.interactionBtn}>
                    <MessageSquare size={18} />
                    <span>{post.comments}</span>
                  </button>

                  <button className={styles.interactionBtn}>
                    <Share2 size={18} />
                    <span>{post.shares}</span>
                  </button>
                </div>
              </article>
            ))}
          </section>
        </main>

        {/* ==================== RIGHT SIDEBAR ==================== */}
        <aside className={styles.rightRail}>
          {/* Search Box */}
          <div className={styles.searchCard}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết, chủ đề, thành viên..."
              className={styles.searchInput}
            />
          </div>

          {/* Trending Topics Card */}
          <section className={styles.widgetCard}>
            <div className={styles.widgetHeader}>
              <div className={styles.widgetTitleRow}>
                <TrendingUp size={18} className={styles.widgetHeaderIcon} />
                <h2 className={styles.widgetTitle}>Chủ đề sôi nổi</h2>
              </div>
            </div>

            <div className={styles.trendingList}>
              {trendingTopics.map((trend) => (
                <a
                  href="#trend"
                  key={trend.tag}
                  className={styles.trendingItem}
                >
                  <div className={styles.trendingMeta}>
                    <span className={styles.trendingCategory}>
                      {trend.category}
                    </span>
                    <strong className={styles.trendingTag}>{trend.tag}</strong>
                    <span className={styles.trendingCount}>{trend.count}</span>
                  </div>
                  <span className={styles.growthBadge}>{trend.growth}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Connection Suggestions Card */}
          <section className={styles.widgetCard}>
            <div className={styles.widgetHeader}>
              <div className={styles.widgetTitleRow}>
                <Users size={18} className={styles.widgetHeaderIcon} />
                <h2 className={styles.widgetTitle}>Gợi ý kết nối</h2>
              </div>
            </div>

            <div className={styles.suggestionList}>
              {suggestions.map((person) => (
                <div key={person.id} className={styles.suggestionItem}>
                  <Avatar
                    initials={person.initials}
                    color={person.color}
                    size="sm"
                  />
                  <div className={styles.suggestionInfo}>
                    <strong className={styles.suggestionName}>
                      {person.name}
                    </strong>
                    <span className={styles.suggestionSubtitle}>
                      {person.subtitle}
                    </span>
                  </div>
                  <button
                    onClick={() => handleFollowToggle(person.id)}
                    className={`${styles.followBtn} ${person.isFollowed ? styles.followedBtn : ""}`}
                  >
                    {person.isFollowed ? (
                      <>
                        <UserCheck size={14} />
                        <span>Đã theo</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={14} />
                        <span>Kết nối</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Communities */}
          <section className={styles.widgetCard}>
            <div className={styles.widgetHeader}>
              <div className={styles.widgetTitleRow}>
                <Sparkles size={18} className={styles.widgetHeaderIcon} />
                <h2 className={styles.widgetTitle}>Cộng đồng nổi bật</h2>
              </div>
            </div>

            <div className={styles.communityList}>
              {activeCommunities.map((comm) => (
                <a
                  href="#community"
                  key={comm.name}
                  className={styles.communityItem}
                >
                  <div className={styles.communityInfo}>
                    <strong className={styles.communityName}>
                      {comm.name}
                    </strong>
                    <span className={styles.communityMembers}>
                      {comm.members}
                    </span>
                  </div>
                  <span className={styles.communityJoin}>Tham gia</span>
                </a>
              ))}
            </div>
          </section>

          {/* Footer Notes */}
          <footer className={styles.footerBar}>
            <div className={styles.footerLinks}>
              <a href="#terms">Điều khoản</a>
              <a href="#privacy">Quyền riêng tư</a>
              <a href="#help">Trợ giúp</a>
              <a href="#about">Về HUNIA</a>
            </div>
            <p className={styles.copyright}>
              © 2026 HUNIA Social Graph. All rights reserved.
            </p>
          </footer>
        </aside>
      </div>
    </div>
  );
}
