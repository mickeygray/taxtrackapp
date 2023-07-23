const Hero = styled.div`
 position: relative;
 height: calc(100vh - 100px); /* Subtracting the navbar height */
 overflow: hidden;
 margin-top: -20px;

 @media (max-width: 768px) {
  height: 80vh;
 }
`;

const HeroImage = styled.img`
 position: absolute;
 top: -100;
 left: 0;
 width: 100vw;
 height: 100vh;
 opacity: 0.5;
 object-fit: cover;
 z-index: -1;

 @media (max-width: 768px) {
  top: 0;
  height: 80vh;
 }
`;

const HeroContent = styled.div`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 text-align: center;

 @media (max-width: 768px) {
  top: 40%;
 }
`;

const HeroTitle = styled.h1`
 font-size: 36px;
 margin-bottom: 20px;

 @media (max-width: 768px) {
  font-size: 28px;
  margin-bottom: 10px;
 }
`;

const HeroSubtitle = styled.p`
 font-size: 18px;
 margin-bottom: 30px;

 @media (max-width: 768px) {
  font-size: 16px;
  margin-bottom: 20px;
 }
`;

const HeroButton = styled.button`
 padding: 10px 20px;
 background-color: #333;
 color: #fff;
 border: none;
 border-radius: 4px;
 font-size: 16px;
 cursor: pointer;

 @media (max-width: 768px) {
  font-size: 14px;
  padding: 8px 16px;
 }
`;

const Features = styled.section`
 display: flex;
 gap: 20px;
 margin-bottom: 40px;

 @media (max-width: 768px) {
  flex-direction: column;
  gap: 10px;
 }
`;

const FeatureCard = styled.div`
 flex: 1;
 background-color: #f5f5f5;
 padding: 20px;
 border-radius: 4px;
 transition: transform 0.2s ease-in-out;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

 &:hover {
  transform: translateY(-5px);
 }
`;

const FeatureTitle = styled.h2`
 font-size: 24px;
 margin-bottom: 10px;
 color: #333;
`;

const FeatureText = styled.p`
 font-size: 16px;
 color: #555;
 margin-bottom: 20px;
`;

const Testimonials = styled.section`
 margin-bottom: 40px;
`;

const TestimonialCard = styled.div`
 background-color: #f5f5f5;
 padding: 20px;
 border-radius: 4px;
 margin-bottom: 20px;
 transition: transform 0.2s ease-in-out;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

 &:hover {
  transform: translateY(-5px);
 }
`;

const TestimonialText = styled.p`
 font-size: 16px;
 color: #555;
`;

const TestimonialCarouselContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 background-color: #6944ff;
 height: 20vw;
 margin: 0 auto;

 @media (max-width: 768px) {
  height: 100%;
  padding-top: 40px;
 }
`;

const TestimonialButtonWrapper = styled.div`
 width: 120px;
 margin-right: 40px;
 display: flex;
 align-items: center;

 @media (max-width: 768px) {
  display: none;
 }
`;

const TestimonialInfoContainer = styled.div`
 width: 50%;
 flex-grow: 1;

 @media (max-width: 768px) {
  width: 100%;
 }
`;

const TestimonialSlide = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 height: 300px;
 opacity: ${({ active }) => (active ? 1 : 0)};
 transition: opacity 300ms ease-in-out;

 @media (max-width: 768px) {
  height: 400px;
 }
`;

const TestimonialImage = styled.img`
 width: 100px;
 height: 100px;
 border-radius: 50%;
 margin-right: 16px;

 @media (max-width: 768px) {
  width: 80px;
  height: 80px;
 }
`;

const TestimonialContent = styled.div`
 width: 50%;

 @media (max-width: 768px) {
  width: 100%;
  text-align: center;
 }
`;

const TestimonialName = styled.h2`
 font-size: 24px;
 font-weight: 500;
 margin-bottom: 16px;
 color: #fff;
`;

const TestimonialButtonContainer = styled.div`
 display: flex;

 @media (max-width: 768px) {
  justify-content: center;
 }
`;

