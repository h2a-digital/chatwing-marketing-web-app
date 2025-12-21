import { createDomainError, err, type Result } from '@/utils/result';
import type { ContactFormDTO } from './contact.model';

export default class ContactService {
  private static _instance: ContactService;

  static get instance(): ContactService {
    if (!this._instance) this._instance = new ContactService();
    return this._instance;
  }

  /**
   * Send email
   */
  async sendEmail(form: ContactFormDTO): Promise<Result<void>> {
    try {
      const dto = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const res = (await dto.json()) as Result<void>;

      return res;
    } catch (e) {
      return err(createDomainError('Unknown', 'Unable to send email', e));
    }
  }
}
