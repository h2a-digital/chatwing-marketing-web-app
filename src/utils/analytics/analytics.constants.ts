/**
 * Analytics Event Constants
 * Centralized event names for tracking user interactions
 */
export const EVT = {
  // App Store Downloads
  APP_STORE_BUTTON_CLICKED: 'app_store_button_clicked',

  // Support Form Events
  SUPPORT_FORM_SUBMITTED: 'support_form_submitted',
  SUPPORT_FORM_SUCCESS: 'support_form_success',
  SUPPORT_FORM_ERROR: 'support_form_error',

  // FAQ Interactions
  FAQ_ITEM_OPENED: 'faq_item_opened',

  // Gallery Interactions
  GALLERY_IMAGE_SELECTED: 'gallery_image_selected',

  // Navigation Events
  SECTION_VIEWED: 'section_viewed',
} as const;