const TestimonialButton = styled.button`
 background: rgba(25, 25, 25, 0.15);
 border: 0;
 outline: 0;
 border-radius: 50% 0 0 50%;
 width: 56px;
 height: 56px;
 display: flex;
 justify-content: center;
 align-items: center;
 cursor: pointer;
 transition: background 0.3s ease-in-out;
 font-size: 18px;
 overflow: hidden;
 position: relative;
 margin-right: -4px; /* Adjust this margin to fit your design */

 &:hover {
  background: rgba(25, 25, 25, 0.25);
 }
`;

const NextButton = styled.button`
 background: rgba(25, 25, 25, 0.15);
 border: 0;
 border-radius: 0 50% 50% 0;
 outline: 0;
 width: 56px;
 height: 56px;
 display: flex;
 justify-content: center;
 align-items: center;
 cursor: pointer;
 transition: background 0.3s ease-in-out;
 font-size: 18px;
 overflow: hidden;
 position: relative;
 margin-left: -4px; /* Adjust this margin to fit your design */

 &:hover {
  background: rgba(25, 25, 25, 0.25);
 }
`;

const SectionContainer = styled.div`
 padding: 60px 0;
 background-color: ${({ light }) => (light ? "#fff" : "#f9f9f9")};
 color: ${({ light }) => (light ? "#333" : "#555")};

 @media (max-width: 768px) {
  padding: 40px 0;
 }
`;

const Text = styled.p`
 font-size: 18px;
 margin-bottom: 20px;
 line-height: 1.6;
 color: ${({ light }) => (light ? "#555" : "#fff")};

 @media (max-width: 768px) {
  font-size: 16px;
 }
`;

const Image = styled.img`
 width: 100%;
 max-width: 400px;
 height: auto;
 display: block;
 margin: 0 auto;
 border-radius: 4px;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

 @media (max-width: 768px) {
  max-width: 100%;
 }
`;

const Paragraph = styled.p`
 font-size: 16px;
 margin-bottom: 20px;
 color: #555;
 line-height: 1.6;
`;

const MainContainer = styled.div`
 max-width: 1200px;
 margin: 0 auto;
 padding: 0 20px;
`;

const FormContainer = styled.div`
 max-width: 400px;
 margin: 0 auto;
 padding: 40px;
 border-radius: 4px;
 background-color: #f5f5f5;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
 display: flex;
 flex-direction: column;
`;

const Footer = styled.footer`
 background-color: #333;
 color: #fff;
 padding: 20px 0;
 text-align: center;
`;

const FooterText = styled.p`
 font-size: 14px;
`;

const FooterLink = styled.a`
 color: #fff;
 text-decoration: underline;

 &:hover {
  color: #aaa;
 }
`;

const Navbar = styled.nav`
 background-color: #333;
 color: #fff;
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 20px;
`;

const Logo = styled.div`
 font-size: 24px;
 font-weight: bold;

 @media (max-width: 768px) {
  font-size: 20px;
 }
`;

const NavLinks = styled.ul`
 display: flex;
 gap: 20px;
 list-style: none;
 margin: 0;

 @media (max-width: 768px) {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  background-color: #444;
  padding: 20px;
  z-index: 1000;
 }
`;

const NavLink = styled.li`
 font-size: 18px;
 cursor: pointer;

 &:hover {
  color: #aaa;
 }

 @media (max-width: 768px) {
  font-size: 16px;
  margin-bottom: 10px;
 }
`;

const MobileMenuIcon = styled.div`
 display: none;

 @media (max-width: 768px) {
  display: block;
  font-size: 24px;
  cursor: pointer;
 }
`;

const Accordion = styled.div`
 background-color: #f5f5f5;
 border-radius: 4px;
 margin-bottom: 20px;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AccordionItem = styled.div`
 border-bottom: 1px solid #ddd;

 &:last-child {
  border-bottom: none;
 }
`;

const AccordionTitle = styled.h3`
 font-size: 18px;
 padding: 16px 20px;
 margin: 0;
 cursor: pointer;

 @media (max-width: 768px) {
  font-size: 16px;
 }
`;

const AccordionContent = styled.div`
 padding: 20px;

 @media (max-width: 768px) {
  padding: 16px;
 }
`;

const PricingCard = styled.div`
 background-color: #f5f5f5;
 border-radius: 4px;
 padding: 20px;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 transition: transform 0.2s ease-in-out;
 text-align: center;

 &:hover {
  transform: translateY(-5px);
 }
