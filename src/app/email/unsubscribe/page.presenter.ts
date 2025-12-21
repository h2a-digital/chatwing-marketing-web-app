import { UnsubscribeService } from '@/services/unsubscribe';
import ToastRepository from '@/repositories/toast/toast';
import { UnsubscribeState } from './page.model';

export default class UnsubscribePresenter {
  private toastRepo = ToastRepository.instance;
  private unsubscribeService = UnsubscribeService.instance;

  async handleUnsubscribe(uid: string | null, token: string | null): Promise<UnsubscribeState> {
    // Validate parameters
    if (!uid || !token) {
      this.toastRepo.error({
        title: 'Invalid Link',
        description: 'The unsubscribe link is invalid or has expired.',
      });
      return {
        status: 'error',
        title: 'Unable to Unsubscribe',
        message:
          "We couldn't verify that link. It may have expired. Contact support@h2adigital.com for help.",
      };
    }

    // Call the unsubscribe service
    const result = await this.unsubscribeService.unsubscribeEmail({ uid, token });

    if (result.ok) {
      this.toastRepo.success({
        title: 'Unsubscribed',
        description: "You've been unsubscribed from marketing emails.",
      });
      return {
        status: 'success',
        title: 'Unsubscribed Successfully',
        message: "You're unsubscribed from marketing emails.",
      };
    } else {
      this.toastRepo.error({
        title: 'Unsubscribe Failed',
        description: result.error.message,
      });
      return {
        status: 'error',
        title: 'Unable to Unsubscribe',
        message: result.error.message,
      };
    }
  }
}
