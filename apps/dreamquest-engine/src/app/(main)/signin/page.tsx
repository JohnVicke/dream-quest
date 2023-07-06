import { EmailSigninForm } from "./email-signin-form";
import { OauthSigninForm } from "./oauth-signin-form";

export default function SigninPage() {
  return (
    <div>
      <OauthSigninForm />
      <div className="w-full border border-b py-4" />
      <EmailSigninForm />
    </div>
  );
}