`;

const PricingPlan = styled.h2`
 font-size: 24px;
 margin-bottom: 10px;
 color: #333;

 @media (max-width: 768px) {
  font-size: 20px;
 }
`;

const PricingCost = styled.p`
 font-size: 36px;
 margin-bottom: 20px;

 @media (max-width: 768px) {
  font-size: 32px;
 }
`;

const PricingFeatureList = styled.ul`
 list-style: none;
 padding: 0;
 margin-bottom: 30px;
`;

const PricingFeature = styled.li`
 font-size: 16px;
 margin-bottom: 10px;

 @media (max-width: 768px) {
  font-size: 14px;
 }
`;

const PricingButton = styled.button`
 padding: 10px 20px;
 background-color: #333;
 color: #fff;
 border: none;
 border-radius: 4px;
 font-size: 16px;
 cursor: pointer;

 @media (max-width: 768px) {
  font-size: 14px;
  padding: 8px 16px;
 }
`;

const HeaderContainer = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 40px;

 @media (max-width: 768px) {
  flex-direction: column;
  align-items: flex-start;
 }
`;

const HeaderContent = styled.div`
 flex: 1;

 @media (max-width: 768px) {
  width: 100%;
  order: 2;
  margin-top: 40px;
 }
`;

const HeaderTitle = styled.h1`
 font-size: 48px;
 margin-bottom: 20px;
 color: #333;

 @media (max-width: 768px) {
  font-size: 36px;
  margin-bottom: 10px;
 }
`;

const HeaderImage = styled.img`
 width: 100%;
 max-width: 400px;
 height: auto;
 border-radius: 4px;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

 @media (max-width: 768px) {
  max-width: 100%;
 }
`;

const Button = styled.button`
 padding: 10px 20px;
 background-color: #333;
 color: #fff;
 border: none;
 border-radius: 4px;
 font-size: 16px;
 cursor: pointer;

 @media (max-width: 768px) {
  font-size: 14px;
  padding: 8px 16px;
 }
`;

