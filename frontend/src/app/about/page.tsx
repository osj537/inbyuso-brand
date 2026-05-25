import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div className={styles.body}>
      {/* Hero */}
      <section className={styles.hero}>
        <nav className={styles.heroNav}>
          <div className={styles.heroLogo}>INBYUSO</div>
          <div className={styles.heroLinks}>
            <a href="#platform">플랫폼 소개</a>
            <span className={styles.divider} />
            <a href="#contact">문의하기</a>
          </div>
        </nav>
        <div className={styles.container}>
          <div className={styles.heroCopy}>
            <div className={styles.kicker}>인뷰소 / 회사소개</div>
            <h1 className={styles.h1}>
              좋은 브랜드를<br />더 많은 사람에게
            </h1>
            <p>
              인뷰소는 국내 인디 뷰티 브랜드를 위한 플레이스 기반 커머스 플랫폼입니다.<br />
              브랜드 발견부터 구매까지의 경험을 새롭게 설계합니다.
            </p>
            <div className={styles.btnRow}>
              <a className={`${styles.btn} ${styles.btnDark}`} href="#contact">문의하기</a>
              <a className={styles.btn} href="#platform">플랫폼 소개</a>
            </div>
          </div>
        </div>
      </section>

      {/* Split — 회사 소개 */}
      <section className={styles.section}>
        <div className={`${styles.container} ${styles.split}`}>
          <div>
            <div className={styles.kicker}>회사 소개</div>
            <h2 className={styles.h2}>발견되지 않는<br />좋은 브랜드를 위해</h2>
          </div>
          <div>
            <p className={styles.p}>좋은 제품은 많습니다. 하지만 좋은 브랜드가 발견되는 구조는 충분하지 않습니다.</p>
            <div className={styles.rule} />
            <p className={styles.p}>인뷰소는 진정성과 브랜드 스토리를 가진 국내 인디 뷰티 브랜드가 더 많은 소비자에게 닿을 수 있도록 만든 브랜드 디스커버리 플랫폼입니다.</p>
            <div className={styles.pillRow}>
              {["인디 뷰티", "브랜드 발견", "커머스", "브랜드 스튜디오"].map((t) => (
                <span key={t} className={styles.pill}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cards — 플랫폼 구조 */}
      <section id="platform" className={`${styles.section} ${styles.cards}`}>
        <div className={styles.container}>
          <div className={styles.kicker}>플랫폼 구조</div>
          <h2 className={styles.h2}>발견<br />구매<br />브랜드 이상</h2>
          <div className={styles.cardGrid}>
            {[
              { n: "01", title: "브랜드 발견", desc: "소비자가 새로운 인디 뷰티 브랜드를 발견하고 비교할 수 있는 플레이스 경험을 제공합니다." },
              { n: "02", title: "커머스 연결", desc: "브랜드 발견부터 상품 탐색, 구매까지 자연스럽게 이어지는 커머스 구조를 설계합니다." },
              { n: "03", title: "브랜드 스튜디오", desc: "브랜드 페이지, 상품 관리, 주문 관리, 데이터 인사이트를 위한 운영 공간을 준비하고 있습니다." },
            ].map((c) => (
              <div key={c.n} className={styles.card}>
                <div className={styles.num}>{c.n}</div>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.p}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark — 브랜드를 위한 기능 */}
      <section className={styles.darkSection}>
        <div className={styles.container}>
          <div className={`${styles.kicker} ${styles.kickerDark}`}>브랜드를 위한 기능</div>
          <h2 className={`${styles.h2} ${styles.h2White}`}>국내 인디 뷰티<br />브랜드를 위해</h2>
          <div className={styles.cardGrid}>
            {[
              { n: "01", title: "브랜드 관리", desc: "상품·재고·주문·브랜드 페이지를 직접 관리할 수 있는 구조를 제공합니다." },
              { n: "02", title: "데이터 인사이트", desc: "방문수, 전환경로, 상품 성과 등 브랜드 운영에 필요한 인사이트 제공을 준비하고 있습니다." },
              { n: "03", title: "플레이스 노출", desc: "메인 플레이스, 콘텐츠, 공유 채널을 통한 브랜드 소개를 지원합니다." },
            ].map((c) => (
              <div key={c.n} className={`${styles.card} ${styles.cardDark}`}>
                <div className={`${styles.num} ${styles.numDark}`}>{c.n}</div>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.pDark}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split + Flow — 파트너십 */}
      <section className={styles.section}>
        <div className={`${styles.container} ${styles.split}`}>
          <div>
            <div className={styles.kicker}>파트너십 절차</div>
            <h2 className={styles.h2}>간결하게<br />명확하게<br />함께 성장하게</h2>
          </div>
          <div>
            <p className={styles.p}>인뷰소는 현재 초기 브랜드 파트너를 모집하고 있습니다. 브랜드의 방향성과 제품 카테고리를 검토한 뒤, 함께 플랫폼 온보딩을 진행합니다.</p>
          </div>
        </div>
        <div className={`${styles.container} ${styles.flow}`}>
          {[
            { step: "1단계", label: "신청 접수" },
            { step: "2단계", label: "브랜드 검토" },
            { step: "3단계", label: "파트너십 라인" },
            { step: "4단계", label: "입점 및 운영" },
          ].map((f) => (
            <div key={f.step} className={styles.flowItem}>
              <span className={styles.flowStep}>{f.step}</span>
              {f.label}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`${styles.section} ${styles.contactSection}`}>
        <div className={styles.container}>
          <div className={styles.kicker}>문의</div>
          <h2 className={styles.h2}>초기 브랜드<br />파트너를 찾고 있습니다</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactBox}>
              <small className={styles.contactLabel}>웹사이트</small>
              <strong>inbyuso.com</strong>
            </div>
            <div className={styles.contactBox}>
              <small className={styles.contactLabel}>이메일</small>
              <strong>hello@inbyuso.com</strong>
            </div>
            <div className={styles.contactBox}>
              <small className={styles.contactLabel}>주소</small>
              <strong>서울특별시 성동구 연무장13길 9, 546호</strong>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}>INBYUSO</div>
      </footer>
    </div>
  );
}
