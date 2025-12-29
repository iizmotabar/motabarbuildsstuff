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
  });
};