<>
 <Hero>
  <HeroImage src={HeroImg} alt='Hero' />
  <HeroContent>
   <HeroTitle> Tax Track Makes IRS Interactions Easy</HeroTitle>
   <HeroSubtitle>
    Keep up with the latest on your tax account at the click of a button
   </HeroSubtitle>
   <HeroButton>Get Started</HeroButton>
  </HeroContent>
 </Hero>

 <BackgroundDiv>
  <ContentContainer>
   <Subtitle>Calculate Your Settlement</Subtitle>
   <ContentTitle>Your Potential Offer In Compromise</ContentTitle>
   <CenteredParagraph>
    The Tax Track Settlement Calculator is a powerful tool that helps
    individuals assess their eligibility for a potential settlement with the
    IRS. By entering financial information, taxpayers can determine if they
    qualify to settle their tax debt for less than the full amount owed.
    Simplifying the process, it empowers users to explore debt relief options
    confidently.
   </CenteredParagraph>
  </ContentContainer>
 </BackgroundDiv>

 <MainContainer>
  <FormContainer>
   <SettlementForm />
  </FormContainer>

  <ChartContainer>
   <ImageContainer>
    {settlementCalculation === null ? (
     <StillImage src={OicHero} style={{ width: "100%" }} alt='Still Image' />
    ) : (
     <SettlementChart />
    )}
   </ImageContainer>
  </ChartContainer>
 </MainContainer>

 <BackgroundDiv>
  <ContentContainer>
   <Subtitle>How Does Tax Track Work?</Subtitle>
   <ContentTitle>
    Everything You Need For Your Tax Settlement In One Place
   </ContentTitle>

   {activeSlide === null ? (
    <CircleWrapper animate={animateButtons}>
     {buttons.map((button, index) => (
      <CircleButton
       key={index}
       onClick={() => handleButtonClick(index)}
       angle={button.angle}
       animate={animateButtons}
       style={{
        backgroundColor: button.backgroundColor,
        width: button.width,
        height: button.height,
        zIndex: "1",
        borderRadius: "10px",
       }}>
       <FontAwesomeIcon icon={button.icon} />
       {button.label}
      </CircleButton>
     ))}
     <LearnMoreButton
      animate={animateButtons}
      onClick={() => handleButtonClick(0)}
      style={{
       width: "500px",
       height: "500px",
       zIndex: "0",
       backgroundColor: "tan",
      }}>
      <Image
       src={logo}
       alt='Image 2'
       style={{
        width: "200px",
        height: "400px",
        zIndex: "0",
        backgroundColor: "tan",
       }}
      />
     </LearnMoreButton>
    </CircleWrapper>
   ) : (
    <OuterWrapper>
     <ButtonWrapper>
      <ButtonContainer>
       {buttons.map((button, index) => (
        <Button
         key={index}
         active={activeSlide === index}
         onClick={() => handleButtonClick(index)}
         style={{
          backgroundColor: button.backgroundColor,
          zIndex: "1",
         }}>
         <FontAwesomeIcon icon={button.icon} />
         {button.label}
        </Button>
       ))}
      </ButtonContainer>
     </ButtonWrapper>

     <InfoContainer activeSlide={activeSlide}>
      {filteredSections.map((section, index) => (
       <InfoContentSection
        key={index}
        imageSrc={section.imageSrc}
        title={section.title}
        description={section.description}
        buttonText={section.buttonText}
       />
      ))}
     </InfoContainer>
    </OuterWrapper>
   )}
  </ContentContainer>
 </BackgroundDiv>

 <ScrollingDiv>
  <ScrollingText scrollingUp={scrollingUp}>
   <RotatingHeadline>
    WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY TAX
    TRACK WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY
    TAX TRACK WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK -
    WHY TAX TRACK
   </RotatingHeadline>
  </ScrollingText>
 </ScrollingDiv>

 {sections.map((section, index) => (
  <SectionContainer key={index}>
   {section.left ? (
    <>
     <LeftDiv>
      <Headline>{section.title}</Headline>
      <Text>
       {section.paragraphs.map((paragraph, idx) => (
        <Paragraph key={idx}>{paragraph}</Paragraph>
       ))}
      </Text>
     </LeftDiv>
     <RightDiv>
      <Image src={section.imageSrc} alt={`Image ${index + 1}`} />
     </RightDiv>
    </>
   ) : (
    <>
     <LeftDiv>
      <Image src={section.imageSrc} alt={`Image ${index + 1}`} />
     </LeftDiv>
     <RightDiv>
      <Headline>{section.title}</Headline>
      <Text>
       {section.paragraphs.map((paragraph, idx) => (
        <Paragraph key={idx}>{paragraph}</Paragraph>
       ))}
      </Text>
     </RightDiv>
    </>
   )}
  </SectionContainer>
 ))}

 <Container style={{ marginTop: "20px" }}>
  <Headline style={{ marginBottom: "20px" }}>
   Change The Way You Do Your Taxes Forever
  </Headline>

  <ImageSection>
   <ImageWrapper>
    <ImageAsset src={ChartOne} alt='Harness the power of compounding' />
   </ImageWrapper>
   <TextSection>
    <HeadlineSecondSection>
     Harness the power of information
    </HeadlineSecondSection>
    <Body>
     Tax Track revolutionizes tax management, offering a modernized approach to
     taxes and simplifying dealings with the IRS. With cutting-edge technology,
     it transforms complex IRS data into user-friendly visuals, enabling easy
     tracking of financial progress. Say goodbye to tax headaches as Tax Track
     provides expert guidance, streamlines return preparation, and empowers you
     to confidently navigate IRS challenges with ease.
    </Body>
   </TextSection>
  </ImageSection>
  <DisclosureSection>
   <DisclosureCopy>
    Tax Track's platform and tools are intended for informational purposes only
    and do not constitute financial, tax, or legal advice. While we strive to
    provide accurate and up-to-date information, the tax laws and regulations
    are subject to change, and individual circumstances can vary. Users should
    consult with qualified professionals, such as tax advisors or financial
    experts, to address specific financial situations or tax concerns. Tax Track
    does not guarantee the accuracy, completeness, or reliability of any
    information presented on the platform. Users are responsible for their
    financial decisions and should conduct their due diligence before making any
    financial or tax-related choices.
   </DisclosureCopy>
  </DisclosureSection>
 </Container>

 <HighlightedTextContainer>
  <div className='highlighted-text-component'>
   <Tagline>Thousands Have Saved Millions With ABC Tax Track</Tagline>
   <Subheadline>
    We have countless testimonials and have saved clients a total of
   </Subheadline>
   <CountUpDollars>$15,000,000</CountUpDollars>
  </div>
  <ImageWrapper>
   {images.map((image, index) => (
    <img key={index} src={image} alt={`Person ${index + 1}`} />
   ))}
  </ImageWrapper>
 </HighlightedTextContainer>

 <TestimonialCarousel>
  {testimonials.map((testimonial, index) => (
   <TestimonialCard key={index}>
    <TestimonialText>{testimonial.text}</TestimonialText>
    <TestimonialAuthor>{testimonial.name}</TestimonialAuthor>
   </TestimonialCard>
  ))}
 </TestimonialCarousel>

 <EnvoyPricingModule>
  <LeftContent>
   <Headline>Streamlines Your Taxes</Headline>
   <br />
   <BodyCopy>
    Tax Track provides intuitive features like "Balance and Transactions" to
    visualize your path to financial freedom in real-time. The "Returns Made
    Easy" feature streamlines tax return preparation, while the "Pro Dashboard"
    offers pro-level deductions analysis for maximizing savings. Stay informed
    with the "Tax Education" feature, providing expert tips and resources on
    changing tax laws.
   </BodyCopy>
   <Disclosures>
    Tax Track is an online financial platform offering general informational and
    educational content about taxes and IRS debt. While we strive for accuracy,
    the information provided should not be considered professional advice. Tax
    laws are subject to frequent changes, and individual circumstances vary, so
    it is essential to consult qualified tax professionals or financial advisors
    for personalized guidance.
   </Disclosures>
  </LeftContent>

  <RightContent>
   {pricingTiers.map((tier, index) => (
    <TierCardWrapper key={index}>
     <TierName>{tier.name}</TierName>
     <TierBodyCopy>{tier.description}</TierBodyCopy>
     <StyledLink href={tier.link}>Sign up today</StyledLink>
     <br />
     {!showHiddenInfo && (
      <ToggleButton
       onClick={() => setShowHiddenInfo((prevState) => !prevState)}>
       What's Included?
      </ToggleButton>
     )}
     {showHiddenInfo && (
      <HiddenInfoWrapper>
       {tier.features.map((feature, index) => (
        <FeatureSection key={index}>
         <h5>
          <FontAwesomeIcon
           icon={feature.icon}
           style={{ color: "white", marginLeft: "5px" }}
          />
          {feature.title}
         </h5>
         <HiddenInfoList>
          {feature.items.map((item, idx) => (
           <HiddenInfoItem key={idx}>{item}</HiddenInfoItem>
          ))}
         </HiddenInfoList>
        </FeatureSection>
       ))}
      </HiddenInfoWrapper>
     )}
    </TierCardWrapper>
   ))}
  </RightContent>
 </EnvoyPricingModule>

 <EnvoyClosingSignUpWrapper>
  <CopyWrapper>
   <ClosingTagline>A Modern Solution For Tax Resolution</ClosingTagline>
   <ClosingHeadline>
    Tax Track changing the way Americans communicate with the IRS
   </ClosingHeadline>
   <CTAButton href='https://app.adjust.com/lu9nsui_ww57nnm?fallback=https://www.acorns.com/tier-signup?key=GOLD'>
    Sign up today
   </CTAButton>
  </CopyWrapper>
  <TreeImage src={logo} alt='Tree stump image' />
  <picture>
   <source
    media='(max-width: 767px)'
    srcSet='https://sqy7rm.media.zestyio.com/Closing-Signup-Updt-Mob-202210-2.png'
   />
   <PhoneImage src={ChartOne} alt='Phone image' />
  </picture>
 </EnvoyClosingSignUpWrapper>

 <FooterWrapper>
  <FooterLogoWrapper>
   <FooterLogo src={logo} alt='Tax Track Logo' />
  </FooterLogoWrapper>
  <FooterLinks>
   {footerLinks.map((link, index) => (
    <a key={index} href={link.url}>
     {link.label}
    </a>
   ))}
  </FooterLinks>
  <FooterSocialIcons>
   {socialMediaLinks.map((link, index) => (
    <a key={index} href={link.url}>
     <img src={link.icon} alt={link.name} />
    </a>
   ))}
  </FooterSocialIcons>
  <FooterDisclaimer>© 2023 Tax Track</FooterDisclaimer>
 </FooterWrapper>
</>;
