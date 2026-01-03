// GTM DataLayer utility for pushing custom events

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

type GTMEventParams = {
  event: string;
  event_category?: string;
  event_action?: string;
  event_label?: string;
  element_id?: string;
  element_text?: string;
  element_type?: string;
  section?: string;
  link_url?: string;
  link_text?: string;
  form_id?: string;
  form_name?: string;
  field_name?: string;
  field_value?: string;
  case_study_title?: string;
  case_study_category?: string;
  package_name?: string;
  package_price?: string;
  service_name?: string;
  faq_question?: string;
  nav_item?: string;
  nav_type?: 'desktop' | 'mobile';
  timestamp?: string;
  page_path?: string;
  page_title?: string;
  [key: string]: unknown;
};

export const pushToDataLayer = (params: GTMEventParams) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ...params,
    timestamp: new Date().toISOString(),
    page_path: window.location.pathname,
    page_title: document.title,
  });
};

// Pre-built event helpers
export const trackNavClick = (navItem: string, navType: 'desktop' | 'mobile') => {
  pushToDataLayer({
    event: 'nav_click',
    event_category: 'Navigation',
    event_action: 'Click',
    event_label: navItem,
    nav_item: navItem,
    nav_type: navType,
  });
};

export const trackButtonClick = (buttonId: string, buttonText: string, section?: string) => {
  pushToDataLayer({
    event: 'button_click',
    event_category: 'Button',
    event_action: 'Click',
    event_label: buttonText,
    element_id: buttonId,
    element_text: buttonText,
    element_type: 'button',
    section,
  });
};

export const trackLinkClick = (linkUrl: string, linkText: string, section?: string) => {
  pushToDataLayer({
    event: 'link_click',
    event_category: 'Link',
    event_action: 'Click',
    event_label: linkText,
    link_url: linkUrl,
    link_text: linkText,
    section,
  });
};

export const trackCaseStudyInteraction = (
  action: 'view' | 'click' | 'expand',
  title: string,
  category: string
) => {
  pushToDataLayer({
    event: 'case_study_interaction',
    event_category: 'Case Study',
    event_action: action,
    event_label: title,
    case_study_title: title,
    case_study_category: category,
  });
};

export const trackPackageInteraction = (action: 'view' | 'click', name: string, price: string) => {
  pushToDataLayer({
    event: 'package_interaction',
    event_category: 'Package',
    event_action: action,
    event_label: name,
    package_name: name,
    package_price: price,
  });
};

export const trackServiceInteraction = (action: 'view' | 'click', name: string) => {
  pushToDataLayer({
    event: 'service_interaction',
    event_category: 'Service',
    event_action: action,
    event_label: name,
    service_name: name,
  });
};

export const trackFAQInteraction = (action: 'expand' | 'collapse', question: string) => {
  pushToDataLayer({
    event: 'faq_interaction',
    event_category: 'FAQ',
    event_action: action,
    event_label: question,
    faq_question: question,
  });
};

export const trackFormInteraction = (
  action: 'focus' | 'submit' | 'submit_success' | 'submit_error',
  formName: string,
  fieldName?: string,
  additionalData?: Record<string, unknown>
) => {
  pushToDataLayer({
    event: 'form_interaction',
    event_category: 'Form',
    event_action: action,
    event_label: formName,
    form_name: formName,
    field_name: fieldName,
    ...additionalData,
  });
};

