'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Bell,
  Music,
  Users,
  ClipboardList,
  Play,
  Pause,
  Search,
  Bookmark,
  User,
  Compass,
  Heart,
  Calendar,
  Clock,
  Plus,
  Sun,
  Moon,
  Share2,
  MessageCircle,
  Info
} from 'lucide-react';

// Custom Toast notification helper
const showToast = (message) => {
  if (typeof document === 'undefined') return;
  const existing = document.getElementById('studio-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'studio-toast';
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '100px';
  toast.style.left = '50%';
  toast.style.transform = 'translate(-50%, 20px)';
  toast.style.background = 'rgba(204, 164, 59, 0.95)';
  toast.style.color = '#000';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '30px';
  toast.style.fontWeight = 'bold';
  toast.style.fontSize = '0.9rem';
  toast.style.boxShadow = '0 8px 30px rgba(0,0,0,0.5)';
  toast.style.zIndex = '99999';
  toast.style.opacity = '0';
  toast.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  toast.style.pointerEvents = 'none';
  toast.style.direction = 'rtl';
  toast.style.fontFamily = 'var(--font-arabic, sans-serif)';

  document.body.appendChild(toast);

  // Force reflow
  toast.offsetHeight;

  // Animate in
  toast.style.opacity = '1';
  toast.style.transform = 'translate(-50%, 0)';

  // Remove after 2.5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [filters, setFilters] = useState([]);
  const [savedTrackIds, setSavedTrackIds] = useState([]);
  const [cart, setCart] = useState([]);



  // All Works view states
  const [allWorksSearch, setAllWorksSearch] = useState('');
  // Cascading filter selections: level1 = main type, level2 = sub-type, level3 = sub-sub-type
  const [awLevel1, setAwLevel1] = useState('all'); // e.g. 'all', 'زفات', 'شيلات'
  const [awLevel2, setAwLevel2] = useState('all'); // e.g. 'زفات عريس'
  const [awLevel3, setAwLevel3] = useState('all'); // e.g. 'تخرج من الجامعة'

  // Loading state
  const [loading, setLoading] = useState(true);

  // Sync favorites and cart to local storage (after mount)
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('studio_favorites');
      if (savedFavs) {
        const parsed = JSON.parse(savedFavs);
        if (Array.isArray(parsed)) setSavedTrackIds(parsed);
      }
    } catch (e) {
      console.error('Error parsing studio_favorites:', e);
    }

    try {
      const savedCart = localStorage.getItem('studio_cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch (e) {
      console.error('Error parsing studio_cart:', e);
    }
  }, []);

  useEffect(() => {
    try {
      if (savedTrackIds.length > 0 || localStorage.getItem('studio_favorites')) {
        localStorage.setItem('studio_favorites', JSON.stringify(savedTrackIds));
      }
    } catch (e) { }
  }, [savedTrackIds]);

  useEffect(() => {
    try {
      if (cart.length > 0 || localStorage.getItem('studio_cart')) {
        localStorage.setItem('studio_cart', JSON.stringify(cart));
      }
    } catch (e) { }
  }, [cart]);

  // Dynamic SEO & ItemList JSON-LD Schema
  useEffect(() => {
    if (!Array.isArray(tracks) || tracks.length === 0) return;

    const existingScript = document.getElementById('dynamic-tracks-schema');
    if (existingScript) existingScript.remove();

    try {
      const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "أعمال استوديو زفات تباريك الصوتية",
        "description": "مجموعة الأعمال الصوتية الحصرية من استوديو زفات تباريك - شيلات، زفات",
        "url": typeof window !== 'undefined' ? window.location.href : '',
        "numberOfItems": tracks.length,
        "itemListElement": tracks.map((track, index) => {
          const trackTitle = track?.title || 'عمل صوتي';
          return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@context": "https://schema.org",
              "@type": "MusicRecording",
              "@id": typeof window !== 'undefined' ? `${window.location.origin}/#track-${encodeURIComponent(trackTitle)}` : '',
              "name": trackTitle,
              "description": track?.description || `${trackTitle} - من إنتاج استوديو زفات تباريك للصوتيات`,
              "duration": track?.duration || "PT3M",
              "url": typeof window !== 'undefined' ? `${window.location.origin}/#track-${encodeURIComponent(trackTitle)}` : '',
              "image": track?.cover_image_url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
              "logo": "https://z-tabarik.vercel.app/logo.png",
              "genre": Array.isArray(track?.filters) ? track.filters.join(', ') : 'شيلات',
              "inAlbum": {
                "@type": "MusicAlbum",
                "name": "أعمال استوديو زفات تباريك",
                "byArtist": {
                  "@type": "MusicGroup",
                  "name": "زفات تباريك"
                }
              },
              "byArtist": {
                "@type": "MusicGroup",
                "name": track?.artists?.name || track?.artist || "زفات تباريك"
              },
              "isAccessibleForFree": true,
              "keywords": `${trackTitle}, شيلات, زفات, استوديو زفات تباريك,'استوديو زفات تباريك','زفات بالاسماء',افراح,تخرج,زفات افراح,افراح,السعودية,شيلات سعودية,مناسبات ${Array.isArray(track?.filters) ? track.filters.join(', ') : ''}`
            }
          };
        })
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'dynamic-tracks-schema';
      script.textContent = JSON.stringify(itemListSchema);
      document.head.appendChild(script);

      document.title = `استوديو زفات تباريك للصوتيات | ${tracks.length} عمل صوتي - شيلات، زفات`;
    } catch (err) {
      console.error("Error inserting dynamic JSON-LD schema:", err);
    }

    return () => {
      const s = document.getElementById('dynamic-tracks-schema');
      if (s) s.remove();
    };
  }, [tracks]);

  // Artist detail view states
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistSubFilter, setArtistSubFilter] = useState({ style: 'all', category: 'all' });

  // Active playing track state
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [durationSec, setDurationSec] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);

  const getTrackImage = (index) => {
    const urls = [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484755560693-a4074577af3a?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&auto=format&fit=crop&q=80'
    ];
    return urls[index % urls.length];
  };

  const getArtistImage = (name) => {
    return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
  };

  const audioRef = useRef(null);
  const exclusivesScrollRef = useRef(null);
  const latestScrollRef = useRef(null);
  const artistsScrollRef = useRef(null);
  const isScrollPaused = useRef(false); // shared pause flag for marquee sections

  // Smooth marquee-like scroll loop for Latest Works section
  useEffect(() => {
    const el = latestScrollRef.current;
    if (!el || activeTab !== 'home' || categoryFilter === 'requests') return;

    let direction = 1;
    const interval = setInterval(() => {
      if (isScrollPaused.current) return; // paused while user holds
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      const currentScroll = Math.abs(el.scrollLeft);

      if (currentScroll >= maxScroll - 5) {
        direction = -1;
      } else if (currentScroll <= 5) {
        direction = 1;
      }

      el.scrollLeft -= direction * 1;
    }, 25);

    return () => clearInterval(interval);
  }, [tracks, activeTab, categoryFilter]);

  // Smooth marquee-like scroll loop for Top Artists section
  useEffect(() => {
    const el = artistsScrollRef.current;
    if (!el || activeTab !== 'home' || categoryFilter === 'requests') return;

    let direction = 1;
    const interval = setInterval(() => {
      if (isScrollPaused.current) return; // paused while user holds
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      const currentScroll = Math.abs(el.scrollLeft);

      if (currentScroll >= maxScroll - 5) {
        direction = -1;
      } else if (currentScroll <= 5) {
        direction = 1;
      }

      el.scrollLeft -= direction * 1;
    }, 28);

    return () => clearInterval(interval);
  }, [artists, activeTab, categoryFilter]);

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [bookingForm, setBookingForm] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    booking_date: '',
    booking_time: '12:00',
    service_type: 'recording',
    notes: ''
  });

  // State to toggle Booking overlay drawer
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [appTheme, setAppTheme] = useState('light');
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselTouchStartX = useRef(null);

  // Auto-rotating slider for hero
  useEffect(() => {
    if (comingSoon.length === 0) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % comingSoon.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [comingSoon]);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [tracksRes, artistsRes, comingRes, filtersRes, favoritesRes] = await Promise.all([
          fetch('/api/tracks'),
          fetch('/api/artists'),
          fetch('/api/coming-soon'),
          fetch('/api/filters'),
          fetch('/api/favorites')
        ]);

        if (tracksRes.ok) {
          const tData = await tracksRes.json();
          if (Array.isArray(tData)) {
            setTracks(tData);
            if (tData.length > 0) {
              setCurrentTrack(tData[0]);
            }
          } else {
            setTracks([]);
          }
        }
        if (artistsRes.ok) {
          const aData = await artistsRes.json();
          if (Array.isArray(aData)) setArtists(aData);
          else setArtists([]);
        }
        if (comingRes.ok) {
          const cData = await comingRes.json();
          if (Array.isArray(cData)) setComingSoon(cData);
          else setComingSoon([]);
        }
        if (filtersRes.ok) {
          const fData = await filtersRes.json();
          if (Array.isArray(fData)) setFilters(fData);
          else setFilters([]);
        }
        if (favoritesRes && favoritesRes.ok) {
          const fvData = await favoritesRes.json();
          if (Array.isArray(fvData)) setSavedTrackIds(fvData);
        }

      } catch (err) {
        console.error("Failed to fetch dynamic Supabase data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Play controls
  const handlePlayPause = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Playback error:", err);
      });
    }
  };

  const handleSelectTrack = (track, autoPlay = true) => {
    setCurrentTrack(track);
    setIsPlaying(false);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        if (autoPlay) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(err => console.log("Init play interrupted"));
        }
      }
    }, 100);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setCurrentTimeSec(current);
    setDurationSec(dur);
    setProgress(dur > 0 ? (current / dur) * 100 : 0);
  };

  const handleProgressBarClick = (e) => {
    if (!audioRef.current || durationSec === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newPercentage = clickX / width;
    const newTime = newPercentage * durationSec;
    audioRef.current.currentTime = newTime;
    setCurrentTimeSec(newTime);
    setProgress(newPercentage * 100);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Add/Remove saved (database toggle based on device IP)
  const toggleSaveTrack = async (trackId, e) => {
    e.stopPropagation();

    // Optimistic UI update
    if (savedTrackIds.includes(trackId)) {
      setSavedTrackIds(savedTrackIds.filter(id => id !== trackId));
    } else {
      setSavedTrackIds([...savedTrackIds, trackId]);
    }

    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackId })
      });
    } catch (err) {
      console.error("Failed to toggle favorite in database:", err);
    }
  };

  // Cart operations
  const addToCart = (track, e) => {
    if (e) e.stopPropagation();
    if (cart.some(item => item.id === track.id)) return;
    setCart([...cart, track]);
  };

  const removeFromCart = (trackId) => {
    setCart(cart.filter(item => item.id !== trackId));
  };

  // Submit booking request
  const submitBooking = (e) => {
    e.preventDefault();

    // Format WhatsApp Message
    const serviceName = bookingForm.service_type === 'recording' ? '🎤 جلسة تسجيل استوديو' :
      bookingForm.service_type === 'podcast' ? '🎧 تسجيل وإنتاج بودكاست' :
        bookingForm.service_type === 'mixing_mastering' ? '🎛️ هندسة صوتية (مكس وماستر)' :
          bookingForm.service_type === 'voiceover' ? '🗣️ تعليق صوتي ودوبلاج' : bookingForm.service_type;

    const cartItemsText = cart.length > 0
      ? `\n\n🎵 *الأعمال الصوتية المرجعية التي اخترتها:*\n` + cart.map(item => `  - ${item.title}`).join('\n')
      : '';

    const message = `السلام عليكم ورحمة الله وبركاته، طاب يومكم بكل خير 🌺

أود تقديم طلب حجز عمل فني جديد لدى *استوديو زفات تباريك للصوتيات*:

👤 *تفاصيل العميل:*
  - الاسم الكريم: ${bookingForm.client_name}

🎙️ *تفاصيل الخدمة المطلوبة:*
  - نوع الخدمة: ${serviceName}
  - تفاصيل وملاحظات العمل: ${bookingForm.notes || 'لا يوجد تفاصيل إضافية'}${cartItemsText}

أتطلع للتواصل معي لمناقشة التفاصيل والأسعار والجدول الزمني المتاح للتنفيذ. شكراً لكم ولإبداعكم المستمر! ✨`;

    const encodedMessage = encodeURIComponent(message);
    const studioWhatsAppNumber = '966533019282';

    setIsBookingOpen(false);
    window.open(`https://wa.me/${studioWhatsAppNumber}?text=${encodedMessage}`, '_blank');
  };

  // Chat feature removed

  // Filters combining category tabs
  const getFilteredTracks = () => {
    if (categoryFilter === 'all') {
      return searchQuery ? tracks.filter(t => t.title.includes(searchQuery) || (t.artists?.name || '').toLowerCase().includes(searchQuery.toLowerCase())) : tracks;
    } else if (categoryFilter === 'artists') {
      return tracks.filter(t => t.section === 'exclusive' || t.is_exclusive);
    } else {
      return [];
    }
  };

  const getArtistFilteredTracks = () => {
    if (!selectedArtist) return [];

    let artistTracks = tracks.filter(t =>
      String(t.artist_id) === String(selectedArtist.id) ||
      (t.artists?.name && t.artists.name.includes(selectedArtist.name)) ||
      (t.artist && t.artist.includes(selectedArtist.name))
    );

    const selectedStyle = artistSubFilter?.style || 'all';
    const selectedCategory = artistSubFilter?.category || 'all';

    return artistTracks.filter(track => {
      const tFilters = track.filters || [];
      const styleOk = selectedStyle === 'all' || tFilters.includes(selectedStyle);
      const catOk = selectedCategory === 'all' || tFilters.includes(selectedCategory);
      return styleOk && catOk;
    });
  };

  return (
    <div className="rtl app-container" data-theme={appTheme}>
      <div className="phone-mockup">
        <div className="app-viewport">

          {/* App Header */}
          {activeTab !== 'artist_detail' && (
            <header className="app-header">
              <h1
                className="header-logo"
                onClick={() => setActiveTab('about')}
                style={{ cursor: 'pointer', margin: 0, padding: 0, fontSize: 'inherit', fontWeight: 'normal', display: 'flex', alignItems: 'center', gap: '8px' }}
                title="عن الاستوديو"
              >
                <span className="logo-circle" title="استوديو زفات تباريك للصوتيات">
                  <img src="/apple-touch-icon.png" alt="استوديو زفات تباريك للصوتيات" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
                </span>
                <span className="studio-name-desktop">استوديو زفات تباريك للصوتيات</span>
                <span className="studio-name-mobile">استوديو زفات تباريك</span>
              </h1>

              <div className="header-left">
                <button
                  className="icon-btn"
                  onClick={() => setAppTheme(prev => prev === 'light' ? 'dark' : 'light')}
                  title={appTheme === 'light' ? 'وضع داكن' : 'وضع فاتح'}
                >
                  {appTheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>

                <button className="icon-btn" title="عن الاستوديو" onClick={() => setActiveTab('about')}>
                  <Info size={18} />
                </button>

                <button
                  className="icon-btn"
                  title="سلة الطلبات"
                  onClick={() => setIsBookingOpen(true)}
                >
                  <ShoppingBag size={18} />
                  {cart.length > 0 && <span className="icon-badge">{cart.length}</span>}
                </button>
              </div>
            </header>
          )}

          {/* Primary Navigation */}
          {(activeTab === 'home' || activeTab === 'all_artists' || activeTab === 'all_works') && (
            <nav className="category-tabs-container">
              <button
                className={`tab-item ${activeTab === 'home' && categoryFilter === 'all' ? 'active' : ''}`}
                onClick={() => { setActiveTab('home'); setCategoryFilter('all'); }}
              >
                <Compass size={15} />
                الرئيسية
              </button>
              <button
                className={`tab-item ${activeTab === 'all_works' ? 'active' : ''}`}
                onClick={() => setActiveTab('all_works')}
              >
                <Music size={15} />
                كل الأعمال
              </button>
              <button
                className={`tab-item ${activeTab === 'all_artists' ? 'active' : ''}`}
                onClick={() => setActiveTab('all_artists')}
              >
                <Users size={15} />
                كبار الفنانين
              </button>
            </nav>
          )}

          {/* Main App Content */}
          <main className="app-content" id="main-content">

            {/* View 1: Home Viewport */}
            {activeTab === 'home' && (
              <>
                {/* Hero Carousel */}
                {comingSoon.length > 0 && (
                  <div style={{ marginTop: '5px' }}>
                    <h2 className="section-title" style={{ marginRight: '15px' }}>قريباً 🔥</h2>

                    <div
                      className="hero-carousel"
                      onTouchStart={(e) => { carouselTouchStartX.current = e.touches[0].clientX; }}
                      onTouchEnd={(e) => {
                        if (carouselTouchStartX.current === null) return;
                        const diff = carouselTouchStartX.current - e.changedTouches[0].clientX;
                        if (Math.abs(diff) > 40) {
                          // Swipe left → next, swipe right → prev
                          setActiveSlide(prev =>
                            diff > 0
                              ? (prev + 1) % comingSoon.length
                              : (prev - 1 + comingSoon.length) % comingSoon.length
                          );
                        }
                        carouselTouchStartX.current = null;
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        height: '100%',
                        width: `${comingSoon.length * 100}%`,
                        transform: `translateX(${activeSlide * (100 / comingSoon.length)}%)`,
                        transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                      }}>
                        {comingSoon.map((slide, i) => (
                          <div key={`slide-${i}`} style={{
                            position: 'relative',
                            width: `${100 / comingSoon.length}%`,
                            height: '100%',
                            flexShrink: 0,
                            backgroundImage: `url(${slide.image_url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 100%)' }} />
                            <div className="carousel-slide" style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px' }}>
                              <h3 style={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.6)', marginBottom: '8px' }}>
                                {slide.title}
                              </h3>
                              <p style={{ color: 'rgba(255,255,255,0.88)', textShadow: '0 1px 4px rgba(0,0,0,0.5)', fontSize: '0.9rem' }}>
                                {slide.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Ghost edge zones — invisible but tappable prev / next areas */}
                      {comingSoon.length > 1 && (
                        <>
                          <button
                            onClick={() => setActiveSlide(prev => (prev - 1 + comingSoon.length) % comingSoon.length)}
                            style={{
                              position: 'absolute', left: 0, top: 0,
                              width: '10%', height: '100%',
                              zIndex: 20,
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                            aria-label="السابق"
                          />
                          <button
                            onClick={() => setActiveSlide(prev => (prev + 1) % comingSoon.length)}
                            style={{
                              position: 'absolute', right: 0, top: 0,
                              width: '10%', height: '100%',
                              zIndex: 20,
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                            aria-label="التالي"
                          />
                        </>
                      )}

                      <div className="carousel-decor"></div>
                      <div className="carousel-pagination">
                        {comingSoon.map((_, i) => (
                          <span key={i} className={`dot ${activeSlide % comingSoon.length === i ? 'active' : ''}`}
                            onClick={() => setActiveSlide(i)} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 1: احدث اعمالنا */}
                <section aria-labelledby="latest-works-title" id="latest-works">
                  <div className="section-header">
                    <h2 id="latest-works-title" className="section-title">احدث اعمالنا</h2>
                    <a href="#all-works" className="section-link" onClick={(e) => { e.preventDefault(); setActiveTab('all_works'); }}>عرض الكل</a>
                  </div>

                  <div
                    className="horizontal-scroll"
                    ref={latestScrollRef}
                    role="list"
                    onMouseDown={() => { isScrollPaused.current = true; }}
                    onMouseUp={() => { isScrollPaused.current = false; }}
                    onMouseLeave={() => { isScrollPaused.current = false; }}
                    onTouchStart={() => { isScrollPaused.current = true; }}
                    onTouchEnd={() => { isScrollPaused.current = false; }}
                    onTouchCancel={() => { isScrollPaused.current = false; }}
                  >
                    {tracks.filter(t => t.section === 'latest').map((track, i) => (
                      <article
                        key={track.id}
                        className="work-card small"
                        role="listitem"
                        title={track.title}
                        onClick={() => handleSelectTrack(track)}
                      >
                        <figure className="card-inner-bg" style={{ backgroundImage: `url(${track.cover_image_url || getTrackImage(i)})`, backgroundSize: 'cover', backgroundPosition: 'center', margin: 0 }}>
                          <span className="tag-badge">★ NEW</span>

                          <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 10 }}>
                            <button
                              onClick={(e) => toggleSaveTrack(track.id, e)}
                              style={{ background: 'rgba(0,0,0,0.5)', border: 'none', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: savedTrackIds.includes(track.id) ? 'var(--accent-color)' : '#fff', cursor: 'pointer' }}
                            >
                              <Heart size={12} fill={savedTrackIds.includes(track.id) ? 'var(--accent-color)' : 'none'} />
                            </button>
                          </div>

                          {currentTrack && currentTrack.id === track.id && isPlaying ? (
                            <div className="card-music-indicator">
                              <div className="waveform-container" style={{ height: '10px', gap: '1.5px' }}>
                                <div className="wave-bar" style={{ width: '1.5px', height: '100%', background: '#fff' }}></div>
                                <div className="wave-bar" style={{ width: '1.5px', height: '100%', background: '#fff' }}></div>
                                <div className="wave-bar" style={{ width: '1.5px', height: '100%', background: '#fff' }}></div>
                              </div>
                            </div>
                          ) : (
                            <div className="card-music-indicator">
                              <Play size={10} fill="#fff" />
                            </div>
                          )}

                          <figcaption className="card-text-overlay">
                            <h3 className="card-title">{track.title}</h3>
                            <p className="card-artist">{track.artists?.name || track.artist || 'زفات تباريك'}</p>
                          </figcaption>
                        </figure>
                      </article>
                    ))}
                  </div>
                </section>

                {/* Section 2: حصرياتنا */}
                <section aria-labelledby="exclusives-title" id="exclusives">
                  <div className="section-header">
                    <h2 id="exclusives-title" className="section-title">حصرياتنا 🔥</h2>
                  </div>

                  <div className="horizontal-scroll" ref={exclusivesScrollRef}>
                    {tracks.filter(t => t.section === 'exclusive' || t.is_exclusive).map((track, i) => (
                      <div
                        key={`exclusive-${track.id}`}
                        className="work-card tall"
                        onClick={() => handleSelectTrack(track)}
                      >
                        <div className="card-inner-bg" style={{ backgroundImage: `url(${track.cover_image_url || getTrackImage(i + 3)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                          <span className="tag-badge hot">★ NEW 🔥</span>

                          <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 10 }}>
                            <button
                              onClick={(e) => toggleSaveTrack(track.id, e)}
                              style={{ background: 'rgba(0,0,0,0.5)', border: 'none', width: '25px', height: '25px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: savedTrackIds.includes(track.id) ? 'var(--accent-color)' : '#fff', cursor: 'pointer' }}
                            >
                              <Heart size={12} fill={savedTrackIds.includes(track.id) ? 'var(--accent-color)' : 'none'} />
                            </button>
                          </div>

                          {currentTrack && currentTrack.id === track.id && isPlaying ? (
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 6 }}>
                              <div className="waveform-container">
                                <div className="wave-bar"></div>
                                <div className="wave-bar"></div>
                                <div className="wave-bar"></div>
                                <div className="wave-bar"></div>
                              </div>
                            </div>
                          ) : (
                            <div className="card-music-indicator" style={{ top: '8px', left: '38px' }}>
                              <Play size={10} fill="#fff" />
                            </div>
                          )}

                          <div className="card-text-overlay">
                            <div className="card-title" style={{ fontSize: '0.92rem' }}>{track.title}</div>
                            <div className="card-artist">{track.artists?.name || track.artist || 'زفات تباريك'}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 3: كبار الفنانين */}
                <section aria-labelledby="artists-title" id="artists" style={{ marginTop: '24px' }}>
                  <div className="section-header">
                    <h2 id="artists-title" className="section-title">كبار فنانين المنصة 💫</h2>
                  </div>

                  <div
                    className="horizontal-scroll"
                    ref={artistsScrollRef}
                    style={{ paddingBottom: '24px' }}
                    onMouseDown={() => { isScrollPaused.current = true; }}
                    onMouseUp={() => { isScrollPaused.current = false; }}
                    onMouseLeave={() => { isScrollPaused.current = false; }}
                    onTouchStart={() => { isScrollPaused.current = true; }}
                    onTouchEnd={() => { isScrollPaused.current = false; }}
                    onTouchCancel={() => { isScrollPaused.current = false; }}
                  >
                    {artists.filter(a => a.is_featured).map((artist, idx) => (
                      <div
                        key={`featured-artist-${artist.id}`}
                        className="artist-card"
                        onClick={() => {
                          setSelectedArtist(artist);
                          setArtistSubFilter({ style: 'all', category: 'all' });
                          setActiveTab('artist_detail');
                        }}
                      >
                        <div className="card-inner-bg" style={{ backgroundImage: `url(${artist.image_url || getArtistImage(artist.name)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                          <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10, background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold', color: '#fff', backdropFilter: 'blur(4px)' }}>
                            FMT
                          </div>

                          <div className="card-text-overlay">
                            <div className="card-title" style={{ fontSize: '0.85rem' }}>{artist.name}</div>
                            <div className="card-artist" style={{ color: 'var(--accent-color)', fontWeight: '600' }}>{artist.specialty}</div>
                            <div style={{ fontSize: '0.65rem', color: '#f1f5f9', opacity: 0.8, marginTop: '2px', wordBreak: 'break-word', lineHeight: '1.2' }}>{artist.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 16px 24px' }}>
                    <button
                      onClick={() => setActiveTab('all_artists')}
                      style={{
                        padding: '10px 28px',
                        background: 'var(--accent-color)',
                        color: '#000',
                        border: 'none',
                        borderRadius: 'var(--radius-full)',
                        fontFamily: 'var(--font-arabic)',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(204,164,59,0.35)'
                      }}
                    >
                      عرض كل الفنانين ←
                    </button>
                  </div>
                </section>

                {/* Footer */}
                <footer style={{ padding: '24px 16px 80px', borderTop: '1px solid var(--border-color)', marginTop: '24px', textAlign: 'center', marginBottom: '24px' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '8px' }}>
                    <strong>استوديو زفات تباريك للصوتيات</strong> — متخصصون في إنتاج{' '}
                    <a href="#works" onClick={(e) => { e.preventDefault(); setActiveTab('all_works'); setAwLevel1('شيلات'); setAwLevel2('all'); setAwLevel3('all'); }} style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>الشيلات بالأسماء</a>،{' '}
                    <a href="#works" onClick={(e) => { e.preventDefault(); setActiveTab('all_works'); setAwLevel1('زفات'); setAwLevel2('all'); setAwLevel3('all'); }} style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>زفات الأفراح</a>،{' '}
                    المكس والماستر الاحترافي، وتسجيل البودكاست.
                  </p>
                  {/* <address style={{ fontStyle: 'normal', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    تواصل معنا:{' '}
                    <a href="https://wa.me/966533019282" style={{ color: 'var(--accent-color)', textDecoration: 'none' }} rel="noopener noreferrer" target="_blank">واتساب: 966533019282+</a>
                  </address> */}
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', flexWrap: 'wrap' }}>
                    {/* <span>تصميم وتطوير:</span> */}
                    <a
                      href="https://getsoft.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--accent-color)',
                        fontWeight: '900',
                        textDecoration: 'none',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        background: 'rgba(204,164,59,0.1)',
                        border: '1.5px solid rgba(249, 181, 9, 1)',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>  تـصـمـيـم وتـطـويــر   :  </span>
                      <img
                        src="/get-soft.png"
                        alt="GET SOFT"
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          objectFit: 'cover',
                          marginRight: '8px'
                        }}
                      />
                      <span>شـركـة GET SOFT للبرمجيات</span>
                    </a>
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    © {new Date().getFullYear()} استوديو زفات تباريك للصوتيات. جميع الحقوق محفوظة.
                  </p>

                </footer>
              </>
            )}

            {/* View: All Artists */}
            {activeTab === 'all_artists' && (
              <div className="artists-grid-container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <button
                    onClick={() => setActiveTab('home')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-color)', fontWeight: '700', fontSize: '1rem', fontFamily: 'var(--font-arabic)' }}
                  >
                    ← العودة
                  </button>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>كبار فنانين المنصة</h2>
                </div>

                <div className="artists-grid">
                  {artists.map((artist, idx) => (
                    <div
                      key={`all-artist-${artist.id}`}
                      className="artist-card"
                      style={{ width: '100%', height: '200px' }}
                      onClick={() => {
                        setSelectedArtist(artist);
                        setArtistSubFilter({ style: 'all', category: 'all' });
                        setActiveTab('artist_detail');
                      }}
                    >
                      <div
                        className="card-inner-bg"
                        style={{ backgroundImage: `url(${artist.image_url || getArtistImage(artist.name)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                      >
                        <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10, background: 'rgba(204,164,59,0.85)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold', color: '#000' }}>
                          FMT
                        </div>
                        <div className="card-text-overlay">
                          <div className="card-title" style={{ fontSize: '0.85rem' }}>{artist.name}</div>
                          <div className="card-artist" style={{ color: 'var(--accent-color)', fontWeight: '600' }}>{artist.specialty}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* View: Artist Detail Page */}
            {activeTab === 'artist_detail' && selectedArtist && (() => {
              const artistTracks = tracks.filter(t =>
                String(t.artist_id) === String(selectedArtist.id) ||
                (t.artists?.name && t.artists.name === selectedArtist.name) ||
                (t.artist && t.artist === selectedArtist.name)
              );

              const styleFilters = filters.filter(fl => fl.filter_group === 'style');
              const categoryFilters = filters.filter(fl => fl.filter_group !== 'style');

              const selectedStyle = artistSubFilter?.style || 'all';
              const selectedCategory = artistSubFilter?.category || 'all';

              const filteredArtistTracks = artistTracks.filter(track => {
                const tFilters = track.filters || [];
                const styleOk = selectedStyle === 'all' || tFilters.includes(selectedStyle);
                const catOk = selectedCategory === 'all' || tFilters.includes(selectedCategory);
                return styleOk && catOk;
              });

              return (
                <div style={{ padding: '0 0 80px', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>

                  {/* Artist Hero */}
                  <div style={{ position: 'relative', height: '200px', flexShrink: 0 }}>
                    <div style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: `url(${selectedArtist.image_url || getArtistImage(selectedArtist.name)})`,
                      backgroundSize: 'cover', backgroundPosition: 'center'
                    }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)' }} />
                    <button
                      onClick={() => { setActiveTab('all_artists'); setSelectedArtist(null); setArtistSubFilter({ style: 'all', category: 'all' }); }}
                      style={{
                        position: 'absolute', top: '12px', right: '12px', zIndex: 10,
                        background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '20px', padding: '5px 12px', color: '#fff',
                        fontFamily: 'var(--font-arabic)', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer'
                      }}
                    >
                      ← عودة
                    </button>
                    <div style={{ position: 'absolute', bottom: '16px', right: '16px', left: '16px', zIndex: 10 }}>
                      <h2 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '800', margin: '0 0 2px' }}>{selectedArtist.name}</h2>
                      <p style={{ color: 'var(--accent-color)', fontSize: '0.82rem', margin: '0 0 4px', fontWeight: '600' }}>{selectedArtist.specialty}</p>
                      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.73rem', margin: 0 }}>{artistTracks.length} عمل صوتي</p>
                    </div>
                  </div>

                  {/* Two Dropdown Filters */}
                  <div style={{ padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', flexShrink: 0 }}>

                    {/* Dropdown 1: Style */}
                    {styleFilters.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)', paddingRight: '2px' }}>🎵 التصفيات</label>
                        <div style={{ position: 'relative' }}>
                          <select
                            value={selectedStyle}
                            onChange={e => setArtistSubFilter(prev => ({ ...(prev || {}), style: e.target.value }))}
                            style={{
                              width: '100%', padding: '9px 36px 9px 12px', borderRadius: '10px',
                              border: `1px solid ${selectedStyle !== 'all' ? '#cca43b' : 'var(--border-color)'}`,
                              background: selectedStyle !== 'all' ? 'rgba(204,164,59,0.08)' : 'var(--bg-secondary)',
                              color: selectedStyle !== 'all' ? '#cca43b' : 'var(--text-primary)',
                              fontFamily: 'var(--font-arabic)', fontWeight: '600', fontSize: '0.85rem',
                              appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
                              outline: 'none'
                            }}
                          >
                            <option value="all">الكل — كل الأنماط</option>
                            {styleFilters.map(fl => (
                              <option key={fl.id} value={fl.label}>{fl.label}</option>
                            ))}
                          </select>
                          <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)', fontSize: '0.8rem' }}>▾</span>
                        </div>
                      </div>
                    )}

                    {/* Dropdown 2: Category */}
                    {categoryFilters.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)', paddingRight: '2px' }}>🏷️ التصنيفات</label>
                        <div style={{ position: 'relative' }}>
                          <select
                            value={selectedCategory}
                            onChange={e => setArtistSubFilter(prev => ({ ...(prev || {}), category: e.target.value }))}
                            style={{
                              width: '100%', padding: '9px 36px 9px 12px', borderRadius: '10px',
                              border: `1px solid ${selectedCategory !== 'all' ? '#a855f7' : 'var(--border-color)'}`,
                              background: selectedCategory !== 'all' ? 'rgba(168,85,247,0.08)' : 'var(--bg-secondary)',
                              color: selectedCategory !== 'all' ? '#a855f7' : 'var(--text-primary)',
                              fontFamily: 'var(--font-arabic)', fontWeight: '600', fontSize: '0.85rem',
                              appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
                              outline: 'none'
                            }}
                          >
                            <option value="all">الكل — كل الأنواع</option>
                            {categoryFilters.map(fl => (
                              <option key={fl.id} value={fl.label}>{fl.label}</option>
                            ))}
                          </select>
                          <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)', fontSize: '0.8rem' }}>▾</span>
                        </div>
                      </div>
                    )}

                    {/* Results count */}
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'left' }}>
                      {filteredArtistTracks.length} نتيجة
                      {(selectedStyle !== 'all' || selectedCategory !== 'all') && (
                        <button
                          onClick={() => setArtistSubFilter({ style: 'all', category: 'all' })}
                          style={{ marginRight: '8px', background: 'none', border: 'none', color: '#ef4444', fontFamily: 'var(--font-arabic)', fontSize: '0.7rem', cursor: 'pointer', padding: 0, fontWeight: '600' }}
                        >
                          × مسح الفلاتر
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Tracks List */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', padding: '12px 14px' }}>
                    {filteredArtistTracks.length === 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🎵</div>
                        <p style={{ fontSize: '0.85rem' }}>لا توجد أعمال بهذا الفلتر</p>
                      </div>
                    ) : (
                      filteredArtistTracks.map((track, i) => (
                        <div
                          key={`art-track-${track.id}`}
                          onClick={() => handleSelectTrack(track)}
                          style={{
                            display: 'flex', gap: '12px', padding: '10px',
                            background: 'var(--bg-secondary)', borderRadius: '12px',
                            cursor: 'pointer', border: '1px solid var(--border-color)',
                            alignItems: 'center',
                            boxShadow: currentTrack?.id === track.id ? '0 0 0 2px var(--accent-color)' : 'none',
                            transition: 'box-shadow 0.2s'
                          }}
                        >
                          <div style={{
                            width: '50px', height: '50px', borderRadius: '10px', flexShrink: 0,
                            backgroundImage: `url(${track.cover_image_url || getTrackImage(i)})`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1px solid rgba(204,164,59,0.2)'
                          }}>
                            {currentTrack?.id === track.id && isPlaying ? (
                              <div className="waveform-container" style={{ height: '12px', gap: '2px' }}>
                                <div className="wave-bar" style={{ width: '2px', height: '100%', background: '#fff' }}></div>
                                <div className="wave-bar" style={{ width: '2px', height: '100%', background: '#fff' }}></div>
                                <div className="wave-bar" style={{ width: '2px', height: '100%', background: '#fff' }}></div>
                              </div>
                            ) : (
                              <Play size={16} fill="#fff" color="#fff" />
                            )}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</div>
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                              {(track.filters || []).map(fl => {
                                const isStyle = styleFilters.some(sf => sf.label === fl);
                                return (
                                  <span key={fl} style={{
                                    padding: '1px 6px', borderRadius: '20px', fontSize: '0.62rem', fontWeight: '600',
                                    background: isStyle ? 'rgba(204,164,59,0.1)' : 'rgba(168,85,247,0.1)',
                                    border: `1px solid ${isStyle ? 'rgba(204,164,59,0.3)' : 'rgba(168,85,247,0.3)'}`,
                                    color: isStyle ? '#cca43b' : '#a855f7'
                                  }}>{fl}</span>
                                );
                              })}
                            </div>
                          </div>
                          <button
                            onClick={(e) => toggleSaveTrack(track.id, e)}
                            style={{ border: 'none', background: 'transparent', padding: '4px', cursor: 'pointer', flexShrink: 0 }}
                          >
                            <Heart size={18} fill={savedTrackIds.includes(track.id) ? 'var(--accent-color)' : 'none'} color={savedTrackIds.includes(track.id) ? 'var(--accent-color)' : 'var(--text-muted)'} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })()}

            {/* View: All Works Page */}
            {activeTab === 'all_works' && (() => {
              // Build cascading filter tree from filters API + track data
              // Level 1: Main Category filters (filter_group === 'category')
              const level1Options = [
                { value: 'all', label: 'كل الأعمال' },
                ...Array.from(
                  new Set(
                    filters
                      .filter(f => f.filter_group === 'category' || (!f.filter_group || f.filter_group === 'category'))
                      .map(f => f.label)
                  )
                ).map(v => ({ value: v, label: v }))
              ];

              // Level 2: Sub Category filters linked to selected awLevel1 (filter_group === 'sub_category')
              const level2Options = awLevel1 === 'all' ? [] : (() => {
                const subSet = new Set();

                // 1. From filters table with parent_label matching awLevel1 or filter_group === 'sub_category'
                filters
                  .filter(f => f.filter_group === 'sub_category' && (f.parent_label === awLevel1 || !f.parent_label))
                  .forEach(f => subSet.add(f.label));

                // 2. Also fallback to styles or track tags that match awLevel1
                const matchingTracks = tracks.filter(t =>
                  (t.filters || []).includes(awLevel1) || t.title.includes(awLevel1)
                );
                matchingTracks.forEach(t => {
                  (t.filters || []).forEach(f => {
                    if (f !== awLevel1) subSet.add(f);
                  });
                });

                return Array.from(subSet).map(v => ({ value: v, label: v }));
              })();

              // Level 3: Sub Sub Category filters linked to selected awLevel2 (filter_group === 'sub_sub_category')
              const level3Options = (awLevel1 === 'all' || awLevel2 === 'all') ? [] : (() => {
                const subSubSet = new Set();

                // 1. From filters table with parent_label matching awLevel2 or filter_group === 'sub_sub_category'
                filters
                  .filter(f => f.filter_group === 'sub_sub_category' && (f.parent_label === awLevel2 || !f.parent_label))
                  .forEach(f => subSubSet.add(f.label));

                // 2. Also fallback to tracks matching level1 & level2
                const matchingTracks = tracks.filter(t => {
                  const tf = t.filters || [];
                  return (
                    (tf.includes(awLevel1) || t.title.includes(awLevel1)) &&
                    (tf.includes(awLevel2) || t.title.includes(awLevel2))
                  );
                });
                matchingTracks.forEach(t => {
                  (t.filters || []).forEach(f => {
                    if (f !== awLevel1 && f !== awLevel2) subSubSet.add(f);
                  });
                });

                return Array.from(subSubSet).map(v => ({ value: v, label: v }));
              })();

              // Filter tracks based on selections
              let filtered = tracks;
              if (awLevel1 !== 'all') {
                filtered = filtered.filter(t =>
                  (t.filters || []).includes(awLevel1) || t.title.includes(awLevel1)
                );
              }
              if (awLevel2 !== 'all') {
                filtered = filtered.filter(t =>
                  (t.filters || []).includes(awLevel2) || t.title.includes(awLevel2)
                );
              }
              if (awLevel3 !== 'all') {
                filtered = filtered.filter(t =>
                  (t.filters || []).includes(awLevel3) || t.title.includes(awLevel3)
                );
              }
              if (allWorksSearch) {
                filtered = filtered.filter(t =>
                  t.title.includes(allWorksSearch) ||
                  (t.artists?.name || '').includes(allWorksSearch)
                );
              }

              // Active dropdown style helper
              const dropStyle = (active) => ({
                width: '100%',
                padding: '9px 12px 9px 28px',
                borderRadius: '10px',
                border: `1px solid ${active !== 'all' ? 'var(--accent-color)' : 'var(--border-color)'}`,
                background: active !== 'all' ? 'rgba(204,164,59,0.1)' : 'var(--bg-primary)',
                color: active !== 'all' ? 'var(--accent-color)' : 'var(--text-primary)',
                fontFamily: 'var(--font-arabic)',
                fontWeight: '600',
                fontSize: '0.82rem',
                appearance: 'none',
                WebkitAppearance: 'none',
                cursor: 'pointer',
                outline: 'none',
                textAlign: 'right',
                direction: 'rtl'
              });

              return (
                <div className="all-works-container" style={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>

                  {/* Search Bar */}
                  <div style={{ position: 'relative', marginBottom: '12px' }}>
                    <input
                      type="text"
                      placeholder="ابحث عن عمل..."
                      value={allWorksSearch}
                      onChange={(e) => setAllWorksSearch(e.target.value)}
                      style={{ width: '100%', padding: '11px 40px 11px 12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-arabic)' }}
                    />
                    <Search size={17} style={{ position: 'absolute', right: '12px', top: '13px', color: 'var(--text-muted)' }} />
                  </div>

                  {/* Cascading Filter Dropdowns */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>

                    {/* Level 1: Main type */}
                    <div style={{ position: 'relative', flex: '1 1 130px', minWidth: '110px' }}>
                      <select
                        value={awLevel1}
                        onChange={e => { setAwLevel1(e.target.value); setAwLevel2('all'); setAwLevel3('all'); }}
                        style={dropStyle(awLevel1)}
                      >
                        {level1Options.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                      <span style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)', fontSize: '2.2rem' }}>▾</span>
                    </div>

                    {/* Level 2: Sub-type (only if level1 chosen & options exist) */}
                    {awLevel1 !== 'all' && level2Options.length > 0 && (
                      <div style={{ position: 'relative', flex: '1 1 130px', minWidth: '110px' }}>
                        <select
                          value={awLevel2}
                          onChange={e => { setAwLevel2(e.target.value); setAwLevel3('all'); }}
                          style={dropStyle(awLevel2)}
                        >
                          <option value="all">كل {awLevel1}</option>
                          {level2Options.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                        <span style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)', fontSize: '2.2rem' }}>▾</span>
                      </div>
                    )}

                    {/* Level 3: Sub-sub-type (only if level2 chosen & options exist) */}
                    {awLevel2 !== 'all' && level3Options.length > 0 && (
                      <div style={{ position: 'relative', flex: '1 1 130px', minWidth: '110px' }}>
                        <select
                          value={awLevel3}
                          onChange={e => setAwLevel3(e.target.value)}
                          style={dropStyle(awLevel3)}
                        >
                          <option value="all">كل {awLevel2}</option>
                          {level3Options.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                        <span style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)', fontSize: '2.2rem' }}>▾</span>
                      </div>
                    )}
                  </div>

                  {/* Results count + clear */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0 2px' }}>
                    <span>{filtered.length} عمل</span>
                    {(awLevel1 !== 'all' || awLevel2 !== 'all' || awLevel3 !== 'all' || allWorksSearch) && (
                      <button
                        onClick={() => { setAwLevel1('all'); setAwLevel2('all'); setAwLevel3('all'); setAllWorksSearch(''); }}
                        style={{ background: 'none', border: 'none', color: '#ef4444', fontFamily: 'var(--font-arabic)', fontSize: '0.72rem', cursor: 'pointer', padding: 0, fontWeight: '700' }}
                      >
                        × مسح التصفية
                      </button>
                    )}
                  </div>

                  {/* List of works */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '80px' }}>
                    {filtered.length === 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                        <Search size={40} strokeWidth={1} style={{ marginBottom: '12px', opacity: 0.5 }} />
                        <p>لا توجد نتائج مطابقة</p>
                      </div>
                    ) : (
                      filtered.map((track, i) => (
                        <div
                          key={`allworks-${track.id}`}
                          onClick={() => handleSelectTrack(track)}
                          style={{ display: 'flex', gap: '12px', padding: '10px', background: 'var(--bg-secondary)', borderRadius: '12px', cursor: 'pointer', border: `1px solid ${currentTrack && currentTrack.id === track.id ? 'var(--accent-color)' : 'var(--border-color)'}`, alignItems: 'center' }}
                        >
                          <div className={`grad-${(i % 5) + 1}`} style={{ width: '50px', height: '50px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', backgroundImage: `url(${track.cover_image_url || getTrackImage(i)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            {currentTrack && currentTrack.id === track.id && isPlaying ? (
                              <div className="waveform-container" style={{ height: '10px', gap: '2px' }}>
                                <div className="wave-bar" style={{ width: '2px', height: '100%', background: '#fff' }}></div>
                                <div className="wave-bar" style={{ width: '2px', height: '100%', background: '#fff' }}></div>
                                <div className="wave-bar" style={{ width: '2px', height: '100%', background: '#fff' }}></div>
                              </div>
                            ) : (
                              <Play size={16} fill="#fff" />
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>{track.title}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                              {track.artists?.name || track.artist || 'زفات تباريك'}
                              {(track.filters || []).length > 0 && (
                                <span style={{ marginRight: '6px', color: 'var(--accent-color)', fontSize: '0.72rem' }}>
                                  • {(track.filters || []).slice(0, 2).join(' | ')}
                                </span>
                              )}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={(e) => toggleSaveTrack(track.id, e)}
                              style={{ border: 'none', background: 'transparent', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                              <Heart size={20} fill={savedTrackIds.includes(track.id) ? 'var(--accent-color)' : 'none'} color={savedTrackIds.includes(track.id) ? 'var(--accent-color)' : 'var(--text-muted)'} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })()}

            {/* View 2: Search Viewport */}
            {activeTab === 'search' && (
              <div className="search-container">
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="ابحث عن مؤثرات، ألقاب، أو زفات..."
                    className="form-input"
                    style={{ width: '100%', paddingRight: '40px' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--text-muted)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>أعمال مقترحة تناسب بحثك</h3>
                  {getFilteredTracks().map((track, i) => (
                    <div
                      key={`search-res-${track.id}`}
                      onClick={() => handleSelectTrack(track)}
                      style={{ display: 'flex', gap: '12px', padding: '8px', background: 'var(--bg-secondary)', borderRadius: '12px', cursor: 'pointer', border: '1px solid var(--border-color)', alignItems: 'center' }}
                    >
                      <div className={`grad-${(i % 5) + 1}`} style={{ width: '50px', height: '50px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', backgroundImage: `url(${track.cover_image_url || getTrackImage(i)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <Play size={16} fill="#fff" />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>{track.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{track.artists?.name || track.artist || 'زفات تباريك'}</div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={(e) => addToCart(track, e)}
                          style={{ border: 'none', background: 'var(--bg-tertiary)', width: '32px', height: '32px', borderRadius: '50%', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 3: Chat Viewport removed */}

            {/* View 4: Saved / Favorites Viewport */}
            {activeTab === 'saved' && (
              <div style={{ padding: '16px', marginBottom: '66px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '16px', color: 'var(--text-secondary)' }}>المحفوظات 💖</h3>

                {savedTrackIds.length === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                    <Bookmark size={40} strokeWidth={1} style={{ marginBottom: '12px' }} />
                    <p>قائمتك المفضلة فارغة حالياً.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {tracks.filter(t => savedTrackIds.includes(t.id)).map((track, i) => (
                      <div
                        key={`saved-res-${track.id}`}
                        onClick={() => handleSelectTrack(track)}
                        style={{ display: 'flex', gap: '12px', padding: '8px', background: 'var(--bg-secondary)', borderRadius: '12px', cursor: 'pointer', border: '1px solid var(--border-color)', alignItems: 'center' }}
                      >
                        <div className={`grad-${(i % 5) + 1}`} style={{ width: '50px', height: '50px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', backgroundImage: `url(${track.cover_image_url || getTrackImage(i)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                          <Play size={16} fill="#fff" />
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>{track.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{track.artists?.name || track.artist || 'زفات تباريك'}</div>
                        </div>

                        <button
                          onClick={(e) => toggleSaveTrack(track.id, e)}
                          style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}
                        >
                          <Heart size={16} fill="#ef4444" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* View 5: About Studio */}
            {activeTab === 'about' && (
              <div style={{ padding: '16px', fontFamily: 'Cairo, sans-serif', animation: 'fadeIn 0.3s ease' }}>

                {/* 3D Wall Logo Display Card (Inspired by Studio Wall Sign) */}
                <div style={{
                  background: 'linear-gradient(135deg, #756a5dff 0%, #2a1a0c 50%, #140c06 100%)',
                  borderRadius: '16px',
                  padding: '24px 18px',
                  border: '1px solid rgba(204, 164, 59, 0.4)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.1)',
                  marginBottom: '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Background ambient glow */}
                  <div style={{
                    position: 'absolute', top: '-40%', right: '-20%', width: '200px', height: '200px',
                    background: 'radial-gradient(circle, rgba(104, 76, 6, 0.18) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }} />

                  {/* Wall Logo Banner Layout */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '18px',
                    direction: 'ltr',
                    textAlign: 'left'
                  }}>
                    {/* Studio Logo Icon */}
                    <div style={{
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      filter: 'drop-shadow(3px 6px 8px rgba(0,0,0,0.85))'
                    }}>
                      <img
                        src="/logo.png"
                        alt="ZAFAT TABARIK STUDIO"
                        style={{
                          width: '92px',
                          height: '92px',
                          objectFit: 'contain',
                          transform: 'perspective(400px) rotateY(-6deg)'
                        }}
                      />
                    </div>

                    {/* Studio 3D Wall Text */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '900',
                        fontSize: '1.35rem',
                        letterSpacing: '1px',
                        color: '#cca43b',
                        background: 'linear-gradient(180deg, #f5d77f 0%, #cca43b 60%, #8a681c 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(2px 3px 3px rgba(0,0,0,0.95))',
                        lineHeight: 1.15
                      }}>
                        ZAFAT TABARIK
                      </div>

                      <div style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '800',
                        fontSize: '1.1rem',
                        letterSpacing: '5px',
                        color: '#b88e2c',
                        background: 'linear-gradient(180deg, #e6c265 0%, #b88e2c 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(2px 3px 2px rgba(0,0,0,0.95))',
                        marginTop: '2px'
                      }}>
                        STUDIO
                      </div>

                      <div style={{
                        direction: 'rtl',
                        fontSize: '0.74rem',
                        color: '#d4af37',
                        opacity: 0.9,
                        marginTop: '6px',
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: '700'
                      }}>
                        استوديو زفات تباريك للصوتيات
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 1: Services */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  padding: '16px',
                  marginBottom: '14px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}>
                  <h4 style={{ color: 'var(--accent-color)', fontWeight: '800', fontSize: '0.98rem', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ✨ خدماتنا الاحترافية
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 12px', lineHeight: '1.7' }}>
                    نقدم لكم باقة متكاملة من الخدمات الصوتية بجودة الإنتاج الاستوديوي العالي وأحدث أجهزة الهندسة والتوزيع:
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div style={{ padding: '10px', background: 'var(--bg-tertiary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>👰</div>
                      <div style={{ fontWeight: '700', fontSize: '0.82rem', color: 'var(--text-primary)' }}>زفات بالأسماء</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>تنفيذ حصري لجميع أفراحكم</div>
                    </div>
                    <div style={{ padding: '10px', background: 'var(--bg-tertiary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>🎵</div>
                      <div style={{ fontWeight: '700', fontSize: '0.82rem', color: 'var(--text-primary)' }}>شيلات خاصة</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>تخرج، مواليد، وتهانئ</div>
                    </div>
                    <div style={{ padding: '10px', background: 'var(--bg-tertiary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>🎛️</div>
                      <div style={{ fontWeight: '700', fontSize: '0.82rem', color: 'var(--text-primary)' }}>مكس وماستر</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>هندسة صوتية ومعالجة نقية</div>
                    </div>
                    <div style={{ padding: '10px', background: 'var(--bg-tertiary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>🎙️</div>
                      <div style={{ fontWeight: '700', fontSize: '0.82rem', color: 'var(--text-primary)' }}>تسجيل وبودكاست</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>تسجيل صوتي بأفضل المايكات</div>
                    </div>
                  </div>
                </div>

                {/* Grid for Explore Works & Contact (Side-by-side on desktop/laptop, stacked on mobile) */}
                <div className="about-grid">
                  {/* Section 2: Explore Works Button */}
                  <div style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between'
                  }}>
                    <div>
                      <h4 style={{ color: 'var(--accent-color)', fontWeight: '800', fontSize: '0.98rem', margin: '0 0 8px' }}>🎧 تصفح أعمال الاستوديو</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 12px', lineHeight: '1.6' }}>
                        استمع لآلاف الأعمال والنماذج الحصرية بشتى أنواع الفلاتر والتصنيفات الفرعية.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('all_works')}
                      style={{
                        background: 'linear-gradient(135deg, rgba(204,164,59,0.2) 0%, rgba(204,164,59,0.1) 100%)',
                        border: '1px solid var(--accent-color)',
                        color: 'var(--accent-color)',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        width: '100%',
                        fontFamily: 'inherit',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        gap: '8px'
                      }}
                    >
                      <span>تصفح مكتبة الأعمال الصوتية</span> ←
                    </button>
                  </div>

                  {/* Section 3: Contact */}
                  <div style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between'
                  }}>
                    <h4 style={{ color: 'var(--accent-color)', fontWeight: '800', fontSize: '0.98rem', margin: '0 0 12px' }}>📞 حجز وتواصل مباشر</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <a
                        href="https://wa.me/966533019282"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          alignItems: 'center',
                          justify: 'center',
                          gap: '8px',
                          textDecoration: 'none',
                          textAlign: 'center',
                          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                          color: '#fff',
                          padding: '11px',
                          borderRadius: '10px',
                          fontSize: '0.88rem',
                          fontWeight: '800',
                          boxShadow: '0 4px 15px rgba(37,211,102,0.3)'
                        }}
                      >
                        💬 تواصل عبر واتساب: 966533019282+
                      </a>
                      <button
                        onClick={() => setIsBookingOpen(true)}
                        style={{
                          background: 'linear-gradient(135deg, var(--accent-color), #8a681c)',
                          border: 'none',
                          color: '#000',
                          padding: '11px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '0.88rem',
                          fontWeight: '800',
                          width: '100%',
                          fontFamily: 'inherit',
                          boxShadow: '0 4px 15px rgba(204,164,59,0.3)'
                        }}
                      >
                        📝 طلب حجز جلسة تسجيل أو شيلة
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer in About Page */}
                <footer style={{ padding: '24px 16px 80px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '8px' }}>
                    <strong>استوديو زفات تباريك للصوتيات</strong> — متخصصون في إنتاج{' '}
                    <a href="#works" onClick={(e) => { e.preventDefault(); setActiveTab('all_works'); setAwLevel1('شيلات'); setAwLevel2('all'); setAwLevel3('all'); }} style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>الشيلات بالأسماء</a>،{' '}
                    <a href="#works" onClick={(e) => { e.preventDefault(); setActiveTab('all_works'); setAwLevel1('زفات'); setAwLevel2('all'); setAwLevel3('all'); }} style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>زفات الأفراح</a>،{' '}
                    المكس والماستر الاحترافي، وتسجيل البودكاست.
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', flexWrap: 'wrap' }}>
                    <a
                      href="https://getsoft.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--accent-color)',
                        fontWeight: '900',
                        textDecoration: 'none',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        background: 'rgba(204,164,59,0.1)',
                        border: '1.5px solid rgba(249, 181, 9, 1)',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>  تـصـمـيـم وتـطـويــر   :  </span>
                      <img
                        src="/get-soft.png"
                        alt="GET SOFT Logo"
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          objectFit: 'cover',
                          marginRight: '8px'
                        }}
                      />
                      <span>شـركـة GET SOFT للبرمجيات</span>
                    </a>
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    © {new Date().getFullYear()} استوديو زفات تباريك للصوتيات. جميع الحقوق محفوظة.
                  </p>
                </footer>

              </div>
            )}

            {/* Floating Action Button */}
            <button className="floating-cart" onClick={() => setIsBookingOpen(true)}>
              <Plus size={24} />
            </button>

            {/* Mini Player */}
            {currentTrack && (
              <div className="mini-player">
                <audio
                  ref={audioRef}
                  src={currentTrack.audio_url || currentTrack.audio_file}
                  onTimeUpdate={handleTimeUpdate}
                />

                <div className="player-cover grad-2" onClick={handlePlayPause} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer' }}>
                  {isPlaying ? <Pause size={18} /> : <Play size={18} fill="#fff" />}
                </div>

                <div className="player-info" onClick={handlePlayPause} style={{ cursor: 'pointer' }}>
                  <span className="player-title">{currentTrack.title}</span>
                  <span className="player-artist">{currentTrack.artists?.name || currentTrack.artist || 'زفات تباريك'}</span>
                </div>

                <div
                  style={{ width: '17%', height: '6px', background: 'var(--border-color)', borderRadius: '2px', cursor: 'pointer', position: 'relative', overflow: 'hidden', alignItems: 'center' }}
                  onClick={handleProgressBarClick}
                >
                  <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent-color)' }}></div>
                </div>

                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  {formatTime(currentTimeSec)}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', gap: '4px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const msg = `مرحباً، أعجبتني (${currentTrack.title}) وأرغب في طلب عمل مشابه.`;
                      window.open(`https://wa.me/966533019282?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    style={{ background: 'rgba(37, 211, 102, 0.15)', border: '1px solid #25D366', color: '#25D366', borderRadius: '10px', cursor: 'pointer', padding: '4px 5px', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.8rem', fontWeight: 'bold' }}
                    title="اطلب مثل هذا العمل عبر واتساب"
                  >
                    <MessageCircle size={30} className="hide-mobile" />
                    <span>اطلب مثل</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const url = typeof window !== 'undefined' ? window.location.origin + `/#track-${encodeURIComponent(currentTrack.title)}` : '';

                      const copyLinkFallback = () => {
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                          navigator.clipboard.writeText(url)
                            .then(() => showToast('تم نسخ رابط العمل بنجاح! 🔗'))
                            .catch(() => {
                              const textArea = document.createElement("textarea");
                              textArea.value = url;
                              textArea.style.position = "fixed";
                              document.body.appendChild(textArea);
                              textArea.focus();
                              textArea.select();
                              try {
                                document.execCommand('copy');
                                showToast('تم نسخ رابط العمل بنجاح! 🔗');
                              } catch (err) {
                                showToast('يمكنك نسخ هذا الرابط: ' + url);
                              }
                              document.body.removeChild(textArea);
                            });
                        } else {
                          const textArea = document.createElement("textarea");
                          textArea.value = url;
                          textArea.style.position = "fixed";
                          document.body.appendChild(textArea);
                          textArea.focus();
                          textArea.select();
                          try {
                            document.execCommand('copy');
                            showToast('تم نسخ رابط العمل بنجاح! 🔗');
                          } catch (err) {
                            showToast('يمكنك نسخ هذا الرابط: ' + url);
                          }
                          document.body.removeChild(textArea);
                        }
                      };

                      if (navigator.share) {
                        navigator.share({
                          title: currentTrack.title,
                          text: `استمع إلى ${currentTrack.title} من استوديو زفات تباريك`,
                          url: url
                        }).catch(() => {
                          copyLinkFallback();
                        });
                      } else {
                        copyLinkFallback();
                      }
                    }}
                    style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px 8px' }}
                    title="مشاركة"
                  >
                    <Share2 size={16} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (audioRef.current) {
                        audioRef.current.pause();
                      }
                      setIsPlaying(false);
                      setCurrentTrack(null);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="إغلاق"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Navigation */}
            <div className="bottom-nav" style={{ width: '100%' }}>
              <button className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`} onClick={() => { setActiveTab('home'); setCategoryFilter('all'); }}>
                <Compass className="nav-tab-icon" />
                الرئيسية
              </button>
              <button className={`nav-tab ${activeTab === 'search' ? 'active' : ''}`} onClick={() => setActiveTab('search')}>
                <Search className="nav-tab-icon" />
                البحث
              </button>
              <button className={`nav-tab ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>
                <Bookmark className="nav-tab-icon" />
                المحفوظات
              </button>
              <button className={`nav-tab ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
                <Info className="nav-tab-icon" />
                عن الاستوديو
              </button>
            </div>

            {/* Drawer: Place audio booking request */}
            {isBookingOpen && (
              <>
                <div className="drawer-overlay" onClick={() => setIsBookingOpen(false)}></div>
                <div className="drawer">
                  <div className="drawer-header">
                    <span className="drawer-title">طلب جديد بجدول الهندسة</span>
                    <button className="icon-btn" onClick={() => setIsBookingOpen(false)}>×</button>
                  </div>

                  <form onSubmit={submitBooking}>
                    <div className="form-group">
                      <label className="form-label">الاسم</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="مثال: خالد محمد"
                        value={bookingForm.client_name}
                        onChange={(e) => setBookingForm({ ...bookingForm, client_name: e.target.value })}
                      />
                    </div>

                    {cart.length > 0 && (
                      <div className="form-group" style={{ background: 'rgba(204,164,59,0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(204,164,59,0.3)' }}>
                        <label className="form-label" style={{ color: 'var(--accent-color)' }}>الأعمال المختارة كمرجع للطلب:</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {cart.map((item) => (
                            <div key={`cart-${item.id}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-primary)', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid var(--border-color)', alignItems: 'center' }}>
                              <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.title}</span>
                              <button type="button" onClick={() => removeFromCart(item.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>حذف</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="form-group">
                      <label className="form-label">الخدمة المطلوبة</label>
                      <select
                        className="form-input"
                        value={bookingForm.service_type}
                        onChange={(e) => setBookingForm({ ...bookingForm, service_type: e.target.value })}
                      >
                        <option value="recording">Recording Session (جلسة تسجيل)</option>
                        <option value="mixing_mastering">Mixing & Mastering (مكس وماستر)</option>
                        <option value="voiceover">Voiceover & Dubbing (تعليق صوتي)</option>
                        <option value="podcast">Podcast Production (بودكاست مجهز)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">تفاصيل العمل الصوتي</label>
                      <textarea
                        className="form-input"
                        style={{ height: '60px', fontFamily: 'inherit' }}
                        placeholder="اكتب الأسماء المطلوبة أو التجهيزات المرافقة..."
                        value={bookingForm.notes}
                        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>إرسال حجز للاستوديو</button>
                  </form>
                </div>
              </>
            )}

          </main>

          {/* Artist Detail */}
          {activeTab === 'artist_detail' && selectedArtist && (
            <div className="artist-detail-page">
              <div className="artist-detail-header" style={{ backgroundImage: `url(${selectedArtist.image_url || getArtistImage(selectedArtist.name)})` }}>
                <button className="back-btn" onClick={() => { setActiveTab('home'); setSelectedArtist(null); }}>
                  العودة ←
                </button>
                <div className="artist-header-content">
                  <div className="artist-header-name">{selectedArtist.name}</div>
                  <div className="artist-header-specialty">{selectedArtist.specialty}</div>
                  <div className="artist-header-desc">{selectedArtist.description}</div>
                </div>
              </div>

              {/* Two Dynamic Dropdown Filters */}
              {(() => {
                const styleFilters = filters.filter(fl => fl.filter_group === 'style');
                const categoryFilters = filters.filter(fl => fl.filter_group === 'category');
                const selectedStyle = artistSubFilter?.style || 'all';
                const selectedCategory = artistSubFilter?.category || 'all';

                return (
                  <div style={{
                    padding: '14px 16px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    background: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border-color)',
                    flexShrink: 0
                  }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {/* Dropdown 1: Style */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-secondary)' }}>🎵 التصفيات</span>
                        <div style={{ position: 'relative' }}>
                          <select
                            value={selectedStyle}
                            onChange={e => setArtistSubFilter(prev => ({ ...(prev || {}), style: e.target.value }))}
                            style={{
                              width: '100%', padding: '9px 12px 9px 32px', borderRadius: '10px',
                              border: `1px solid ${selectedStyle !== 'all' ? '#cca43b' : 'var(--border-color)'}`,
                              background: selectedStyle !== 'all' ? 'rgba(204,164,59,0.08)' : 'var(--bg-primary)',
                              color: selectedStyle !== 'all' ? '#cca43b' : 'var(--text-primary)',
                              fontFamily: 'var(--font-arabic)', fontWeight: '600', fontSize: '0.82rem',
                              appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
                              outline: 'none',
                              textAlign: 'right',
                              direction: 'rtl'
                            }}
                          >
                            <option value="all">الكل</option>
                            {styleFilters.map(fl => (
                              <option key={fl.id} value={fl.label}>{fl.label}</option>
                            ))}
                          </select>
                          <span style={{ position: 'absolute', left: '10px', top: '53%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)', fontSize: '2.2rem' }}>▾</span>
                        </div>
                      </div>

                      {/* Dropdown 2: Category */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-secondary)' }}>🏷️ التصنيفات</span>
                        <div style={{ position: 'relative' }}>
                          <select
                            value={selectedCategory}
                            onChange={e => setArtistSubFilter(prev => ({ ...(prev || {}), category: e.target.value }))}
                            style={{
                              width: '100%', padding: '9px 12px 9px 32px', borderRadius: '10px',
                              border: `1px solid ${selectedCategory !== 'all' ? '#a855f7' : 'var(--border-color)'}`,
                              background: selectedCategory !== 'all' ? 'rgba(168,85,247,0.08)' : 'var(--bg-primary)',
                              color: selectedCategory !== 'all' ? '#a855f7' : 'var(--text-primary)',
                              fontFamily: 'var(--font-arabic)', fontWeight: '600', fontSize: '0.82rem',
                              appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
                              outline: 'none',
                              textAlign: 'right',
                              direction: 'rtl'
                            }}
                          >
                            <option value="all">الكل</option>
                            {categoryFilters.map(fl => (
                              <option key={fl.id} value={fl.label}>{fl.label}</option>
                            ))}
                          </select>
                          <span style={{ position: 'absolute', left: '10px', top: '53%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)', fontSize: '2.2rem' }}>▾</span>
                        </div>
                      </div>
                    </div>

                    {/* Results count & Clear filters button */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', padding: '2px 4px 0' }}>
                      <span>المعروض: {getArtistFilteredTracks().length} عمل صوتي</span>
                      {(selectedStyle !== 'all' || selectedCategory !== 'all') && (
                        <button
                          onClick={() => setArtistSubFilter({ style: 'all', category: 'all' })}
                          style={{ background: 'none', border: 'none', color: '#ef4444', fontFamily: 'var(--font-arabic)', fontSize: '0.7rem', cursor: 'pointer', padding: 0, fontWeight: '700' }}
                        >
                          × مسح التصفية
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Track list */}
              <div className="artist-tracks-container">
                <div className="artist-tracks-list" style={{ marginTop: '12px' }}>
                  {getArtistFilteredTracks().length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Music size={36} strokeWidth={1} />
                      <p style={{ marginTop: '12px', fontSize: '0.9rem' }}>لا توجد أعمال في هذا التصنيف</p>
                    </div>
                  ) : (
                    getArtistFilteredTracks().map((track) => (
                      <div
                        key={`art-trk-${track.id}`}
                        className={`artist-track-item ${currentTrack && currentTrack.id === track.id ? 'active' : ''}`}
                        onClick={() => handleSelectTrack(track)}
                      >
                        <div className="track-icon-avatar">
                          {currentTrack && currentTrack.id === track.id && isPlaying
                            ? <Pause size={14} />
                            : <Play size={14} style={{ marginLeft: '2px' }} />}
                        </div>
                        <div style={{ flex: 1, padding: '0 12px' }}>
                          <div className="track-title">{track.title}</div>
                          <div className="track-desc">{track.artists?.name || track.artist || 'زفات تباريك'} • {Array.isArray(track.filters) ? track.filters.join(', ') : 'صوتيات'}</div>
                        </div>
                        <div className="track-duration">{track.duration || '03:40'}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
