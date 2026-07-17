import PageHeader from "@/components/PageHeader/PageHeader";
import StubNotice from "@/components/StubNotice/StubNotice";

/**
 * Login page — SCAFFOLDED.
 * The route exists so the "Sign in" link resolves. The auth logic is a story.
 */
export default function LoginPage() {
  return (
    <>
      <PageHeader title="Sign in" subtitle="Welcome back to Handcrafted Haven." />
      <StubNotice
        story="As a user, I want to log in and log out."
        todo={[
          "Build the login form (email + password)",
          "Implement authentication (session or token)",
          "Redirect to the right page after login",
          "Add a logout action in the navbar",
          "Protect the pages that require login",
        ]}
      />
    </>
  );
}