// SHA256 hashing helper
const sha256 = async (text: string): Promise<string> => {
  if (!text) return '';
  const encoder = new TextEncoder();
  const data = encoder.encode(text.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Dedicated form submission event with SHA256 hashed PII
export const trackFormSubmission = async (
  formName: string,
  formData: {
    name?: string;
    email?: string;
    message?: string;
  },
  additionalData?: Record<string, unknown>
) => {
  const [hashedName, hashedEmail, hashedMessage] = await Promise.all([
    sha256(formData.name || ''),
    sha256(formData.email || ''),
    sha256(formData.message || ''),
  ]);

  pushToDataLayer({
    event: 'form_submission',
    event_category: 'Form',
    event_action: 'Submit Success',
    event_label: formName,
    form_name: formName,
    // SHA256 hashed PII
    user_name_hashed: hashedName,
    user_email_hashed: hashedEmail,
    user_email_domain: formData.email?.split('@')[1]?.toLowerCase() || '',
    user_message_hashed: hashedMessage,
    message_length: formData.message?.length || 0,
    message_word_count: formData.message?.trim().split(/\s+/).filter(Boolean).length || 0,
    ...additionalData,
  });
};

// Form abandonment tracking
let formStarted = false;
let formFieldsTouched = new Set<string>();
let formStartTime: number | null = null;

export const trackFormStart = (formName: string, fieldName: string) => {
  if (!formStarted) {
    formStarted = true;
    formStartTime = Date.now();
    pushToDataLayer({
      event: 'form_start',
      event_category: 'Form',
      event_action: 'Start',
      event_label: formName,
      form_name: formName,
      first_field: fieldName,
    });
  }
  formFieldsTouched.add(fieldName);
};

export const trackFormAbandonment = (
  formName: string,
  formData: {
    name?: string;
    email?: string;
    message?: string;
  }
) => {
  if (formStarted) {
    const timeSpent = formStartTime ? Math.round((Date.now() - formStartTime) / 1000) : 0;
    const filledFields = Object.entries(formData).filter(([_, v]) => v && v.trim().length > 0).map(([k]) => k);
    
    pushToDataLayer({
      event: 'form_abandonment',
      event_category: 'Form',
      event_action: 'Abandon',
      event_label: formName,
      form_name: formName,
      fields_touched: Array.from(formFieldsTouched),
      fields_touched_count: formFieldsTouched.size,
      fields_filled: filledFields,
      fields_filled_count: filledFields.length,
      time_spent_sec: timeSpent,
      name_filled: !!formData.name?.trim(),
      email_filled: !!formData.email?.trim(),
      message_filled: !!formData.message?.trim(),
    });
  }
};

export const resetFormTracking = () => {
  formStarted = false;
  formFieldsTouched.clear();
  formStartTime = null;
};

export const trackCTAClick = (ctaId: string, ctaText: string, destination?: string) => {
  pushToDataLayer({
    event: 'cta_click',
    event_category: 'CTA',
    event_action: 'Click',
    event_label: ctaText,
    element_id: ctaId,
    element_text: ctaText,
    link_url: destination,
  });
};

export const trackSectionView = (sectionId: string, sectionName: string) => {
  pushToDataLayer({
    event: 'section_view',
    event_category: 'Section',
    event_action: 'View',
    event_label: sectionName,
    section: sectionId,
    section_id: sectionId,
    section_name: sectionName,
  });
};

// Scroll depth tracking
const scrollMilestones = new Set<number>();

export const trackScrollDepth = (percentage: number) => {
  const milestone = Math.floor(percentage / 25) * 25;
  
  if (milestone > 0 && milestone <= 100 && !scrollMilestones.has(milestone)) {
    scrollMilestones.add(milestone);
    pushToDataLayer({
      event: 'scroll_depth',
      event_category: 'Scroll',
      event_action: 'Milestone',
      event_label: `${milestone}%`,
      scroll_percentage: milestone,
      scroll_threshold: milestone,
    });
  }
};

export const initScrollTracking = () => {
  let ticking = false;
  
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const percentage = (scrolled / scrollHeight) * 100;
        trackScrollDepth(percentage);
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};

// Section visibility tracking
const viewedSections = new Set<string>();

// Engagement time tracking
const sectionEngagement = new Map<string, { startTime: number; totalTime: number; isVisible: boolean }>();

export const trackSectionEngagement = (
  sectionId: string, 
  sectionName: string, 
  engagementTimeMs: number
) => {
  const engagementTimeSec = Math.round(engagementTimeMs / 1000);
  
  // Only track if engagement time is meaningful (at least 1 second)
  if (engagementTimeSec >= 1) {
    pushToDataLayer({
      event: 'section_engagement',
      event_category: 'Engagement',
      event_action: 'Time Spent',
      event_label: sectionName,
      section: sectionId,
      section_id: sectionId,
      section_name: sectionName,
      engagement_time_ms: engagementTimeMs,
      engagement_time_sec: engagementTimeSec,
    });
  }
};

export const initSectionVisibilityTracking = () => {
  const sections = document.querySelectorAll('section[id]');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        const sectionName = entry.target.getAttribute('data-section-name') || 
                           sectionId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        if (entry.isIntersecting) {
          // Section became visible
          if (!viewedSections.has(sectionId)) {
            viewedSections.add(sectionId);
            trackSectionView(sectionId, sectionName);
          }
          
          // Start or resume engagement tracking
          const existing = sectionEngagement.get(sectionId);
          if (existing) {
            existing.startTime = Date.now();
            existing.isVisible = true;
          } else {
            sectionEngagement.set(sectionId, {
              startTime: Date.now(),
              totalTime: 0,
              isVisible: true,
            });
          }
        } else {
          // Section left viewport - calculate engagement time
          const engagement = sectionEngagement.get(sectionId);
          if (engagement && engagement.isVisible) {
            const timeSpent = Date.now() - engagement.startTime;
            engagement.totalTime += timeSpent;
            engagement.isVisible = false;
            
            // Fire engagement event when section leaves viewport
            trackSectionEngagement(sectionId, sectionName, engagement.totalTime);
          }
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '0px',
    }
  );
  
  sections.forEach((section) => observer.observe(section));
  
  // Track remaining engagement on page unload
  const handleBeforeUnload = () => {
    sectionEngagement.forEach((engagement, sectionId) => {
      if (engagement.isVisible) {
        const timeSpent = Date.now() - engagement.startTime;
        engagement.totalTime += timeSpent;
        const section = document.getElementById(sectionId);
        const sectionName = section?.getAttribute('data-section-name') || 
                           sectionId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        trackSectionEngagement(sectionId, sectionName, engagement.totalTime);
      }
    });
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
  
  return () => {
    observer.disconnect();
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};

export const resetScrollTracking = () => {
  scrollMilestones.clear();
};

export const resetSectionTracking = () => {
  viewedSections.clear();
  sectionEngagement.clear();
};
