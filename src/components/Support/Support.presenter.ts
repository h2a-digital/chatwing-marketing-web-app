import ContactService from '@/services/contact/contact';
import ToastRepository from '@/repositories/toast/toast';
import { Analytics, EVT } from '@/utils/analytics';
import type { SupportFormState } from './Support.model';

export default class SupportPresenter {
  private contactService = ContactService.instance;
  private toastRepo = ToastRepository.instance;

  async submitForm(form: SupportFormState): Promise<boolean> {
    // Track form submission attempt
    Analytics.instance.capture(EVT.SUPPORT_FORM_SUBMITTED, {
      name_length: form.name.length,
      email_domain: form.email.split('@')[1],
      message_length: form.message.length,
    });

    const result = await this.contactService.sendEmail({
      name: form.name,
      email: form.email,
      message: form.message,
      hp: form.hp,
    });

    if (result.ok) {
      this.toastRepo.success({
        title: 'Message Sent!',
        description: "Thanks for reaching out. We'll get back to you soon.",
      });

      // Track successful submission
      Analytics.instance.capture(EVT.SUPPORT_FORM_SUCCESS);

      return true;
    } else {
      this.toastRepo.error({
        title: 'Failed to Send',
        description: result.error.message || 'Please try again or email us directly.',
      });

      // Track submission error
      Analytics.instance.capture(EVT.SUPPORT_FORM_ERROR, {
        error_kind: result.error.kind,
      });

      return false;
    }
  }
}
