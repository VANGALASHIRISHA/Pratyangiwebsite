"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import {
  ArrowLeft, ArrowRight, BadgeCheck, ChevronDown, ChevronRight, HandHeart,
  Heart, Menu, MessageCircle, Search, ShieldCheck, ShoppingBag, Tag, Truck, UserRound, Wheat, X,
} from "lucide-react";
import styles from "./page.module.css";

const categories = [
  { name: "Kanchipuram Pattu", image: "/images/reference/category-1.jpg", position: "center 28%" },
  { name: "Dharmavaram", image: "/images/reference/category-2.jpg", position: "center 23%" },
  { name: "Soft Silk", image: "/images/reference/category-3.jpg", position: "center 27%" },
  { name: "Bridal Sarees", image: "/images/reference/category-4.jpg", position: "center 25%" },
  { name: "Gadwal", image: "/images/reference/category-5.jpg", position: "center 25%" },
  { name: "Men's Ethnic Wear", image: "/images/reference/category-6.jpg", position: "center 25%" },
];

const products = Array.from({ length: 4 }, (_, index) => ({
  id: `saree-${index + 1}`,
  image: `/images/reference/product-${index + 1}.jpg`,
  name: "TRADITION MEETS ELEGANCE",
}));
const collectionRows = ["New Arrivals", "Wedding Collection", "Festive Collections", "Best Sellers"];
const bagStorageKey = "pratyangi-demo-bag";

const reviewText = "Ordered and I am super impressed. The branded barcoded packaging ensures it's genuine.";
const benefits = [
  { title: "Authentic Silk", body: "Certified pure silk sourced directly from weavers.", Icon: BadgeCheck },
  { title: "Handwoven", body: "Each piece is handcrafted by master artisans.", Icon: HandHeart },
  { title: "Secure Payments", body: "100% secure checkout with multiple options.", Icon: ShieldCheck },
  { title: "Fast Delivery", body: "Express shipping across India in 3–5 days.", Icon: Truck },
  { title: "WhatsApp Support", body: "Get help instantly via WhatsApp chat.", Icon: MessageCircle },
];

