import { Dialog, DialogContent } from "@ff/ui/dialog";

import { EmailSigninForm } from "~/app/(auth)/signin/email-signin-form";

export default function SignInModal() {
  return (
    <Dialog open>
      <DialogContent>
        <EmailSigninForm />
      </DialogContent>
    </Dialog>
  );
}
