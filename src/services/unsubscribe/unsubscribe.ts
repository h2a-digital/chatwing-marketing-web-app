import { createDomainError, err, type Result } from '@/utils/result';
import type { UnsubscribeEmailDTO } from './unsubscribe.model';

export default class UnsubscribeService {
  private static _instance: UnsubscribeService;

  static get instance(): UnsubscribeService {
    if (!this._instance) this._instance = new UnsubscribeService();
    return this._instance;
  }

  /**
   * Unsubscribe from marketing emails
   */
  async unsubscribeEmail(form: UnsubscribeEmailDTO): Promise<Result<void>> {
    try {
      const dto = await fetch('/api/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const res = (await dto.json()) as Result<void>;

      return res;
    } catch (e) {
      return err(createDomainError('Unknown', 'Unable to unsubscribe from emails', e));
    }
  }
}