export default function HomePage() {
  const categoryTrack = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<string[]>([]);
  const [cartReady, setCartReady] = useState(false);
  const [cartStorageMessage, setCartStorageMessage] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [demoMessage, setDemoMessage] = useState("");
  const [offerMessage, setOfferMessage] = useState("");

  const filteredCatalog = (() => {
    const term = query.trim().toLowerCase();
    const entries = [...categories.map((category) => category.name), ...collectionRows, "TRADITION MEETS ELEGANCE"];
    return term ? entries.filter((entry) => entry.toLowerCase().includes(term)) : entries;
  })();

  useEffect(() => {
    try {
      const savedBag = window.localStorage.getItem(bagStorageKey);
      if (savedBag) {
        const parsed: unknown = JSON.parse(savedBag);
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
          setCart(parsed.filter((id) => products.some((product) => product.id === id)));
        } else {
          setCartStorageMessage("The saved demo bag could not be read, so it started empty.");
        }
      }
    } catch {
      setCartStorageMessage("Browser storage is unavailable; bag changes will not persist.");
    } finally {
      setCartReady(true);
    }
  }, []);

  useEffect(() => {
    if (!cartReady) return;
    try {
      window.localStorage.setItem(bagStorageKey, JSON.stringify(cart));
    } catch {
      setCartStorageMessage("Browser storage is unavailable; bag changes will not persist.");
    }
  }, [cart, cartReady]);

  const moveCategories = (direction: number) => {
    categoryTrack.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  };

  const addToBag = (productId: string) => {
    setCart((current) => current.includes(productId) ? current : [...current, productId]);
    setCartOpen(true);
  };

  const removeFromBag = (productId: string) => {
    setCart((current) => current.filter((item) => item !== productId));
  };

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newsletterEmail.trim()) {
      setNewsletterMessage("Please enter your email address.");
      return;
    }
    setNewsletterMessage("Thanks for joining us — this is a local demo, no subscription was sent.");
    setNewsletterEmail("");
  };

  const closePanels = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
    setAccountOpen(false);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button className={styles.shopToggle} type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
            <span>Shop</span><ChevronDown size={13} />
          </button>
          <a className={styles.brand} href="#top" aria-label="Pratyangi Fashions home">
            <Image src="/images/reference/brand-lockup.jpg" alt="Pratyangi Fashions — Tradition Meets Elegance" width={300} height={53} priority />
          </a>
          <div className={styles.headerActions}>
            <button className={styles.searchButton} type="button" aria-label="Search catalog" onClick={() => { setSearchOpen(true); setMenuOpen(false); }}>
              <span>Search</span><Search size={17} />
            </button>
            <button className={styles.iconButton} type="button" aria-label={`Open local demo bag, ${cart.length} items`} onClick={() => setCartOpen(true)}>
              <ShoppingBag size={21} /><span className={styles.count}>{cart.length}</span>
            </button>
            <button className={styles.iconButton} type="button" aria-label="Account demo" onClick={() => setAccountOpen(true)}>
              <UserRound size={22} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className={styles.menuPanel} aria-label="Shop sections">
            <div className={styles.menuPanelHeading}>Explore Pratyangi</div>
            <a href="#categories" onClick={() => setMenuOpen(false)}>Shop by Category <ChevronRight size={15} /></a>
            <a href="#arrivals" onClick={() => setMenuOpen(false)}>New Arrivals <ChevronRight size={15} /></a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>Loved by our Customers <ChevronRight size={15} /></a>
            <a href="#why-pratyangi" onClick={() => setMenuOpen(false)}>Why Pratyangi Fashions <ChevronRight size={15} /></a>
          </nav>
        )}
      </header>

      <section className={styles.hero} id="top" aria-label="Pratyangi Fashions saree collection">
        <Image src="/images/reference/hero-stage.jpg" alt="Saree models on gold plinths against an ivory and burgundy stage" fill priority sizes="100vw" className={styles.heroImage} />
      </section>

      <section className={styles.categorySection} id="categories" aria-label="Shop by category">
        <div className={styles.categoryHeading}>
          <h1>Shop by Category</h1>
        </div>
        <div className={styles.carouselFrame}>
          <button className={`${styles.carouselArrow} ${styles.leftArrow}`} type="button" aria-label="Scroll categories left" onClick={() => moveCategories(-1)}><ArrowLeft size={17} /></button>
          <div className={styles.categoryTrack} ref={categoryTrack} tabIndex={0} aria-label="Categories, horizontally scrollable">
            {categories.map((category) => (
              <a className={styles.categoryCard} key={category.name} href="#arrivals" aria-label={`Browse ${category.name}`}>
                <div className={styles.categoryPhoto}>
                  <Image src={category.image} alt="" fill sizes="(max-width: 700px) 48vw, 17vw" style={{ objectPosition: category.position }} />
                </div>
                <div className={styles.categoryLabel}><span>{category.name}</span><ChevronRight size={16} /></div>
              </a>
            ))}
          </div>
          <button className={`${styles.carouselArrow} ${styles.rightArrow}`} type="button" aria-label="Scroll categories right" onClick={() => moveCategories(1)}><ArrowRight size={17} /></button>
        </div>
        <div className={styles.trackAccent} aria-hidden="true"><span /></div>
      </section>

      <section className={styles.arrivalsSection} id="arrivals">
        {collectionRows.map((row, rowIndex) => (
          <div className={styles.collectionRow} id={rowIndex === 1 ? "wedding-collection" : rowIndex === 2 ? "festive-collections" : rowIndex === 3 ? "best-sellers" : undefined} key={row}>
            <div className={styles.sectionHeading}>
              <h2>{row}</h2>
              <a href="#arrivals" className={styles.seeAll}>See all <ChevronRight size={14} /></a>
            </div>
            <div className={styles.productGrid}>
              {products.map((product, productIndex) => (
                <article className={styles.productCard} key={`${row}-${productIndex}`}>
                  <div className={styles.productPhoto}>
                    <Image src={product.image} alt="Gold saree" fill sizes="(max-width: 700px) 48vw, 25vw" />
                    <button
                      className={styles.addToBag}
                      type="button"
                      onClick={() => addToBag(product.id)}
                      aria-label={`Add ${product.name} to demo bag`}
                    >
                      Add to demo bag <ArrowRight size={13} />
                    </button>
                  </div>
                  <div className={styles.productMeta}>
                    <h3>{product.name}</h3>
                    <p className={styles.price}>Rs. 24,000.00 <del>Rs. 30,000.00</del></p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.reviewsSection} id="reviews">
        <div className={styles.sectionHeading}>
          <h2>Loved by our Customers</h2>
          <a href="#why-pratyangi" className={styles.seeAll}>See all <ChevronRight size={14} /></a>
        </div>
        <div className={styles.reviewGrid}>
          {[0, 1, 2, 3].map((item) => (
            <article className={styles.reviewCard} key={item}>
              <div className={styles.reviewImage}><Image src="/images/reference/review-artwork.jpg" alt="Traditional silk saree detail" fill sizes="(max-width: 700px) 74vw, 20vw" /></div>
              <div className={styles.stars} aria-label="5 out of 5 stars">★★★★★</div>
              <p className={styles.reviewBrand}>TRADITION MEETS ELEGANCE</p>
              <p className={styles.reviewCopy}>{reviewText}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.trySection} id="try-on">
        <div className={styles.sectionHeading}>
          <h2>Try on using AI</h2>
        </div>
        <div className={styles.tryPanel}>
          <h3 className={styles.tryAccessTitle}>How Your Try-On Access Works</h3>
          <div className={styles.tierGrid}>
            {[
              { tier: "Silver", state: "AVAILABLE", detail: "Try all our beautiful silver sarees today.", action: "Try Your Look", status: "Available to all", marker: "✓", disabled: false },
              { tier: "Platinum", state: "UNLOCKABLE", detail: "Purchase a Silver saree to unlock Platinum.", action: "Try Your Look", status: "Unlocked after a Silver purchase", marker: "▣", disabled: true },
              { tier: "Gold", state: "NOT AVAILABLE FOR TRY-ON", detail: "Available for display purposes only.", action: "Try Your Look", status: "AI Try-On unavailable", marker: "⊘", disabled: true },
            ].map((tier, index) => (
              <article className={styles.tierCard} key={tier.tier}>
                <div className={styles.tierPhoto}>
                  <Image src={`/images/reference/product-${index + 1}.jpg`} alt={`Illustrative ${tier.tier} saree preview`} fill sizes="(max-width: 700px) 80vw, 28vw" />
                  <span className={`${styles.tierBadge} ${index ? styles.tierLocked : ""}`}>{tier.state}</span>
                </div>
                <div className={styles.tierInfo}>
                  <span className={styles.tierState}>{tier.marker} &nbsp;{tier.state}</span>
                  <h4>{tier.tier}</h4><p>{tier.detail}</p>
                  <button type="button" disabled={tier.disabled} onClick={() => setDemoMessage("Illustrative local demo only. No photo upload or AI try-on is available.")}>{tier.action} <ArrowRight size={13} /></button>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.tierSteps}>
            {[
              ["01", "Silver", "Available to all", "✓"],
              ["02", "Platinum", "Unlocked after a Silver purchase", "▣"],
              ["03", "Gold", "AI Try-On unavailable", "⊘"],
            ].map(([number, title, text, mark]) => <div className={styles.tierStep} key={number}><span>{number}</span><b>{mark}</b><strong>{title}</strong><small>{text}</small></div>)}
          </div>
          <p className={styles.tryDisclaimer}>Illustrative frontend demo only. No photo upload, purchase verification, or AI request is available.</p>
        </div>
        {demoMessage && <p className={styles.demoNote} role="status">{demoMessage}</p>}
      </section>

      <section className={styles.benefitsSection} id="why-pratyangi">
        <div className={styles.sectionHeading}><h2>Why PRATYANGI FASHIONS</h2></div>
        <div className={styles.benefitGrid}>
          {benefits.map((benefit) => (
            <article className={styles.benefitCard} key={benefit.title}>
              <span className={styles.benefitMark} aria-hidden="true"><benefit.Icon size={22} strokeWidth={1.7} /></span>
              <h3>{benefit.title}</h3><p>{benefit.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.exclusiveSection} id="exclusives">
        <div className={styles.exclusiveOffers}>
          <h2>Exclusive Offers</h2>
          <div className={styles.offerGrid}>
            {[
              { icon: "20%", title: "Flat 20% Off", detail: <>On first order using code<br /><b>FIRST20</b></> },
              { icon: <Wheat size={26} />, title: "Festival Special", detail: <>Free blouse piece with every saree this season</> },
              { icon: <Tag size={24} />, title: "Flat 20% Off", detail: <>Extra 15% off on bridal collections above Rs. 15,000</> },
            ].map((offer, index) => (
              <article className={styles.offerCard} key={`${offer.title}-${index}`}>
                <span className={styles.offerMark}>{offer.icon}</span><h3>{offer.title}</h3><p>{offer.detail}</p>
                <button type="button" onClick={() => setOfferMessage(index === 0 ? "Local demo only — code FIRST20 is displayed but cannot be redeemed." : "Local demo only — this offer is not redeemable.")}>Claim Offer</button>
              </article>
            ))}
          </div>
          {offerMessage && <p className={styles.offerMessage} role="status">{offerMessage}</p>}
        </div>
        <div className={styles.socialStory}>
          <div className={styles.socialCopy}>
            <span className={styles.eyebrow}>JOIN OUR WORLD</span>
            <h2>Where Tradition Meets <em>Tomorrow</em></h2>
            <p>Follow us for new collections, styling inspiration, behind-the-scenes moments, product videos and exclusive updates.</p>
            <div className={styles.socialLinks} aria-label="Social platforms">
              {["Instagram", "LinkedIn", "Twitter", "YouTube", "Facebook"].map((platform) => <span key={platform}>{platform}<ChevronRight size={14} /></span>)}
            </div>
            <p className={styles.socialDemo}>Social links are shown as reference only in this local demo.</p>
          </div>
          <div className={styles.portrait}><Image src="/images/reference/offer-portrait.jpg" alt="Portrait of a woman wearing an embroidered occasion saree" fill sizes="(max-width: 700px) 100vw, 40vw" /></div>
        </div>
      </section>

      <section className={styles.newsletter} id="newsletter">
        <div className={styles.newsletterContent}>
          <h2>Step into the <strong>PRATYANGI FASHIONS</strong> circle</h2>
          <form className={styles.newsletterForm} onSubmit={submitNewsletter}>
            <label className={styles.srOnly} htmlFor="newsletter-email">Your email address</label>
            <input id="newsletter-email" type="email" required placeholder="Enter your Email address" value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} />
            <button type="submit">Subscribe <ArrowRight size={15} /></button>
          </form>
          <p className={styles.newsletterNote} aria-live="polite">{newsletterMessage || "Get exclusive offers, new arrivals and styling tips delivered to you every week."}</p>
          <p className={styles.localNotice}>Local demo only — no subscription is sent.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <Image src="/images/reference/brand-lockup.jpg" alt="Pratyangi Fashions — Tradition Meets Elegance" width={300} height={53} />
            <p>“Tradition Woven with Elegance” —<br />handcrafted silk sarees since 1985.</p>
            <div className={styles.footerSocial} aria-label="Social media"><span>f</span><span>▶</span><span>◎</span><span>◉</span></div>
          </div>
          {[
            { title: "COMPANY", items: ["About us", "Our Story", "Artisans", "Careers", "Blog"] },
            { title: "COLLECTIONS", items: ["Kanchipuram Pattu", "Banarasi", "Uppada", "Bridal Sarees", "New Arrivals"] },
            { title: "SUPPORT", items: ["FAQs", "Returns & Exchange", "Size Guide", "Track Order", "Contact us"] },
            { title: "LEGAL", items: ["Privacy Policy", "Terms & Conditions", "GST Information", "Shipping Policy"] },
          ].map((column) => (
            <div className={styles.footerColumn} key={column.title}>
              <h3>{column.title}</h3>
              {column.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          ))}
        </div>
        <div className={styles.paymentRow}>
          <div className={styles.paymentMethods}><span>Secure Payments:</span>{["Visa", "Mastercard", "UPI", "GPay", "PhonePe", "COD", "EMI"].map((method) => <b key={method}>{method}</b>)}</div>
          <div className={styles.storeBadges}><span> <small>Download on the<br /><strong>App Store</strong></small></span><span>▶ <small>GET IT ON<br /><strong>Google Play</strong></small></span></div>
        </div>
        <div className={styles.copyright}>© 2026 PRATYANGI FASHIONS. All rights reserved. Made with <Heart size={12} fill="currentColor" /> in India.</div>
      </footer>

      {(searchOpen || cartOpen || accountOpen) && (
        <div className={styles.scrim} onMouseDown={(event) => { if (event.target === event.currentTarget) closePanels(); }}>
          <section className={styles.dialog} role="dialog" aria-modal="true" aria-label={searchOpen ? "Search catalog" : cartOpen ? "Demo bag" : "Account demo"}>
            <button type="button" className={styles.closeButton} onClick={closePanels} aria-label="Close panel"><X size={20} /></button>
            {searchOpen && <>
              <h2>Search</h2>
              <label className={styles.srOnly} htmlFor="catalog-search">Search visible catalog</label>
              <div className={styles.searchField}><Search size={18} /><input id="catalog-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the visible catalog" /></div>
              <div className={styles.searchResults}>
                {filteredCatalog.length ? filteredCatalog.map((entry) => {
                  const isCategory = categories.some((category) => category.name === entry);
                  return <a href={isCategory ? "#categories" : "#arrivals"} key={entry} onClick={closePanels}>{entry}<ChevronRight size={15} /></a>;
                }) : <p>No matching items in this catalog preview.</p>}
              </div>
            </>}
            {cartOpen && <>
              <h2>Your demo bag</h2>
              <p className={styles.dialogNote}>This bag is stored in this browser for demo purposes only. Checkout, orders, and payments are not available.</p>
              {cartStorageMessage && <p className={styles.dialogNote} role="status">{cartStorageMessage}</p>}
              {cart.length === 0 ? <p className={styles.emptyState}>Your demo bag is empty.</p> : (
                <ul className={styles.cartItems}>
                  {cart.map((productId) => {
                    const product = products.find((item) => item.id === productId);
                    if (!product) return null;
                    return (
                      <li key={product.id}>
                        <span>{product.name}<br /><small>Rs. 24,000.00 · local demo</small></span>
                        <button type="button" onClick={() => removeFromBag(product.id)} aria-label={`Remove ${product.name} from demo bag`}>Remove</button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>}
            {accountOpen && <>
              <h2>Account</h2>
              <p className={styles.dialogNote}>Account access is not connected in this local homepage demo.</p>
              <div className={styles.accountMark}><UserRound size={22} /><span>Sign-in functionality is unavailable in this preview.</span></div>
            </>}
          </section>
        </div>
      )}
    </main>
  );
}
