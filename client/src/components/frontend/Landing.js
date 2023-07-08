import React from "react";
import group from "../../images/group.png";
import group1 from "../../images/group-1.png";
import group2 from "../../images/group-2.png";
import group3 from "../../images/group-3.png";
import group4 from "../../images/group-4.png";
import group5 from "../../images/group-5.png";
import vector from "../../images/vector.png";
import vector1 from "../../images/vector-1.svg";
import vector2 from "../../images/vector-2.png";
import vector3 from "../../images/vector-3.png";
import vector4 from "../../images/vector-4.png";
import image21 from "../../images/image-2-1.png";
import icround3 from "../../images/ic-round-dry-3.svg";
import icround2 from "../../images/ic-round-dry-2.svg";
import icround1 from "../../images/ic-round-dry-1.svg";
import icround from "../../images/ic-round-dry.svg";
import pictureenvoy from "../../images/picture-envoy-home-potential-png.png";
import image10 from "../../images/image-10.png";
import envoyhome1 from "../../images/envoy-home-clir-1-png.png";
import envoyhome2 from "../../images/envoy-home-ilcr-1-png.png";
import envoyhome3 from "../../images/envoy-home-clir-2-png.png";
import image141 from "../../images/image-14-1.png";
import footerlife from "../../images/footer-lifestyle-png.png";
import image14 from "../../images/image-14.png";
import pluswhite from "../../images/plus-sign-white-svg.svg";
import slaycorns from "../../images/acorns-footer-logo-2x-2022-png.png";
import instagram from "../../images/link-instagram-png.png";
import facebook from "../../images/link-facebook-png.png";
import twitter from "../../images/link-twitter-png.png";
import buttonopen from "../../images/button-open-accessibility-menu-equalweb-ada-icon-green-svg.svg";
import SettlementCalculator from "./SettlementCalculator";
const Landing = () => {
 return (
  <div className='home-page'>
   <div className='div'>
    <div className='div-envoy-hero'>
     <div className='overlap-group'>
      <img
       className='group'
       alt='Group'
       src={group5}
       style={{ width: "100vw" }}
      />
      <div className='frame-4'>
       <h1 className='tax-track-helps-you'>
        <span className='span'>Tax Track</span>
        <span className='text-wrapper-7'> Helps you save &amp; Invest</span>
       </h1>
       <p className='p'>
        Invest spare change, invest while you bank, earn bonus investments, grow
        your knowledge and more.
       </p>
       <div className='div-wrapper'>
        <div className='text-wrapper-8'>Get started</div>
       </div>
      </div>
     </div>
    </div>
    <div style={{ margin: "50px", marginTop: "150px" }}>
     <SettlementCalculator />
    </div>
    <div className='div-homepage-2'>
     <div className='frame-21'>
      <div className='heading-compound-wrapper'>
       <p className='heading-compound-2'>
        Save Invest And Learn From One Easy App
       </p>
      </div>
     </div>
     <div className='overlap-3'>
      <div className='frame-22'>
       <div className='frame-23'>
        <div className='ic-round-dry-wrapper'>
         <img className='ic-round-dry' alt='Ic round dry' src={icround3} />
        </div>
        <div className='text-wrapper-50'>Invest</div>
       </div>
       <div className='frame-24'>
        <div className='img-wrapper'>
         <img className='ic-round-dry-2' alt='Ic round dry' src={icround2} />
        </div>
        <div className='text-wrapper-51'>Later</div>
       </div>
       <div className='frame-25'>
        <div className='group-12'>
         <img className='ic-round-dry-3' alt='Ic round dry' src={icround1} />
        </div>
        <div className='text-wrapper-52'>Early</div>
       </div>
       <div className='frame-26'>
        <div className='group-13'>
         <img className='ic-round-dry-4' alt='Ic round dry' src={icround} />
        </div>
        <div className='text-wrapper-53'>Banking</div>
       </div>
      </div>
      <div className='frame-27'>
       <div className='frame-28'>
        <div className='text-wrapper-54'>Easy, automated investing</div>
        <p className='text-wrapper-55'>
         Every purchase you make means an opportunity to invest your spare
         change! So coffee for $3.25 becomes a $0.75 investment in your future.
        </p>
       </div>
       <img
        className='picture-envoy-home'
        alt='Picture envoy home'
        src={pictureenvoy}
       />
      </div>
     </div>
    </div>
    <div className='div-homepage-3'>
     <div className='frame-29'>
      <div className='frame-30'>
       <p className='heading-compound-3'>
        Save And Invest In The Background Of Life
       </p>
       <p className='text-wrapper-56'>
        Acorns puts investing on autopilot. Sign up in minutes, we’ll recommend
        an investment portfolio for your money goals, and you can set automated
        investments starting with spare change.
       </p>
      </div>
      <img className='image-3' alt='Image' src={image10} />
     </div>
    </div>
    <p className='heading-why-acorns'>
     Why Tax Track - Why Tax Track - Why Tax Track - Why Tax Track - Why Tax
     Track - Why Tax Track - Why Tax Track - Why Tax Track - Why Tax Track
    </p>
    <div className='frame-31'>
     <div className='frame-32'>
      <div className='frame-33'>
       <p className='text-wrapper-57'>
        Automatically save and invest with Round- Ups® feature
       </p>
       <p className='text-wrapper-58'>
        Every purchase you make means an opportunity to invest your spare
        change! So coffee for $3.25 becomes a $0.75 investment in your future.
       </p>
      </div>
      <img className='envoy-home-CLIR' alt='Envoy home CLIR' src={envoyhome1} />
     </div>
     <div className='frame-34'>
      <img className='envoy-home-ILCR' alt='Envoy home ILCR' src={envoyhome2} />
      <div className='frame-35'>
       <div className='text-wrapper-59'>
        Expert-built portfolios,suggested for you
       </div>
       <p className='acorns-diversified'>
        Acorns diversified portfolios are built by experts and include ETFs
        managed by pros at
        <br />
        the world’s top investment firms like Vanguard and BlackRock.
       </p>
      </div>
     </div>
     <div className='frame-36'>
      <div className='frame-37'>
       <p className='text-wrapper-60'>
        Plus more ways to save, invest and learn
       </p>
       <p className='along-with-your'>
        Along with your investment account, you get an easy, automated
        retirement account,
        <br />
        banking that saves and invests for you, bonus investments when you shop
        with thousands of brands and unique ways to grow your knowledge.
       </p>
      </div>
      <img
       className='envoy-home-CLIR-2'
       alt='Envoy home CLIR'
       src={envoyhome3}
      />
     </div>
     <div className='frame-38'>
      <img className='image-4' alt='Image' src={image141} />
      <div className='frame-39'>
       <div className='security-protection'>Security &amp; Protection</div>
       <p className='acorns-invest-later'>
        Acorns Invest, Later &amp; Early accounts are SIPC-protected up to
        $500,000. SIPC does
        <br />
        not protect against market risk, which is the risk inherent in a
        fluctuating market. For
        <br />
        details, please visit www.sipc.org. Acorns checking accounts are
        FDIC-insured up to
        <br />
        $250,000, plus fraud protection, 256-bit data encryption, and
        all-digital card lock. Learn
        <br />
        more about how FDIC protection works at www.fdic.gov.
       </p>
      </div>
     </div>
    </div>
    <div className='div-homepage-4'>
     <p className='text-wrapper-61'>
      Give your money the chance to work as hard as you do
     </p>
     <div className='frame-40'>
      <div className='frame-41'>
       <div className='heading-compound-4'>
        Harness The Power Of
        <br />
        compounding
       </div>
       <p className='money-doesn-t-grow'>
        Money doesn’t grow on trees. But with compound returns, money can grow
        on itself.
        <br />
        It’s a long-term investing principle foundational to how Acorns can work
        for you.
       </p>
      </div>
      <img
       className='footer-lifestyle-png'
       alt='Footer lifestyle png'
       src={footerlife}
      />
     </div>
    </div>
    <div className='div-closing-sign-up'>
     <div className='overlap-4'>
      <div className='frame-42'>
       <div className='join-the-movement'>JOIN THE MOVEMENT</div>
       <p className='we-re-changing-the'>
        We’re changing the way
        <br />
        Americans save &amp; invest
        <br />
        every day
       </p>
       <div className='link-2'>
        <div className='text-wrapper-62'>Sign up today</div>
       </div>
      </div>
      <img className='image-5' alt='Image' src={image14} />
     </div>
    </div>
    <div className='div-envoy-pricing'>
     <div className='div-pricing-module'>
      <div className='div-copy-card'>
       <div className='a-plan-for-everyone'>A PLAN FOR EVERYONE</div>
       <div className='all-things-investing-wrapper'>
        <p className='all-things-investing'>
         All things
         <br />
         investing, for the
         <br />
         price of a latte
        </p>
       </div>
       <div className='div-copy-card-body'>
        <p className='acorns-was-built-to'>
         Acorns was built to give everyone the tools of wealth-
         <br />
         building. Whether you’re new to investing or planning
         <br />
         ahead for your family’s future, we bundle our products,
         <br />
         tools, and education into subscription tiers — each
         <br />
         curated to meet you on whichever stage of life you’re
         <br />
         in.
        </p>
        <p className='that-means-no-hidden'>
         That means no hidden costs or transaction fees — just
         <br />
         one, transparent monthly payment to take advantage of
         <br />
         everything our financial wellness system has to offer.
        </p>
       </div>
       <div className='not-all-features-are-wrapper'>
        <p className='not-all-features-are'>
         Not all features are available to all customers at this time. Please
         compare subscription tiers
         <br />
         during registration to see what is available to you. Acorns is only
         available to US citizens or
         <br />
         other lawful residents who are currently located in the United States.
         You must be 18 or older
         <br />
         to sign up for an Acorns account.
        </p>
       </div>
      </div>
      <div className='div-envoy-tier-card'>
       <div className='div-tier-addtl-info'>
        <div className='text-wrapper-63'>What’s included</div>
        <img
         className='plus-sign-white-svg'
         alt='Plus sign white svg'
         src={pluswhite}
        />
       </div>
       <div className='div-tier-header'>
        <div className='text-wrapper-64'>Starts at $3/month</div>
        <div className='div-tier-body-copy'>
         <p className='join-over-million'>
          Join over 10 million all-time customers who have
          <br />
          signed up for Acorns.
         </p>
        </div>
        <div className='link-3'>
         <div className='text-wrapper-65'>Sign up today</div>
        </div>
       </div>
      </div>
     </div>
    </div>
    <div className='frame-43'>
     <div className='frame-44'>
      <div className='div-footer-hero'>
       <div className='heading-have-any'>Have any questions?</div>
       <div className='link-4'>
        <div className='text-wrapper-66'>Contact support</div>
       </div>
      </div>
      <div className='div-main-row-links'>
       <div className='heading-products'>PRODUCTS</div>
       <div className='invest-for-your-wrapper'>
        <div className='invest-for-your'>
         <span className='text-wrapper-67'>Invest</span>
         <span className='text-wrapper-68'> for your future</span>
        </div>
       </div>
       <div className='later-starts-today-wrapper'>
        <div className='later-starts-today'>
         <span className='text-wrapper-69'>Later</span>
         <span className='text-wrapper-70'> starts today</span>
        </div>
       </div>
       <div className='earn-extra-money-wrapper'>
        <div className='earn-extra-money'>
         <span className='text-wrapper-71'>Earn</span>
         <span className='text-wrapper-72'> extra money</span>
        </div>
       </div>
       <div className='early-investors-wrapper'>
        <div className='early-investors'>
         <span className='text-wrapper-73'>Early</span>
         <span className='text-wrapper-74'> investors</span>
        </div>
       </div>
       <div className='bank-smarter-wrapper'>
        <div className='bank-smarter'>
         <span className='text-wrapper-75'>Bank</span>
         <span className='text-wrapper-76'> smarter</span>
        </div>
       </div>
       <div className='heading-who-we-are'>WHO WE ARE</div>
       <div className='link-about'>About</div>
       <div className='link-careers'>Careers</div>
       <div className='link-press'>Press</div>
       <div className='link-oak-trees'>Oak Trees Planted</div>
       <div className='heading-why-start'>WHY START NOW</div>
       <div className='link-learn'>Learn</div>
      </div>
     </div>
    </div>
    <div className='div-footer-wrapper'>
     <footer className='footer'>
      <div className='div-footer-closing'>
       <img
        className='acorns-footer-logo'
        alt='Acorns footer logo'
        src={slaycorns}
       />
       <div className='div-closing-row'>
        <div className='link-pricing'>Pricing</div>
        <div className='link-store'>Store</div>
        <div className='link-legal'>Legal</div>
        <div className='link-privacy-policy'>Privacy Policy</div>
       </div>
       <div className='div-closing-row-2'>
        <img
         className='link-instagram-png'
         alt='Link instagram png'
         src={instagram}
        />
        <img
         className='link-twitter-png'
         alt='Link twitter png'
         src={twitter}
        />
        <img
         className='link-facebook-png'
         alt='Link facebook png'
         src={facebook}
        />
        <img className='button-open' alt='Button open' src={buttonopen} />
       </div>
      </div>
      <div className='div-footer'>
       <div className='strong-important'>Important Disclosures</div>
       <div className='strong-investing-wrapper'>
        <p className='strong-investing'>
         <span className='text-wrapper-77'>
          Investing involves risk, including loss of principal. Please consider,
          among other important factors, your investment objectives, risk
          tolerance and Acorns’ pricing before investing. Investment
          <br />
          advisory services offered by Acorns Advisers, LLC (Acorns), an
          SEC-registered investment advisor. Brokerage services are provided to
          clients of Acorns by Acorns Securities, LLC, an SEC-registered
          <br />
          broker-dealer and member{" "}
         </span>
         <span className='text-wrapper-78'>FINRA</span>
         <span className='text-wrapper-79'>/</span>
         <span className='text-wrapper-80'>SIPC</span>
         <span className='text-wrapper-81'>.</span>
        </p>
       </div>
       <div className='element-round-ups-wrapper'>
        <p className='element-round-ups'>
         1. Round-Ups® investments are transferred from your linked funding
         source (checking account) to your Acorns Invest account, where the
         funds are invested into a portfolio of selected ETFs.
         <br />
         If you do not maintain an adequate amount of funds in your funding
         source sufficient to cover your Round-Ups® investment, you could incur
         overdraft fees with your financial institution. Only
         <br />
         purchases made with Round-Up accounts linked to your Acorns account
         with the feature activated are eligible for the Round- Ups® investment
         feature. Round-Up investments from your
         <br />
         funding source will be processed when your Pending Round-Ups®
         investments reach or exceed $5.
        </p>
       </div>
       <div className='element-acorns-checking-wrapper'>
        <p className='element-acorns-checking'>
         2. Acorns Checking Real-Time Round-Ups® invests small amounts of money
         from purchases made using an Acorns Checking account into the client’s
         Acorns Investment account. Requires
         <br />
         both an active Acorns Checking account and an Acorns Investment account
         in good standing. Real-Time Round-Ups® investments accrue instantly for
         investment during the next trading
         <br />
         window.
        </p>
       </div>
       <div className='element-a-properly-wrapper'>
        <p className='element-a-properly'>
         3. A properly suggested portfolio recommendation is dependent upon
         current and accurate financial and risk profiles. Clients who have
         experienced changes to their goals, financial
         <br />
         circumstances, or investment objectives, or who wish to modify their
         portfolio recommendation, should promptly update their information in
         the Acorns app or through the website.
        </p>
       </div>
       <div className='element-acorns-earn-wrapper'>
        <p className='element-acorns-earn'>
         4. Acorns Earn provides subscribers access to shop with our partners
         and earn bonus investments into your Acorns Invest portfolios when
         purchasing items from the partner brands. Acorns
         <br />
         Earn rewards investments are made by Acorns Grow, Incorporated into
         your Acorns Invest account through a partnership Acorns Grow maintains
         with each Acorns Earn partner. Acorns may
         <br />
         receive compensation from business partners in connection with certain
         promotions in which Acorns refers clients to such partners for the
         purchase of non-investment consumer products or
         <br />
         services. This type of marketing partnership gives Acorns an incentive
         to refer clients to business partners instead of to businesses that are
         not partners of Acorns. This conflict of interest
         <br />
         affects the ability of Acorns to provide clients with unbiased,
         objective promotions concerning the products and services of its
         business partners. This could mean that the products and/or
         <br />
         services of other businesses, that do not compensate Acorns, may be
         more appropriate for a client than the products and/or services of
         Acorns business partners. Subscribers are, however,
         <br />
         not required to purchase the products and services Acorns promotes.
        </p>
       </div>
       <div className='element-acorns-wrapper'>
        <p className='element-acorns'>
         5. Acorns Subscription Fees are assessed based on the tier of services
         in which you are enrolled. Acorns does not charge transactional fees,
         commissions or fees based on assets for
         <br />
         accounts under $1 million. Acorns may receive compensation from
         business partners in connection with certain promotions in which Acorns
         refers clients to such partners for the purchase
         <br />
         of non-investment consumer products or services. This type of marketing
         partnership gives Acorns an incentive to refer clients to business
         partners instead of to businesses that are not
         <br />
         partners of Acorns. This conflict of interest affects the ability of
         Acorns to provide clients with unbiased, objective promotions
         concerning the products and services of its business partners.
         <br />
         This could mean that the products and/or services of other businesses,
         that do not compensate Acorns, may be more appropriate for a client
         than the products and/or services of Acorns
         <br />
         business partners. Subscribers are, however, not required to purchase
         the products and services Acorns promotes.
        </p>
       </div>
       <div className='p-not-a-bank'>
        <p className='element-acorns-is-not-a'>
         <span className='text-wrapper-82'>
          6. Acorns is not a bank. Acorns Visa™ debit cards and banking services
          are issued by Lincoln Savings Bank or nbkc bank, members FDIC. Acorns
          Checking clients are not charged overdraft
          <br />
          fees, maintenance fees, or ATM fees for cash withdrawals from
          in-network ATMs. Please see your Acorns Subscription Center or Account
          Statements for a description of the fees you pay to
          <br />
          Acorns for its services. Any balances you hold with Lincoln Savings
          Bank or nbkc bank, including but not limited to those balances held in
          Acorns Checking accounts are added together and
          <br />
          are insured up to $250,000 per depositor through Lincoln Savings Bank
          or nbkc bank, Members FDIC. If you have funds jointly owned, these
          funds would be separately insured for up to
          <br />
          $250,000 for each joint account owner. Lincoln Savings Bank or nbkc
          bank utilizes a deposit network service, which means that at any given
          time, all, none, or a portion of the funds in your
          <br />
          Acorns Checking accounts may be placed into and held beneficially in
          your name at other depository institutions which are insured by the
          Federal Deposit Insurance Corporation (FDIC). For
          <br />a complete list of other depository institutions where funds may
          be placed, please visit{" "}
         </span>
         <span className='text-wrapper-83'>
          https://www.cambr.com/bank-list
         </span>
         <span className='text-wrapper-84'>
          . Balances moved to network banks are eligible for FDIC insurance
          <br />
          once the funds arrive at a network bank. To learn more about
          pass-through deposit insurance applicable to your account, please see
          the Account Documentation. Additional information on
          <br />
          FDIC insurance can be found at{" "}
         </span>
         <span className='text-wrapper-85'>
          https://www.fdic.gov/resources/deposit-insurance/
         </span>
         <span className='text-wrapper-86'>.</span>
        </p>
       </div>
       <div className='element-early-payday-wrapper'>
        <p className='element-early-payday'>
         7. Early Payday depends on the timing of the submission of the payment
         file from the payer and fraud prevention restrictions. Funds are
         generally available on the day the payment file is
         <br />
         received, up to 2 days earlier than the scheduled payment date. Timing
         may vary.
        </p>
       </div>
       <div className='element-the-etfs-wrapper'>
        <p className='element-the-etfs'>
         8. The ETFs comprising the portfolios charge fees and expenses that
         will reduce a client’s return. Investors should consider the investment
         objectives, risks, charges and expenses of the
         <br />
         funds carefully before investing. Investment policies, management fees
         and other information can be found in the individual ETF’s prospectus.
         Please read each prospectus carefully before
         <br />
         investing.
        </p>
       </div>
       <div className='element-acorns-does-not-wrapper'>
        <p className='element-acorns-does-not'>
         9. Acorns does not provide access to invest directly in Bitcoin.
         Bitcoin exposure is provided through the ETF BITO, which invests in
         Bitcoin futures. This is considered a high-risk investment
         <br />
         given the speculative and volatile nature. Investments in Bitcoin ETFs
         may not be appropriate for all investors and should only be utilized by
         those who understand and accept those risks.
         <br />
         Investors seeking direct exposure to the price of bitcoin should
         consider a different investment.
        </p>
       </div>
       <div className='element-the-ESG-wrapper'>
        <p className='element-the-ESG'>
         10. The ESG (Environmental, social, and governance) investment
         strategies may limit the types and number of investment opportunities
         available, as a result, the portfolio may
         <br />
         underperform others that do not have an ESG focus. Companies selected
         for inclusion in the portfolio may not exhibit positive or favorable
         ESG characteristics at all times and may shift into
         <br />
         and out of favor depending on market and economic conditions.
         Environmental criteria considers how a company performs as a steward of
         nature. Social criteria examine how it manages
         <br />
         relationships with employees, suppliers, customers, and the communities
         where it operates. Governance deals with a company’s leadership,
         executive pay, audits, internal controls, and
         <br />
         shareholder rights.
        </p>
       </div>
       <div className='element-invest-an-wrapper'>
        <p className='element-invest-an'>
         11. Invest, an individual investment account which invests in a
         portfolio of ETFs (exchange traded funds) recommended to clients based
         on their investment objectives, time horizon, and risk
         <br />
         tolerance.
        </p>
       </div>
       <div className='element-later-an-wrapper'>
        <p className='element-later-an'>
         12. Later, an Individual Retirement Account (either Traditional, ROTH
         or SEP IRA) selected for clients based on their answers to a
         suitability questionnaire. Please consult your tax advisor with
         <br />
         any questions.
        </p>
       </div>
       <div className='element-early-an-UTMA-wrapper'>
        <p className='element-early-an-UTMA'>
         13. Early, an UTMA/UGMA investment account managed by an adult
         custodian until the minor beneficiary comes of age, at which point they
         assume control of the account. Money in a<br />
         custodial account is the property of the minor.
        </p>
       </div>
       <div className='element-it-is-not-wrapper'>
        <p className='element-it-is-not'>
         14. It is not possible to invest directly in an index. Past performance
         is no guarantee of future results.
        </p>
       </div>
       <p className='text-wrapper-87'>
        15. Acorns reserves the right to restrict or revoke any and all offers
        at any time.
       </p>
       <div className='element-compounding-is-wrapper'>
        <p className='element-compounding-is'>
         16. Compounding is the process in which an asset’s earning from either
         capital gains or interest are reinvested to generate additional
         earnings over time. It does not ensure positive
         <br />
         performance, nor does it protect against loss. Acorns clients may not
         experience compound returns and investment results will vary based on
         market volatility and fluctuating prices.
        </p>
       </div>
       <div className='p-wrapper'>
        <p className='text-wrapper-88'>
         17. Diversification and asset allocation do not guarantee a profit, nor
         do they eliminate the risk of loss of principal.
        </p>
       </div>
       <p className='text-wrapper-89'>
        18. App rating references the combined all-time star rating received in
        Google Play and Apple App Store.
       </p>
       <div className='element-save-and-invest-wrapper'>
        <p className='element-save-and-invest'>
         19. ‘Save and Invest’ refers to a client’s ability to utilize the
         Acorns Real-Time Round-Ups® investment feature to seamlessly invest
         small amounts of money from purchases using an Acorns
         <br />
         investment account.
        </p>
       </div>
       <div className='element-the-information-wrapper'>
        <p className='element-the-information'>
         20. The information contained on this website should not considered an
         offer, solicitation of an offer or advice to buy or sell any security
         or investment product. The information should not
         <br />
         be construed as tax or legal advice. Please consult your tax advisor
         with any questions.
        </p>
       </div>
       <div className='acorns-round-ups-wrapper'>
        <p className='acorns-round-ups'>
         Acorns, Round-Ups® investments, Real-Time Round-Ups® investments,
         Invest the Change and the Acorns logo are registered trademarks of
         Acorns Grow Incorporated. All product and company
         <br />
         names are trademarks™ or registered® trademarks of their respective
         holders. Use of them does not imply any affiliation with or endorsement
         by them.
        </p>
       </div>
       <div className='for-additional-wrapper'>
        <p className='for-additional'>
         <span className='text-wrapper-90'>
          For additional important risks, disclosures, and information, please
          visit{" "}
         </span>
         <span className='text-wrapper-91'>https://www.acorns.com/terms/</span>
        </p>
       </div>
       <div className='element-acorns-grow-wrapper'>
        <p className='element-acorns-grow'>
         <span className='text-wrapper-92'>
          © 2023 Acorns Grow Incorporated |{" "}
         </span>
         <span className='text-wrapper-93'>Disclosures</span>
         <span className='text-wrapper-94'> | </span>
         <span className='text-wrapper-95'>Accessibility</span>
        </p>
       </div>
      </div>
     </footer>
    </div>
   </div>
  </div>
 );
};

export default Landing;
